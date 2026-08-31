export function pick<T>(arr: T[]) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}
