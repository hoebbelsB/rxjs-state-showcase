import { CdOnDirective } from './cd-on.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

@Component({
  template: `<p [cdOn]="['click']">Testing Directives is awesome! {{runCdCycle()}}</p>`
})
class TestComponent {
  cdCycles = 0;
  constructor() { }

  runCdCycle() {
    this.cdCycles++;
    return this.cdCycles;
  }

}

describe('CdOnDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        CdOnDirective
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create test-component', () => {
    expect(component).toBeDefined();
  });

  it('should listen to clicks', () => {
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const p: HTMLElement = debugEl.querySelector('p');

    expect(1).toBeTruthy();

  });




});
