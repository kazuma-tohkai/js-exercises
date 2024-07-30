// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  // この関数を実装する

  // キャッシュ用のWeakMapオブジェクトを生成
  const cache = new WeakMap();

  // オブジェクトを引数にとって、キャッシュの結果を返す関数
  return function (obj, mock) {
    // キャッシュから計算結果を取得して返却する
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    // キャッシュにobjが存在しない場合、fにobjを渡した返り値をキャッシュに保存する
    else {
      mock();
      cache.set(obj, f(obj));
      return cache.get(obj);
    }
  };
}
