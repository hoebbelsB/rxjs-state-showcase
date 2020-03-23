import { NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { isIvy } from '../../../../component/src/core/utils';
import { ɵɵdirectiveInject as directiveInject} from '@angular/core';

// TODO: use appInjector instead of NgZone
export function outsideZone<T>(zone?: NgZone) {
    return function(source: Observable<T>) {
        return new Observable(observer => {
            let z = zone;
            if (!z && isIvy()) {
                z = directiveInject(NgZone);
            }
            if (!z) {
                throw new Error('no NgZone to run outside :(');
            }
            let sub: Subscription;
            z.runOutsideAngular(() => {
                sub = source.subscribe(observer);
            });
            return sub;
        });
    };
}
