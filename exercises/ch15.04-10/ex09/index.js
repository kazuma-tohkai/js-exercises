document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
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
    for (let y = 0; y < originalCanvas.height; y++) {
      for (let x = 0; x < originalCanvas.width; x++) {
        let [r, g, b, a] = [0, 0, 0, 0];

        // originalDataの1ピクセルにつき、カーネルの各要素を掛けて合計する
        for (let ky = start; ky <= end; ky++) {
          // 画像の端の処理
          const offsetY = Math.max(
            0,
            Math.min(y + ky, originalCanvas.height - 1)
          );

          const yi = ky + end;

          for (let kx = start; kx <= end; kx++) {
            // 画像の端の処理
            const offsetX = Math.max(
              0,
              Math.min(x + kx, originalCanvas.width - 1)
            );

            const xi = kx + end;

            // originalDataのindexを計算
            // Yは横方向なので、widthを掛ける。×4はRGBAの4要素分
            const index = (offsetY * originalCanvas.width + offsetX) * 4;

            r += data[index] * kernel[yi][xi];
            g += data[index + 1] * kernel[yi][xi];
            b += data[index + 2] * kernel[yi][xi];
            a += data[index + 3] * kernel[yi][xi];
          }
        }

        // outputDataのindexを計算
        const index = (y * originalCanvas.width + x) * 4;

        // outputDataに結果を格納
        outputData[index] = Math.min(r, 255);
        outputData[index + 1] = Math.min(g, 255);
        outputData[index + 2] = Math.min(b, 255);
        outputData[index + 3] = Math.min(a, 255);
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);

    // もとのコード（グレースケール変換）
    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

    // filteredCtx.putImageData(imageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
