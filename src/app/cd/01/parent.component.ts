import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ɵdetectChanges} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-cd-parent01',
    template: `
        <h2>ChangeDetection 01
            <small>detectChange renders itself and all children with changeDetection Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <button (click)="detectChanges()">ɵdetectChanges</button>
        <app-cd-child01-default></app-cd-child01-default>
        <app-cd-child01-push></app-cd-child01-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent01Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    detectChanges() {
        ɵdetectChanges(this);
    }

    constructor(private cdRef: ChangeDetectorRef) {

    }

}
