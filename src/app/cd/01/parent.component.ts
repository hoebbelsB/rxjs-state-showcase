import {ChangeDetectionStrategy, Component, ɵdetectChanges} from '@angular/core';
import {fromEvent} from '@zoneless-helpers';
import {BaseComponent} from '../../base.component.ts/base.component';
import {tap} from 'rxjs/operators';
import {defer} from 'rxjs';

@Component({
    selector: 'app-cd-parent01',
    template: `
        <h2>ChangeDetection 01
            <small>ɵdetectChanges when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <button id="app-cd-parent01-btn">ɵdetectChanges</button>
        <app-cd01-child01-default></app-cd01-child01-default>
        <app-cd01-child02-push></app-cd01-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent01Component extends BaseComponent {

    btnClick$ = defer(() => fromEvent(this.button(), 'click'));

    baseEffects$ = this.btnClick$.pipe(
        tap(() => this.detectChanges())
    );

    button() {
        return document.getElementById('app-cd-parent01-btn');
    }

    detectChanges() {
        console.log('run ɵdetectChanges', this);
        ɵdetectChanges(this);
    }

}
