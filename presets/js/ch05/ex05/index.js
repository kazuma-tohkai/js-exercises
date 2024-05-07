export function removeOddNumber(obj) {
  for (const [k, v] of Object.entries(obj)) {
    //   奇数の場合はプロパティを削除する
    if (v % 2 !== 0) delete obj[k];
  }
  return obj;
}
