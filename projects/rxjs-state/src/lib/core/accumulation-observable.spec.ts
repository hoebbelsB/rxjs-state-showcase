import {marbles} from 'rxjs-marbles/jest';
import {createAccumulationObservable} from "./accumulation-observable";
import {pluck} from "rxjs/operators";
import {of} from "rxjs";

interface PrimitiveState {
  bol: boolean;
  str: string;
  num: number;
}

interface NestedState {
  obj: {
    key1: {
      key11: {
        key111: string;
      }
    }
  }
}


const initialPrimitiveState: PrimitiveState = {
  str: 'string',
  num: 42,
  bol: true
};

function setupAccumulationObservable<T>(cfg: { initialState?: T, initialize?: boolean }) {
  const {initialState, initialize} = {initialize: true, ...cfg};
  const acc = createAccumulationObservable<T>();
  if (initialize) {
    acc.subscribe();
  }
  if (initialState) {
    acc.nextSlice(initialState);
  }
  return acc;
}

// tslint:disable: no-duplicate-string
describe('createAccumulationObservable', () => {
  it('should return object', marbles(m => {
      const acc = createAccumulationObservable();
      expect(acc).toBeDefined();
    })
  );

  describe('state$', () => {
    it(
      'should return nothing without subscriber',
      marbles(m => {
        const acc = setupAccumulationObservable<PrimitiveState>({
          initialState: initialPrimitiveState,
          initialize: false
        });
        m.expect(acc.state$).toBeObservable('');
      }),
    );

    it(
      'should return empty state after init',
      marbles(m => {
        const acc = setupAccumulationObservable<PrimitiveState>({initialize: true});
        m.expect(acc.state$).toBeObservable('s', {s: {} as PrimitiveState});
      }),
    );

    it(
      'should return initial state',
      marbles(m => {
        const acc = setupAccumulationObservable<PrimitiveState>({initialState: initialPrimitiveState});
        m.expect(acc.state$).toBeObservable('s', {s: initialPrimitiveState});
      }),
    );

  });

  describe('nextSlice', () => {
    it(
      'should add new slices',
      marbles(m => {
        const acc = setupAccumulationObservable<PrimitiveState>({});
        acc.nextSlice({num: 42});
        m.expect(acc.state$.pipe(pluck('num'))).toBeObservable('s', {s: 42});
      })
    );

    it(
      'should override previous state slices',
      marbles(m => {
        const acc = setupAccumulationObservable<PrimitiveState>({initialState: initialPrimitiveState});
        m.expect(acc.state$.pipe(pluck('num'))).toBeObservable('s', {s: 42});
        acc.nextSlice({num: 43});
        m.expect(acc.state$.pipe(pluck('num'))).toBeObservable('s', {s: 43});
      }),
    );

  });

  describe('connectState', () => {
    it(
      'should add new slices',
      marbles(m => {
        const acc = setupAccumulationObservable<PrimitiveState>({});
        acc.nextSliceObservable(of({num: 42}));
        m.expect(acc.state$.pipe(pluck('num'))).toBeObservable('s', {s: 42});
      })
    );

    it(
      'should override previous state slices',
      marbles(m => {
        const acc = setupAccumulationObservable<PrimitiveState>({initialState: initialPrimitiveState});
        m.expect(acc.state$.pipe(pluck('num'))).toBeObservable('s', {s: 42});
        acc.nextSliceObservable(of({num: 43}));
        m.expect(acc.state$.pipe(pluck('num'))).toBeObservable('s', {s: 43});
      }),
    );

  });
});
