export class MyArrayLike {
  // 委譲先となる配列オブジェクトを生成
  constructor(item) {
    this.item = new Array(item);
  }

  // ゲッターメソッド
  get length() {
    return this.item.length;
  }

  // セッターメソッド
  set length(value) {
    this.item.length = value;
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // map(), slice()の結果としてMyArrayLikeのオブジェクトを返す
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
