import {ChangeDetectorRef, Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {scan, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-cd-parent01',
    template: `
        <h2>
            ChangeDetection Setup 01
            <small></small>
        </h2>
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <!-- -->
        <br/>
    `,
    changeDetection: environment.changeDetection
})
export class Parent01Component {
    numRenderings = 0;

    constructor(private cdRef: ChangeDetectorRef) {
        console.log(this.cdRef);
    }

    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
