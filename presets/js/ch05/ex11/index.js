export function removeOddNumber(obj) {
  for (const [k, v] of Object.entries(obj)) {
    debugger;
    //   奇数の場合はプロパティを削除する
    if (v % 2 !== 0) delete obj[k];
  }
  debugger;
  return obj;
}
const obj = { a: 1, b: 2, c: 3 };
debugger;
console.log(removeOddNumber(obj));
