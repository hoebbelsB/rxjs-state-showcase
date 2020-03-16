import {Routes} from '@angular/router';
import {ROUTES as PERFORMANCE_ROUTES} from './performance/performance.routes';
import {ROUTES as PUSH_ROUTES} from './push/push.routes';

export const ROUTES: Routes = [
    ...PERFORMANCE_ROUTES,
    ...PUSH_ROUTES,
    {
        path: '',
        loadChildren: () => import('./animation/animation.module')
            .then(mod => mod.AnimationModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: '',
        loadChildren: () => import('./push/push.module')
            .then(mod => mod.PushModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: '',
        loadChildren: () => import('./let/let.module')
            .then(mod => mod.LetModule),
        canActivate: [],
        canActivateChild: []
    }
];
