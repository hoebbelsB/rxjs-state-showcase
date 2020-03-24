import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {from, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-let-parent03',
  template: `
    <h2>Let Directive 03
    <small>Multiple single-shot observables bound by multiple ngrxLet as input binding with as syntax</small>
    </h2>
    <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
    <br/>
    <button (click)="btnClick.next()">increment</button>
    <ng-container *ngrxLet="value1$ as v">
        Value1: {{v}}
    </ng-container>
    <ng-container *ngrxLet="value2$ as v">
        Value2: {{v}}
    </ng-container>
    <ng-container *ngrxLet="value3$ as v">
        Value3: {{v}}
    </ng-container>
  `,
  changeDetection: environment.changeDetection
})
export class LetParent03Component {

  btnClick = new Subject<Event>();
  value1$: Observable<number> = this.btnClick.pipe(startWith(0), scan((a): any => ++a, 0));
  value2$: Observable<number> = this.btnClick.pipe(startWith(0), scan((a): any => ++a, 0));
  value3$: Observable<number> = this.btnClick.pipe(startWith(0), scan((a): any => ++a, 0));
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
