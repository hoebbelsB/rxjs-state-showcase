import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-push-parent',
  template: `
    <h2>Push Parent</h2>
    <b>Number of renderings: {{getNumOfRenderings()}}</b>
    <br/>
    <button (click)="btnClick.next()">increment</button>
    <!-- -->

    <br/>
    <app-push-child [value]="value$ | ngrxPush">
    </app-push-child>
  `,
  changeDetection: environment.changeDetection
})
export class Parent01Component implements OnInit {
  btnClick = new Subject<Event>();

  value$: Observable<number> = this.btnClick.pipe(
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
