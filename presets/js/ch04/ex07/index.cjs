// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

// 例:
set42("hello");
console.log(hello); // 42

// console.log(set42("let hoge = 0; while (true) hoge"));
