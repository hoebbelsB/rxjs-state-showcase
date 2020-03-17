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
import {ROUTES as LET_ROUTES} from './let.routes';
import {LetParentComponent} from './01/parent/parent.component';
import {LetChildComponent} from './01/parent/child/child.component';
import {LetParent02Component} from './02/parent/parent.component';
import {LetChild02Component} from './02/parent/child/child.component';
import {LetParent03Component} from './03/parent/parent.component';

@NgModule({
    declarations: [
        LetParentComponent, LetChildComponent,
        LetParent02Component, LetChild02Component,
        LetParent03Component
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(LET_ROUTES),
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
export class LetModule {
}