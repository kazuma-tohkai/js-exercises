import { littleToBig, bigToLittle } from "./index.js";

describe("littleToBig", () => {
  it("test1", () => {
    const arr = Uint32Array.of(0x01000000);
    expect(littleToBig(arr)).toStrictEqual(0x00000001);
  });
  it("test2", () => {
    const arr = Uint32Array.of(0x021f0a00);
    expect(littleToBig(arr)).toStrictEqual(0x000a1f02);
  });
});

describe("bigToLittle", () => {
  it("test1", () => {
    const arr = Uint32Array.of(0x01000000);
    expect(bigToLittle(arr)).toStrictEqual(0x00000001);
  });
  it("test2", () => {
    const arr = Uint32Array.of(0x021f0a00);
    expect(bigToLittle(arr)).toStrictEqual(0x000a1f02);
  });
});
