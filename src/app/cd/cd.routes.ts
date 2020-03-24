import {CdParent01Component} from './01/parent.component';
import { CdParent02Component } from './02/parent.component';
import {CdOverviewComponent} from './cd.overview.component';
import {CdParent03Component} from './03/parent.component';
import {CdParent04Component} from './04/parent.component';


export const ROUTES = [
    {
        path: 'cd',
        component: CdOverviewComponent
    },
    {
        path: 'cd-01',
        component: CdParent01Component
    },
    {
        path: 'cd-02',
        component: CdParent02Component
    },
    {
        path: 'cd-03',
        component: CdParent03Component
    },
    {
        path: 'cd-04',
        component: CdParent04Component
    }
];
