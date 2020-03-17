import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-push-parent12',
    template: `
        <h2>Push Parent 12
            <small>one single-shot observable passed directly to input binding rendered over ngrxPush</small>
        </h2>
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->

        <br/>
        <app-push-child12 [value]="value1$">
        </app-push-child12>
    `,
    changeDetection: environment.changeDetection
})
export class Parent12Component implements OnInit {
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;

    constructor() {
    }

    ngOnInit(): void {
        // markDirty(this);
    }


    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
