import { fibWhile, fibDoWhile, fibFor } from "./index.js";

describe("フィボナッチ数列の最初の10個", () => {
  it("fibWhile", () => {
    expect(fibWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("fibDoWhile", () => {
    expect(fibDoWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("fibFor", () => {
    expect(fibFor()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
