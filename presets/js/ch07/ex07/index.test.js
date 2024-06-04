import { shakerSort } from "./index.js";

it("シェーカーソートのテスト", () => {
  const array = [6, 1, 52, 51.9, 94, 347, 13, 1, 6, -8, 7, 46, 825, 15, 76];
  const arraySort = [...array].sort((a, b) => a - b);
  expect(shakerSort(array)).toEqual(arraySort);
});
