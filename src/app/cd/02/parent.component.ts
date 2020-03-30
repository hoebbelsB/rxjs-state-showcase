import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {defer} from 'rxjs';
import {BaseComponent} from '../../base.component.ts/base.component';
import {tap} from 'rxjs/operators';
import {fromEvent} from '@zoneless-helpers';

@Component({
    selector: 'app-cd-parent02',
    template: `
        <h2>ChangeDetection 02
            <small>ChangeDetectorRef#detectChanges when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b>
        <button id="app-cd-parent02-btn">ChangeDetectorRef#detectChanges</button>
        <app-cd02-child01-default></app-cd02-child01-default>
        <app-cd02-child02-push></app-cd02-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent02Component extends BaseComponent {

    btnClick$ = defer(() => fromEvent(this.button(), 'click'));

    baseEffects$ = this.btnClick$.pipe(
        tap(() => this.detectChanges())
    );

    constructor(private cdRef: ChangeDetectorRef) {
        super();
    }

    button() {
        return document.getElementById('app-cd-parent02-btn');
    }

    detectChanges() {
        this.cdRef.detectChanges();
    }

}
