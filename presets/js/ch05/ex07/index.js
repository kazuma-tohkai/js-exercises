function f() {
  try {
    return true;
  } finally {
    // eslint-disable-next-line
    return false;
  }
}

console.log(f());
