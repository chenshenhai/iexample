export function debounce(fn: Function, n = 100) {
  let handle: any;
  return (...args: any[]) => {
    if (handle) clearTimeout(handle);
    handle = setTimeout(() => {
      fn(...args);
    }, n);
  };
}

export function throttle(
  fn: (...args: any[]) => any,
  timeout: number
): (...args: any[]) => any {
  let timer: any = -1;
  return function (...args: any[]) {
    if (timer > 0) {
      return;
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = -1;
    }, timeout);
  };
}
