import {Component} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-push-overview',
    template: `
        <h1>Push Pipe Overview</h1>
        <div class="push-cases">
            <app-push-parent01 class="item"></app-push-parent01>
            <app-push-parent02 class="item"></app-push-parent02>
            <app-push-parent03 class="item"></app-push-parent03>
            <app-push-parent04 class="item"></app-push-parent04>
            <app-push-parent11 class="item"></app-push-parent11>
            <app-push-parent12 class="item"></app-push-parent12>
            <app-push-parent13 class="item"></app-push-parent13>
            <app-push-parent14 class="item"></app-push-parent14>
            <app-push-parent21 class="item"></app-push-parent21>
        </div>
    `,
    changeDetection: environment.changeDetection,
    styles: [`
        .push-cases {
            display: flex;
            flex-wrap: wrap;
        }

        .item {
            width: 50%;
        }
    `]
})
export class PushOverviewComponent {


}
