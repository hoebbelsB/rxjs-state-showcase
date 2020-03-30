import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import {CdConfigService} from '../../cd-config.service';
import {fromEvent} from '@zoneless-helpers';

@Component({
    selector: 'app-let-parent01',
    template: `
        <h2>Let Directive 01
            <small>One single-shot observable bound by one ngrxLet as input binding with as syntax</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>: strategy
        <br/>
        <button id="button">increment</button>
        <ng-container *ngrxLet="value$ as v">Value: {{v}}</ng-container>
    `,
    changeDetection: environment.changeDetection
})
export class LetParent01Component {
    btnClick$ = defer(() => fromEvent(this.button(), 'click'));

    value$: Observable<number> = this.btnClick$.pipe(startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;
    button = () => document.getElementById('button');

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    get strategy() {
        return this.coalesceConfigService.getConfig('strategy');
    }

    constructor(
        private coalesceConfigService: CdConfigService
    ) {

    }


}
