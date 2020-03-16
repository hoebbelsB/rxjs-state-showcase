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
import {Parent01Component} from './01/parent/parent01.component';
import {Child01Component} from './01/parent/child/child01.component';
import {Child02Component} from './02/parent/child/child.component';
import {Parent02Component} from './02/parent/parent.component';
import {Parent03Component} from './03/parent/parent.component';
import {Parent04Component} from './04/parent/parent.component';
import {Child04Component} from './04/parent/child/child.component';

@NgModule({
    declarations: [
        Parent01Component, Child01Component,
        Parent02Component, Child02Component,
        Parent04Component, Child04Component,
        Parent03Component
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
