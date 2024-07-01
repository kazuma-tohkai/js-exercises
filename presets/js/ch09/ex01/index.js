export class C {
  constructor() {
    this.C = class {
      method() {
        return 6;
      }
      static method() {
        return 5;
      }
    };
  }

  method() {
    return 2;
  }

  static method() {
    return 1;
  }

  static C = class {
    method() {
      return 4;
    }
    static method() {
      return 3;
    }
  };
}
