import { equalArrays } from "./index.js";
describe("replaceNewLineCode", () => {
  it("同じ配列", () => {
    const a = ["a", "b", "c"];
    const b = ["a", "b", "c"];
    expect(equalArrays(a, b)).toBe(true);
  });
  it("違う配列", () => {
    const a = ["a", "b", "c"];
    const b = ["a", "b", "d"];
    expect(equalArrays(a, b)).toBe(false);
  });
  it("違う引数なのにtrueを返す", () => {
    // サロゲートペアBLUE HEART
    const a = "\ud83d\udc99";
    console.log(a);
    const b = ["\ud83d", "\udc99"];
    console.log(b);
    expect(equalArrays(a, b)).toBe(true);
  });
});
