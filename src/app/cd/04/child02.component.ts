import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-cd04-child02-push',
    template: `
        <h3>ChangeDetection Child 02</h3>
        ChangeDetectionStrategy: OnPush<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>: strategy
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0402Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
