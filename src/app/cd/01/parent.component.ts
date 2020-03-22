import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-cd-parent01',
    template: `
        <h2>ChangeDetection 01
            <small>detectChange renders it self and all children with changeDetection Default</small>
        </h2>
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <br/>
        <button (click)="increment()">increment</button>
        <app-cd-child01-default [value]="value"></app-cd-child01-default>
        <app-cd-child01-push [value]="value"></app-cd-child01-push>
    `,
    changeDetection: environment.changeDetection
})
export class CdParent01Component {

    value = 0;
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    increment() {
        this.value = this.value++;
    }

    constructor() {

    }

}
