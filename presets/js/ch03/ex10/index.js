const obj = { x: "1", y: "2" };

// for in文を使って良いならこちら
console.log("プロパティ名の一覧");
for (const item in obj) {
  console.log(item);
}
console.log("値の一覧");
for (const item in obj) {
  console.log(obj[item]);
}

// Object.keysメソッドを使用するパターン
const propertyName = Object.keys(obj);
console.log("プロパティ名の一覧");
for (let i = 0; i < propertyName.length; i++) {
  console.log(propertyName[i]);
}
console.log("値の一覧");
for (let i = 0; i < propertyName.length; i++) {
  console.log(obj[propertyName[i]]);
}
