function fizzbuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

function fizzbuzzAnother(n) {
  // n個の要素を持つ配列arrayを生成
  // new Arrayだけだとインデックスが作られずforEachでループできないので、Array.fromと組み合わせる
  const array = Array.from(new Array(n));

  array.forEach(function (element, index) {
    // arrayの各要素に、index+1という要素を1つだけ持つ配列を定義(列が1つだけの多次元配列)
    array[index] = [index + 1];

    // arrayの各要素に格納されている配列に対して
    // filterメソッドを用いてfizzbuzzの条件で絞り込む
    // 絞り込んだ結果が存在すればforEachメソッドが実行されて、console出力される
    array[index]
      .filter((element) => element % 15 === 0)
      .forEach(() => console.log("FizzBuzz"));

    array[index]
      .filter((element) => element % 3 === 0 && element % 15 !== 0)
      .forEach(() => console.log("Fizz"));

    array[index]
      .filter((element) => element % 5 === 0 && element % 15 !== 0)
      .forEach(() => console.log("Buzz"));

    array[index]
      .filter(
        (element) =>
          element % 15 !== 0 && element % 3 !== 0 && element % 5 !== 0
      )
      .forEach(() => console.log(array[index][0]));
  });
}

function sumOfSquaredDifference(f, g) {
  let result = 0;
  for (let i = 0; i < f.length; i++) {
    result += (f[i] - g[i]) ** 2;
  }
  return result;
}

function sumOfSquaredDifferenceAnother(f, g) {
  let result = 0;
  f.forEach(function (element, index) {
    result += (f[index] - g[index]) ** 2;
  });
  return result;
}

function sumOfEvensIsLargerThan42(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      continue;
    }
    sum += array[i];
  }
  return sum >= 42;
}

function sumOfEvensIsLargerThan42Another(array) {
  // filterメソッドで偶数に絞り込んだあとに、reduceメソッドで値を合計する(初期値は0)
  const sum = array.filter((x) => x % 2 === 0).reduce((x, y) => x + y, 0);
  return sum >= 42;
}

fizzbuzz(19);
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// 17
// Fizz
// 19

fizzbuzzAnother(19);
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// 17
// Fizz
// 19

console.log(sumOfSquaredDifference([3, 5, 4], [4, 3, 3])); // 6
console.log(sumOfSquaredDifferenceAnother([3, 5, 4], [4, 3, 3])); // 6

const returnTrue = [5, 10, 3, 28, 7, 4];
const returnFalse1 = [5, 10, 3, 28, 7, 5];
const returnFalse2 = [5, 10, 3, 28, 7];
console.log(sumOfEvensIsLargerThan42(returnTrue)); // true
console.log(sumOfEvensIsLargerThan42Another(returnTrue)); // true
console.log(sumOfEvensIsLargerThan42(returnFalse1)); // false
console.log(sumOfEvensIsLargerThan42Another(returnFalse1)); // false
console.log(sumOfEvensIsLargerThan42(returnFalse2)); // false
console.log(sumOfEvensIsLargerThan42Another(returnFalse2)); // false
