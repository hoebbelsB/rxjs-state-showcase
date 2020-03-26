import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, ɵdetectChanges} from '@angular/core';
import {defer, fromEvent} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-cd-parent11',
    template: `
        <h2>ChangeDetection 11
            <small>ViewChild triggers zone</small>
        </h2>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <button #button>Click over ViewChild</button>
    `,
    changeDetection: environment.changeDetection
})
export class CdParent11Component implements AfterViewInit {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    ngAfterViewInit() {
        this.btnClick$.subscribe(() => console.log('click over ViewChild'));
    }

}
