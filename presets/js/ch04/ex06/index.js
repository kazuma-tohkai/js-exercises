// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

function resize1(param) {
  const maxWidth = (param && param.maxWidth) || 600;
  const maxHeight = (param && param.maxHeight) || 480;
  console.log({ maxWidth, maxHeight });
}

function resize2(param) {
  const maxWidth = param?.maxWidth ?? 600;
  const maxHeight = param?.maxHeight ?? 480;
  console.log({ maxWidth, maxHeight });
}

console.log("maxWidthとmaxHeightの両方渡す");
const a = { maxWidth: 100, maxHeight: 200 };
resize(a);
resize1(a);
resize2(a);

console.log("maxWidthだけ渡す");
const b = { maxWidth: 100 };
resize(b);
resize1(b);
resize2(b);

console.log("maxHeightだけ渡す");
const c = { maxHeight: 200 };
resize(c);
resize1(c);
resize2(c);

console.log("undefined");
resize(undefined);
resize1(undefined);
resize2(undefined);
