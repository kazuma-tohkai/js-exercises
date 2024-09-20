import { Hiragana } from "./index.js";

test("Hiragana", () => {
  const a = new Hiragana("あ");
  const o = new Hiragana("お");
  expect(a < o).toBe(true); // < で比較（数字が期待される）
  expect(`${a}${o}`).toBe("あお"); // 文字列が期待される
  expect(o - a).toBe(8); // 数字が期待される(12362-12354)
  expect(a + o).toBe("あお"); // どちらでもない場合
});
