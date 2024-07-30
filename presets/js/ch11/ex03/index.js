export function littleToBig(arr) {
  const buffer = new ArrayBuffer(32);
  const view = new DataView(buffer, 0, 4);
  view.setUint32(0, arr, true); // リトルエンディアンとして取り込む
  return view.getUint32(0, false); // ビッグエンディアンとして返す
}

export function bigToLittle(arr) {
  const buffer = new ArrayBuffer(32);
  const view = new DataView(buffer, 0, 4);
  view.setUint32(0, arr, false); // ビッグエンディアンとして取り込む
  return view.getUint32(0, true); // ビッグエンディアンとして返す
}
