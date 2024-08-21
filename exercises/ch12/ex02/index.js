export function fibonacciSequence() {
  let x = 0;
  let y = 1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const value = y; // yの値を退避
      [x, y] = [y, x + y]; // 次のフィボナッチ数の計算
      return { value: value }; // 退避していたyの値を返す
    },
  };
}
