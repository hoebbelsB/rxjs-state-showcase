export { ArgumentNotObservableError } from './argument-not-observable-error';
export { STATE_DEFAULT } from './state-default';
export { getChangeDetectionHandler } from './get-change-detection-handling';
export {
  getRequestAnimationFrameFromZoneFullEnv,
} from './get-request-animation-frame-from-zone-full-env';
export { isZoneLess } from './zone-check';
export { isIvy } from './ivy-check';
export {
  CoalesceConfig,
  CoalescingContext,
  getCoalesceWorkConfig,
  isScheduling,
  coalesceWork,
} from './coalesce-work';
export {
  potentialObservableValue,
  remainHigherOrder,
  isUndefinedOrNullGuard,
  isDefinedGuard,
  isIterableGuard,
  isObservableGuard,
  isOperateFnArrayGuard,
  isPromiseGuard,
  isStringArrayGuard,
} from './typing';
