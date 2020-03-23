import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {ApplicationRef, ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { RxGlobalState, RxState } from '@rx-state/ngx-state';
import {Subject} from 'rxjs';
import {filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {getChangeDetectionHandler, hasZone, isIvy} from '../../projects/component/src/core/utils';
import {environment} from '../environments/environment';
import {MenuItem} from '@navigation';
import {MENU_ITEMS} from './app.menu';
import { CdConfigService } from './cd-config.service';

export interface AppState {
    navOpen: boolean;
    mobile: boolean;
    menuItems: MenuItem[];
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends RxState<AppState> {
    readonly env = environment;
    readonly hasZone = hasZone(this.ngZone);
    readonly ivy = isIvy();
    readonly renderTechnique = (this.ivy ? 'ɵ' : 'cdRef.') + getChangeDetectionHandler(this.ngZone, this.cdRef).name;
    readonly toggleSidenav = new Subject<void>();
    readonly viewState$ = this.select();
    readonly toggleCoalesceConfig = new Subject<void>();
    readonly coalesceOptimized$ = this.coalesceConfigService.select('optimized');

    constructor(
        private breakPointObserver: BreakpointObserver,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private appRef: ApplicationRef,
        private ngZone: NgZone,
        public coalesceConfigService: CdConfigService
    ) {
        super();
        this.hold(
            this.toggleCoalesceConfig.pipe(withLatestFrom(this.coalesceOptimized$)),
            ([e, oldVal]) => this.coalesceConfigService.setState({ optimized: !oldVal })
        );
        this.hold(
            this.router.events
                .pipe(
                    filter(e => e instanceof NavigationEnd),
                    tap(e => this.appRef.tick())
                )
        );
        this.setState({
            mobile: false,
            navOpen: true,
            menuItems: MENU_ITEMS,
        });
        this.connect(
            'mobile',
            this.breakPointObserver.observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge
            ])
                .pipe(
                    map<BreakpointState, boolean>(breakpointState => {
                        return breakpointState.breakpoints[Breakpoints.XSmall];
                    })
                )
        );
        this.connect(
            'navOpen',
            this.toggleSidenav.asObservable()
                .pipe(
                    withLatestFrom(this.select('navOpen')),
                    map(([val1, val2]) => !val2)
                )
        );
    }
}
