import { Point } from "./index.js";

describe("addメソッドのテスト", () => {
  it("正の整数", () => {
    const p = new Point(2, 3);
    const q = new Point(4, 6);
    expect(p.add(q)).toEqual({ x: 6, y: 9 });
  });
  it("負の整数", () => {
    const p = new Point(2, -3);
    const q = new Point(-4, 6);
    expect(p.add(q)).toEqual({ x: -2, y: 3 });
  });
});
