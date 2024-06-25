import { sequenceToObject } from "./index.js";

describe("可変長変数を受取オブジェクトを返却する", () => {
  it("成功ケース", () => {
    const arr = ["a", 1, "b", 2];
    expect(sequenceToObject(...arr)).toEqual({ a: 1, b: 2 });
  });
  it("引数に配列を含む", () => {
    const arr = ["a", 1, "b", [1, 2]];
    expect(sequenceToObject(...arr)).toEqual({
      a: 1,
      b: [1, 2],
    });
  });
  it("引数にオブジェクトを含む", () => {
    const arr = ["a", 1, "b", { a: 1 }];
    expect(sequenceToObject(...arr)).toEqual({
      a: 1,
      b: { a: 1 },
    });
  });
  it("値の個数の合計が偶数でない", () => {
    expect(() => {
      const arr = ["a", 1, "b"];
      sequenceToObject(...arr);
    }).toThrow("値の個数の合計が偶数ではありません");
  });
  it("奇数番の値がstringでない", () => {
    const arr = ["a", 1, 2, 2];
    expect(() => {
      sequenceToObject(...arr);
    }).toThrow("奇数番の値がstringではありません");
  });
});
