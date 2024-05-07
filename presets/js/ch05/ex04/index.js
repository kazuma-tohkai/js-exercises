export function fibWhile() {
  let f0 = 0;
  let f1 = 1;
  let f2 = 1;
  let n = 0;
  const fib = [];
  while (n < 10) {
    fib[n] = f1;
    f2 = f1 + f0;
    f0 = f1;
    f1 = f2;
    n++;
  }
  return fib;
}
export function fibDoWhile() {
  let f0 = 0;
  let f1 = 1;
  let f2 = 1;
  let n = 0;
  const fib = [];
  do {
    fib[n] = f1;
    f2 = f1 + f0;
    f0 = f1;
    f1 = f2;
    n++;
  } while (n < 10);
  return fib;
}
export function fibFor() {
  let f0 = 0;
  let f1 = 1;
  let f2 = 1;
  const fib = [];
  for (let n = 0; n < 10; n++) {
    fib[n] = f1;
    f2 = f1 + f0;
    f0 = f1;
    f1 = f2;
  }
  return fib;
}
