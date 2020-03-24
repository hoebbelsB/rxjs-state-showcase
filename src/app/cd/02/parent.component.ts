import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ɵdetectChanges} from '@angular/core';

@Component({
    selector: 'app-cd-parent02',
    template: `
        <h2>ChangeDetection 02
            <small>ChangeDetectorRef#detectChanges when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <button (click)="detectChanges()">ChangeDetectorRef#detectChanges</button>
        <app-cd02-child01-default></app-cd02-child01-default>
        <app-cd02-child02-push></app-cd02-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent02Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    detectChanges() {
        this.cdRef.detectChanges();
    }

    constructor(private cdRef: ChangeDetectorRef) {

    }

}
