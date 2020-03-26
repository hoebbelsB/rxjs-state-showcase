import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, fromEvent, Observable, Subject} from 'rxjs';
import {scan, startWith, switchMap, switchMapTo, tap} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
  selector: 'app-push-parent02',
  template: `
    <h2>Push Pipe 02
        <small>one single-shot observable bound by multiple ngrxPush as template expression</small>
    </h2>
    <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b>
    <br/>
    <button #button>increment</button>
    <!-- -->
    Value1: {{value1$ | ngrxPush: strategy}}
    Value1: {{value1$ | ngrxPush: strategy}}
    Value1: {{value1$ | ngrxPush: strategy}}
    <br/>
  `,
  changeDetection: environment.changeDetection
})
export class Parent02Component implements AfterViewInit {
    afterInit$ = new Subject();
@ViewChild('button') button: ElementRef<HTMLButtonElement>;


  value1$: Observable<number> = this.afterInit$.pipe(
      switchMap(() => fromEvent(this.button.nativeElement, 'click')),
      startWith(0), scan((a): any => ++a, 0)
  );
  numRenderings = 0;

    get strategy() {
        return this.coalesceConfigService.getConfig('strategy');
    }

    constructor(
        private coalesceConfigService: CdConfigService,
        private cdRef: ChangeDetectorRef
    ) {
    }

  getNumOfRenderings() {
    return ++this.numRenderings;
  }

  ngAfterViewInit(): void {
    this.afterInit$.next(true);
  }
}
