import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Performance01IndexComponent } from './index/performance01-index.component';


const routes: Routes = [
    {
        path: '',
        component: Performance01IndexComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Performance01RoutingModule { }
