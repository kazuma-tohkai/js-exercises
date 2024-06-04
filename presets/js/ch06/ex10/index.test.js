const obj1 = {
  foo: Math.random(),
  bar: Math.random(),
};

const obj2 = {
  fizz: Math.random(),
  buzz: Math.random(),
};

const obj3 = {
  bar: Math.random(),
  buzz: Math.random(),
};

const num1 = Math.random();
const num2 = Math.random();

const arr1 = [Math.random(), Math.random(), Math.random()];
const arr2 = [Math.random(), Math.random()];

const obj = {
  num1: num1,
  num2: num2,
  foo: obj1.foo,
  bar: obj3.bar,
  fizz: obj2.fizz,
  buzz: obj2.buzz,
  arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
};

const answer = {
  // ここにコードを書く
  num1, //プロパティの簡略記法により変数名のみ書けば良い(最初の識別子とコロンは省略できる)
  num2, //プロパティの簡略記法により変数名のみ書けば良い(最初の識別子とコロンは省略できる)
  foo: obj1.foo, //これ以上シンプルには書けない
  bar: obj3.bar, //これ以上シンプルには書けない
  ...obj2, //スプレッド演算子
  arr: [...arr1, num1, ...arr2], //スプレッド演算子と簡略記法の組み合わせ
};

// itブロックを追加しないと、Your test suite must contain at least one test.というエラーが出てしまう
it("オブジェクトの簡略記法とスプレッド演算子", () => {
  expect(answer).toEqual(obj);
});
