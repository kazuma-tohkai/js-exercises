import { equals } from "./index.js";
describe("２つのオブジェクトが同じ内容なら、別オブジェクトでも true を返す", () => {
  it("同じ内容のオブジェクト(長さ2)", () => {
    const obj1 = { x: 1, y: 2 };
    const obj2 = { x: 1, y: 2 };
    expect(equals(obj1, obj2)).toBe(true);
  });
  it("同じ内容のオブジェクト(長さ3)", () => {
    const obj1 = { x: 1, y: 2, z: 3 };
    const obj2 = { x: 1, y: 2, z: 3 };
    expect(equals(obj1, obj2)).toBe(true);
  });
  it("値が違うオブジェクト", () => {
    const obj1 = { x: 1, y: 2, z: 3 };
    const obj2 = { x: 1, y: 3, z: 3 };
    expect(equals(obj1, obj2)).toBe(false);
  });
  it("プロパティ名が違うオブジェクト", () => {
    const obj1 = { x: 1, y: 2, w: 3 };
    const obj2 = { x: 1, y: 2, z: 3 };
    expect(equals(obj1, obj2)).toBe(false);
  });
  it("長さが違うオブジェクト", () => {
    const obj1 = { x: 1, y: 2 };
    const obj2 = { x: 1, y: 2, z: 3 };
    expect(equals(obj1, obj2)).toBe(false);
  });
});
