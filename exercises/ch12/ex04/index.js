// 整数を返すジェネレータ関数
export function* int() {
  let x = 2; // 素数は2から始まる
  for (;;) {
    yield x;
    x++;
  }
}

// エラトステネスの篩で素数かどうかを判定する関数
export function primeDecision(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// 呼び出し毎に素数を順番に返すジェネレータ関数
export function* primes(iterable, predicate) {
  const int = iterable(); // 整数ジェネレータを生成
  for (;;) {
    const num = int.next().value; // 整数を取得
    if (predicate(num)) {
      // 素数かどうか判定し、素数なら返す
      yield num;
    }
  }
}
