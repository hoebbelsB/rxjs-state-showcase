import {LetParentComponent} from './01/parent/parent.component';
import {LetParent02Component} from './02/parent/parent.component';
import {LetParent03Component} from './03/parent/parent.component';

export const ROUTES = [
    {
        path: 'let-01',
        component: LetParentComponent
    },
    {
        path: 'let-02',
        component: LetParent02Component
    },
    {
        path: 'let-03',
        component: LetParent03Component
    }
];
