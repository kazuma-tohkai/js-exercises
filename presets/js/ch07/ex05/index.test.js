import { pop, push, shift, unshift, sort } from "./index.js";

describe("非破壊的版関数", () => {
  const seq = [1, 2, 3, 4, 5];
  it("pop", () => {
    expect(pop(seq)).toEqual([1, 2, 3, 4]);
  });
  it("push", () => {
    expect(push(seq, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("shift", () => {
    expect(shift(seq)).toEqual([2, 3, 4, 5]);
  });
  it("unshift", () => {
    expect(unshift(seq, 0)).toEqual([0, 1, 2, 3, 4, 5]);
  });
  it("sort", () => {
    expect(sort(seq, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
  });
  it("元の配列は変更されていない", () => {
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
});
