import {ApplicationRef, ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {environment} from '../environments/environment';
import {getChangeDetectionHandler, hasZone, isIvy} from '../../projects/component/src/core/utils';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {CdConfigService} from './cd-config.service';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';

@Component({
    selector: 'app-config-panel',
    template: `
        <mat-expansion-panel class="mat-background-primary config-panel">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    {{zoneEnv}} {{engine}}
                </mat-panel-title>
                <mat-panel-description>
                    <mat-chip-list class="config-display">
                        <mat-chip>{{renderTechnique}}</mat-chip>
                        <mat-chip>{{changeDetection}}</mat-chip>
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
export class ConfigPanelComponent {
    readonly env = environment;
    readonly hasZone = hasZone(this.ngZone);
    readonly zoneEnv   = hasZone(this.ngZone) ? 'ZoneFull' : 'ZoneLess';
    readonly changeDetection = 'cDS.' + (this.env.changeDetection === 1 ? 'Default' : 'OnPush');
    readonly engine = isIvy() ? 'Ivy' : 'ViewEngine' ;
    readonly renderTechnique = (this.engine ? 'ɵ' : 'cdRef.') + getChangeDetectionHandler(this.ngZone, this.cdRef).name;

    readonly configForm = this.fb.group({
        optimized: [true]
    });
    readonly configForm$: Observable<{optimized: boolean}> = this.configForm.valueChanges.pipe(startWith(this.configForm.value));

    constructor(
        private fb: FormBuilder,
        private breakPointObserver: BreakpointObserver,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private appRef: ApplicationRef,
        private ngZone: NgZone,
        public coalesceConfigService: CdConfigService
    ) {

        this.coalesceConfigService.connect(this.configForm$);
    }
}
