import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-push-child14',
    template: `
        <h3>Push Pipe Child 14</h3>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b><br/>
        Passed input binding: {{value}} <!-- -->
    `,
    changeDetection: environment.changeDetection
})
export class Child14Component {
    @Input()
    value;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
