import {ChangeDetectorRef, NgZone} from '@angular/core';
import {
    combineLatest,
    NEVER,
    NextObserver,
    Observable,
    of,
    PartialObserver,
    Subject,
    Subscribable,
    Subscription,
} from 'rxjs';
import {distinctUntilChanged, filter, startWith, switchMap, tap} from 'rxjs/operators';
import {DEFAULT_STRATEGY_NAME, getStrategies} from './strategy';

export interface CdAware<U> extends Subscribable<U> {
    nextVale: (value: any) => void;
    nextConfig: (config: string) => void;
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
    render?: () => void;
    behaviour?: (
        o: Observable<Observable<U | null | undefined>>
    ) => Observable<Observable<U | null | undefined>>;
    resetContextObserver: NextObserver<unknown>;
    updateViewContextObserver: PartialObserver<any>;
}): CdAware<U | undefined | null> {
    const strategies = getStrategies(cfg);

    const configSubject = new Subject<string>();
    const config$ = configSubject.pipe(
        filter(v => !!v),
        distinctUntilChanged(),
        startWith(DEFAULT_STRATEGY_NAME),
    );
    const observablesSubject = new Subject<Observable<U>>();
    const observables$ = observablesSubject.pipe(
        distinctUntilChanged()
    );
    let prevObs;
    const recomposeTrigger$ = combineLatest(observables$, config$);
    const renderSideEffect$: Observable<any> = recomposeTrigger$.pipe(
        switchMap(([ob$, c]) => {
            const strategy = strategies[c] ? strategies[c] : strategies.idle;
            if (ob$ === undefined || ob$ === null) {
                cfg.resetContextObserver.next(undefined);
                strategy.render();
                return NEVER;
            }

            if (ob$ === prevObs) {
                return NEVER;
            }

            return ob$.pipe(
                distinctUntilChanged(),
                tap(cfg.updateViewContextObserver),
                strategy.behaviour(),
                tap(() => strategy.render())
            );
        })
    );

    return {
        nextVale(value: any): void {
            observablesSubject.next(value);
        },
        nextConfig(nextConfig: string): void {
            configSubject.next(nextConfig);
        },
        subscribe(): Subscription {
            return renderSideEffect$.subscribe();
        }
    } as CdAware<U | undefined | null>;
}
