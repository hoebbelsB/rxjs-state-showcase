import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-cd-child01-push',
    template: `
        <h3>ChangeDetection Child 02</h3>
        ChangeDetectionStrategy: Push<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b><br/>
        Passed input binding: {{value}} <!-- -->
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child0102Component {
    @Input()
    value;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
