export function pop(seq) {
  return seq.slice(0, -1);
}

export function push(seq, element) {
  return [...seq, element];
}

export function shift(seq) {
  return seq.slice(1);
}

export function unshift(seq, element) {
  return [element, ...seq];
}

export function sort(seq, fn) {
  return [...seq].sort(fn);
}
