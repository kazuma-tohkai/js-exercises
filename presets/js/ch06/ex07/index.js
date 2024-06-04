export function assign(target, ...sources) {
  for (const source of sources) {
    // 列挙可な独自プロパティ(Symbolは除く)をコピーする
    for (const key of Object.keys(source)) {
      target[key] = source[key];
    }
    // 列挙可な独自プロパティ(Symbol)をコピーする
    for (const key of Object.getOwnPropertySymbols(source)) {
      // getOwnPropertySymbolは列挙不可なプロパティ(Symbol)も返すので、propertyIsEnumerableを使って列挙可なものだけコピーする
      if (Object.prototype.propertyIsEnumerable.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
