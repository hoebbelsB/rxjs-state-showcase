import {Component, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import {switchAll} from 'rxjs/operators';

@Component({
  selector: 'app-push-child13',
  template: `
    <h3>Push Pipe Child 13</h3>
    <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
    Passed input binding: {{value}} <!-- -->
  `,
  changeDetection: environment.changeDetection
})
export class Child13Component {
    @Input()
    value;

  numRenderings = 0;
  getNumOfRenderings() {
    return ++this.numRenderings;
  }

}
