import { Soldier, MagicSoldier, Soldier2, MagicSoldier2 } from "./index.js";

describe("classを使った記法", () => {
  it("Soldier", () => {
    const s = new Soldier(5);
    expect(s.attack()).toBe(10);
  });
  it("MagicSoldier", () => {
    const m = new MagicSoldier(6, 4);
    expect(m.attack()).toBe(16);
  });
});

describe("prototypeを使った記法", () => {
  it("Soldier2", () => {
    const s = new Soldier2(5);
    expect(s.attack()).toBe(10);
  });
  it("MagicSoldier2", () => {
    const m = new MagicSoldier2(6, 4);
    expect(m.attack()).toBe(16);
  });
});
