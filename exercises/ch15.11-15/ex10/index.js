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

    const originalWidth = originalCanvas.width;
    const originalHeight = originalCanvas.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // Workerを使って画像を変換
    const worker = new Worker("./imageConvert.js");
    worker.postMessage({ imageData, originalWidth, originalHeight }); // Workerに画像データ、幅、高さを送信

    // Workerからの変換後の画像データを受信
    worker.addEventListener("message", (event) => {
      const outputData = event.data;
      const outputImageData = new ImageData(outputData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
    });
  });

  reader.readAsDataURL(file);
});
