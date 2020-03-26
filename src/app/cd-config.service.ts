import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {State} from '@rx-state/rxjs-state';
import {DEFAULT_STRATEGY_NAME} from '@component';

export interface CdConfig {
    strategies: string[];
    strategy: string;
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
            strategy: DEFAULT_STRATEGY_NAME
        });
    }

    getConfig(prop?: string): CdConfig {
        return prop ? this._state[prop] : this._state;
    }

}
