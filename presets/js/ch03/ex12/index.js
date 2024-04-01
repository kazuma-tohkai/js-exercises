const obj1 = { x: 1 };
console.log(obj1);
obj1.y = 2;
console.log(obj1);

const obj2 = { x: 1, y: 2 };
console.log(obj2);
console.log(obj1 === obj2);

// ２つのオブジェクトが同じ内容なら、別オブジェクトでも true を返す関数
export function equals(obj1, obj2) {
  if (obj1 === obj2) return true;

  // それぞれのオブジェクトの長さを取得
  let obj1Length = 0;
  for (const item1 in obj1) {
    obj1Length++;
  }
  let obj2Length = 0;
  for (const item2 in obj2) {
    obj2Length++;
  }
  // 長さが違うならfalse
  if (obj1Length !== obj2Length) return false;

  obj1Length = 0;
  for (const item1 in obj1) {
    obj2Length = 0;
    for (const item2 in obj2) {
      // それぞれのオブジェクトのプロパティ名、値を比較
      if (obj1Length === obj2Length && item1 !== item2) return false;
      if (obj1Length === obj2Length && obj1[item1] !== obj2[item2])
        return false;
      obj2Length++;
    }
    obj1Length++;
  }
  return true;
}
