import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-push-child13',
    template: `
        <h3>Push Pipe Child 13</h3>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        Passed input binding: {{value}} <!-- -->
    `,
    changeDetection: environment.changeDetection
})
export class Child13Component {
    @Input()
    value;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
