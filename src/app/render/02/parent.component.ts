import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { scan, startWith, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CdConfig, CdConfigService } from '../../cd-config.service';

@Component({
    selector: 'app-cd-parent02',
    template: `
        <h2>ChangeDetection 02
            <small>detectChange renders it self and all children with changeDetection Default</small>
        </h2>
        <b>render: <span class="num-renders">{{getNumOfRenderings()}}</span></b>
        <br/>
        <b>Output handler: {{ outputHandler | ngrxPush: cfg }}</b>
        <br/>
        <button #button>increment</button>
        <br/>
        <br/>
        <app-cd02-child01 (output)="outputHandler.next($event)" [value]="value1$"></app-cd02-child01>
        <br/>
        <br/>
        <app-cd02-child02 [value2]="value1$ | ngrxPush: cfg"></app-cd02-child02>
    `,
    changeDetection: environment.changeDetection
})
export class RenderParent02Component implements AfterViewInit {

    @ViewChild('button') button: ElementRef<HTMLButtonElement>;

    private readonly afterViewInit$ = new Subject<void>();

    value1$: Observable<number> = this.afterViewInit$.pipe(
        // outsideZone(this.ngZone),
        switchMap(() => fromEvent(this.button.nativeElement, 'click')),
        startWith(0),
        scan((a): any => ++a, 0)
    );
    outputHandler = new Subject<number>();
    value = 0;
    numRenderings = 0;

    getNumOfRenderings() {
        return ++this.numRenderings;
    }

    increment() {
        this.value = this.value++;
    }

    readonly cfg: CdConfig = this.cdConfigService.getConfig();

    constructor(
        private cdConfigService: CdConfigService
    ) {}

    ngAfterViewInit(): void {
        this.afterViewInit$.next();
    }

}
