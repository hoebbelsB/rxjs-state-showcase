import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, ɵdetectChanges} from '@angular/core';
import {defer, fromEvent} from 'rxjs';

@Component({
    selector: 'app-cd-parent01',
    template: `
        <h2>ChangeDetection 01
            <small>ɵdetectChanges when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <button #button>ɵdetectChanges</button>
        <app-cd01-child01-default></app-cd01-child01-default>
        <app-cd01-child02-push></app-cd01-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent01Component implements AfterViewInit {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    ngAfterViewInit() {
        this.btnClick$.subscribe(() => this.detectChanges());
    }

    detectChanges() {
        ɵdetectChanges(this);
    }

}
