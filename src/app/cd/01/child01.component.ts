import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from '../../base.component.ts/base.component';

@Component({
    selector: 'app-cd01-child01-default',
    template: `
        <h3>ChangeDetection Child 01</h3>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <app-cd01-child0101-push></app-cd01-child0101-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class Child0101Component  extends BaseComponent {

}
