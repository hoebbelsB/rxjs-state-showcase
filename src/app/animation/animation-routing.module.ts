import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimationIndexComponent } from './animation-index/animation-index.component';


const routes: Routes = [{
    path: '',
    component: AnimationIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimationRoutingModule { }
