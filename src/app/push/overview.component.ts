import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-push-overview',
    template: `
        <div class="push-cases">
            <app-push-parent01 class="item"></app-push-parent01>
            <app-push-parent02 class="item"></app-push-parent02>
            <app-push-parent03 class="item"></app-push-parent03>
            <app-push-parent04 class="item"></app-push-parent04>
            <app-push-parent11 class="item"></app-push-parent11>
            <app-push-parent12 class="item"></app-push-parent12>
            <app-push-parent13 class="item"></app-push-parent13>
            <app-push-parent14 class="item"></app-push-parent14>
        </div>
    `,
    changeDetection: environment.changeDetection,
    styles: [`
        .push-cases {
            display: flex;
            flex-wrap: wrap;
        }
        .item {
            width: 50%;
        }
    `]
})
export class ParentOverviewComponent implements OnInit {
    btnClick = new Subject<Event>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value2$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));
    value3$: Observable<number> = this.btnClick.pipe(
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
