export class IgnoreAccentPattern {
  constructor(pattern) {
    this.pattern = pattern;

    const regexpBefore = new RegExp(pattern); // RegExpオブジェクトを生成

    const regexpText = regexpBefore.source // sourceプロパティ(正規表現の本体である文字列)を取得
      .normalize("NFD") // NFD形式でUnicode正規化
      .replace(/[\u0300-\u036f]/, ""); // \u0300 -\u036f の範囲を取り除く

    const flag = regexpBefore.flags; // flagプロパティを取得

    // \u0300 -\u036f の範囲を取り除いた正規表現でRegExpオブジェクトを生成
    this.regexp = new RegExp(regexpText, flag);
  }

  // 各メソッドでは、引数の文字列から\u0300 -\u036f の範囲を取り除く
  [Symbol.search](s) {
    const normalizedText = s.normalize("NFD").replace(/[\u0300-\u036f]/, "");
    return normalizedText.search(this.regexp);
  }

  [Symbol.match](s) {
    const normalizedText = s.normalize("NFD").replace(/[\u0300-\u036f]/, "");
    return normalizedText.match(this.regexp);
  }
}
