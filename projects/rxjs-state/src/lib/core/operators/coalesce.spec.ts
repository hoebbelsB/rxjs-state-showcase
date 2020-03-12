import {marbles} from 'rxjs-marbles/jest';
import {coalesce} from "./coalesce";
import {EMPTY, NEVER} from "rxjs";

// tslint:disable: no-duplicate-string
describe('coalesce', () => {
  it('should mirror EMPTY', marbles(m => {
      const source = EMPTY;
      m.expect(source.pipe(coalesce())).toBeObservable('|');
    })
  );

  it('should mirror NEVER', marbles(m => {
      const source = NEVER;
      m.expect(source.pipe(coalesce())).toBeObservable('');
    })
  );

  it('should pass single values as they are', marbles(m => {
      const source = m.cold('v|');
      m.expect(source.pipe(coalesce())).toBeObservable('v|');
    })
  );

  describe('default config', () => {
    it('should pass only one value per tick', marbles(m => {
        const source = m.cold('abcde|');
        m.expect(source.pipe(coalesce())).toBeObservable('a----|');
      })
    );

    it('should pass only one values per tick per subscription', marbles(m => {
        const source = m.cold('abcde|');
        m.expect(source.pipe(coalesce())).toBeObservable('a----|');
      })
    );
  });

  describe('scoping', () => {

    it('subscription', marbles(m => {
        // @TODO
      })
    );

    it('operator', marbles(m => {
        // @TODO
      })
    );

    it('observable', marbles(m => {
        // @TODO
      })
    );

    it('global', marbles(m => {
        // @TODO
      })
    );

    it('random object', marbles(m => {
        // @TODO
      })
    );
  });

  describe('coalescing', () => {

    it('leading', marbles(m => {
        // @TODO
      })
    );

    it('training', marbles(m => {
        // @TODO
      })
    );


    it('both', marbles(m => {
        // @TODO
      })
    );


    it('sync', marbles(m => {
        // @TODO
      })
    );

    it('promise', marbles(m => {
        // @TODO
      })
    );

    it('timeout', marbles(m => {
        // @TODO
      })
    );

    it('setInterval', marbles(m => {
        // @TODO
      })
    );

    it('animationFrame', marbles(m => {
        // @TODO
      })
    );
  })

});
