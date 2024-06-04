import { assign } from "./index.js";

describe("", () => {
  it("Symbolを含まない", () => {
    const target = { x: 1 };
    const source1 = { x: 2, y: 2 };
    const source2 = { y: 3, z: 4 };

    expect(assign({}, target, source1, source2)).toEqual(
      Object.assign({}, target, source1, source2)
    );
  });

  it("Symbolを含む", () => {
    const symname1 = Symbol("propname");
    const symname2 = Symbol("propname");

    const target = { x: 1, [symname1]: 1 };
    const source1 = { x: 2, y: 2 };
    const source2 = { y: 3, z: 4, [symname2]: 2 };

    expect(assign({}, target, source1, source2)).toEqual(
      Object.assign({}, target, source1, source2)
    );
  });

  it("列挙不可なプロパティを含む(Symbol以外)", () => {
    const target = { x: 1 };
    Object.defineProperty(target, "A", {
      value: "1",
      writable: true,
      enumerable: false,
      configurable: true,
    });

    const source1 = { x: 2, y: 2 };
    Object.defineProperty(source1, "B", {
      value: "2",
      writable: true,
      enumerable: false,
      configurable: true,
    });

    const source2 = { y: 3, z: 4 };

    expect(assign({}, target, source1, source2)).toEqual(
      Object.assign({}, target, source1, source2)
    );
  });

  it("列挙不可かつSymbolのプロパティを含む", () => {
    const symname1 = Symbol("propname");
    const symname2 = Symbol("propname");

    const target = { x: 1 };
    Object.defineProperty(target, symname1, {
      value: "1",
      writable: true,
      enumerable: false,
      configurable: true,
    });

    const source1 = { x: 2, y: 2 };
    Object.defineProperty(source1, symname2, {
      value: "2",
      writable: true,
      enumerable: false,
      configurable: true,
    });

    const source2 = { y: 3, z: 4 };

    expect(assign({}, target, source1, source2)).toEqual(
      Object.assign({}, target, source1, source2)
    );
  });
});
