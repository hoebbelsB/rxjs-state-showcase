import {Component, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import {switchAll} from 'rxjs/operators';

@Component({
  selector: 'app-push-child',
  template: `
    <h3>Push Child</h3>
    <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
     Passed input binding: {{value$ | ngrxPush}} <!-- -->
  `,
  changeDetection: environment.changeDetection
})
export class Child01Component {

  valueSubject = new ReplaySubject<number>(1);
  @Input()
  set value(value: number) {
    console.log('new parent value', value);
    this.valueSubject.next(value);
  }
  value$ = this.valueSubject;

  numRenderings = 0;
  getNumOfRenderings() {
    return ++this.numRenderings;
  }

}
