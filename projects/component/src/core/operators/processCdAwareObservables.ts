import { distinctUntilChanged, switchAll } from 'rxjs/operators';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { remainHigherOrder } from '../utils';
import { toObservableValue } from './toObservableValue';

export function processCdAwareObservables<T>(
  resetContextBehaviour: remainHigherOrder<T>,
  updateContextBehaviour: remainHigherOrder<T>,
  configurableBehaviour: remainHigherOrder<T>
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<unknown>): Observable<T> => {
    return o$.pipe(
      // try to convert it to values, throw if not possible
      toObservableValue,
      // Ignore observables of the same instances
      distinctUntilChanged(),
      resetContextBehaviour,
      // Add apply changes to context behaviour
      updateContextBehaviour,
      // Add cd optimization behaviour
      configurableBehaviour,
      // unsubscribe from previous observables
      // then flatten the latest internal observables into the output
      switchAll(),
      // reduce number of emissions to distinct values compared to teh previous one
      distinctUntilChanged()
    );
  };
}
