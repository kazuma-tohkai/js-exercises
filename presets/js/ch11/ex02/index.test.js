import { cache } from "./index.js";
import { jest } from "@jest/globals";

test("", () => {
  function slowFn(obj) {
    // 時間のかかる処理
    obj.push(3);
    return obj;
  }

  // キャッシュにデータが保存されているか確認
  const mock = jest.fn();

  // cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
  const cachedSlowFn = cache(slowFn);

  const obj1 = [1, 2];

  expect(cachedSlowFn(obj1, mock)).toStrictEqual([1, 2, 3]);
  expect(mock).toHaveBeenCalledTimes(1);
  mock.mockClear();

  expect(cachedSlowFn(obj1, mock)).toStrictEqual([1, 2, 3]);
  expect(mock).toHaveBeenCalledTimes(0); // キャッシュから計算結果を取得するのでmock関数は呼ばれない
  mock.mockClear();

  //   obj1 = [2, 3]; // オブジェクトが不要になった
  //   expect(cachedSlowFn(obj1, mock)).toStrictEqual(null);

  const obj2 = [3, 4];
  expect(cachedSlowFn(obj2, mock)).toStrictEqual([3, 4, 3]);
  expect(mock).toHaveBeenCalledTimes(1);
  mock.mockClear();
});
