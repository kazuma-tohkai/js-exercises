const socket = new WebSocket("ws://localhost:3003");

// サーバーからのメッセージを受信したときの処理
socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  // typeがupdateの場合に盤面を描画する
  if (data.type === "update") {
    renderGrid(data.grid);
  }
});

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.11-15/ex09/decision1.mp3");

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  sound.cloneNode().play();

  const request = JSON.stringify({ type: "toggle", row, col });
  socket.send(request);
});

// Startボタンを押したときの処理
startButton.addEventListener("click", () => {
  const request = JSON.stringify({ type: "start" });
  socket.send(request);
});

// Pauseボタンを押したときの処理
pauseButton.addEventListener("click", () => {
  const request = JSON.stringify({ type: "pause" });
  socket.send(request);
});
