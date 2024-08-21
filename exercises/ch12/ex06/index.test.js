import { walk } from "./index.js";

test("walk", () => {
  // ch12/ex06/dirA
  // | - fileA.txt
  // | - fileB.txt
  // | - dirB
  //     | - fileC.txt
  //     | - fileD.txt
  //     | - dirC
  //          | - fileE.txt
  // | - dirD
  //     | - fileF.txt

  const expectedResult = [
    { path: "ch12/ex06/dirA/fileA.txt", isDirectory: false },
    { path: "ch12/ex06/dirA/fileB.txt", isDirectory: false },

    { path: "ch12/ex06/dirA/dirB", isDirectory: true },
    { path: "ch12/ex06/dirA/dirB/fileC.txt", isDirectory: false },
    { path: "ch12/ex06/dirA/dirB/fileD.txt", isDirectory: false },

    { path: "ch12/ex06/dirA/dirB/dirC", isDirectory: true },
    { path: "ch12/ex06/dirA/dirB/dirC/fileE.txt", isDirectory: false },

    { path: "ch12/ex06/dirA/dirD", isDirectory: true },
    { path: "ch12/ex06/dirA/dirD/fileF.txt", isDirectory: false },
  ];
  const result = [...walk("ch12/ex06/dirA")];
  expect(result).toEqual(expect.arrayContaining(expectedResult));
  expect(expectedResult).toEqual(expect.arrayContaining(result));
});
