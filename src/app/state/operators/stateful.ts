import { animationFrameScheduler, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, shareReplay } from 'rxjs/operators';

export function stateful<T>() {
    return (o: Observable<T>): Observable<T> => {
        return o.pipe(
            filter(v => v !== undefined),
            distinctUntilChanged(),
            shareReplay({
                bufferSize: 1,
                refCount: true
            })
        );
    };
}
