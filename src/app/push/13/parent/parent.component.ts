import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-push-parent13',
  template: `
      <h2>Push Pipe 13
          <small>one single-shot observable bound by multiple ngrxPush as input binding</small>
      </h2>
      <b>Number of renderings: {{getNumOfRenderings()}}</b>
      <br/>
      <button (click)="btnClick.next()">increment</button>
      <!-- -->
      <br/>
      <app-push-child13 [value]="value1$ | ngrxPush">
      </app-push-child13>
      <app-push-child13 [value]="value1$ | ngrxPush">
      </app-push-child13>
      <app-push-child13 [value]="value1$ | ngrxPush">
      </app-push-child13>
  `,
  changeDetection: environment.changeDetection
})
export class Parent13Component implements OnInit {
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
