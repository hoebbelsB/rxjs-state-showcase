import {Component, Input, TemplateRef} from '@angular/core';
import {environment} from '../../../environments/environment';
@Component({
    selector: 'insertion',
    template: `
        <h3>Push Pipe Child 31</h3>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b><br>
        Value: <ng-container [ngTemplateOutlet]="template"></ng-container>
    `,
    changeDetection: environment.changeDetection
})
export class Child31Component {
    @Input() template: TemplateRef<any>;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
