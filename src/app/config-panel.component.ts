import {ApplicationRef, ChangeDetectorRef, Component, Input, NgZone, ViewChild, ɵdetectChanges} from '@angular/core';
import {environment} from '../environments/environment';
import {getChangeDetectionHandler, hasZone, isIvy} from '../../projects/component/src/core/utils';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {CdConfigService} from './cd-config.service';
import {FormBuilder} from '@angular/forms';
import {fromEvent, merge, Observable} from 'rxjs';
import {startWith, tap} from 'rxjs/operators';
import {State} from '@rx-state/rxjs-state';

@Component({
    selector: 'app-config-panel',
    template: `
            <mat-expansion-panel class="mat-background-primary config-panel"
            [expanded]="true">
                <mat-expansion-panel-header>
                    <mat-panel-title>
                        {{zoneEnv}} - {{engine}} - {{changeDetection}}:
                    </mat-panel-title>
                    <mat-panel-description>
                        <mat-chip-list class="config-display">
                            <mat-chip>{{renderTechnique}}</mat-chip>
                            <mat-chip [disabled]="!(configForm$ | ngrxPush)?.optimized">coalescing</mat-chip>
                        </mat-chip-list>
                    </mat-panel-description>
                </mat-expansion-panel-header>

                <form [formGroup]="configForm">
                    <input formControlName="optimized"
                           id="coalesceOptimized"
                           type="checkbox">
                    <label for="coalesceOptimized"> Optimize coalescing</label>
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
export class ConfigPanelComponent extends State<{ expanded: boolean }> {

    vm$ = this.select();
    @Input()
    appComponentRef;

    @ViewChild('#btnAppTick')
    btnAppTick;

    readonly env = environment;
    readonly hasZone = hasZone(this.ngZone);
    readonly zoneEnv = hasZone(this.ngZone) ? 'NgZone' : 'NgNoopZone';
    readonly changeDetection = 'cd.' + (this.env.changeDetection === 1 ? 'Default' : 'OnPush');
    readonly engine = isIvy() ? 'Ivy' : 'ViewEngine';
    readonly renderTechnique = (this.engine ? 'ɵ' : 'cdRef.') + getChangeDetectionHandler(this.ngZone, this.cdRef).name;

    readonly configForm = this.fb.group({
        optimized: [true]
    });
    readonly configForm$: Observable<{ optimized: boolean }> = this.configForm.valueChanges.pipe(startWith(this.configForm.value));

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
        this.coalesceConfigService.connect(this.configForm$);

        const appTickClick$ = fromEvent(this.btnAppTick, 'click').pipe(tap(console.log));
        const detectChangeClick$ = fromEvent(document.getElementById('btnDetectChanges'), 'click');
        this.hold(
            merge(
                appTickClick$.pipe(tap(() => this.tick())),
                detectChangeClick$.pipe(tap(() => this.detectChanges()))
            )
        );

    }

    detectChanges() {
        ɵdetectChanges(this.appComponentRef);
    }

    tick() {
        this.appRef.tick();
    }
}
