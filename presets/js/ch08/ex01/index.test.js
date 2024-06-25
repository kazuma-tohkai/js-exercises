import { func1, squared, dateNow } from "./index.js";
import { jest } from "@jest/globals";

describe("", () => {
  it("", () => {
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
  it("", () => {
    expect(squared(5)).toBe(25);
  });
  it("", () => {
    const now = { now: Date.now() };
    expect(dateNow()).toEqual(now);
  });
});
