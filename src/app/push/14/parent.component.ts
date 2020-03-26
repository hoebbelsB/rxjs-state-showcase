import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import {CdConfigService} from '../../cd-config.service';

@Component({
    selector: 'app-push-parent14',
    template: `
        <h2>Push Pipe 14
            <small>multiple single-shot observable bound by multiple ngrxPush as input binding</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        <br/>
        <app-push-child14 [value]="value1$ | ngrxPush: strategy">
        </app-push-child14>
        <app-push-child14 [value]="value2$ | ngrxPush: strategy">
        </app-push-child14>
        <app-push-child14 [value]="value3$ | ngrxPush: strategy">
        </app-push-child14>
    `,
    changeDetection: environment.changeDetection
})
export class Parent14Component {
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value2$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value3$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
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
