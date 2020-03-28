import {Routes} from '@angular/router';
import {ROUTES as PERFORMANCE_ROUTES} from './performance/performance.routes';
import {ROUTES as PUSH_ROUTES} from './push/push.routes';

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./draft/draft.module')
            .then(mod => mod.DraftModule),
        canActivate: [],
        canActivateChild: []
    },
    ...PUSH_ROUTES,
    {
        path: '',
        loadChildren: () => import('./push/push.module')
            .then(mod => mod.PushModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: '',
        loadChildren: () => import('./mixed/mixed.module')
            .then(mod => mod.MixedModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: '',
        loadChildren: () => import('./let/let.module')
            .then(mod => mod.LetModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: '',
        loadChildren: () => import('./cd/cd.module')
            .then(mod => mod.CdModule),
        canActivate: [],
        canActivateChild: []
    },
    ...PERFORMANCE_ROUTES,
    {
        path: '',
        loadChildren: () => import('./irrelevant-to-test/irrelevant-to-test.module')
            .then(mod => mod.IrrelevantToTestModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: '',
        loadChildren: () => import('./cd-operators/cd-operators.module')
            .then(mod => mod.CdOperatorsModule),
        canActivate: [],
        canActivateChild: []
    }
];
