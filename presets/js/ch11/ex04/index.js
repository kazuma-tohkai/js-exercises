// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
const [N, K, M] = [100, 200, 300];

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K)
  .fill(0.0)
  .map(() => Math.random());
const rhsA = Array(K * M)
  .fill(0.0)
  .map(() => Math.random());
const resultA = Array(N * M).fill(0.0);

function arrayMultiply() {
  resultA.fill(0.0);
  // 問題: ここで resultA に lhsA と rhsA の乗算結果を格納してね
  // 行列A(m行n列)、行列B(n行l列)のとき、
  // 行列の積ABは、m行l列の行列を返す。またAの列数mとBの行数lが同じ場合のみ乗算が可能
  // AB = C
  // C[row][col] = Σ[k=1 → n](A[row][k]B[k][col])
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      let temp = 0;
      for (let k = 0; k < K; k++) {
        temp += lhsA[K * row + k] * rhsA[M * k + col];
      }
      resultA[M * row + col] = temp;
    }
  }
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
const lhsB = new Float64Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsB = new Float64Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultB = new Float64Array(N * M).fill(0.0);

function typedArrayMultiply() {
  resultB.fill(0.0);
  // 問題: ここで resultB に lhsB と rhsB の乗算結果を格納してね
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      let temp = 0;
      for (let k = 0; k < K; k++) {
        temp += lhsB[K * row + k] * rhsB[M * k + col];
      }
      resultB[M * row + col] = temp;
    }
  }
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply];
function test(fn) {
  let result;
  for (let i = 0; i < TEST_TIMES; ++i) {
    result = fn();
  }
  return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
  test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
  const start = performance.now();
  test(TESTS[i]);
  const end = performance.now();
  console.log(`${TESTS[i].name}: ${end - start}`);
}
