import { removeOddNumber } from "./index.js";
describe("偶数のプロパティだけ返す関数のテスト", () => {
  it("奇数と偶数が混じっているオブジェクト", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(removeOddNumber(obj)).toEqual({ b: 2 });
  });
  it("すべて偶数のオブジェクト", () => {
    const obj = { a: 0, b: 100, c: 322 };
    expect(removeOddNumber(obj)).toEqual({ a: 0, b: 100, c: 322 });
  });
  it("すべて奇数のオブジェクト", () => {
    const obj = { a: 1, b: 99, c: 153 };
    expect(removeOddNumber(obj)).toEqual({});
  });
});
