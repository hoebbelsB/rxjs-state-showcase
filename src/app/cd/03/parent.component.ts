import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ɵmarkDirty} from '@angular/core';

@Component({
    selector: 'app-cd-parent03',
    template: `
        <h2>ChangeDetection 03
            <small>ɵmarkDirty when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <button (click)="markDirty()">ɵmarkDirty</button>
        <app-cd03-child01-default></app-cd03-child01-default>
        <app-cd03-child02-push></app-cd03-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent03Component {
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    markDirty() {
        ɵmarkDirty(this);
    }

}
