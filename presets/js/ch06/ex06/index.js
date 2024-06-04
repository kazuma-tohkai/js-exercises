export function getPropertyName(obj) {
  const propetyName = [];

  // すべての独自プロパティを取得する(列挙不可、Symbolも含む)
  for (const k of Reflect.ownKeys(obj)) {
    propetyName.push(k);
  }

  // 列挙可能な継承プロパティはfor/inループで取得する
  for (const k in obj) {
    // 独自プロパティはfor/ofループで取得したのでスキップする
    if (Object.prototype.hasOwnProperty.call(obj, k)) continue;
    propetyName.push(k);
  }
  return propetyName;
}
