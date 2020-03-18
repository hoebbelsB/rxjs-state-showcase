import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-mixed-parent01',
    template: `
        <h2>
            Mixed Setup 01
            <small>One single-shot observable bound by one ngrxPush and one ngrxLet as input binding</small>
        </h2>
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        <br/>
        <ng-container *ngrxLet="value1$ as sync1">{{sync1}}</ng-container>
        <app-mixed-child01 [value]="value1$ | ngrxPush"></app-mixed-child01>
    `,
    changeDetection: environment.changeDetection
})
export class Parent01Component {
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;

    constructor() {
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
