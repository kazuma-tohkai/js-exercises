import { TypedMap } from "./index.js";

describe("", () => {
  it("初期値なし", () => {
    const t = new TypedMap("string", "number");
    expect(t.set("a", 1)).toStrictEqual(Map(1) { 'a' => 1 });
  });
});
