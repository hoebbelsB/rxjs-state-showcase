import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-push-parent02',
  template: `
    <h2>Push Parent 02</h2>
    <b>Number of renderings: {{getNumOfRenderings()}}</b>
    <br/>
    <button (click)="btnClick.next()">increment</button>
    <!-- -->

    <br/>
    <app-push-child02 [value]="value$">
    </app-push-child02>
  `,
  changeDetection: environment.changeDetection
})
export class Parent02Component implements OnInit {
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
