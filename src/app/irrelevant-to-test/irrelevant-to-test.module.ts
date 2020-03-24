import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveComponentModule} from '../../../projects/component/src';
import {AnimationIndexComponent} from './animation/animation-index.component';
import {GrowComponent} from './animation/grow/grow.component';
import {ROUTES} from './irrelevant-to-test.routes';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [AnimationIndexComponent, GrowComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        MatToolbarModule,
        ReactiveComponentModule,
        MatButtonModule
    ]
})
export class IrrelevantToTestModule {
}
