import {getGlobalThis} from "./get-global-this";

export interface CoalescingContext {
  executionContextId: number | undefined;
}

export interface CoalesceConfig {
  context?: CoalescingContext;
  executionContextRef?: (cb: () => void) => number;
}

export function getCoalesceWorkConfig(
  cfg: CoalesceConfig = {
    context: getGlobalThis(),
    executionContextRef: getGlobalThis().requestAnimationFrame.bind(getGlobalThis()),
  }
): CoalesceConfig {
  return {
    context: getGlobalThis(),
    executionContextRef: getGlobalThis().requestAnimationFrame.bind(getGlobalThis()),
    ...cfg,
  };
}

export function isScheduling(cfg: CoalesceConfig): boolean {
  if (cfg.hasOwnProperty('context') && typeof cfg.context === 'object') {
    return (
      cfg.context.executionContextId !== -1 &&
      cfg.context.executionContextId !== undefined
    );
  }
  return false;
}

export function coalesceWork(work: () => void, cfg?: CoalesceConfig) {
  const prepedCfg = getCoalesceWorkConfig(cfg);
  // If a executionContext is already scheduled
  // do nothing
  if (isScheduling(prepedCfg)) {
    return;
  }

  // @NOTICE any casts are here to avoid checking all props for undefined for typescript
  // If NO execution is scheduled
  // request a new executionContextId and assign its it to `PushPipe.rid`
  (prepedCfg.context as any).executionContextId = (prepedCfg as any).executionContextRef(() => {
    // Reset requestAnimationFrameId
    (prepedCfg.context as any).executionContextId = -1;
    // Logic here will get buffered in the micro task queue and executed only ones
    work();
  });
}
