import { Type } from '@angular/core';

export function isIvy(pipe: Type<any>): boolean {
  // @TODO SSR
  const w: any = window as any;

  // Angular 8 View Engine
  if (w.ng && w.ng.probe) {
    return false;
  }

  // Angular 8 Ivy
  if ((pipe as any).ngPipeDef) {
    return true;
  }

  // Angular 9 Ivy
  if ((pipe as any).ɵpipe) {
    return true;
  } else {
    throw new Error('Ivy detection not working');
  }
}
