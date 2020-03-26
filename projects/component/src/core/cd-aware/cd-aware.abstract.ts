import { ChangeDetectorRef, NgZone } from '@angular/core';
import {getChangeDetectionHandler, Output} from '../utils';
import {
    NextObserver,
    Observable,
    PartialObserver,
    Subject,
    Subscribable,
    Subscription,
} from 'rxjs';
import { distinctUntilChanged, map, switchAll, tap } from 'rxjs/operators';
import { toObservableValue } from '../projections';

export interface CdConfig {
    optimized: boolean;
}

export interface CdAware<U> extends Subscribable<U> {
    nextVale: (value: any) => void;
    nextConfig: (config: CdConfig) => void;
}
/**
 * class CdAware
 *
 * @description
 * This abstract class holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export function createCdAware<U>(cfg: {
    component: any;
    ngZone: NgZone;
    cdRef: ChangeDetectorRef;
    work: () => void;
    behaviour: (
        o: Observable<Observable<U | null | undefined>>
    ) => Observable<Observable<U | null | undefined>>;
    resetContextObserver: NextObserver<unknown>;
    updateViewContextObserver: PartialObserver<U | null | undefined>;
}): CdAware<U | undefined | null> {
    const cdConfigSubject = new Subject<CdConfig>();
    const observablesSubject = new Subject<Observable<U> | Promise<U> | null | undefined>();
    const observables$ = observablesSubject.pipe(
        distinctUntilChanged(),
        map(v => toObservableValue(v))
        );
    const renderSideEffect$: Observable<U | undefined | null> = observables$.pipe(
        tap((v) => {
            cfg.resetContextObserver.next(v);
            cfg.work();
        }),
        map((value$: Observable<any>) =>
            value$.pipe(
                distinctUntilChanged(), tap(cfg.updateViewContextObserver)
            )
        ),
        // cfg.behaviour,
        switchAll<U>(),
        tap(() => cfg.work())
    );

    return {
        nextVale(value: Observable<U> | Promise<U> | null | undefined): void {
            observablesSubject.next(value);
        },
        nextConfig(config: CdConfig): void {
            cdConfigSubject.next(config);
        },
        subscribe(): Subscription {
            return renderSideEffect$.subscribe();
        }
    } as CdAware<U | undefined | null>;
}
