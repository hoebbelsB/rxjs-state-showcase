import {marbles} from 'rxjs-marbles/jest';

import {State} from './state';

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

function setupState<T>(cfg: { initialState?: T, initialize?: boolean }) {
  const {initialState, initialize} = {initialize: true, ...cfg};
  const state = new State<T>();
  if (initialize) {
    state.subscribe();
  }
  if (initialState) {
    state.setState(initialState);
  }
  return state;
}

// tslint:disable: no-duplicate-string
describe('State', () => {
  it('should create new instance', () => {
    const state = new State<PrimitiveState>();
    expect(state).toBeDefined();
  });

  describe('select', () => {
    it(
      'should return nothing without subscriber',
      marbles(m => {
        const state = setupState({initialState: initialPrimitiveState, initialize: false});
        m.expect(state.select()).toBeObservable('');
      }),
    );

    it(
      'should return initial state',
      marbles(m => {
        const state = setupState({initialState: initialPrimitiveState});
        m.expect(state.select()).toBeObservable('s', {s: initialPrimitiveState});
      }),
    );

    describe('slice by key', () => {
      it(
        'should return empty state after init',
        marbles(m => {
          const state = setupState({});
          m.expect(state.select()).toBeObservable('');
        }),
      );

      it(
        'should return initial state',
        marbles(m => {
          const state = new State<PrimitiveState>();
          state.subscribe();

          state.setState({num: 42});

          m.expect(state.select('num')).toBeObservable('s', {s: 42});
        }),
      );
    });

    describe('slice by map function', () => {
      it(
        'should return nothing if empty',
        marbles(m => {
          const state = setupState({});
          m.expect(state.select()).toBeObservable('');
        }),
      );

      it(
        'should return full state object on select',
        marbles(m => {
          const state = setupState({initialState: initialPrimitiveState});
          m.expect(state.select()).toBeObservable('s', {s: initialPrimitiveState});
        }),
      );
    });
  });

  describe('setState', () => {
    describe('with state slice', () => {
      it(
        'should add new slices',
        marbles(m => {
// @TODO
        })
      );

      it(
        'should override previous state slices',
        marbles(m => {
// @TODO
        }),
      );

    });

  });

  describe('connectState', () => {
    describe('with observable of slices', () => {
      it(
        'should add new slices',
        marbles(m => {
// @TODO
        })
      );

      it(
        'should override previous state slices',
        marbles(m => {
// @TODO
        }),
      );

    });

  });
});
