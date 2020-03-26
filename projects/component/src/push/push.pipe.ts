import {ChangeDetectorRef, EmbeddedViewRef, NgZone, OnDestroy, Pipe, PipeTransform, Type} from '@angular/core';
import {NextObserver, Observable, PartialObserver, Subject, Unsubscribable} from 'rxjs';
import {distinctUntilChanged, map, withLatestFrom} from 'rxjs/operators';
import {CdAware, CdConfig as PushPipeConfig, createCdAware, setUpWork} from '../core';
import {coalesce, generateFrames} from '@rx-state/rxjs-state';

/**
 * @Pipe PushPipe
 * @description
 *
 * The `ngrxPush` pipe serves as a drop-in replacement for the `async` pipe.
 * It contains intelligent handling of change detection to enable us
 * running in zone-full as well as zone-less mode without any changes to the code.
 *
 * The current way of binding an observable to the view looks like that:
 *  ```html
 *  {{observable$ | async}}
 * <ng-container *ngIf="observable$ | async as o">{{o}}</ng-container>
 * <component [value]="observable$ | async"></component>
 * ```
 *
 * The problem is `async` pipe just marks the component and all its ancestors as dirty.
 * It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
 *     components.
 *
 * Heavy dynamic and interactive UIs suffer from zones change detection a lot and can
 * lean to bad performance or even unusable applications, but the `async` pipe does not work in zone-less mode.
 *
 * `ngrxPush` pipe solves that problem.
 *
 * Included Features:
 *  - Take observables or promises, retrieve their values and render the value to the template
 *  - Handling null and undefined values in a clean unified/structured way
 *  - Triggers change-detection differently if `zone.js` is present or not (`detectChanges` or `markForCheck`)
 *  - Distinct same values in a row to increase performance
 *  - Coalescing of change detection calls to boost performance
 *
 * @usageNotes
 *
 * ### Examples
 *
 * `ngrxPush` pipe solves that problem. It can be used like shown here:
 * ```html
 * {{observable$ | ngrxPush}}
 * <ng-container *ngIf="observable$ | ngrxPush as o">{{o}}</ng-container>
 * <component [value]="observable$ | ngrxPush"></component>
 * ```
 *
 * @publicApi
 */
@Pipe({name: 'ngrxPush', pure: false})
export class PushPipe<S> implements PipeTransform, OnDestroy {
    private renderedValue: any | null | undefined;

    private readonly configSubject = new Subject<PushPipeConfig>();
    private readonly config$ = this.configSubject
        .asObservable()
        .pipe(distinctUntilChanged());

    private readonly subscription: Unsubscribable;
    private readonly cdAware: CdAware<S | null | undefined>;
    private readonly updateViewContextObserver: PartialObserver<S | null | undefined> = {
        // assign value that will get returned from the transform function on the next change detection
        next: (value: S | null | undefined) => (this.renderedValue = value),
    };
    private readonly resetContextObserver: NextObserver<unknown> = {
        next: (value: unknown) => (this.renderedValue = undefined),
    };
    private readonly configurableBehaviour = <T>(
        o$: Observable<Observable<T>>
    ): Observable<Observable<T>> =>
        o$.pipe(
            withLatestFrom(this.config$),
            map(([value$, config]) => {
                const durationSelector = () => generateFrames(
                    (window as any).__zone_symbol__requestAnimationFrame,
                    (window as any).__zone_symbol__cancelAnimationFrame
                );
                // const coalesceConfig = {context: (this.cdRef as EmbeddedViewRef<Type<any>>).context as any};
                const coalesceConfig = {context: this.cdRef['_lView'] as any};
                // const coalesceConfig = {context: PushPipe as any};
                // const coalesceConfig = {context: {} as any};
                // As discussed with Brandon we keep it here
                // because in the beta we implement configuration behavior here
                return config.optimized ?
                    value$.pipe(
                        coalesce(durationSelector, coalesceConfig)) :
                    value$.pipe();
            })
        );

    constructor(
        private cdRef: ChangeDetectorRef,
        ngZone: NgZone) {
        this.cdAware = createCdAware<S>({
            component: this,
            ngZone,
            cdRef,
            work: setUpWork({
                ngZone,
                cdRef,
                context: (cdRef as EmbeddedViewRef<Type<any>>).context,
            }),
            behaviour: this.configurableBehaviour,
            updateViewContextObserver: this.updateViewContextObserver,
            resetContextObserver: this.resetContextObserver,
        });
        this.subscription = this.cdAware.subscribe();
    }

    transform<T>(potentialObservable: null, config?: PushPipeConfig): null;
    transform<T>(potentialObservable: undefined, config?: PushPipeConfig): undefined;
    transform<T>(
        potentialObservable: Observable<T> | Promise<T>,
        config?: PushPipeConfig
    ): T;
    transform<T>(
        potentialObservable: Observable<T> | Promise<T> | null | undefined,
        config: PushPipeConfig = {optimized: true}
    ): T | null | undefined {
        this.configSubject.next(config);
        this.cdAware.nextVale(potentialObservable);
        return this.renderedValue as T;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
