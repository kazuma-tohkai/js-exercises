import Soldier, { square as sq } from "./index1.js";
export { add } from "./index1.js";

const s = new Soldier(5);
console.log(sq(s.attack())); // 100

export default function div(x, y) {
  return x / y;
}
