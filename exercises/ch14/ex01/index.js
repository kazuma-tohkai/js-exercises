export function unwritableAndUnconfigurableObj() {
  // Object.definePropertiesで新しいプロパティを作成している場合は省略した属性はfalseになる
  return Object.defineProperties({}, { a: { value: 1, enumerable: true } });
}

export function writableAndUnconfigurableObj() {
  // Object.definePropertiesで新しいプロパティを作成している場合は省略した属性はfalseになる
  return Object.defineProperties(
    {},
    { b: { value: 2, writable: true, enumerable: true } }
  );
}

export function nestedUnwritableObj() {
  // 拡張不可のオブジェクトを入れ子にして返す
  const c = Object.preventExtensions({ c: {} });
  const d = Object.preventExtensions({ d: {} });
  const e = Object.preventExtensions({ e: 3 });
  d.d = e;
  c.c = d;
  return c;
}
