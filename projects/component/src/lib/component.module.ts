import { NgModule } from '@angular/core';

import { ComponentRoutingModule } from './component-routing.module';
import { ComponentComponent } from './component.component';


@NgModule({
  declarations: [ComponentComponent],
  imports: [
    ComponentRoutingModule
  ],
  exports: [ComponentComponent]
})
export class ComponentModule { }
