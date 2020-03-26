import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, fromEvent, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import {CdConfigService} from '../../cd-config.service';

@Component({
    selector: 'app-let-parent01',
    template: `
        <h2>Let Directive 01
            <small>One single-shot observable bound by one ngrxLet as input binding with as syntax</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>: strategy
        <br/>
        <button #button>increment</button>
        <ng-container *ngrxLet="value$ as v">Value: {{v}}</ng-container>
    `,
    changeDetection: environment.changeDetection
})
export class LetParent01Component implements AfterViewInit {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

    btnClick = new Subject<Event>();
    value$: Observable<number>;
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
        this.value$ = this.btnClick$.pipe(startWith(0), scan((a): any => ++a, 0));
    }

}
