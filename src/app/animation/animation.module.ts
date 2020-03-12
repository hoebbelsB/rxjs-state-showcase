import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveComponentModule } from '../../../projects/component/src';

import { AnimationRoutingModule } from './animation-routing.module';
import { AnimationIndexComponent } from './animation-index/animation-index.component';
import { GrowComponent } from './grow/grow.component';


@NgModule({
  declarations: [AnimationIndexComponent, GrowComponent],
    imports: [
        CommonModule,
        AnimationRoutingModule,
        MatToolbarModule,
        ReactiveComponentModule,
        MatButtonModule
    ]
})
export class AnimationModule { }
