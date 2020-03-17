import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-push-parent02',
  template: `
    <h2>Push Pipe 02
        <small>one single-shot observable bound by multiple ngrxPush as template expression</small>
    </h2>
    <b>Number of renderings: {{getNumOfRenderings()}}</b>
    <br/>
    <button (click)="btnClick.next()">increment</button>
    <!-- -->
    Value1: {{value1$ | ngrxPush}}
    Value1: {{value1$ | ngrxPush}}
    Value1: {{value1$ | ngrxPush}}
    <br/>
  `,
  changeDetection: environment.changeDetection
})
export class Parent02Component {
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