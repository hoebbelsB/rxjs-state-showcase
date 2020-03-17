import {Parent01Component} from './01/parent.component';
import {Parent02Component} from './02/parent.component';
import {Parent03Component} from './03/parent.component';
import {Parent11Component} from './11/parent/parent.component';
import {Parent12Component} from './12/parent/parent.component';
import {Parent13Component} from './13/parent/parent.component';
import {Parent14Component} from './14/parent/parent.component';
import {Parent04Component} from './04/parent.component';
import {ParentOverviewComponent} from './overview.component';

export const ROUTES = [
    {
        path: 'push',
        component: ParentOverviewComponent
    },
    {
        path: 'push-01',
        component: Parent01Component
    },
    {
        path: 'push-02',
        component: Parent02Component
    },
    {
        path: 'push-03',
        component: Parent03Component
    },
    {
        path: 'push-04',
        component: Parent04Component
    },
    {
        path: 'push-11',
        component: Parent11Component
    },
    {
        path: 'push-12',
        component: Parent12Component
    },
    {
        path: 'push-13',
        component: Parent13Component
    },
    {
        path: 'push-14',
        component: Parent14Component
    }
];
