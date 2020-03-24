import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveComponentModule} from '../../../projects/component/src';
import {RouterModule} from '@angular/router';
import { Cd02Child01Component } from './02/child01.component';
import { Cd02Child02Component } from './02/child02.component';
import { RenderParent02Component } from './02/parent.component';
import {ROUTES as CD_ROUTES} from './render.routes';

import {RenderParent01Component} from './01/parent.component';
import {Child0101Component} from './01/child01.component';

import {Child0102Component} from './01/child02.component';
import {RenderOverviewComponent} from './render.overview.component';

@NgModule({
    declarations: [
        RenderParent01Component, Child0101Component, Child0102Component,
        RenderParent02Component, Cd02Child01Component, Cd02Child02Component,
        RenderOverviewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(CD_ROUTES),
        MatListModule,
        MatTableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveComponentModule
    ]
})
export class RenderModule {
}
