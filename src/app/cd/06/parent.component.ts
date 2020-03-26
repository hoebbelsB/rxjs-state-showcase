import {
    AfterViewInit, ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import {defer, fromEvent} from 'rxjs';

@Component({
    selector: 'app-cd-parent06',
    template: `
        <h2>ChangeDetection 06
            <small>ApplicationRef#tick when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>: strategy
        <button #button>ApplicationRef#tick</button>
        <app-cd06-child01-default></app-cd06-child01-default>
        <app-cd06-child02-push></app-cd06-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent06Component implements AfterViewInit {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    tick() {
        this.appRef.tick();
    }

    ngAfterViewInit() {
        this.btnClick$.subscribe(() => this.tick());
    }

    constructor(private appRef: ApplicationRef) {

    }

}
