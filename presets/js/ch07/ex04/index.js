const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点
// 初期値は最初のインデックスのmathの点数
// 最初のインデックスの数値は初期値に含まれているので、加算はスキップする
const mathAve = data.reduce(
  (x, elem, index) => x + (index !== 0 && elem.math),
  data[0].math
);
console.log(mathAve); // 530

// クラスAのchemistryの平均点
const dataClassA = data.filter((x) => x.class === "A");
const chemistryAveClassA = dataClassA.reduce(
  (x, elem, index, array) =>
    //最初のインデックスの数値は初期値に含まれているので、加算はスキップする
    (x + (index !== 0 && elem.chemistry)) /
    // 一番最後のインデックスのときにインデックスの数で割って平均を出す
    (index === array.length - 1 ? array.length : 1),
  // 初期値は最初のインデックスのchemistryの点数
  dataClassA[0].chemistry
);
console.log(chemistryAveClassA); //45

// 3科目合計点のクラスC内での平均点
const dataClassC = data.filter((x) => x.class === "C");
const sumAllSubjectClassC = dataClassC.reduce(
  (x, elem, index, array) =>
    //最初のインデックスの数値は初期値に含まれているので、加算はスキップする
    (x + (index !== 0 && elem.math + elem.chemistry + elem.geography)) /
    // 一番最後のインデックスのときにインデックスの数で割って平均を出す
    (index === array.length - 1 ? array.length : 1),
  // 初期値は最初のインデックスのchemistryの点数
  dataClassC[0].math + dataClassC[0].chemistry + dataClassC[0].geography
);
console.log(sumAllSubjectClassC); // 176.66666666666666

// 3科目合計点が最も高い人のname
// mapメソッドでnameと合計点を含むのオブジェクトを返す
const dataSum = data.map((x) => ({
  name: x.name,
  sum: x.math + x.chemistry + x.geography,
}));
// reduceメソッドで最大値を求める
const maxSumAllSubject = dataSum.reduce((x, elem) =>
  x.sum > elem.sum ? x : elem
);
console.log(maxSumAllSubject.name); // Frank

// 全体のgeographyの標準偏差
// 平均を求める
const aveGeography =
  data.reduce(
    (x, elem, index) => x + (index !== 0 && elem.geography),
    data[0].geography
  ) / data.length;

// mapメソッドで平均との差の2乗の配列を返す
const differenceWithAve = data.map((x) =>
  Math.pow(x.geography - aveGeography, 2)
);

// reduceメソッドで合計し配列の数で割る(分散)。それの平方根が標準偏差
const standardDeviation = Math.sqrt(
  differenceWithAve.reduce((x, elem) => x + elem) / differenceWithAve.length
);

console.log(standardDeviation); // 22.3330569358242
