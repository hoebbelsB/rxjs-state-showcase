import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {ApplicationRef, ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {State} from './state/state';
import {hasZone, isIvy} from '../../projects/component/src/core/utils';
import {environment} from '../environments/environment';

export interface AppState {
    navOpen: boolean;
    mobile: boolean;
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
            navOpen: true
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
