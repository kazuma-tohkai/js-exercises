import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("全て自然数", () => {
      expect(sum([42, 48, 10])).toBe(100);
    });

    it("負の数も混じっている", () => {
      expect(sum([4, -6, 7, 1])).toBe(6);
    });

    it("配列の長さが1", () => {
      expect(sum([0])).toBe(0);
    });
  });

  describe("factorial", () => {
    it("自然数", () => {
      expect(factorial(5)).toBe(120);
    });

    it("0", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});
