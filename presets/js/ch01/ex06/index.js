export function fib(x) {
  let f0 = 0;
  let f1 = 1;
  let f2;
  let n = 1;
  while (n < x) {
    f2 = f1 + f0;
    f0 = f1;
    f1 = f2;
    n++;
  }
  return f2;
}
