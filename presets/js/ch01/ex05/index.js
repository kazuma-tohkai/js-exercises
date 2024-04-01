export function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x;
  }
}

export function sum(array) {
  let sum = 0;
  for (const x of array) {
    sum += x;
  }
  return sum;
}

export function factorial(n) {
  let i,
    product = 1;
  for (i = 2; i <= n; i++) {
    product *= i;
  }
  return product;
}
