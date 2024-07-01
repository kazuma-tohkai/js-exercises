export class TypedMap {
  constructor(keyType, valueType, entries) {
    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }

    // entriesを使ってMapオブジェクトを生成する
    this.map = new Map(entries);

    this.keyType = keyType;
    this.valueType = valueType;
  }

  set(key, value) {
    if (this.keyType && typeof key !== this.keyType)
      throw new TypeError(`${key} is not of type ${this.keyType}`);

    if (this.valueType && typeof value !== this.valueType)
      throw new TypeError(`$${value} is not of type ${this.valueType}`);

    // Mapオブジェクトのsetメソッドを使用する
    return this.map.set(key, value);
  }

  // これらのメソッドはMapオブジェクトに処理を委譲する
  get() {
    return this.map.get();
  }
  keys() {
    return this.map.keys();
  }
  values() {
    return this.map.values();
  }
  entries() {
    return this.map.entries();
  }
}

const t = new TypedMap("string", "number");
console.log(t.set("a", 1));
console.log(t);
