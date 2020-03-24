import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-cd-child01-02',
    template: `
        <h3>ChangeDetection Child 02</h3>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b><br/>
        Passed input binding: {{value}} <!-- -->
    `,
    changeDetection: environment.changeDetection
})
export class Child0102Component {
    @Input()
    value;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
