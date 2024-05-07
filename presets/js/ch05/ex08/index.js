let x = 0;

for (let i = 1; i <= 5; i++) {
  x = i;
  try {
    throw Error();
  } catch {
    break;
    // eslint-disable-next-line
  } finally {
    // eslint-disable-next-line
    continue;
  }
}

console.log(x);
