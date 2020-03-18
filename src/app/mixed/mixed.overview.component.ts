import {Component} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-push-overview',
    template: `
        <h1>Push Pipe and Let Directive Mixed Setup</h1>
        <div class="push-cases">
            <app-mixed-parent01 class="item"></app-mixed-parent01>
            <app-mixed-parent02 class="item"></app-mixed-parent02>
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
export class MixedOverviewComponent {


}
