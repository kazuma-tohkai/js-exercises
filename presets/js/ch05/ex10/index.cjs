const obj = { a: { b: { c: { d1: 1, d2: 2, d3: 3 } } } };

const startTime = performance.now(); // 開始時間

// with文を使ったとき
with (obj.a.b.c) {
  console.log(d1);
  console.log(d2);
  console.log(d3);
}

// // with文を使わないとき
// let x = obj.a.b.c;
// console.log(x.d1);
// console.log(x.d2);
// console.log(x.d3);

const endTime = performance.now(); // 終了時間

console.log(endTime - startTime); // 何ミリ秒かかったかを表示する
