import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {from, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-let-parent02',
    template: `
        <h2>Let Directive 02
            <small>One single-shot observables bound by multiple ngrxLet as input binding with as syntax</small>
        </h2>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <ng-container *ngrxLet="value1$ as v">Value1: {{v}}</ng-container>
        <ng-container *ngrxLet="value1$ as v">Value1: {{v}}</ng-container>
        <ng-container *ngrxLet="value1$ as v">Value1: {{v}}</ng-container>
    `,
    changeDetection: environment.changeDetection
})
export class LetParent02Component {

    btnClick = new Subject<Event>();
    value1$: Observable<number> = this.btnClick.pipe(startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    constructor() {
        from([1, 2, 3, 4, 5])
            .pipe(
                /*coalesce({
                  leading: false,
                  trailing: true,
                  context: window as any,
                  executionContextRef: window.requestAnimationFrame
                })*/
            ).subscribe(console.log);
    }

}
