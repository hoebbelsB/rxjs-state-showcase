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
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        Value1: {{value1$ | ngrxPush: cfg}}
    `,
    changeDetection: environment.changeDetection
})
export class Parent04Component implements OnInit {
    btnClick = new Subject<Event>();
    numArray = [0, 1, 3, 4, 5];
    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), concatMap(a => from(this.numArray)), scan((a): any => ++a, 0));
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
