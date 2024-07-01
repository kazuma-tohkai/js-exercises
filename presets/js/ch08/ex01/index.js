// 自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
export const func1 = (callback, n, c) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    console.log(c);
    callback();
    arr.push(c);
  }
  return arr;
};

// 数値xを引数にとり、xの二乗の数値を返す
// 関数本体がreturn文だけの場合は、returnキーワードとセミコロン、中括弧を省略できる
// パラメータが1つだけなのでパラメータを囲む丸括弧も省略できるが、Prettierによる整形で丸括弧がつく
export const squared = (x) => x * x;

// 引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
// 関数本体がreturn文だけで、戻り値となる式がオブジェクトリテラルの場合は、
// オブジェクトリテラルを丸括弧の中に記述する
export const dateNow = () => ({ now: Date.now() });
