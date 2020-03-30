// Source: https://github.com/angular/zone.js/blob/master/example/benchmarks/addEventListener.html

import {fromEventPattern, Observable} from 'rxjs';


export function fromEvent<T>(target: any, eventName: string, options?: EventListenerOptions): Observable<T> {
    return fromEventPattern<T>(
        addClickHandler,
        removeClickHandler
    );

    function addClickHandler(handler) {
        (target as any).__zone_symbol__addEventListener(eventName, handler);
    }

    function removeClickHandler(handler) {
        (target as any).__zone_symbol__removeEventListener(eventName, handler);
    }

}

