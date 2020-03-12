import {
  CoalesceConfig,
  coalesceWork,
  getCoalesceWorkConfig,
  isScheduling
} from "./coalesce-work";
import {getGlobalThis} from "./get-global-this";

let id = 0;
function MockRequestAnimationFrame(cb: Function) {
  cb && cb();
  return ++id;
}
getGlobalThis().requestAnimationFrame = MockRequestAnimationFrame;

const defaultCoalesceWorkConfig: CoalesceConfig = {
  context: getGlobalThis(),
  executionContextRef: getGlobalThis().requestAnimationFrame.bind(getGlobalThis()),
};

fdescribe('getCoalesceWorkConfig', () => {
  it('should return default config object if no overrides are passed', () => {
    const cfg = getCoalesceWorkConfig();
    expect(cfg.context).toBe(defaultCoalesceWorkConfig.context);
    expect(cfg.executionContextRef).toBe(defaultCoalesceWorkConfig.executionContextRef);
  });
  it('should return default config object if an empty override is passed', () => {
    const cfg = getCoalesceWorkConfig({} as any);
    expect(cfg.context).toBe(defaultCoalesceWorkConfig.context);
    expect(cfg.executionContextRef).toBe(defaultCoalesceWorkConfig.executionContextRef);
  });
  it('should return default config with passed context if context was passed', () => {
    const cfg = getCoalesceWorkConfig({context: {executionContextId: 42}});
    expect((cfg.context as any).executionContextId).toBe(42);
    expect(cfg.executionContextRef).toBe(defaultCoalesceWorkConfig.executionContextRef);
  });
  it('should return default config with passed executionContextRef if executionContextRef was passed', () => {
    const executionContextRef = (): number => 42;
    const cfg = getCoalesceWorkConfig({executionContextRef});
    expect((cfg.context as any).executionContextId).toBe((defaultCoalesceWorkConfig.context as any).executionContextId);
    expect((cfg as any).executionContextRef()).toBe(42);
  });
  it('should return new config with passed context and executionContextRef if they where passed', () => {
    const executionContextRef = (): number => 42;
    const context = {executionContextId: 21};
    const cfg = getCoalesceWorkConfig({context, executionContextRef});
    expect((cfg.context as any).executionContextId).toBe(42);
    expect((cfg as any).executionContextRef()).toBe(21);
  });
});

fdescribe('isScheduling', () => {
  it('should return false if the contexts executionContextId is -1', () => {
    expect(isScheduling({context: {executionContextId: -1}})).toBe(false);
  });

  it('should return false if the contexts executionContextId is undefined', () => {
    expect(isScheduling({context: {executionContextId: undefined}})).toBe(false);
  });
  it('should return true if the contexts executionContextId is other than undefined or -1', () => {
    expect(isScheduling({context: {executionContextId: 42}})).toBe(true);
  });
});

fdescribe('coalesceWork', () => {
  it('should execute work if the executionContext is not scheduled', () => {
    const work = jasmine.createSpy('work');
    coalesceWork(work);
    expect(work).toHaveBeenCalled();
  });
  it('should not execute work if the executionContext is scheduled', () => {
    const work = jasmine.createSpy('work');
    coalesceWork(work);
    expect(work).toHaveBeenCalled();
    const work2 = jasmine.createSpy('work2');
    coalesceWork(work2);
    expect(work2).not.toHaveBeenCalled();
  });
  it('should again execute work if the executionContext scheduling is done', () => {
    const work = jasmine.createSpy('work');
    coalesceWork(work);
    expect(work).toHaveBeenCalled();
    const work2 = jasmine.createSpy('work2');
    coalesceWork(work2);
    expect(work2).not.toHaveBeenCalled();
    setTimeout(() => {
      coalesceWork(work2);
      expect(work2).toHaveBeenCalled();
    }, 10)
  });
});
