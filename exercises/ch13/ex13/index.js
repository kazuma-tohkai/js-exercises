import * as fsPromises from "node:fs/promises";

export async function* walkAsync(rootPath) {
  // fs.readdirSync()でルートディレクトリ内のコンテンツ一覧を取得
  const contents = await fsPromises.readdir(rootPath);

  // コンテンツ一覧をfor/ofループで巡回する
  for (const content of contents) {
    // パスを生成
    const path = rootPath + "/" + content;

    const result = {};

    // コンテンツがディレクトリだったら
    const stat = await fsPromises.stat(path);
    if (stat.isDirectory()) {
      (result.path = path), (result.isDirectory = true);
      yield result; // オブジェクトを返す
      yield* walkAsync(path); // このジェネレータを再帰的に呼び出す
    }
    // コンテンツがファイルだったら
    else {
      (result.path = path), (result.isDirectory = false);
      yield result; // オブジェクトを返す
    }
  }
}
