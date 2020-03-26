import {
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    ɵdetectChanges
} from '@angular/core';
import {environment} from '../environments/environment';
import {getChangeDetectionHandler, hasZone, isIvy} from '../../projects/component/src/core/utils';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {CdConfigService} from './cd-config.service';
import {FormBuilder} from '@angular/forms';
import {defer, fromEvent, merge, Observable} from 'rxjs';
import {startWith, tap} from 'rxjs/operators';
import {State} from '@rx-state/rxjs-state';

@Component({
    selector: 'app-config-panel',
    template: `
        <mat-expansion-panel class="mat-background-primary config-panel"
                             [expanded]="expanded">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    {{zoneEnv}} - {{engine}} - {{changeDetection}}:
                </mat-panel-title>
                <mat-panel-description>
                    <mat-chip-list class="config-display">
                        <mat-chip>{{renderTechnique}}</mat-chip>
                        <mat-chip>{{strategy()}}</mat-chip>
                    </mat-chip-list>
                </mat-panel-description>
            </mat-expansion-panel-header>

            <form [formGroup]="configForm">
                <select formControlName="strategy"
                        id="strategy">
                    <option [value]="strategy"
                            *ngFor="let strategy of [
                            undefined,
                            'idle',
                            'pessimistic1',
                            'pessimistic2',
                            'optimistic1',
                            'optimistic2'
                            ]">
                        {{strategy}}
                    </option>
                </select>
                <label for="strategy"> Optimize coalescing</label>
            </form>
            <button id="btnAppTick" mat-raised-button>ApplicationRef.tick()</button>
            <button id="btnDetectChanges" mat-raised-button>ɵdetectChanges(appRef)</button>
        </mat-expansion-panel>
    `,
    styles: [`
        .config-panel {
            background: #c2185b;
        }

        .config-display .mat-chip {
            background: transparent;
            font-weight: normal;
        }
    `],
    changeDetection: environment.changeDetection
})
export class ConfigPanelComponent extends State<{
    expanded: boolean
}> implements AfterViewInit {

    detectChangeClick$ = defer(() => fromEvent(document.getElementById('btnDetectChanges'), 'click'));

    expanded = false;
    @Input()
    appComponentRef;

    readonly env = environment;
    readonly hasZone = hasZone(this.ngZone);
    readonly zoneEnv = hasZone(this.ngZone) ? 'NgZone' : 'NgNoopZone';
    readonly changeDetection = 'cd.' + (this.env.changeDetection === 1 ? 'Default' : 'OnPush');
    readonly engine = isIvy() ? 'Ivy' : 'ViewEngine';
    readonly renderTechnique = (this.engine ? 'ɵ' : 'cdRef.') + getChangeDetectionHandler(this.ngZone, this.cdRef).name;

    readonly configForm = this.fb.group({
        strategy: ['pessimistic1']
    });
    readonly configForm$: Observable<{ strategy: string }> = this.configForm.valueChanges.pipe(startWith(this.configForm.value));
    strategy = () => this.coalesceConfigService.getConfig('strategy');


    constructor(
        private fb: FormBuilder,
        private breakPointObserver: BreakpointObserver,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private appRef: ApplicationRef,
        private ngZone: NgZone,
        public coalesceConfigService: CdConfigService
    ) {
        super();
        this.setState({expanded: true});
        this.coalesceConfigService.connect(this.configForm$.pipe(tap(() => appRef.tick())));

    }

    detectChanges() {
        ɵdetectChanges(this.appComponentRef);
    }

    tick() {
        console.log('appRef.tick()');
        this.appRef.tick();
    }

    ngAfterViewInit(): void {
        merge(
            fromEvent(document.getElementById('btnAppTick'), 'click').pipe(tap(() => this.tick())),
            this.detectChangeClick$.pipe(tap(() => this.detectChanges()))
        ).subscribe();
    }
}
