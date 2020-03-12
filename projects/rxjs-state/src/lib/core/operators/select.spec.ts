import {marbles} from 'rxjs-marbles/jest';
import {select} from "./select";
import {EMPTY, NEVER, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

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

// tslint:disable: no-duplicate-string
describe('select', () => {

  describe('should mirror the behavior of the stateful and', () => {
    it('should mirror EMPTY', marbles(m => {
        const source = EMPTY;
        m.expect(source.pipe(select())).toBeObservable('|');
      })
    );

    it('should mirror NEVER', marbles(m => {
        const source = NEVER;
        m.expect(source.pipe(select())).toBeObservable('');
      })
    );

    it('should pass values as they are', marbles(m => {
        const source = m.hot('v|');
        m.expect(source.pipe(select())).toBeObservable('v|');
      })
    );

    it('should pass only distinct values', marbles(m => {
        const source = m.hot('v-v-a-a-v|');
        m.expect(source.pipe(select())).toBeObservable('v---a---v|');
      })
    );

    it('should pass only values other than undefined', marbles(m => {
        const values = {u: undefined, a: null, b: '', c: [], d: {}};
        const source = m.hot('u-a-b-c-d|', values);
        m.expect(source.pipe(select())).toBeObservable('u-a-b-c-d|', values);
      })
    );

    it('should replay the last emitted value', marbles(m => {

      })
    );

    it('should accept one operator', marbles(m => {
        const values = {a: 2, b: 4};
        const source = m.hot('a|', values);
        m.expect(source.pipe(select(map(v => v * 2)))).toBeObservable('b|', values);
      })
    );

    it('should accept multiple operators', marbles(m => {
        const values = {a: 2, b: 4};
        const source = m.hot('a|', values);
        m.expect(source.pipe(select(
          map(v => v * 2),
          map(v => v / 2),
          map(v => v * 2),
          map(v => v / 2),
          map(v => v * 2)
        ))).toBeObservable('b|', values);
      })
    );
  });

  it('should accept one string keyof T', marbles(m => {
      const primitiveState: PrimitiveState = {
        bol: true,
        str: 'string',
        num: 42
      };
      const source: Observable<PrimitiveState> = m.cold('a|', {a:primitiveState});
      m.expect(source.pipe(select('bol'))).toBeObservable('a|', {a: true});
    })
  );

  it('should accept multiple strings keyof T', marbles(m => {
      const nestedState: NestedState = {
        obj: { key1: {key11: {key111: 'test'}} }
      };
      const source: Observable<NestedState> = m.cold('a|', {a:nestedState});
      m.expect(source.pipe(select('obj', 'key1', 'key11', 'key111'))).toBeObservable('a|', {a: 'test'});
    })
  );

  it('should accept one operator', marbles(m => {
      const primitiveState: PrimitiveState = {
        bol: true,
        str: 'string',
        num: 42
      };
      const source: Observable<PrimitiveState> = m.cold('a|', {a:primitiveState});
      m.expect(source.pipe(select(map(s => s.bol)))).toBeObservable('a|', {a: true});
    })
  );

  it('should accept multiple operators', marbles(m => {
      const nestedState: NestedState = {
        obj: { key1: {key11: {key111: 'test'}} }
      };
      const source: Observable<NestedState> = m.cold('a|', {a:nestedState});
      m.expect(source.pipe(select(
        map(s => s.obj),
        map(s => s.key1),
        map(s => s.key11),
        map(s => s.key111),
      ))).toBeObservable('a|', {a: 'test'});
    })
  );

});
