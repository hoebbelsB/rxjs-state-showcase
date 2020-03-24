import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CdConfig, CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-cd02-child01',
    template: `
        <h3>ChangeDetection Child 01</h3>
        <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
        Passed input binding: {{ value$ | ngrxPush: cfg }} <!-- -->
    `,
    changeDetection: environment.changeDetection
})
export class Cd02Child01Component {

    @Input('value') value$: Observable<number>;

    @Output('output') output$ = interval(2500);

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    readonly cfg: CdConfig = this.cdConfigService.getConfig();

    constructor(
        private cdConfigService: CdConfigService
    ) {}

}
