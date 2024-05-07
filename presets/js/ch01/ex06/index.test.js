import { fib } from "./index.js";

describe("fib", () => {
  it("5", () => {
    expect(fib(5)).toBe(5);
  });
  it("75", () => {
    expect(fib(75)).toBe(2111485077978050);
  });
  it("0", () => {
    expect(fib(0)).toBe(1);
  });
  it("1", () => {
    expect(fib(1)).toBe(1);
  });
});
