import { ROWS, COLS } from "./index.js";

// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 隣接するセルの座標を配列に格納
      const neighbors = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1],
      ];

      // 隣接する生きているセルの数を数える
      let liveNeighbors = 0;
      neighbors.forEach(([x, y]) => {
        if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
          liveNeighbors += grid[x][y] ? 1 : 0;
        }
      });

      // 現在のセルが生きている場合、隣接する生きたセルが2つか3つの場合に生存する
      if (grid[row][col]) {
        nextGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
      }
      // 現在のセルが死んでいる場合、隣接する生きたセルがちょうど3つの場合に生き返る
      else {
        nextGrid[row][col] = liveNeighbors === 3;
      }
    }
  }
  return nextGrid;
}
