import {Component, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import {switchAll} from 'rxjs/operators';

@Component({
  selector: 'app-push-child02',
  template: `
    <h3>Push Child 02</h3>
    <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
    Passed input binding: {{value$ | ngrxPush}} <!-- -->
  `,
  changeDetection: environment.changeDetection
})
export class Child02Component {

  valueSubject = new ReplaySubject<Observable<number>>(1);
  @Input()
  set value(value$: Observable<number>) {
    console.log('new parent value', value$);
    this.valueSubject.next(value$);
  }
  value$ = this.valueSubject.pipe(
   switchAll()
  );

  numRenderings = 0;
  getNumOfRenderings() {
    return ++this.numRenderings;
  }

}
