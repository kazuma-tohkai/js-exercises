export function bitCount(x) {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    // 1との論理積を求めることで1ビット目が1かどうか調べる。
    if (x & 1) {
      count++;
    }
    // 右シフトする
    x = x >>> 1;
  }
  return count;
}
