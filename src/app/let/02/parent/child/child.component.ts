import {Component, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-let-child02',
  template: `
    <h3>Let Child</h3>
    <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
    <ng-container *ngrxLet="value$ as value">
      Passed input binding: {{value}}
    </ng-container>
  `,
  changeDetection: environment.changeDetection
})
export class LetChild02Component {

  value$ = new ReplaySubject<number>(1);
  @Input()
  set value(value: number) {
    this.value$.next(value);
  }

  numRenderings = 0;
  getNumOfRenderings() {
    return ++this.numRenderings;
  }

}
