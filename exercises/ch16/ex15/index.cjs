const threads = require("worker_threads");

// テキストのコード（Atomicオブジェクトを使ったversion）
// if (threads.isMainThread) {
//   const sharedBuffer = new SharedArrayBuffer(4);
//   const sharedArray = new Int32Array(sharedBuffer);
//   const worker = new threads.Worker(__filename, { workerData: sharedArray });

//   worker.on("online", () => {
//     for (let i = 0; i < 10000000; i++) {
//       Atomics.add(sharedArray, 0, 1);
//     }
//     worker.on("message", () => {
//       console.log(Atomics.load(sharedArray, 0));
//     });
//   });
// } else {
//   const sharedArray = threads.workerData;
//   for (let i = 0; i < 10000000; i++) {
//     Atomics.add(sharedArray, 0, 1);
//   }
//   threads.parentPort.postMessage("done");
// }

if (threads.isMainThread) {
  let num = 0;
  const worker = new threads.Worker(__filename);

  worker.on("online", () => {
    for (let i = 0; i < 10000000; i++) {
      num++;
    }
    worker.on("message", (message) => {
      if (message === "done") {
        console.log(num);
      }
      if (message === "num++") {
        num++;
      }
    });
  });
} else {
  for (let i = 0; i < 10000000; i++) {
    threads.parentPort.postMessage("num++");
  }
  threads.parentPort.postMessage("done");
}

// https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%AF%E3%82%BF%E3%83%BC%E3%83%A2%E3%83%87%E3%83%AB
// メッセージパッシングによって排他制御処理相当を行う並行処理モデルを何と呼ぶか → アクターモデル
