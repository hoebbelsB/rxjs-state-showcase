import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-cd01-child0101-push',
    template: `
        <h3>ChangeDetection Child 01 01</h3>
        ChangeDetectionStrategy: OnPush<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child010101Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
