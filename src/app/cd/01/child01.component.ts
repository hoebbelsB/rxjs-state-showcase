import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-cd-child01-default',
    template: `
        <h3>ChangeDetection Child 01</h3>
        ChangeDetectionStrategy: Default<br>
        <b>Number of renderings: {{getNumOfRenderings()}}</b><br/>
        Passed input binding: {{value}} <!-- -->
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class Child0101Component {
    @Input()
    value;

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

}
