import {ChangeDetectionStrategy, Component, ɵmarkDirty} from '@angular/core';

import {defer} from 'rxjs';
import {BaseComponent} from '../../base.component.ts/base.component';
import {tap} from 'rxjs/operators';
import {fromEvent} from '@zoneless-helpers';

@Component({
    selector: 'app-cd-parent03',
    template: `
        <h2>ChangeDetection 03
            <small>ɵmarkDirty when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b>
        <button id="app-cd-parent03-btn">ɵmarkDirty</button>
        <app-cd03-child01-default></app-cd03-child01-default>
        <app-cd03-child02-push></app-cd03-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent03Component extends BaseComponent {

    btnClick$ = defer(() => fromEvent(this.button(), 'click'));

    baseEffects$ = this.btnClick$.pipe(tap(() => this.markDirty()));

    button() {
        return document.getElementById('app-cd-parent03-btn');
    }

    markDirty() {
        ɵmarkDirty(this);
    }
}
