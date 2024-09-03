import { walkAsync } from "./index.js";

test("walk", async () => {
  // ch12/ex06/
  // ├── A
  // ├── B
  // │   └── C
  // │       └── buz.txt
  // └── foo.txt
  // ├── index.js
  // ├── index.test.js

  const expectedResult = [
    { path: "ch13/ex13/A", isDirectory: true },
    { path: "ch13/ex13/B", isDirectory: true },
    { path: "ch13/ex13/B/C", isDirectory: true },
    { path: "ch13/ex13/B/C/buz.txt", isDirectory: false },
    { path: "ch13/ex13/foo.txt", isDirectory: false },
    { path: "ch13/ex13/index.js", isDirectory: false },
    { path: "ch13/ex13/index.test.js", isDirectory: false },
  ];
  const result = [];
  await (async () => {
    for await (const elem of walkAsync("ch13/ex13")) {
      result.push(elem);
    }
  })();

  expect(result).toEqual(expect.arrayContaining(expectedResult));
  expect(expectedResult).toEqual(expect.arrayContaining(result));
});
