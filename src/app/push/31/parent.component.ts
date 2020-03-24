import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, fromEvent, Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-push-parent31',
    template: `
        <h2>
            Push Pipe 31
            <small></small>
        </h2>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <br/>
        <button #button>increment</button>
        <!-- -->
        <br/>
        <insertion [template]="ref"></insertion>

        <ng-template #ref>
            <span>{{value1$ | ngrxPush: cfg}}</span>
        </ng-template>


    `,
    changeDetection: environment.changeDetection
})
export class Parent31Component {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

    value1$: Observable<number> = this.btnClick$.pipe(
        startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;

    cfg = this.coalesceConfigService.getConfig();

    constructor(
        private coalesceConfigService: CdConfigService
    ) {
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
