import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-cd03-child01-default',
    template: `
        <h3>ChangeDetection Child 01</h3>
        ChangeDetectionStrategy: Default<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b><br/>
        <app-cd03-child0101-push></app-cd03-child0101-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class Child0301Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
