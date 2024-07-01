import { C } from "./index.js"; // ts でも可

test("class puzzle", () => {
  expect(C.method()).toBe(1); //静的メソッド static method()
  expect(new C().method()).toBe(2); // インスタンスメソッド method()
  expect(C.C.method()).toBe(3); // 静的フィールドCが入れ子クラスCになっており、入れ子クラスCの静的メソッド static method()
  expect(new C.C().method()).toBe(4); // 静的フィールドCが入れ子クラスCになっており、入れ子クラスCのインスタンスメソッドmethod()
  expect(new C().C.method()).toBe(5); // クラスのプロパティthis.Cが入れ子クラスになっており、入れ子クラスCの静的メソッド static method()
  expect(new new C().C().method()).toBe(6); // クラスのプロパティthis.Cが入れ子クラスになっており、入れ子クラスCのインスタンスメソッド method()
});
