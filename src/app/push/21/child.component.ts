import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import { CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-push-child21',
    template: `
        <h3>Push Pipe Child 21</h3>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b><br/>
        Passed input binding: {{value1$ | ngrxPush: strategy}} <!-- -->
    `,
    changeDetection: environment.changeDetection
})
export class Child21Component {
    value1Subject = new ReplaySubject<Observable<number>>(1);

    @Input()
    set value(value$: Observable<number>) {
        this.value1Subject.next(value$);
    }

    value1$ = this.value1Subject.pipe();


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

}
