export function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
