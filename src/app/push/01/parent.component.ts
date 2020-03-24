import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-push-parent01',
    template: `
        <h2>
            Push Pipe 01
            <small>one single-shot observable bound by one ngrxPush as template expression</small>
        </h2>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        <br/>
        Value1: {{value1$ | ngrxPush: cfg }}
    `,
    changeDetection: environment.changeDetection
})
export class Parent01Component {
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
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
