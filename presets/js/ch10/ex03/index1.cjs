class Soldier {
  constructor(atk) {
    this.atk = atk;
  }
  attack() {
    return this.atk * 2;
  }
}

const square = (x) => x * x;

module.exports = { Soldier, square };
