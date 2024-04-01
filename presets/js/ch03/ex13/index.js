class Example {
  constructor(ex) {
    this.ex = ex;
    this.valueOf();
    this.toString();
  }
  valueOf() {
    console.log(this.ex.valueOf());
  }

  toString() {
    console.log(this.ex.toString());
  }
}
const points = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
];
const obj = new Example(points);
