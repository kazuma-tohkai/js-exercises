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

    console.log("postします");

    fetch("http://localhost:3000/gaussian", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageData: Array.from(imageData.data),
        originalWidth,
        originalHeight,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const outputImageData = new ImageData(
          new Uint8ClampedArray(data),
          img.width,
          img.height
        );
        filteredCtx.putImageData(outputImageData, 0, 0);
      });
  });

  reader.readAsDataURL(file);
});
