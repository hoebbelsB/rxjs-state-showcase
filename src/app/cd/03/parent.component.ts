import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, ɵmarkDirty} from '@angular/core';
import {defer, fromEvent} from 'rxjs';

@Component({
    selector: 'app-cd-parent03',
    template: `
        <h2>ChangeDetection 03
            <small>ɵmarkDirty when called in the component renders itself and all child components
                with cd.Default</small>
        </h2>
        ChangeDetectionStrategy: Default<br>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b>
        <button #button>ɵmarkDirty</button>
        <app-cd03-child01-default></app-cd03-child01-default>
        <app-cd03-child02-push></app-cd03-child02-push>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent03Component  implements AfterViewInit {

    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    markDirty() {
        ɵmarkDirty(this);
    }

    ngAfterViewInit() {
        this.btnClick$.subscribe(() => this.markDirty());
    }

}
