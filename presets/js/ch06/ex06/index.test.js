import { getPropertyName } from "./index.js";
describe("", () => {
  it("独自プロパティはすべて列挙、継承プロパティは列挙可能かつSymbok以外のプロパティのみ列挙", () => {
    // プロトタイプ
    const prototype = {
      A: "A",
    };
    //   prototypeに列挙不可のプロパティを追加
    Object.defineProperty(prototype, "B", {
      value: "B",
      writable: true,
      enumerable: false,
      configurable: true,
    });
    //   prototypeにSymbolのプロパティを追加
    const symname1 = Symbol("C");
    prototype[symname1] = "C";

    // prototypeを継承してobjを生成
    const obj = Object.create(prototype);
    // objにプロパティを追加
    obj.D = "D";
    // objに列挙不可のプロパティを追加
    Object.defineProperty(obj, "E", {
      value: "E",
      writable: true,
      enumerable: false,
      configurable: true,
    });
    //   objにSymbolのプロパティを追加
    const symname2 = Symbol("F");
    obj[symname2] = "F";

    expect(JSON.stringify(getPropertyName(obj))).toEqual(
      JSON.stringify(["D", "E", Symbol("F"), "A"])
    );
  });
});
