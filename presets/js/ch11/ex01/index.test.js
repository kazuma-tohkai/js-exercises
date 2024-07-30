import { TypeMap } from "./index.js";

test("typeMap", () => {
  const typeMap = new TypeMap();
  typeMap.set(String, "string");
  typeMap.set(Number, 123);
  typeMap.set(Array, [1, 3, 3]);

  class Foo {}
  typeMap.set(Foo, new Foo());

  const now = Date.now();
  typeMap.set(Date, now);

  expect(() => {
    typeMap.set(Foo, [1, 3, 3]);
  }).toThrowError();

  expect(() => {
    typeMap.set(Date, "not a date");
  }).toThrowError();

  expect(typeMap.get(String)).toBe("string");
  expect(typeMap.get(Number)).toBe(123);
  expect(typeMap.get(Array)).toStrictEqual([1, 3, 3]);
  expect(typeMap.get(Foo)).toStrictEqual(new Foo());
  expect(typeMap.get(Date)).toBe(now);
});
