import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {from, Observable, Subject} from 'rxjs';
import {concatMap, scan, startWith} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-push-parent04',
    template: `
        <h2>Push Pipe 04
            <small>one sync multi-shot observables bound by multiple ngrxPush as template expression</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        Value1: {{value1$ | ngrxPush: strategy}}
    `,
    changeDetection: environment.changeDetection
})
export class Parent04Component {
    btnClick = new Subject<Event>();
    numArray = [0, 1, 3, 4, 5];
    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), concatMap(a => from(this.numArray)), scan((a): any => ++a, 0));
    numRenderings = 0;

    get strategy() {
        return this.coalesceConfigService.getConfig('strategy');
    }

    constructor(
        private coalesceConfigService: CdConfigService
    ) {
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
