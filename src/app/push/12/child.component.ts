import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import {switchAll} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
  selector: 'app-push-child12',
  template: `
    <h3>Push Child 12</h3>
    <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
    Passed input binding: {{value1$ | ngrxPush: cfg }} <!-- -->
  `,
  changeDetection: environment.changeDetection
})
export class Child12Component {

  valueSubject = new ReplaySubject<Observable<number>>(1);
  @Input()
  set value(value$: Observable<number>) {
    this.valueSubject.next(value$);
  }
  value1$ = this.valueSubject.pipe(
   switchAll()
  );

  numRenderings = 0;
  getNumOfRenderings() {
    return ++this.numRenderings;
  }

  cfg = this.coalesceConfigService.getConfig();

  constructor(
      private coalesceConfigService: CdConfigService
  ) {
  }

}
