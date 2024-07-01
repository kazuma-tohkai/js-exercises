import { func1, squared, dateNow } from "./index.js";
import { jest } from "@jest/globals";

describe("アロー関数のテスト", () => {
  it("1", () => {
    const mock = jest.fn();
    expect(func1(mock, 5, "hoge")).toEqual([
      "hoge",
      "hoge",
      "hoge",
      "hoge",
      "hoge",
    ]);
    expect(mock).toHaveBeenCalledTimes(5);
  });
  it("2", () => {
    expect(squared(5)).toBe(25);
  });
  it("3", () => {
    const now = { now: Date.now() };
    expect(dateNow()).toStrictEqual(now);
  });
});
