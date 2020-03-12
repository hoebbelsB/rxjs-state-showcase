export { ArgumentNotObservableError } from './argument-not-observable-error';
export { WrongSelectParamsError } from './wrong-select-params-error';
export { pipeFromArray } from './pipe-from-array';
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
