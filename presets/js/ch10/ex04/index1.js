export default class Soldier {
  constructor(atk) {
    this.atk = atk;
  }
  attack() {
    return this.atk * 2;
  }
}

export const square = (x) => x * x;

export const add = (x, y) => x + y;
