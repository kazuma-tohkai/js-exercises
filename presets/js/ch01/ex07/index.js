export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(q) {
    return { x: this.x + q.x, y: this.y + q.y };
  }
}
