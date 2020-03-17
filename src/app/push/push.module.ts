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
import {ROUTES as PUSH_ROUTES} from './push.routes';
import {Parent01Component} from './01/parent.component';
import {Parent02Component} from './02/parent.component';
import {Parent03Component} from './03/parent.component';
import {Parent11Component} from './11/parent/parent.component';
import {Child11Component} from './11/parent/child/child.component';
import {Child12Component} from './12/parent/child/child.component';
import {Parent12Component} from './12/parent/parent.component';
import {Parent13Component} from './13/parent/parent.component';
import {Child13Component} from './13/parent/child/child.component';
import {Parent14Component} from './14/parent/parent.component';
import {Child14Component} from './14/parent/child/child.component';
import {Parent04Component} from './04/parent.component';
import {ParentOverviewComponent} from './overview.component';

@NgModule({
    declarations: [
        Parent01Component,
        Parent02Component,
        Parent03Component,
        Parent04Component,
        Parent11Component, Child11Component,
        Parent12Component, Child12Component,
        Parent13Component, Child13Component,
        Parent14Component, Child14Component,
        ParentOverviewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(PUSH_ROUTES),
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
export class PushModule {
}
