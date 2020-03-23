import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { outsideZone } from '@rx-state/ngx-state';
import { fromEvent, Observable, Subject } from 'rxjs';
import { scan, startWith, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-push-parent12',
    template: `
        <h2>Push Pipe 12
            <small>one single-shot observable passed directly to input binding rendered over ngrxPush</small>
        </h2>
        <b>Number of renderings: {{getNumOfRenderings()}}</b>
        <br/>
        <button (click)="btnClick.next()" #button>increment</button>
        <!-- -->

        <br/>
        <app-push-child12 [value]="value1$">
        </app-push-child12>
    `,
    changeDetection: environment.changeDetection
})
export class Parent12Component implements OnInit, AfterViewInit {

    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick = new Subject<Event>();
    numRenderings = 0;

    private readonly afterViewInit$ = new Subject<void>();

    value1$: Observable<number> = this.btnClick.pipe(
        startWith(0), scan((a): any => ++a, 0));

   /* value1$: Observable<number> = this.afterViewInit$.pipe(
         // outsideZone(this.ngZone),
         switchMap(() => fromEvent(this.button.nativeElement, 'click')),
         startWith(0),
         scan((a): any => ++a, 0)
     );*/

    constructor(
        private ngZone: NgZone
    ) {

    }

    ngOnInit(): void {
        // markDirty(this);
    }

    ngAfterViewInit(): void {
        this.afterViewInit$.next();
    }


    getNumOfRenderings() {
        return ++this.numRenderings;
    }
}
