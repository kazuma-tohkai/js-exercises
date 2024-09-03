import * as fsPromises from "node:fs/promises";

export function fetchFirstFileSizePromise(path) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      if (files.length === 0) {
        return null;
      } else {
        return fsPromises
          .stat(path + "/" + files[0])
          .then((stats) => stats.size)
          .catch((err) => {
            return err;
          });
      }
    })
    .catch((err) => {
      return err;
    });
}

export function fetchSumOfFileSizesPromise(path) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      let total = 0;

      // filesを配列に展開したあと、Promiseオブジェクトの配列に変換する
      const promises = [...files].map((file) =>
        fsPromises.stat(path + "/" + file)
      );

      // 全てのファイルに対するstat処理が終わったら、全てのファイルのファイルサイズを合計する
      return Promise.all(promises).then((stats) => {
        for (const stat of stats) {
          total += stat.size;
        }
        return total;
      });
    })
    .catch((err) => {
      return err;
    });
}
