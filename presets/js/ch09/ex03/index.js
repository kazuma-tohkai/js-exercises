export class C {
  x = 42;

  getX() {
    return this.x;
  }
}

export class D {
  #x = 42;

  getX() {
    return this.#x;
  }
}

export class E {
  method() {
    let x = 42;
    return {
      getX() {
        return x;
      },
      setX(y) {
        x = y;
      },
    };
  }
}
