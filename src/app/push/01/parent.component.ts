import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, fromEvent, NEVER, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-push-parent01',
    template: `
        <h2>
            Push Pipe 01
            <small>one single-shot observable bound by one ngrxPush as template expression</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b>
        <br/>
        <button #button>increment</button>
        <!-- -->
        <br/>
        Value1: {{value1$ | ngrxPush: strategy }}
    `,
    changeDetection: environment.changeDetection
})
export class Parent01Component implements AfterViewInit {

    @ViewChild('button') button: ElementRef<HTMLButtonElement>;

    numRenderings = 0;
    value1$: Observable<number> = NEVER;

    get strategy() {
        return this.coalesceConfigService.getConfig('strategy') as any;
    }
    constructor(
        private coalesceConfigService: CdConfigService
    ) {
    }
    getNumOfRenderings() {
        return ++this.numRenderings;
    }
    ngAfterViewInit(): void {
       this.value1$ = fromEvent(this.button.nativeElement, 'click').pipe(
           startWith(0), scan((a): any => ++a, 0));
    }

}
