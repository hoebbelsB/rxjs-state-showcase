Docs Draft:

# generateFrames

Observable creation functions helpful in environments with patched global APIs like zone.js environments.

## Description 

Like `animationFrames` this function returns an observable emitting the passed milliseconds with every animationFrame starting from the moment of subscription.
In comparison to `animationFrames`, `generateFrames` is more generic and is able to take `animationFrame`, `setInterval`, `setTimeout` PromiseLike things, etc.

This is especially helpful in environments where global APIs are patched by libraries like zone.js. 
Using this operator can ensure we use an unpatched version of the API.

## Signature
```typescript
export function generateFrames(
  asyncProducer: asyncProducerFn,
  asyncCanceler: asyncCancelerFn,
  timestampProvider: TimestampProvider = Date
): Observable<number>;
```
## Usage

```typescript
import { Observable} from 'rxjs';
import { generateFrames } from '@ngrx/component';

const afUnpatched$: Observable<number> =  generateFrames(
  window.__zone_symbol__requestAnimationFrame,
  window.__zone_symbol__cancelAnimationFrame
);
```
