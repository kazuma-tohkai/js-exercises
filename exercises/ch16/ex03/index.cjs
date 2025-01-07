const crypto = require("crypto");
// ここを埋める
const fs = require("fs");
const path = require("path");
const keyPath = path.resolve(__dirname, "key.json");
const dataPath = path.resolve(__dirname, "data.json");

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
  return crypto.randomBytes(32); // 32バイト
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // 初期化ベクトルについて：https://it-trend.jp/encryption/article/64-0091
  // ここを埋める
  const iv = crypto.randomBytes(16); // 16バイト

  // 暗号化とBase64エンコード
  // ここを埋める
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encryptedBase64 = cipher.update(text, "utf8", "base64"); // textはutf8で、暗号化されたデータの出力形式はbase64
  encryptedBase64 += cipher.final("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
  fs.promises.writeFile(
    keyPath,
    JSON.stringify({ key: key.toString("base64") })
  );
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
  fs.promises.writeFile(dataPath, JSON.stringify(data)); // dataはオブジェクト
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
  return new Promise((resolve, reject) => {
    fs.promises
      .readFile(keyPath)
      .then((contents) => {
        resolve(Buffer.from(JSON.parse(contents).key, "base64")); // keyをBufferに変換して返す
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
  return new Promise((resolve, reject) => {
    fs.promises
      .readFile(dataPath)
      .then((contents) => {
        resolve(JSON.parse(contents)); // 暗号文とIVを返す
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
  const iv = Buffer.from(data.iv, "base64"); // IVをバッファに変換
  const encryptedText = data.value; // 暗号文
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedText = decipher.update(encryptedText, "base64", "utf8"); // 暗号文はbase64で、復号されたデータの出力形式はutf8
  decryptedText += decipher.final("utf8");
  return decryptedText;
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();

// 実行結果
// 実行するたびに暗号化されたテキストが異なる

// Encrypted Text (Base64): +v1mMjiaNGhGCZFLtK9sAw==
// Decrypted Text: Hello, World!

// Encrypted Text (Base64): VXmX/L7sGH+ypjcHilp/Lw==
// Decrypted Text: Hello, World!
