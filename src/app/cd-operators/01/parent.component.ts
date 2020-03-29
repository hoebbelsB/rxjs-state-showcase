import {ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {environment} from '../../../environments/environment';
import {range, Subject} from 'rxjs';
import {createIdleStrategy, getStrategies} from '../../../../projects/component/src/core/cd-aware';
import {renderChanges} from '../../../../projects/component/src/core/operators/renderChanges';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {CdConfigService} from '../../cd-config.service';

@Component({
    selector: 'app-cd-operators-parent01',
    template: `
        <h2>CD Operators 01
            <small>CD Operators</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <br/>
        <button (click)="btn$.next($event)">Next</button><br/>

        value$: {{value$ | async}}

    `,
    changeDetection: environment.changeDetection
})
export class CdOperatorsParent01Component {
    cfg = {ngZone: this.ngZone, cdRef: this.cdRef, component: this};
    strategies = getStrategies<number>(this.cfg);
    idleStrategies = createIdleStrategy(this.cfg);

    btn$ = new Subject();
    value$ = this.btn$.pipe(
        switchMap(() => range(1, 5)),
        tap(v => console.log('before:', v)),
        renderChanges(this.strategies.optimistic2),
        tap(v => console.log('after:', v))
    );

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    constructor(private ngZone: NgZone, private cdRef: ChangeDetectorRef, private cfgService: CdConfigService) {
    }

}
