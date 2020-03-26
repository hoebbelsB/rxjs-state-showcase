import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-cd02-child02-push',
    template: `
        <h3>ChangeDetection Child 02</h3>
        ChangeDetectionStrategy: OnPush<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0202Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
