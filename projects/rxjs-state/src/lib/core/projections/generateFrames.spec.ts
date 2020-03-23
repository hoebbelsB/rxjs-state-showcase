import {asyncCancelerFn, generateFrames} from './generateFrames';
import {of} from 'rxjs';

/** @test {generateFrames} */
describe('generateFrames', () => {
  const afProducer = window.requestAnimationFrame;
  const afCanceler = window.cancelAnimationFrame;
  const tiProducer = window.setTimeout;
  const tiCanceler: asyncCancelerFn = window.clearTimeout;
  const inProducer = window.setInterval;
  const inCanceler = window.clearInterval;

  it('should work with defaults', () => {
      let sync;
      let microRes;
      let syncRes;
      const s1 = of(1);
      const s2 = generateFrames();
      expect(microRes).toBe(undefined);
      expect(sync).toBe(undefined);
      sync = 'test';
      s1.subscribe(n => syncRes = n);
      s2.subscribe(n => microRes = n);
      expect(sync).toBe('test');
      expect(syncRes).toBe(1);
      expect(microRes).toBe(undefined);
      setTimeout(() => {
        expect(microRes).not.toBe(undefined);
      });
  });

  describe('when covering common browser APIs', () => {
    let sync;
    const sync$ = of(1);
    let microRes;
    let macroRes;
    let syncRes;

    beforeEach(() => {
      sync = undefined;
      microRes = undefined;
      macroRes = undefined;
      syncRes = undefined;
    });

    it('should work with animationFrame', () => {
        const syncToMicro$ = generateFrames(afProducer, afCanceler);
        sync = 'test';
        syncToMicro$.subscribe(n => microRes = n);
        sync$.subscribe(n => syncRes = n);
        expect(sync).toBe('test');
        expect(syncRes).toBe(1);
        expect(microRes).toBe(undefined);

        setTimeout(() => {
          expect(microRes).not.toBe(undefined);
        });
    });
    it('should work with setTimeout', () => {
      const syncToMacro$ = generateFrames(tiProducer, tiCanceler);
      Promise.resolve(1).then(v => microRes = v);
      sync = 'test';
      syncToMacro$.subscribe(n => macroRes = n);
      sync$.subscribe(n => syncRes = n);
      expect(sync).toBe('test');
      expect(syncRes).toBe(1);
      expect(macroRes).toBe(undefined);

      setTimeout(() => {
        expect(macroRes).not.toBe(undefined);
      });
    });
    it('should work with setInterval', () => {
      const syncToMacro$ = generateFrames(inProducer, inCanceler);
      Promise.resolve(1).then(v => microRes = v);
      sync = 'test';
      syncToMacro$.subscribe(n => macroRes = n);
      sync$.subscribe(n => syncRes = n);
      expect(sync).toBe('test');
      expect(syncRes).toBe(1);
      expect(macroRes).toBe(undefined);

      setTimeout(() => {
        expect(macroRes).not.toBe(undefined);
      });
    });

  });

  describe('tested against all tests from animationFrames', () => {
    // @TODO discuss implementation worth
  });
});
