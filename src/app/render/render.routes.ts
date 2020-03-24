import {RenderParent01Component} from './01/parent.component';
import { RenderParent02Component } from './02/parent.component';
import {RenderOverviewComponent} from './render.overview.component';


export const ROUTES = [
    {
        path: 'render',
        component: RenderOverviewComponent
    },
    {
        path: 'render-01',
        component: RenderParent01Component
    },
    {
        path: 'render-02',
        component: RenderParent02Component
    }
];
