import { p } from "./index.js";

// https://keisan.casio.jp/exec/system/1179218858 で計算
describe("極座標からデカルト座標を求める", () => {
  it("xとyを求める_1", () => {
    p.r = 2;
    p.theta = 1;
    expect(p.x).toBeCloseTo(1.080604612);
    expect(p.y).toBeCloseTo(1.68294197);
  });
  it("xとyを求める_2", () => {
    p.r = 3.5;
    p.theta = 2;
    expect(p.x).toBeCloseTo(-1.456513928);
    expect(p.y).toBeCloseTo(3.182540994);
  });
  it("xとyを求める_3", () => {
    p.r = 4;
    p.theta = Math.PI;
    expect(p.x).toBeCloseTo(-4);
    expect(p.y).toBeCloseTo(0);
  });
  it("xとyを求める_4", () => {
    p.r = 0;
    p.theta = Math.PI;
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(0);
  });
  it("xの値を変更し、rを計算し直す", () => {
    p.theta = 2;
    p.x = -1.664587346;
    expect(p.r).toBeCloseTo(4);
  });
  it("yの値を変更し、rを計算し直す", () => {
    p.theta = 1.8;
    p.y = 4.869238154;
    expect(p.r).toBeCloseTo(5);
  });
  it("xにNaNを渡す", () => {
    expect(() => {
      p.x = 0 / 0;
    }).toThrow("NaNが渡されました");
  });
  it("yにNaNを渡す", () => {
    expect(() => {
      p.y = 0 / 0;
    }).toThrow("NaNが渡されました");
  });
});
