export function counterGroup() {
  // 返却された各counterが保持しているカウントを取得できるように、
  // counterGroupの下にcounterの配列を作る
  let counterNumber = 0; // counterの番号
  const counters = []; // counterの配列
  return {
    newCounter() {
      const num = counterNumber; // counterの番号をローカル変数に代入(他のcounterオブジェクトからは参照できない)
      counters[num] = 0; // counterの配列にcounterを1つ追加
      counterNumber++; // counterの番号はインクリメント
      return {
        count() {
          const tmp = counters[num];
          counters[num] = counters[num] + 1;
          return tmp;
        },
        reset() {
          counters[num] = 0;
        },
      };
    },
    total() {
      return counters.reduce((x, elem) => x + elem, 0);
    },
    average() {
      if (counterNumber === 0) throw new TypeError();
      return this.total() / counterNumber;
    },
    variance() {
      if (counterNumber < 2) throw new TypeError();

      // 配列の各要素と平均の差の2乗を取る
      const differenceWithAve = counters.map((x) =>
        Math.pow(x - this.average(), 2)
      );
      // differenceWithAveの平均が分散
      const variance =
        differenceWithAve.reduce((x, elem) => x + elem) /
        differenceWithAve.length;

      return variance;
    },
  };
}
