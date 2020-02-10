import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-component',
  template: `
    <p>
      component works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
