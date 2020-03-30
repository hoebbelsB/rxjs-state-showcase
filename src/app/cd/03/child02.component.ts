import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from '../../base.component.ts/base.component';

@Component({
    selector: 'app-cd03-child02-push',
    template: `
        <h3>ChangeDetection Child 02</h3>
        ChangeDetectionStrategy: OnPush<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0302Component extends BaseComponent {

}
