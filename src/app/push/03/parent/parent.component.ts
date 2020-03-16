import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-push-parent03',
  template: `
    <h2>Push Parent 03</h2>
    <b>Number of renderings: {{getNumOfRenderings()}}</b>
    <br/>
    <button (click)="btnClick.next()">increment</button>
    <!-- -->

    <br/>
    Value: {{value$ | ngrxPush}}Value: {{value$ | ngrxPush}}Value: {{value$ | ngrxPush}}
  `,
  changeDetection: environment.changeDetection
})
export class Parent03Component implements OnInit {
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
