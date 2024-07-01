// nが少数を含む場合の計算は実装できていない

// 再帰
export const powerWithRecursive = (x, n) => {
  // n=0の場合は0を返す
  if (n === 0) return 1;

  // 自分自身を呼び出す。nの絶対値-1を再帰関数に渡す
  let result = x * powerWithRecursive(x, Math.abs(n) - 1);

  // n<0の場合は逆数にする
  if (n < 0) result = 1 / result;

  return result;
};

// ループ
export const powerWithLoop = (x, n) => {
  // n=0の場合は0を返す
  if (n === 0) return 1;

  let result = 1;
  // nの絶対値を取ってループする
  for (let i = 0; i < Math.abs(n); i++) {
    result *= x;
  }

  // n<0の場合は逆数にする
  if (n < 0) result = 1 / result;

  return result;
};
