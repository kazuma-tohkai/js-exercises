class AbstractSet {
  has(x) {
    throw new Error("Abstract method");
  }
}
class AbstractEnumerableSet extends AbstractSet {
  get size() {
    throw new Error("Abstract method");
  }
  [Symbol.iterator]() {
    throw new Error("Abstract method");
  }

  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(",")}}`;
  }

  equals(set) {
    if (!(set instanceof AbstractEnumerableSet)) return false;
    if (this.size !== set.size) return false;

    for (const element of this) {
      if (!set.has(element)) return false;
    }
    return true;
  }
}

class AbstractWritableSet extends AbstractEnumerableSet {
  insert(x) {
    throw new Error("Abstract method");
  }
  remove(x) {
    throw new Error("Abstract method");
  }
  add(set) {
    for (const element of set) {
      this.insert(element);
    }
  }
  substract(set) {
    for (const element of set) {
      this.remove(element);
    }
  }
  intersect(set) {
    for (const element of this) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

export class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max;
    this.n = 0;
    this.numBytes = Math.floor(max / 8) + 1;
    this.data = new Uint8Array(this.numBytes);
  }

  _valid(x) {
    return Number.isInteger(x) && x >= 0 && x <= this.max;
  }
  _has(byte, bit) {
    return this.data[byte] & (BitSet.bits[bit] !== 0);
  }

  insert(x) {
    if (this._valid(x)) {
      const byte = Math.floor(x / 8);
      const bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] |= BitSet.bits[bit];
        this.n++;
      } else {
        throw new TypeError("Invalid set element: " + x);
      }
    }
  }
}
