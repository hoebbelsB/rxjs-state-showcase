import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-push-parent11',
  template: `
    <h2>Push Pipe 11
    <small>one single-shot observable bound by one ngrxPush as input binding</small>
    </h2>
    <b>Number of renderings: {{getNumOfRenderings()}}</b>
    <br/>
    <button (click)="btnClick.next()">increment</button>
    <!-- -->
    <br/>
    <app-push-child11 [value]="value1$ | ngrxPush">
    </app-push-child11>
  `,
  changeDetection: environment.changeDetection
})
export class Parent11Component implements OnInit {
  btnClick = new Subject<Event>();

  value1$: Observable<number> = this.btnClick.pipe(
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
