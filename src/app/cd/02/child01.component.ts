import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-cd02-child01-default',
    template: `
        <h3>ChangeDetection Child 01</h3>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <app-cd02-child0101-push></app-cd02-child0101-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class Child0201Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
