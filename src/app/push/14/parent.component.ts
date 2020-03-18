import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-push-parent14',
    template: `
        <h2>Push Pipe 14
            <small>one single-shot observable bound by multiple ngrxPush as input binding</small>
        </h2>
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        <br/>
        <app-push-child14 [value]="value1$ | ngrxPush">
        </app-push-child14>
        <app-push-child14 [value]="value2$ | ngrxPush">
        </app-push-child14>
        <app-push-child14 [value]="value3$ | ngrxPush">
        </app-push-child14>
    `,
    changeDetection: environment.changeDetection
})
export class Parent14Component implements OnInit {
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value2$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value3$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;

    constructor() {
    }

    ngOnInit(): void {
        // markDirty(this);
    }


    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
