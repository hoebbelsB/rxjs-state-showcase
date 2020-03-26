import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CdConfig, CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-cd02-child02',
    template: `
        <h3>ChangeDetection Child 02</h3>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b><br/>
        Passed input binding: {{ value$ | ngrxPush: strategy }}<br/> <!-- -->
        Passed input binding2: {{ value2 }}<br/> <!-- -->
    `,
    changeDetection: environment.changeDetection
})
export class Cd02Child02Component {

    @Input('value') value$: Observable<number>;
    @Input('value2') value2: number;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    readonly cfg: CdConfig = this.cdConfigService.getConfig();

    constructor(
        private cdConfigService: CdConfigService
    ) {}

}
