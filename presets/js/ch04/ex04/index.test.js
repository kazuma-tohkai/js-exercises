import { bitCount } from "./index.js";
describe("１であるビットの数をカウント", () => {
  it("1であるビットの数:3(2進数表記)", () => {
    expect(bitCount(0b111)).toBe(3);
  });
  it("1であるビットの数:31(2進数表記)", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });
  it("1であるビットの数:3(10進数表記)", () => {
    expect(bitCount(7)).toBe(3);
  });
  it("1であるビットの数:31(16進数表記)", () => {
    expect(bitCount(0x7fffffff)).toBe(31);
  });
  it("1であるビットの数:7(10進数表記)", () => {
    expect(bitCount(1315632)).toBe(7);
  });
});
