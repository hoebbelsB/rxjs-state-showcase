import {MonoTypeOperatorFunction, Observable, OperatorFunction} from 'rxjs';
import {distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {isOperateFnArrayGuard} from '../utils';
import {pipeFromArray} from "rxjs/internal/util/pipe";

export function stateful<T>(): MonoTypeOperatorFunction<T>;
// ========================
export function stateful<T, A>(
    op: OperatorFunction<T, A>
): OperatorFunction<T, A>;
export function stateful<T, A, B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
): OperatorFunction<T, B>;
export function stateful<T, A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
): OperatorFunction<T, C>;
export function stateful<T, A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
): OperatorFunction<T, D>;
export function stateful<T, A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
): OperatorFunction<T, E>;
export function stateful<T, R>(...optionalDerive: OperatorFunction<T, R>[]): OperatorFunction<T, T | R> {
    return (s: Observable<T>): Observable<T | R> => {
        return s.pipe(
            distinctUntilChanged(),
            (o: Observable<T>): Observable<T | R> => {
                if (isOperateFnArrayGuard(optionalDerive)) {
                    return o.pipe(pipeFromArray(optionalDerive));
                }
                return o;
            },
            shareReplay({bufferSize: 1, refCount: true})
        );
    };
}
