const socketReq = new WebSocket("ws://localhost:3003");
const socketRes = new WebSocket("ws://localhost:3003");
const inputAreaCount = 5; // 入力欄の数
const list = document.querySelector("#inputArea"); // 入力欄を配置する場所
const sendRequestButton = document.querySelector("#send-request"); // リクエストを送信するボタン

export function sendRequest(requestMessage, id) {
  return new Promise((resolve, reject) => {
    // 複数のリクエストを送信するため、idを使って識別する
    // サーバー側でtoString()メソッドを使っているので、JSON.stringify()で文字列に変換する(オブジェクトのまま送ると[Object object]になる)
    const request = JSON.stringify({ requestMessage, id });
    socketReq.send(request);

    // レスポンスを受信したら、Promise が resolve される
    socketReq.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      // idが一致するものだけ処理する
      if (response.id === id) {
        resolve(response.responseMessage); // Psomise<string>を返す
      }
    });

    // 一定時間経過時にタイムアウトし、Promise が reject されること。
    setTimeout(() => {
      reject(new Error("timeoutしました"));
    }, 3000); // 3秒でタイムアウト

    // WebSocket の接続が切断した場合、Promise が reject されること。
    socketReq.addEventListener("error", (event) => {
      reject(event);
    });
  });
}

// 返信の実装
socketRes.addEventListener("message", (event) => {
  const request = JSON.parse(event.data);
  const requestMessage = request.requestMessage;
  const id = request.id;
  const responseMessage = `Hello, ${requestMessage}`;
  socketRes.send(JSON.stringify({ responseMessage, id }));
});

document.addEventListener("DOMContentLoaded", () => {
  // 入力欄を生成する
  for (let i = 0; i < inputAreaCount; i++) {
    const template = document.querySelector("#template");
    const clone = template.content.cloneNode(true);
    const div = document.createElement("div");
    div.id = `message-${i}`; // divにidを設定する(リクエストとレスポンスを紐づけるため)
    div.appendChild(clone);
    list.appendChild(div);
  }
});

// リクエスト送信ボタンをクリックしたときの処理
sendRequestButton.addEventListener("click", async () => {
  const promises = []; // 同時並行で複数のリクエストを送信するためのPromise配列
  for (let i = 0; i < inputAreaCount; i++) {
    const div = document.querySelector(`#message-${i}`);
    const input = div.children[0];
    const label = div.children[1];
    label.textContent = ""; // labelを空にする
    if (input.value.trim() === "") {
      continue; // 空の場合はスキップする
    }
    const request = input.value.trim();
    promises.push(
      sendRequest(request, div.id)
        .then((response) => {
          label.textContent = response;
        })
        .catch((e) => {
          label.textContent = e.message;
        })
    );
  }
  await Promise.all(promises);
});
