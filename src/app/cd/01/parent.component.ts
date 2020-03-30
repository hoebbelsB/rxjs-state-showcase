import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
    ɵdetectChanges
} from '@angular/core';
import {defer} from 'rxjs';
import {fromEvent} from '@zoneless-helpers';

@Component({
    selector: 'app-cd-parent01',
    template: `
        <h2>ChangeDetection 01
            <small>ɵdetectChanges when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <button id="button">ɵdetectChanges</button>
        <app-cd01-child01-default></app-cd01-child01-default>
        <app-cd01-child02-push></app-cd01-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent01Component implements AfterViewInit, OnDestroy {

    sub;
    btnClick$ = defer(() => fromEvent(this.button(), 'click'));

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }
    button = () => document.getElementById('button');

    ngAfterViewInit() {
        this.detectChanges();
        this.sub = this.btnClick$.subscribe(() => this.detectChanges());
    }

    detectChanges() {
        console.log('run ɵdetectChanges');
        ɵdetectChanges(this);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
