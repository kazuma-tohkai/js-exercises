import { powerWithRecursive, powerWithLoop } from "./index.js";

describe("再帰", () => {
  it("正の整数", () => {
    expect(powerWithRecursive(3, 3)).toBe(3 ** 3);
  });
  it("正の整数", () => {
    expect(powerWithRecursive(5, 4)).toBe(5 ** 4);
  });
  it("0乗", () => {
    expect(powerWithRecursive(5, 0)).toBe(5 ** 0);
  });
  it("-4乗", () => {
    expect(powerWithRecursive(5, -4)).toBeCloseTo(5 ** -4);
  });
});
describe("ループ", () => {
  it("正の整数", () => {
    expect(powerWithLoop(3, 3)).toBe(3 ** 3);
  });
  it("正の整数", () => {
    expect(powerWithLoop(5, 4)).toBe(5 ** 4);
  });
  it("0乗", () => {
    expect(powerWithLoop(5, 0)).toBe(5 ** 0);
  });
  it("-4乗", () => {
    expect(powerWithLoop(5, -4)).toBeCloseTo(5 ** -4);
  });
});
