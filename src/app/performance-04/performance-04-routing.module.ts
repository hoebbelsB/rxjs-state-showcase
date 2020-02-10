import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Performance04IndexComponent } from './index/performance04-index.component';


const routes: Routes = [
    {
        path: '',
        component: Performance04IndexComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Performance04RoutingModule { }
