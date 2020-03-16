import {Parent01Component} from './01/parent/parent01.component';
import {Parent02Component} from './02/parent/parent.component';
import {Parent03Component} from './03/parent/parent.component';

export const ROUTES = [
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
    }
];
