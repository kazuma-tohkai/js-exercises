export const any = (...f) => {
  // 関数の配列fにたいしてsomeメソッドを実行する
  // someメソッドで使う述語関数は自分自身の関数の実行結果
  return function (...arg) {
    return f.some((f) => f.apply(this, arg));
  };
};

export const catching = (func1, func2) => {
  // 最初にfunc1を実行してエラーがなければその結果を返す
  // エラーがでれば、func2にエラーを渡してその結果を返す
  return function (arg) {
    try {
      return func1.call(this, arg);
    } catch (e) {
      return func2.call(this, e);
    }
  };
};
