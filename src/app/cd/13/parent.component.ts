import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {scan, switchMap, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {generateFrames} from '../../../../projects/component/src/core/projections';

@Component({
    selector: 'app-cd-parent13',
    template: `
        <h2>ChangeDetection 13
            <small>animationFrames triggers zone</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>aF:{{((isPatchedAf$ | async) ? 'Patched' : 'UnPatched')}}</span><br>
        <button (click)="btnClick$.next()">Run AF for 1 sec</button><br/>
        <button (click)="btnToggle$.next()">Toggle Observable</button>


    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent13Component {
    btnClick$ = new Subject<any>();
    btnToggle$ = new Subject<any>();
    isPatchedAf$ = this.btnToggle$.pipe(scan(isPatched => !isPatched));

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    constructor() {
        const asyncProducer = (window as any).__zone_symbol__requestAnimationFrame;
        const asyncCanceler = (window as any).__zone_symbol__cancelAnimationFrame;
        const afPatched$: Observable<number> = generateFrames();
        const afUnPatched$: Observable<number> = generateFrames(asyncProducer, asyncCanceler);
        this.btnClick$
            .pipe(
                withLatestFrom(this.isPatchedAf$),
                switchMap((_, isPatchedAf) => (isPatchedAf ? afUnPatched$ : afPatched$)
                    .pipe(takeUntil(interval(1000)))
                ),
            )
            .subscribe();
    }

}
