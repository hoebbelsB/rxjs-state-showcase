import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatMenuModule} from "@angular/material";
import {HorizontalNavComponent} from "@navigation/lib/horizontal-nav/horizontal-nav.component";


@NgModule({
    declarations: [HorizontalNavComponent],
    imports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule
    ],
    exports: [HorizontalNavComponent]
})
export class NavigationModule {
}
