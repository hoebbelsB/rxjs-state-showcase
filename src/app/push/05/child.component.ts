import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-push-child05',
    template: `
        <h3>Push Pipe Child 05</h3>
        <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
        Passed input binding: {{value}} <!-- -->
    `,
    changeDetection: environment.changeDetection
})
export class Child05Component {
    @Input()
    value;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
