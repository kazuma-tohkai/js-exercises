export function addMyCall(f) {
  // fのメソッドとしてmyCallを追加する
  // myCallの第1引数はオブジェクトで、オブジェクトにfをバインドする
  // myCallの第2引数は残余パラメータとする。fを呼び出すときにスプレッド演算子で展開して渡す
  f.myCall = function (obj, ...arg) {
    return f.bind(obj)(...arg);
  };
  return f;
}
