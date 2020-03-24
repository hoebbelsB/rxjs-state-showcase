import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-push-parent21',
    template: `
        <h2>Push Pipe 21
            <small>One single-shot observable bound by one ngrxPush as input binding. The nested components uses ngrxPush to render changes.</small>
        </h2>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        <br/>
        <app-push-child21 [value]="value1$ | ngrxPush: cfg">
        </app-push-child21>
    `,
    changeDetection: environment.changeDetection
})
export class Parent21Component implements OnInit {
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
    ngOnInit(): void {
        // markDirty(this);
    }


    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
