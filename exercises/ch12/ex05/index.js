import fs from "fs";
import { Buffer } from "buffer";

export function* readLines(filePath) {
  let position = 0; // readSyncの第4引数(ファイルの読み込み開始位置)
  let bytesRead = 0; // readSyncの戻り値(読み込んだバイト数)

  const bufferReadData = Buffer.alloc(256); // readSyncの第2引数(読み込んだデータを書き込むバッファ。Bufferクラスのインスタンスの必要がある)
  let bufferConcat = Buffer.alloc(0); // bufferReadDataを改行コードが出現するまで結合していくバッファ
  let str = ""; // バッファーを文字列に変換したデータを持つ変数
  let size = 0; // 読み込んだデータに改行コードがなかった場合、何バイト読み込んだか保持しておく変数

  const fd = fs.openSync(filePath, "r"); // ファイルを開く

  try {
    // ファイルを一定のバッファサイズでbytesReadが0になるまで読み込む
    while (
      (bytesRead = fs.readSync(
        fd,
        bufferReadData,
        0,
        bufferReadData.length,
        position
      )) !== 0
    ) {
      bufferConcat = Buffer.concat([
        bufferConcat,
        bufferReadData.slice(0, bytesRead),
      ]); // バッファを結合

      str = bufferConcat.toString("utf-8"); // バッファを文字列に変換

      const search = str.search(/\n/); // 文字列から改行コードを探す

      // 改行コードがあれば
      if (search !== -1) {
        const line = str.substring(0, search - 1); // 改行コードの前までの文字列を取得
        position += Buffer.from(line).length + 2 - size; // positionを改行コードの後ろにする(+2は改行コードの分,sizeはこれまでに読み込んだバイト数)

        size = 0; // size変数を初期化
        bufferConcat = Buffer.alloc(0); // bufferConcat変数を初期化
        str = ""; // str変数を初期化

        yield line; // 改行コードの前までの文字列を返す
      }
      // 改行コードがなければ
      else {
        position += bytesRead; // positionをbytesRead分進める
        size += bytesRead; // sizeもbytesRead分進める
      }
    }
    if (str.length > 0) yield str; // ファイルの最後の行を返す
  } catch {
    fs.closeSync(fd); // ファイルを閉じる
  } finally {
    fs.closeSync(fd); // ファイルを閉じる
  }
}
