import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {defer, fromEvent, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {CdConfigService} from '../../cd-config.service';

@Component({
    selector: 'app-push-parent12',
    template: `
        <h2>Push Pipe 12
            <small>one single-shot observable passed directly to input binding rendered over ngrxPush</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b>
        <br/>
        <button #button>increment</button>
        <!-- -->

        <br/>
        <app-push-child12 [value]="value1$">
        </app-push-child12>
    `,
    changeDetection: environment.changeDetection
})
export class Parent12Component implements AfterViewInit {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));
    numRenderings = 0;

    private readonly afterViewInit$ = new Subject<void>();

    value1$: Observable<number> = this.btnClick$.pipe(
        startWith(0), scan((a): any => ++a, 0));

    get strategy() {
        return this.coalesceConfigService.getConfig('strategy') || 'idle';
    }

    constructor(
        private coalesceConfigService: CdConfigService) {

    }

    ngAfterViewInit(): void {
        this.afterViewInit$.next();
    }


    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
