import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  NgZone,
  OnDestroy,
  Type,
} from '@angular/core';
import {
  getChangeDetectionHandler,
  getRequestAnimationFrameFromZoneFullEnv,
} from './utils';
import {
  NextObserver,
  Observable,
  PartialObserver,
  pipe,
  Subscription,
  EMPTY,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { remainHigherOrder } from './utils';

export interface CoalescingConfig {
  optimized: boolean;
}

// This abstract class holds all the shared logic for the push pipe and the let directive
// responsible for change detection
// If you extend this class you need to implement how the update of the rendered value happens
// following methods need to be injected:
// - getResetContextObserver<T>(): NextObserver<T>;
// - getUpdateViewContextObserver<T>(): PartialObserver<T>;
// - getConfigurableBehaviour<T>(): remainHigherOrder<T>;
export abstract class CdAware implements OnDestroy {
  protected handleChangeDetection: <T>(component?: T) => void = () => {};
  protected requestAnimationFrameRef: (
    cb: () => void
  ) => number = getRequestAnimationFrameFromZoneFullEnv();
  protected work: () => void = () => {};

  protected cdAwareSubscription = new Subscription();

  protected observeChanges: () => <T>(
    o: Observable<T>
  ) => Observable<T> = () => () => EMPTY;

  constructor(protected cdRef: ChangeDetectorRef, protected ngZone: NgZone) {}

  abstract getResetContextObserver<T>(): NextObserver<T>;

  abstract getUpdateViewContextObserver<T>(): PartialObserver<T>;

  abstract getConfigurableBehaviour<T>(): remainHigherOrder<T>;

  initCdAware(): void {
    this.handleChangeDetection = getChangeDetectionHandler(
      this.ngZone as NgZone,
      this.cdRef as ChangeDetectorRef
    );
    this.work = (): void => {
      this.handleChangeDetection(
        (this.cdRef as EmbeddedViewRef<Type<any>>).context
      );
    };
    this.requestAnimationFrameRef = getRequestAnimationFrameFromZoneFullEnv().bind(
      window
    );
  }

  getUpdateContextBehaviour<T>(): remainHigherOrder<T> {
    return pipe(
      map(value$ => value$.pipe(tap<T>(this.getUpdateViewContextObserver())))
    );
  }

  getResetContextBehaviour<T>(): remainHigherOrder<T> {
    return pipe(tap<Observable<T>>(this.getResetContextObserver()));
  }

  // requestAnimationFrameId holds id of latest scheduled animationFrame of all child's (static) of PushPipe or LetDirective
  ngOnDestroy(): void {
    this.cdAwareSubscription.unsubscribe();
  }
}
