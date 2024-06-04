export const p = {
  r: 2,
  theta: Math.PI / 3,
  get x() {
    // 三角関数を用いてxを求める
    return this.r * Math.cos(this.theta);
  },
  set x(newvalue) {
    // NaNが渡されたときはエラーを返す
    if (isNaN(newvalue)) throw new Error("NaNが渡されました");
    // xに新しい値が設定されたとき、三角関数を用いてrを計算し直す(thetaは変わらない)
    this.r = newvalue / Math.cos(this.theta);
  },
  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(newvalue) {
    if (isNaN(newvalue)) throw new Error("NaNが渡されました");
    this.r = newvalue / Math.sin(this.theta);
  },
};
