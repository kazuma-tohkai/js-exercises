import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
let recievedSignal = null; // 受信したシグナルを保持する変数

async function monitorChild() {
  const [code, signal] = await startChild();
  if (signal && signal === recievedSignal) {
    // 子プロセスが受信したシグナルによって終了した場合、自身も終了する
    console.log(`Child process terminated due to signal ${signal}`);
    process.exit(0);
  } else if (code !== 0) {
    // 子プロセスが異常終了した場合、再起動する
    console.log(
      `Child process exited with code ${code}. restart to child process.`
    );
    monitorChild();
  } else {
    // 子プロセスが正常終了した場合、自身も終了する
    console.log(`Child process exited with code ${code}`);
    process.exit(0);
  }
}

// シグナルをトラップし、子プロセスに通知する
// https://ja.wikipedia.org/wiki/%E3%82%B7%E3%82%B0%E3%83%8A%E3%83%AB_(Unix)
// SIGINT:端末から割り込みキー（通常 CTRL + C）を押下したときに発生。
// SIGTERM:killコマンドがデフォルトで発生するシグナル。しかし、このシグナルをキャッチしたり無視したりすることも可能。
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, () => {
    recievedSignal = signal; // 受信したシグナルを保持したおく（monitorChildで使用する）
    console.log(`Received ${signal}, kill child process by ${signal}`);
    if (child) {
      child.kill(signal);
    }
  });
});

monitorChild();

// 実行結果
// node ch16/ex02/index.jsで実行し、CTRL + Cで終了させた

// stdout: child processing...

// stdout: child processing...
// An error occurred. Exiting...

// Child process exited with code 1. restart to child process.
// stdout: child processing...

// stdout: An error occurred. Exiting...

// Child process exited with code 1. restart to child process.
// stdout: child processing...

// stdout: child processing...
// An error occurred. Exiting...

// Child process exited with code 1. restart to child process.
// stdout: child processing...

// stdout: An error occurred. Exiting...

// Child process exited with code 1. restart to child process.
// stdout: child processing...

// stdout: child processing...
// An error occurred. Exiting...

// Child process exited with code 1. restart to child process.
// ^CReceived SIGINT, kill child process by SIGINT
// Child process terminated due to signal SIGINT
