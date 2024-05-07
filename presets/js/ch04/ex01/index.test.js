import { add, sub, mul, div } from "./index.js";
describe("imaginaryNumber", () => {
  describe("add", () => {
    it("すべて自然数", () => {
      expect(
        add(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: 4, imaginaryPart: 6 });
    });
    it("実部に0が含まれる", () => {
      expect(
        add(
          { realPart1: 0, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: 3, imaginaryPart: 6 });
    });
    it("虚部に0が含まれる", () => {
      expect(
        add(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 0 }
        )
      ).toEqual({ realPart: 4, imaginaryPart: 2 });
    });
  });
  describe("sub", () => {
    it("すべて自然数", () => {
      expect(
        sub(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: -2, imaginaryPart: -2 });
    });
    it("実部に0が含まれる", () => {
      expect(
        sub(
          { realPart1: 0, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: -3, imaginaryPart: -2 });
    });
    it("虚部に0が含まれる", () => {
      expect(
        sub(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 0 }
        )
      ).toEqual({ realPart: -2, imaginaryPart: 2 });
    });
  });
  describe("mul", () => {
    it("すべて自然数", () => {
      expect(
        mul(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: -5, imaginaryPart: 10 });
    });
    it("実部に0が含まれる", () => {
      expect(
        mul(
          { realPart1: 0, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: -8, imaginaryPart: 6 });
    });
    it("虚部に0が含まれる", () => {
      expect(
        mul(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 0 }
        )
      ).toEqual({ realPart: 3, imaginaryPart: 6 });
    });
  });
  describe("div", () => {
    it("すべて自然数", () => {
      expect(
        div(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: 0.44, imaginaryPart: 0.08 });
    });
    it("実部に0が含まれる", () => {
      expect(
        div(
          { realPart1: 0, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 4 }
        )
      ).toEqual({ realPart: 0.32, imaginaryPart: 0.24 });
    });
    it("虚部に0が含まれる", () => {
      expect(
        div(
          { realPart1: 1, imaginaryPart1: 2 },
          { realPart2: 3, imaginaryPart2: 0 }
        )
      ).toEqual({ realPart: 3 / 9, imaginaryPart: 6 / 9 });
    });
  });
});
