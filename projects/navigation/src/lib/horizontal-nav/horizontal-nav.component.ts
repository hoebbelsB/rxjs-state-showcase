import {Component, Input} from '@angular/core';
import {RxState} from '@rx-state/ngx-state';
import {MenuItem} from '../menu-item.interface';

@Component({
    selector: 'horizontal-nav',
    template: `
      <button mat-button *forEach="let item of items$ | ngrxPush">
        {{item.label}}
      </button>
    `
})
export class HorizontalNavComponent extends RxState<{ items: MenuItem[] }> {

    items$ = this.select('items');

    @Input()
    set items(items: MenuItem[]) {
      this.setState({items});
    }

    constructor() {
        super();
    }

}
