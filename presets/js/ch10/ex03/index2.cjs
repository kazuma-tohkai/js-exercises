const index = require("./index1.cjs");

const soldier = new index.Soldier(5);
const square = index.square(soldier.attack());
console.log(square); // 100
