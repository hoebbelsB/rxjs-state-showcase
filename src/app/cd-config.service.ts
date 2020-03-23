import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {State} from '@rx-state/rxjs-state';

export interface CdConfig {
    optimized: boolean;
}

@Injectable({providedIn: 'root'})
export class CdConfigService extends State<CdConfig> {
    subscription = new Subscription();

    private _state: CdConfig;

    constructor() {
        super();
        this.subscription.add(this.subscribe());
        this.hold(this.select(), state => this._state = state);
        this.setState({
            optimized: true
        });
    }

    getConfig(): CdConfig {
        return this._state;
    }

}
