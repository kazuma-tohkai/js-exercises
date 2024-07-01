import { instanceOf } from "./index.js";

describe("instnaceofと等価な関数", () => {
  it("3段", () => {
    class Hoge {
      constructor(hoge) {
        this.hoge = hoge;
      }
    }
    class Fuga extends Hoge {
      constructor(fuga) {
        super(fuga);
        this.fuga = fuga;
      }
    }
    class Piyo extends Fuga {
      constructor(piyo) {
        super(piyo);
        this.piyo = piyo;
      }
    }
    const p = new Piyo(1);
    expect(instanceOf(p, Hoge)).toBe(p instanceof Hoge);
  });

  it("継承関係にない", () => {
    class Hoge {
      constructor(hoge) {
        this.hoge = hoge;
      }
    }
    class Fuga {
      constructor(fuga) {
        this.fuga = fuga;
      }
    }
    class Piyo extends Fuga {
      constructor(piyo) {
        super(piyo);
        this.piyo = piyo;
      }
    }
    const p = new Piyo(1);
    expect(instanceOf(p, Hoge)).toBe(p instanceof Hoge);
  });
});
