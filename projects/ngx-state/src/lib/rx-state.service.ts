import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {State} from '@rx-state/rxjs-state';

@Injectable()
export class RxState<T> extends State<T> implements OnDestroy {
  subscription = new Subscription();

  constructor() {
    super();
    this.subscription.add(this.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
