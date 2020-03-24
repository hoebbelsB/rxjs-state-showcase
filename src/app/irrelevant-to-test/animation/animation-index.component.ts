import {ApplicationRef, Component} from '@angular/core';
import {Subject} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {GrowAnimationState} from './grow/grow.component';
import {environment} from '../../../environments/environment';
import {State} from '@rx-state/rxjs-state';

export interface AnimationIndexComponentState {
    growState: GrowAnimationState;
}

@Component({
    selector: 'app-animation-index',
    templateUrl: './animation-index.component.html',
    styleUrls: ['./animation-index.component.scss'],
    changeDetection: environment.changeDetection
})
export class AnimationIndexComponent extends State<AnimationIndexComponentState> {

    readonly viewState$ = this.select();

    readonly toggleGrowState = new Subject<void>();

    private changeDetections = 0;

    detectedChanges() {
        return ++this.changeDetections;
    }

    constructor(
        private appRef: ApplicationRef
    ) {
        super();
        this.setState({
            growState: 'shrinked'
        });

        this.connect(
            'growState',
            this.toggleGrowState
                .pipe(
                    withLatestFrom(this.select('growState')),
                    map(([e, old]) => old === 'grown' ? 'shrinked' : 'grown')
                )
        );
    }

}
