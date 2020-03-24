import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ɵdetectChanges} from '@angular/core';

@Component({
    selector: 'app-cd-parent04',
    template: `
        <h2>ChangeDetection 04
            <small>ChangeDetectorRef#markForCheck when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <button (click)="markForCheck()">ChangeDetectorRef#markForCheck</button>
        <app-cd04-child01-default></app-cd04-child01-default>
        <app-cd04-child02-push></app-cd04-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent04Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    markForCheck() {
        this.cdRef.markForCheck();
    }

    constructor(private cdRef: ChangeDetectorRef) {

    }

}
