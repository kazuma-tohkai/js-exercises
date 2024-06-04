export function sum(array) {
  // arrayがtrueに変換できれば合計を求める(初期値0)
  // arrayがfalseに変換されれば0を返す
  return array ? array.reduce((x, y) => x + y, 0) : 0;
}

export function join(array, str) {
  // arrayが渡されなかったらエラーを返す
  if (array === undefined) throw new Error();

  return array.reduce(
    (x, elem, index) =>
      // arrayの最初のインデックス以外は、これまでの簡約化処理の結果にstrを連結する
      // strがundefinedの場合カンマに置き換える
      (index !== 0 ? x + (str === undefined ? "," : String(str)) : "") +
      // arrayの要素を連結する(要素がnullの場合は空白文字とする)
      (elem || ""),
    // 初期値は空白文字(arrayが空の配列の場合は空白文字だけ返す)
    ""
  );
}

export function reverse(array) {
  // arrayが渡されなかったらエラーを返す
  if (array === undefined) throw new Error();

  // 結果配列result
  const result = [];

  // arrayのインデックスの大きい方から処理する
  array.reduceRight(
    // arrayの要素をresultに追加(arrayの最後の要素はスキップ)
    (x, elem, index) => index !== array.length - 1 && result.push(elem),
    // arrayのlengthが0じゃない場合、resultにarrayの最後の要素を追加する
    array.length !== 0 && result.push(array[array.length - 1])
  );

  return result;
}

export function every(array, isBelowThreshold) {
  return array.reduce(
    // これまでの簡約化処理の結果がtrueなら、今の配列の要素に対してもisBelowThreshold関数で評価する
    // これまでの簡約化処理の結果に1つでもfalseがあれば、以後は評価せずにずっとfalseを返す
    (x, elem, index, arr) => (x ? isBelowThreshold(elem, index, arr) : false),
    // arrayが空の配列の場合はtrueを返す
    // それ以外の場合、isBelowThreshold関数にarrayの最初のインデックスの要素を渡す
    array.length === 0 ? true : isBelowThreshold(array[0], 0, array)
  );

  // expect(original).toStrictEqual([1, 1, 2]); をパスする方法が分からない
}

export function some(array, isBelowThreshold) {
  return array.reduce(
    // これまでの簡約化処理の結果がfalseなら、今の配列の要素に対してもisBelowThreshold関数で評価する
    // これまでの簡約化処理の結果に1つでもtrueがあれば、以後は評価せずにずっとtrueを返す
    (x, elem, index, arr) => (x ? true : isBelowThreshold(elem, index, arr)),
    // arrayが空の配列の場合はtrueを返す
    // それ以外の場合、isBelowThreshold関数にarrayの最初のインデックスの要素を渡す
    array.length === 0 ? false : isBelowThreshold(array[0], 0, array)
  );

  // expect(original).toStrictEqual([1, 1, 2]); をパスする方法が分からない
}
