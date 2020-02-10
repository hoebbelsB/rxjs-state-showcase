import { Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

export function stateful<T>() {
    return (o: Observable<T>): Observable<T> => {
        return o.pipe(
            // filter(v => v !== undefined),
            distinctUntilChanged(),
            shareReplay({
                bufferSize: 1,
                refCount: true
            })
        );
    };
}
