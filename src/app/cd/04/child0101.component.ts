import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-cd04-child0101-push',
    template: `
        <h3>ChangeDetection Child 01 01</h3>
        ChangeDetectionStrategy: OnPush<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b><br/>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child040101Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
