import {Component} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-cd-overview',
    template: `
        <h1>ChangeDetection Overview</h1>
        <div class="cd-cases">
            <app-cd-parent01 class="item"></app-cd-parent01>
            <app-cd-parent02 class="item"></app-cd-parent02>
        </div>
    `,
    changeDetection: environment.changeDetection,
    styles: [`
        .cd-cases {
            display: flex;
            flex-wrap: wrap;
        }

        .item {
            width: 50%;
        }
    `]
})
export class CdOverviewComponent {


}
