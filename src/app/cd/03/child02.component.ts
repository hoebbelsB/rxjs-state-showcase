import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-cd03-child02-push',
    template: `
        <h3>ChangeDetection Child 02</h3>
        ChangeDetectionStrategy: Push<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0302Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
