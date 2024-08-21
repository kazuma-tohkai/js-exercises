import { counter } from "./index.js";

test("counter", () => {
  const c = counter();
  const values = [];
  for (let n = 1; n <= 10; n++) {
    // 5のときにリセット
    if (n === 5) {
      values.push(c.throw("Reset").value);
    } else values.push(c.next().value);
  }
  expect(values).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, 5, 6]);
});
