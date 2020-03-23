import {Observable, OperatorFunction, Subscribable, Subscription, Unsubscribable,} from 'rxjs';
import {map, pluck, tap, filter} from 'rxjs/operators';
import {
    createAccumulationObservable,
    createSideEffectObservable,
    isObservableGuard,
    isOperateFnArrayGuard,
    isStringArrayGuard,
    stateful,
    pipeFromArray,
    WrongSelectParamsError
} from '../core';


/**
 * @example
 * const ls = new State<{test: string, bar: number}>();
 */
export class State<T> implements Subscribable<any> {
    private accumulationObservable = createAccumulationObservable<T>();
    private effectObservable = createSideEffectObservable();

    $ = this.accumulationObservable.state$;

    constructor() {

    }

    /**
     * @example
     * const ls = new State<{test: string, bar: number}>();
     * ls.setState({test: 'tau'});
     * ls.setState({bar: 7});
     * ls.setState('test', 'tau');
     */
    setState(state: Partial<T>): void;
    setState<K extends keyof T>(key: K, state: T[K]): void;
    setState<K extends keyof T>(keyOrState: K | Partial<T>, state?: T[K]): void {
        if (typeof keyOrState !== 'object' && state !== undefined) {
            // @TODO fix typing
            this.accumulationObservable.nextSlice({[keyOrState]: state} as any);
            return;
        } else if (typeof keyOrState === 'object' && state === undefined) {
            this.accumulationObservable.nextSlice(keyOrState);
            return;
        }

        throw new Error('wrong param');
    }

    /**
     * @example
     * const ls = new State<{test: string, bar: number}>();
     * ls.connect(of({test: 'tau'}));
     * ls.connect('bar', of(42));
     */
    connect<K extends keyof T>(slice$: Observable<Partial<T>>): void;
    connect<K extends keyof T>(key: K, value$: Observable<T[K]>): void;
    connect<K extends keyof T>(keyOrSlice$: K | Observable<Partial<T>>, value$?: Observable<T[K]>): void {
        if (isObservableGuard(keyOrSlice$) && value$ === undefined) {
            this.accumulationObservable.nextSliceObservable(keyOrSlice$);
            return;
        }
        if (typeof keyOrSlice$ === 'string' && value$ !== undefined) {
            this.accumulationObservable.nextSliceObservable(
                value$.pipe(
                    // undefined can occur if:
                    // - key oes not extist
                    // - key is set to undefined
                    filter(slice => slice !== undefined),
                    map(slice => ({[keyOrSlice$]: slice}))
                    // @TODO fix typing
                ) as any
            );
            return;
        }
        throw new Error('wrong param');
    }

    /**
     * @example
     * const ls = new State<{test: string, foo: {baz: 42}, bar: number}>();
     * ls.select();
     * ls.select('test');
     * ls.select('foo', 'baz');
     * ls.select(mapTo(7));
     * ls.select(map(s => s.test), startWith('unknown test value'));
     * ls.select(pipe(map(s => s.test), startWith('unknown test value')));
     */
    select(): Observable<T>;
    // ========================
    select<A = T>(op: OperatorFunction<T, A>): Observable<A>;
    select<A = T, B = A>(
        op1: OperatorFunction<T, A>,
        op2: OperatorFunction<A, B>
    ): Observable<B>;
    select<A = T, B = A, C = B>(
        op1: OperatorFunction<T, A>,
        op2: OperatorFunction<A, B>,
        op3: OperatorFunction<B, C>
    ): Observable<C>;
    select<A = T, B = A, C = B, D = C>(
        op1: OperatorFunction<T, A>,
        op2: OperatorFunction<A, B>,
        op3: OperatorFunction<B, C>,
        op4: OperatorFunction<C, D>
    ): Observable<D>;
    select<A = T, B = A, C = B, D = C, E = D>(
        op1: OperatorFunction<T, A>,
        op2: OperatorFunction<A, B>,
        op3: OperatorFunction<B, C>,
        op4: OperatorFunction<C, D>,
        op5: OperatorFunction<D, E>
    ): Observable<E>;
    // ================================
    select<K1 extends keyof T>(k1: K1): Observable<T[K1]>;
    select<K1 extends keyof T, K2 extends keyof T[K1]>(
        k1: K1,
        k2: K2
    ): Observable<T[K1][K2]>;
    select<K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2]>(k1: K1, k2: K2, k3: K3): Observable<T[K1][K2][K3]>;
    select<K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3]>(k1: K1, k2: K2, k3: K3, k4: K4): Observable<T[K1][K2][K3][K4]>;
    select<K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Observable<T[K1][K2][K3][K4][K5]>;
    select<K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4],
        K6 extends keyof T[K1][K2][K3][K4][K5]>(
        k1: K1,
        k2: K2,
        k3: K3,
        k4: K4,
        k5: K5,
        k6: K6
    ): Observable<T[K1][K2][K3][K4][K5][K6]>;
    // ===========================
    select<R>(...opOrMapFn: OperatorFunction<T, R>[] | string[]): Observable<T | R> {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return this.$.pipe(stateful());
        } else if (isStringArrayGuard(opOrMapFn)) {
            return this.$.pipe(stateful(pluck(...opOrMapFn)));
        } else if (isOperateFnArrayGuard(opOrMapFn)) {
            return this.$.pipe(stateful(pipeFromArray(opOrMapFn)));
        }
        throw new WrongSelectParamsError();
    }

    hold<S>(
        obsOrObsWithSideEffect: Observable<S>,
        sideEffectFn?: (arg: S) => void
    ): void {
        if (sideEffectFn) {
            this.effectObservable.nextEffectObservable(
                obsOrObsWithSideEffect.pipe(tap(sideEffectFn))
            );
            return;
        }
        this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
    }

    subscribe(): Unsubscribable {
        const subscription = new Subscription();
        subscription.add(this.accumulationObservable.subscribe());
        subscription.add(this.effectObservable.subscribe());
        return subscription;
    }

}
