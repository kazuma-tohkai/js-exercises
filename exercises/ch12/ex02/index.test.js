import { fibonacciSequence } from "./index.js";

it("fibonacciSequenceのテスト", () => {
  // fibonacciSequenceをfor/ofループで使用する
  function fibonacci(n) {
    for (const f of fibonacciSequence()) {
      if (n-- <= 0) return f;
    }
  }

  // テキストのジェネレータ関数
  function* fibonacciSequenceGenerator() {
    let x = 0;
    let y = 1;
    for (;;) {
      yield y;
      [x, y] = [y, x + y];
    }
  }
  // ジェネレータ関数をfor/ofループで使用する
  function fibonacciGenerator(n) {
    for (const f of fibonacciSequenceGenerator()) {
      if (n-- <= 0) return f;
    }
  }

  expect(fibonacci(0)).toBe(fibonacciGenerator(0));
  expect(fibonacci(1)).toBe(fibonacciGenerator(1));
  expect(fibonacci(5)).toBe(fibonacciGenerator(5));
  expect(fibonacci(20)).toBe(fibonacciGenerator(20));
});
