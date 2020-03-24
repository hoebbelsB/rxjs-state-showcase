import {CdParent01Component} from './01/parent.component';
import { CdParent02Component } from './02/parent.component';
import {CdOverviewComponent} from './cd.overview.component';


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
    }
];
