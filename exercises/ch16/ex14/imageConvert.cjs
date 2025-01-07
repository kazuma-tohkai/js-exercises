const threads = require("worker_threads");

threads.parentPort.on("message", (event) => {
  console.log("Workerスレッドで処理を開始します");
  // console.log(event.data);
  // const eventData = event.data;
  // const imageData = eventData.imageData;
  // const originalWidth = eventData.originalWidth;
  // const originalHeight = eventData.originalHeight;
  const { imageData, originalWidth, originalHeight } = event;
  console.log(originalWidth, originalHeight);

  // eventの中身が空になっていて、これより下の処理が実行できていない

  const data = imageData.data;

  // ガウシアンフィルタ
  const outputData = new Uint8ClampedArray(imageData.data.length);

  const kernel = [];
  const sigma = 1; // ここを変更してガウシアンフィルタの効果を変える
  const size = 5; // サイズ(5×5)
  const start = Math.ceil(-size / 2); // 小数点以下切り上げ
  const end = Math.floor(size / 2); // 小数点以下切り捨て

  const coefficient = 1 / (2 * Math.PI * sigma * sigma); // ガウンシアンフィルタの係数の部分

  // カーネルの作成(sizeで指定したマスのカーネル)
  for (let y = start; y <= end; y++) {
    const row = [];
    for (let x = start; x <= end; x++) {
      const value =
        coefficient * Math.exp(-(x ** 2 + y ** y) / (2 * sigma ** 2));
      row.push(value);
    }
    kernel.push(row);
  }

  // TODO: ここで imageData.data を参照して outputData に結果を格納
  // outputData に対してフィルタを適用する
  for (let y = 0; y < originalHeight; y++) {
    for (let x = 0; x < originalWidth; x++) {
      let [r, g, b, a] = [0, 0, 0, 0];

      // originalDataの1ピクセルにつき、カーネルの各要素を掛けて合計する
      for (let ky = start; ky <= end; ky++) {
        // 画像の端の処理
        const offsetY = Math.max(0, Math.min(y + ky, originalHeight - 1));

        const yi = ky + end;

        for (let kx = start; kx <= end; kx++) {
          // 画像の端の処理
          const offsetX = Math.max(0, Math.min(x + kx, originalWidth - 1));

          const xi = kx + end;

          // originalDataのindexを計算
          // Yは横方向なので、widthを掛ける。×4はRGBAの4要素分
          const index = (offsetY * originalWidth + offsetX) * 4;

          r += data[index] * kernel[yi][xi];
          g += data[index + 1] * kernel[yi][xi];
          b += data[index + 2] * kernel[yi][xi];
          a += data[index + 3] * kernel[yi][xi];
        }
      }

      // outputDataのindexを計算
      const index = (y * originalWidth + x) * 4;

      // outputDataに結果を格納
      outputData[index] = Math.min(r, 255);
      outputData[index + 1] = Math.min(g, 255);
      outputData[index + 2] = Math.min(b, 255);
      outputData[index + 3] = Math.min(a, 255);
    }
  }

  threads.parentPort.postMessage(outputData);
});
