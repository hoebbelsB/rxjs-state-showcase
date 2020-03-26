import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {fromEvent, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-push-parent03',
    template: `
        <h2>Push Pipe 03
            <small>multiple single-shot observables bound by multiple ngrxPush as template expression</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b>
        <br/>
        <button  #button>increment</button>
        <!-- -->
        Value1: {{value1$ | ngrxPush: strategy}}
        Value2: {{value2$ | ngrxPush: strategy}}
        Value3: {{value3$ | ngrxPush: strategy}}
    `,
    changeDetection: environment.changeDetection
})
export class Parent03Component  implements AfterViewInit {
    afterInit$ = new Subject();
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value2$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value3$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;

    get strategy() {
        return this.coalesceConfigService.getConfig('strategy');
    }

    constructor(
        private coalesceConfigService: CdConfigService
    ) {
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    ngAfterViewInit(): void {
        fromEvent(this.button.nativeElement, 'click')
            .pipe();
    }
}
