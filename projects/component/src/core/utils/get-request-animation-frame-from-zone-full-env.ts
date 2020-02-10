export function getRequestAnimationFrameFromZoneFullEnv() {
  // '__zone_symbol__requestAnimationFrame' reference to the
  // NOT PATCHED requestAnimationFrame of the browser
  return (window as any).__zone_symbol__requestAnimationFrame;
}
