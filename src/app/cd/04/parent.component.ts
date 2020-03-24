import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import {defer, fromEvent} from 'rxjs';

@Component({
    selector: 'app-cd-parent04',
    template: `
        <h2>ChangeDetection 04
            <small>ChangeDetectorRef#markForCheck when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <button #button>ChangeDetectorRef#markForCheck</button>
        <app-cd04-child01-default></app-cd04-child01-default>
        <app-cd04-child02-push></app-cd04-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent04Component implements AfterViewInit {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    markForCheck() {
        this.cdRef.markForCheck();
    }

    ngAfterViewInit() {
        this.btnClick$.subscribe(() => this.markForCheck());
    }

    constructor(private cdRef: ChangeDetectorRef) {

    }

}
