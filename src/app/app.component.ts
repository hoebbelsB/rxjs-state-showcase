import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {ApplicationRef, ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {State} from './state/state';
import {getChangeDetectionHandler, hasZone, isIvy} from '../../projects/component/src/core/utils';
import {environment} from '../environments/environment';
import {MenuItem} from '@navigation';
import {MENU_ITEMS as PERFORMANCE_MENU_ITEMS} from './performance/performance.menu';
import {MENU_ITEMS as PUSH_MENU_ITEMS} from './push/push.menu';
import {MENU_ITEMS as LET_MENU_ITEMS} from './let/let.menu';
import {MENU_ITEMS as MIXED_MENU_ITEMS} from './mixed/mixed.menu';

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
export class AppComponent extends State<AppState> {
    readonly env = environment;
    readonly hasZone = hasZone(this.ngZone);
    readonly ivy = isIvy();
    readonly renderTechnique = (this.ivy ? 'ɵ' : 'cdRef.') + getChangeDetectionHandler(this.ngZone, this.cdRef).name;
    readonly toggleSidenav = new Subject<void>();
    readonly viewState$ = this.select();

    constructor(
        private breakPointObserver: BreakpointObserver,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private appRef: ApplicationRef,
        private ngZone: NgZone
    ) {
        super();
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
            menuItems: [
                ...PUSH_MENU_ITEMS,
                ...LET_MENU_ITEMS,
                ...MIXED_MENU_ITEMS,
                ...PERFORMANCE_MENU_ITEMS
            ],
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
