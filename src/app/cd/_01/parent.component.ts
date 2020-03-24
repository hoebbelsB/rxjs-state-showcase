import {ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';
import {getChangeDetectionHandler, isIvy} from '../../../../projects/component/src/core/utils';

@Component({
    selector: 'app-cd-parent-01',
    template: `
        <h2>
            ChangeDetection Setup 01
            <small></small>
        </h2>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <!-- -->
        <br/>
        <button (click)="valueSubject.next()">
            increment
        </button>
        <button (click)="render()">
            {{renderMethodName}}
        </button>
        <br/>
        <!-- <app-cd-child01-01 [value]="value$ | ngrxPush"></app-cd-child01-01>
        <app-cd-child01-02 [value]="value$ | ngrxPush"></app-cd-child01-02>
        <app-cd-child01-03 [value]="value$ | ngrxPush"></app-cd-child01-03>
        -->
    `,
    changeDetection: environment.changeDetection
})
export class Parent_01Component {
    numRenderings = 0;
    readonly renderMethodName;

    valueSubject = new Subject();
    value$ = this.valueSubject.pipe(scan(num => ++num, 0));

    constructor(
        private ngZone: NgZone,
        private cdRef: ChangeDetectorRef
    ) {
        const ivy = isIvy();
        this.renderMethodName = (ivy ? 'ɵ' : 'cdRef.') + getChangeDetectionHandler(this.ngZone, this.cdRef).name;
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    render() {

    }
}
