// classを使った記法
export class Soldier {
  constructor(atk) {
    this.atk = atk;
  }
  attack() {
    return this.atk * 2;
  }
}

export class MagicSoldier extends Soldier {
  constructor(atk, mgc) {
    super(atk); // Soldierクラスにatkを渡して初期化
    this.mgc = mgc;
  }
  attack() {
    return super.attack() + this.mgc;
  }
}

// prototypeを使った記法
export function Soldier2(atk) {
  this.atk = atk;
}
Soldier2.prototype = {
  attack() {
    return this.atk * 2;
  },
};

export function MagicSoldier2(atk, mgc) {
  this.atk = atk;
  this.mgc = mgc;
}
MagicSoldier2.prototype = Object.create(Soldier2.prototype);
MagicSoldier2.prototype.constructor = MagicSoldier2;

// prototypeを使った記法のとき、スーパークラスのメソッドをサブクラスから呼び出す方法がわからない
MagicSoldier2.prototype.attack = function () {
  const s = new Soldier2(this.atk);
  return s.attack() + this.mgc;
};
