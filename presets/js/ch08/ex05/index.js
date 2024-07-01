export const sequenceToObject = (...values) => {
  if (values.length % 2 !== 0)
    throw new Error("値の個数の合計が偶数ではありません");

  // 結果格納オブジェクト
  const obj = {};

  // 配列のインデックス
  let n = 0;

  // values配列に対してfor/ofループ
  for (const value of values) {
    //   奇数番のときに実行(インデックスは0から始まる)
    if (n % 2 === 0) {
      if (typeof value !== "string")
        throw new Error("奇数番の値がstringではありません");
      // 奇数番の値をプロパティ名、その次の値をオブジェクトの値に設定する。
      obj[value] = values[n + 1];
    }
    n++;
  }
  return obj;
};
