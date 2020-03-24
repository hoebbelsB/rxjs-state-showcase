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
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        <br/>
        <app-push-child14 [value]="value1$ | ngrxPush: cfg">
        </app-push-child14>
        <app-push-child14 [value]="value2$ | ngrxPush: cfg">
        </app-push-child14>
        <app-push-child14 [value]="value3$ | ngrxPush: cfg">
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

    cfg = this.coalesceConfigService.getConfig();

    constructor(
        private coalesceConfigService: CdConfigService
    ) {
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
