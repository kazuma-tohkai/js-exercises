/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/src/index.js":
/*!***************************!*\
  !*** ./ex05/src/index.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLS: () => (/* binding */ COLS),
/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),
/* harmony export */   ROWS: () => (/* binding */ ROWS),
/* harmony export */   ctx: () => (/* binding */ ctx)
/* harmony export */ });
/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderGrid.js */ "./ex05/src/renderGrid.js");
/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateGrid.js */ "./ex05/src/updateGrid.js");



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

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ex05/src/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update() {
  grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_1__.updateGrid)(grid);
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid);


/***/ }),

/***/ "./ex05/src/renderGrid.js":
/*!********************************!*\
  !*** ./ex05/src/renderGrid.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGrid: () => (/* binding */ renderGrid)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./ex05/src/index.js");


// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < _index_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {
    for (let col = 0; col < _index_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {
      const cell = grid[row][col];
      _index_js__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();
      _index_js__WEBPACK_IMPORTED_MODULE_0__.ctx.rect(col * _index_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, row * _index_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _index_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _index_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);
      _index_js__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = cell ? "black" : "white";
      _index_js__WEBPACK_IMPORTED_MODULE_0__.ctx.fill();
      _index_js__WEBPACK_IMPORTED_MODULE_0__.ctx.stroke();
    }
  }
}


/***/ }),

/***/ "./ex05/src/updateGrid.js":
/*!********************************!*\
  !*** ./ex05/src/updateGrid.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateGrid: () => (/* binding */ updateGrid)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./ex05/src/index.js");


// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < _index_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {
    for (let col = 0; col < _index_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {
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
        if (x >= 0 && x < _index_js__WEBPACK_IMPORTED_MODULE_0__.ROWS && y >= 0 && y < _index_js__WEBPACK_IMPORTED_MODULE_0__.COLS) {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./ex05/src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map