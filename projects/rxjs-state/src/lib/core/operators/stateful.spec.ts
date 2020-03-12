import {marbles} from 'rxjs-marbles/jest';
import {stateful} from "./stateful";
import {EMPTY, NEVER} from "rxjs";
import {map} from "rxjs/operators";

interface PrimitiveState {
  test: string;
  bar: number;
}

interface ArrayState {
  items: number[];
}

// tslint:disable: no-duplicate-string
describe('stateful', () => {
  it('should mirror EMPTY', marbles(m => {
      const source = EMPTY;
      m.expect(source.pipe(stateful())).toBeObservable('|');
    })
  );

  it('should mirror NEVER', marbles(m => {
      const source = NEVER;
      m.expect(source.pipe(stateful())).toBeObservable('');
    })
  );

  it('should pass values as they are', marbles(m => {
      const source = m.hot('v|');
      m.expect(source.pipe(stateful())).toBeObservable('v|');
    })
  );

  it('should pass only distinct values', marbles(m => {
      const source = m.hot('v-v-a-a-v|');
      m.expect(source.pipe(stateful())).toBeObservable('v---a---v|');
    })
  );

  it('should pass only values other than undefined', marbles(m => {
      const values = {u: undefined, a: null, b: '', c: [], d: {}};
      const source = m.hot('u-a-b-c-d|', values);
      m.expect(source.pipe(stateful())).toBeObservable('u-a-b-c-d|', values);
    })
  );

  it('should replay the last emitted value', marbles(m => {

    })
  );

  it('should accept one operator', marbles(m => {
    const values = {a: 2, b: 4};
    const source = m.hot('a|', values);
    m.expect(source.pipe(stateful(map(v => v*2)))).toBeObservable('b|', values);
    })
  );

  it('should accept multiple operators', marbles(m => {
      const values = {a: 2, b: 4};
      const source = m.hot('a|', values);
      m.expect(source.pipe(stateful(
        map(v => v*2),
        map(v => v/2),
        map(v => v*2),
        map(v => v/2),
        map(v => v*2)
      ))).toBeObservable('b|', values);
    })
  );

});
