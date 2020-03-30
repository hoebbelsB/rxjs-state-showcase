import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from '../../base.component.ts/base.component';

@Component({
    selector: 'app-cd02-child0101-push',
    template: `
        <h3>ChangeDetection Child 01 01</h3>
        ChangeDetectionStrategy: OnPush<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child020101Component extends BaseComponent {

}
