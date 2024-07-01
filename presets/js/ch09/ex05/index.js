export const instanceOf = (object, constructor) => {
  let obj = object; // objectを変数に代入

  while (obj !== null) {
    // objがnullになるまでループ
    const p = Object.getPrototypeOf(obj); // プロトタイプオブジェクトを取得
    if (p?.constructor === constructor) return true; // コンストラクタが同じならtrueを返す
    obj = p;
  }
  return false; // プロトタイプオブジェクトがnullになるまでに、コンストラクタが同じものが見つからなければ継承関係にない
};
