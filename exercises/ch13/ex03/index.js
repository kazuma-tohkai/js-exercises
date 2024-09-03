import * as fs from "node:fs";

// ディレクトリ内の要素を取得する
export function readdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

// ファイルの統計情報を取得する
export function stat(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}
