import fs from "fs";

export function* walk(rootPath) {
  // fs.readdirSync()でルートディレクトリ内のコンテンツ一覧を取得
  const contents = fs.readdirSync(rootPath);

  // コンテンツ一覧をfor/ofループで巡回する
  for (const content of contents) {
    // パスを生成
    const path = rootPath + "/" + content;

    const result = {};

    // コンテンツがディレクトリだったら
    if (fs.statSync(path).isDirectory()) {
      (result.path = path), (result.isDirectory = true);
      yield result; // オブジェクトを返す
      yield* walk(path); // このジェネレータを再帰的に呼び出す
    }
    // コンテンツがファイルだったら
    else {
      (result.path = path), (result.isDirectory = false);
      yield result; // オブジェクトを返す
    }
  }
}
