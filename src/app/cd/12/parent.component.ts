import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {defer, fromEvent} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-cd-parent12',
    template: `
        <h2>ChangeDetection 12
            <small>Observable subscription triggers zone</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <button id="btn-cd12">Click over document.getElementById</button>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class CdParent12Component implements AfterViewInit {
    btnClick$ = defer(() => fromEvent(document.getElementById('btn-cd12'), 'click'));

    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    ngAfterViewInit() {
        this.btnClick$
            .pipe(tap(v => console.log(v)))
            .subscribe(() => console.log('click over document.getElementById'));
    }

}
