import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'performance-01',
        loadChildren: () => import('./performance-01/performance-01.module')
            .then(mod => mod.Performance01Module),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: 'performance-02',
        loadChildren: () => import('./performance-02/performance-02.module')
            .then(mod => mod.Performance02Module),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: 'performance-03',
        loadChildren: () => import('./performance-03/performance-03.module')
            .then(mod => mod.Performance03Module),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: 'performance-04',
        loadChildren: () => import('./performance-04/performance-04.module')
            .then(mod => mod.Performance04Module),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: 'animation',
        loadChildren: () => import('./animation/animation.module')
            .then(mod => mod.AnimationModule),
        canActivate: [],
        canActivateChild: []
    },
    {
        path: '**',
        redirectTo: 'performance-01'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
