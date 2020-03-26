import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, from, fromEvent, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import {CdConfigService} from '../../cd-config.service';

@Component({
    selector: 'app-let-parent02',
    template: `
        <h2>Let Directive 02
            <small>One single-shot observables bound by multiple ngrxLet as input binding with as syntax</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b>
        <br/>
        <button #button>increment</button>
        <ng-container *ngrxLet="value1$ as v">Value1: {{v}}</ng-container>
        <ng-container *ngrxLet="value1$ as v">Value1: {{v}}</ng-container>
        <ng-container *ngrxLet="value1$ as v">Value1: {{v}}</ng-container>
    `,
    changeDetection: environment.changeDetection
})
export class LetParent02Component  implements AfterViewInit {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

    value1$: Observable<number>;
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    get strategy() {
        return this.coalesceConfigService.getConfig('strategy');
    }

    constructor(
        private coalesceConfigService: CdConfigService
    ) {

    }

    ngAfterViewInit(): void {
        this.value1$ = this.btnClick$.pipe(startWith(0), scan((a): any => ++a, 0));
    }

}
