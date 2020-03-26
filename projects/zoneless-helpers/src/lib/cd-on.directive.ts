import {ChangeDetectorRef, Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {from, fromEvent, ReplaySubject, Subject} from 'rxjs';
import {filter, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';

// <p [cdOn]="['click]"></p>

@Directive({
    // tslint:disable-next-line:directive-selector
  selector: '[cdOn]'
})
export class CdOnDirective implements OnDestroy {
  onDestroy$ = new Subject();

  events$ = new ReplaySubject<string[]>(1);
  @Input() set libCdOn(events: string[]) {
    this.events$.next(events);
  }

  constructor(private cd: ChangeDetectorRef,
              private elemRef: ElementRef) {
    this.events$
      .pipe(
        filter(events => events.length > 0),
        switchMap(
          events => from(events)
            .pipe(
              mergeMap(event => fromEvent(this.elemRef.nativeElement, event))
            )
        ),
        tap(_ => this.cd.detectChanges()),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
