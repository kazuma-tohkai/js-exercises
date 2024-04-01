export function isSameValue(a, b) {
  const difference = a < b ? b - a : a - b;
  return difference < Math.pow(10, -10) ? true : false;
}
