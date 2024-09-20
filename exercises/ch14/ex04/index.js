export class Hiragana {
  constructor(hiragana) {
    this.text = hiragana;
    this.unicode = hiragana.charCodeAt();
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.unicode;
    }
    if (hint === "string") {
      return this.text;
    }
    return this.text;
  }
}
