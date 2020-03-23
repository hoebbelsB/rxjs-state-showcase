 Rough description

 ![](generateFrames.png)

 Detailed description
 
 ```typescript
export function generateFrames(
  asyncProducer: asyncProducerFn,
  asyncCanceler: asyncCancelerFn,
  timestampProvider: TimestampProvider = Date
): Observable<number>;
```

 ## Example
 
 ```ts
import { generateFrames } from "rxjs-state";

const afUnpatched$ =  generateFrames(
  window.__zone_symbol__requestAnimationFrame,
  window.cancelAnimationFrame()
);
 ```

 @param {...OperatorFunction | MonotypeOperatorFunction} properties for the operators to apply to the source
 value (an object).
 @return {Observable} A new Observable of milliseconds between frames.
 
