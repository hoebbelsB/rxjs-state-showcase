import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {from, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-let-parent',
  template: `
    <h2>Let Parent</h2>
    <b>Number of renderings: {{getNumOfRenderings()}}</b>
    <br/>
    <button (click)="btnClick.next()">increment</button>
    <ng-container *ngrxLet="value$ as v">Value: {{v}}</ng-container>
  `,
  changeDetection: environment.changeDetection
})
export class LetParentComponent {

  btnClick = new Subject<Event>();
  value$: Observable<number> = this.btnClick.pipe(startWith(0), scan((a): any => ++a, 0));
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
