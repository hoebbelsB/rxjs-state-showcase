import {Component, Input} from '@angular/core';
import {LocalState} from '../';
import {MenuItem} from '../menu-item.interface';

@Component({
    selector: 'horizontal-nav',
    template: `
      <button mat-button *forEach="let item of items$ | async">
        {{item.label}}
      </button>
    `
})
export class HorizontalNavComponent extends LocalState<{ items: MenuItem[] }> {

    items$ = this.select('items');

    @Input()
    set items(items: MenuItem[]) {
      this.setState({items});
    }

    constructor() {
        super();
    }

}
