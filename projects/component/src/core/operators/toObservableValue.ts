import { from, Observable, of } from 'rxjs';
import { isObservableGuard, isPromiseGuard } from '../utils';
import {potentialObservableValue} from '../../../../rxjs-state/src/lib/core/utils';

export function toObservableValue<T>(
  potentialObservableValue$: potentialObservableValue<T> | undefined | null
): Observable<T | undefined | null> {
  if (
    // Comparing to the literal null value with the == operator covers both null and undefined values.
    potentialObservableValue$ == null
  ) {
    return of(potentialObservableValue$ as any);
  }

  if (
    isPromiseGuard<T>(potentialObservableValue$) ||
    isObservableGuard<T>(potentialObservableValue$)
  ) {
    return from(potentialObservableValue$);
  }

  throw new Error(
    'Argument not observable. Only null/undefined or Promise/Observable-like values are allowed.'
  );
}
