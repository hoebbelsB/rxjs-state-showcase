export interface CoalescingContext {
  executionContextId: number;
}

export interface CoalesceConfig {
  context: CoalescingContext;
  executionContextRef: (cb: () => void) => number;
}

export function getCoalesceWorkConfig(
  cfg: CoalesceConfig = {
    context: (window as unknown) as CoalescingContext,
    executionContextRef: requestAnimationFrame.bind(window),
  }
): CoalesceConfig {
  return {
    context: (window as unknown) as CoalescingContext,
    executionContextRef: requestAnimationFrame.bind(window),
    ...cfg,
  };
}

export function isScheduling(cfg: CoalesceConfig): boolean {
  return (
    cfg.context.executionContextId !== -1 &&
    cfg.context.executionContextId !== undefined
  );
}

export function coalesceWork(work: () => void, cfg: CoalesceConfig) {
  const prepedCfg = getCoalesceWorkConfig(cfg);
  // If a requestAnimationFrame is already scheduled
  // do nothing
  if (isScheduling(prepedCfg)) {
    return;
  }

  // If NO requestAnimationFrame is scheduled
  // request a new requestAnimationFrame and assign its it to `PushPipe.rid`
  prepedCfg.context.executionContextId = prepedCfg.executionContextRef(() => {
    // Reset requestAnimationFrameId
    prepedCfg.context.executionContextId = -1;
    // Logic here will get buffered in the micro task queue and executed only ones
    work();
  });
}
