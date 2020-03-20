import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-push-parent31',
    template: `
        <h2>
            Push Pipe 31
            <small></small>
        </h2>
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <br/>
        <button (click)="btnClick.next()">increment</button>
        <!-- -->
        <br/>
        <insertion [template]="ref"></insertion>

        <ng-template #ref>
            <span>{{value1$ | ngrxPush}}</span>
        </ng-template>


    `,
    changeDetection: environment.changeDetection
})
export class Parent31Component {
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    numRenderings = 0;

    constructor() {
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
