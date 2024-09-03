import { counter } from "./index.js";

test("counter", () => {
  const c = counter();
  const values = []; // テスト結果を格納する配列
  for (let n = 1; n <= 10; n++) {
    // 5のときにリセット
    if (n === 5) {
      values.push(c.throw("Reset").value);
    }
    // 5以外のときはカウントを進める
    else values.push(c.next().value);
  }
  expect(values).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, 5, 6]);
});
