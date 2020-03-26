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
    selector: 'app-cd-parent05',
    template: `
        <h2>ChangeDetection 05
            <small>scheduleDetectChanges when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        @TODO
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent05Component implements AfterViewInit {

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    markForCheck() {
        this.cdRef.markForCheck();
    }

    ngAfterViewInit() {

    }

    constructor(private cdRef: ChangeDetectorRef) {

    }

}
