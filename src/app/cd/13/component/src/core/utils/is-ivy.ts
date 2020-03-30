import { getGlobalThis } from './get-global-this';

// Table for ng global presence in ViewEngine and Ivy for prod/dev modes:
//
// | render     |  ViewEngine    |  ViewEngine    |      Ivy          |      Ivy          |
// | mode       |     prod       |      dev       |      prod         |      dev          |
// | ng         |     present    |     present    |     undefined     |     present       |
// | ng.probe   |     present    |     present    |     undefined     |     undefined     |
//
// So for Ivy we need to make sure that ng is undefined or,
// in case of dev environment, ng.probe is undefined

export function isIvy(): boolean {
  const ng: any = getGlobalThis().ng;

  // Is the global ng object is unavailable?
  // ng === undefined in Ivy production mode
  // View Engine has the ng object both in development mode and production mode.
  return (
    ng === undefined ||
    // in case we are in dev mode in ivy
    // `probe` property is available on ng object we use View Engine.
    ng.probe === undefined
  );
}
