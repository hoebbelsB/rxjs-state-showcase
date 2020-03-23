import {ConnectableObservable, merge, Observable, queueScheduler, Subject, Subscribable, Subscription} from "rxjs";
import {distinctUntilChanged, mergeAll, observeOn, publishReplay, scan} from "rxjs/operators";

export function createAccumulationObservable<T>(
    stateObservables = new Subject<Observable<Partial<T>>>(),
    stateSlices = new Subject<Partial<T>>(),
    stateAccumulator: (st: T, sl: Partial<T>) => T = (st: T, sl: Partial<T>): T => {
        return {...st, ...sl};
    }
): {
    state$: Observable<T>,
    nextSlice: (stateSlice: Partial<T>) => void,
    nextSliceObservable: (state$: Observable<Partial<T>>) => void,
} & Subscribable<T> {

    const state$: Observable<T> = merge(
        stateObservables.pipe(
            distinctUntilChanged(),
            mergeAll(),
            observeOn(queueScheduler)
        ),
        stateSlices.pipe(observeOn(queueScheduler))
    ).pipe(
        scan(stateAccumulator, {} as T),
        publishReplay(1)
    );

    function nextSlice(stateSlice: Partial<T>): void {
        stateSlices.next(stateSlice);
    }

    function nextSliceObservable(state$: Observable<Partial<T>>): void {
        stateObservables.next(state$);
    }

    function subscribe(): Subscription {
        return (state$ as ConnectableObservable<T>).connect()
    }

    return {
        state$,
        nextSlice,
        nextSliceObservable,
        subscribe
    }
}
