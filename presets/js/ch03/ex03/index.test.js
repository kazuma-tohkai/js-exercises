import { isSameValue } from "./index.js";

describe("math", () => {
  it("整数 true", () => {
    expect(isSameValue(4, 4)).toBe(true);
  });
  it("整数 false", () => {
    expect(isSameValue(1, 4)).toBe(false);
  });
  it("整数計算 true", () => {
    expect(isSameValue(3 - 2, 1)).toBe(true);
  });
  it("整数計算 false", () => {
    expect(isSameValue(3 - 2, 2)).toBe(false);
  });
  it("小数1 true", () => {
    expect(isSameValue(0.3 - 0.2, 0.1)).toBe(true);
  });
  it("小数2 true", () => {
    expect(isSameValue(0.2 - 0.1, 0.1)).toBe(true);
  });
  it("小数3 true", () => {
    expect(isSameValue(1.2 - 0.1, 1.1)).toBe(true);
  });
  it("小数1 false", () => {
    expect(isSameValue(0.2 - 0.1, 0.2)).toBe(false);
  });
  it("小数2 false", () => {
    expect(isSameValue(1.2 - 0.1, 0.1)).toBe(false);
  });
});
