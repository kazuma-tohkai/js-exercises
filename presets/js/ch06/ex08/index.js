export function restrict(target, template) {
  // targetのプロパティがtempleteになければ削除する
  for (const key of Object.keys(target)) {
    if (!(key in template)) {
      delete target[key];
    }
  }
  // 継承プロパティはテンプレートオブジェクトに存在していても削除先オブジェクトが継承プロパティ以外で同名をもつ場合削除対象
  for (const key in template) {
    // 独自プロパティはスキップする
    if (!Object.prototype.hasOwnProperty.call(template, key) && key in target) {
      delete target[key];
    }
  }
  return target;
}

export function substract(target, ...sources) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      // sourceのプロパティがtargetにあれば削除する
      if (key in target) {
        delete target[key];
      }
    }
  }
  return target;
}
