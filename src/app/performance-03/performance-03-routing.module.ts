import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Performance03IndexComponent } from './index/performance03-index.component';


const routes: Routes = [
    {
        path: '',
        component: Performance03IndexComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Performance03RoutingModule { }
