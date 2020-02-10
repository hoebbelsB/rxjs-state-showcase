import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Performance02IndexComponent } from './index/performance02-index.component';


const routes: Routes = [
    {
        path: '',
        component: Performance02IndexComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Performance02RoutingModule { }
