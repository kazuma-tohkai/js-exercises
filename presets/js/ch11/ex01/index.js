export class TypeMap {
  constructor() {
    // 委譲先となるMapオブジェクトを生成
    this.map = new Map();
  }

  set(key, value) {
    if (
      // オブジェクト型の場合は、instanseof演算子で判定
      (typeof value === "object" && value instanceof key) ||
      // 基本値型の場合は、typeof演算子で判定
      // オブジェクトを生成し、valueofで基本値型に戻してtypeofを取得
      (typeof value !== "object" && typeof value === typeof new key().valueOf())
    ) {
      return this.map.set(key, value);
    } else {
      throw new Error();
    }
  }
  get(key) {
    // getメソッドはMapオブジェクトに処理を委譲する
    return this.map.get(key);
  }
}
