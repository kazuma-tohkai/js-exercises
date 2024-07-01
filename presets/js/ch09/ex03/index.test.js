import { C, D, E } from "./index.js";

describe("", () => {
  it("もとのクラス", () => {
    const c = new C();
    expect(c.getX()).toBe(42);
    c.x = 50;
    expect(c.getX()).toBe(50);
  });

  it("プライベートフィールドを使ったクラス", () => {
    const d = new D();
    expect(d.getX()).toBe(42);
    // d.#x = 50 //SyntaxErrorになる
    expect(d.getX()).toBe(42);
  });

  it("クロージャを使ったクラス", () => {
    const e = new E();
    expect(e.method().getX()).toBe(42);
    e.method().setX(50);
    expect(e.method().getX()).toBe(42);
  });
});
