import {marbles} from 'rxjs-marbles/jest';
import {createSideEffectObservable} from "./side-effect-observable";
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
describe('createSideEffectObservable', () => {
  it('should return object', marbles(m => {
    const ef = createSideEffectObservable();
    expect(ef).toBeDefined();
    })
  );
});
