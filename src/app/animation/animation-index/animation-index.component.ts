import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { State } from '../../state/state';
import { GrowAnimationState } from '../grow/grow.component';

export interface AnimationIndexComponentState {
    growState: GrowAnimationState;
}

@Component({
    selector: 'app-animation-index',
    templateUrl: './animation-index.component.html',
    styleUrls: ['./animation-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
