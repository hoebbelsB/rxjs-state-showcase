import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import {switchAll} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
  selector: 'app-push-child12',
  template: `
    <h3>Push Child 12</h3>
    <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
    <span>strategy: </span><b class="strategy">{{strategy}}</b><br/>
    Passed input binding: {{value1$ | ngrxPush: strategy }} <!-- -->
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

  get strategy() {
        return this.coalesceConfigService.getConfig('strategy') || 'idle';
    }

  constructor(
      private coalesceConfigService: CdConfigService
  ) {
  }

}
