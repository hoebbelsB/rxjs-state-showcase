import {Component, Input, TemplateRef} from '@angular/core';
import {environment} from '../../../environments/environment';
@Component({
    selector: 'insertion',
    template: `
        <h3>Push Pipe Child 31</h3>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <span>strategy: </span><b class="strategy">{{strategy}}</b><br>
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
