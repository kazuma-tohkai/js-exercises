const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const loading = document.querySelector("#loading");

document.addEventListener("DOMContentLoaded", async () => {
  // ローディング表示
  loading.classList.add("hidden");

  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  retryWithExponentialBackoff("/api/tasks", { timeout: 3000 }, 5)
    .then((res) => {
      console.log(res);
      if (!res) {
        return;
      } else if (
        res?.ok && // resがundefinedの場合(タイムアウトやmaxRetryに達した場合)は何もしない(Undefinedで解決)
        res.headers.get("Content-Type").includes("application/json")
      ) {
        return res.json();
      }
    })
    .then((body) => {
      if (body) {
        body.items.forEach((task) => {
          appendToDoItem(task);
        });
      }
    })
    .catch((err) => {
      alert(err);
    });
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  retryWithExponentialBackoff(
    "/api/tasks",
    {
      method: "POST",
      body: JSON.stringify({ name: todo }), // POSTメソッドにはname属性のみ必要
      timeout: 3000,
    },
    5
  )
    .then((res) => {
      if (!res) {
        return;
      } else if (
        res?.ok &&
        res.headers.get("Content-Type").includes("application/json")
      ) {
        return res.json(); // レスポンスの JSON を解釈する
      }
    })
    .then((task) => {
      if (task) {
        appendToDoItem(task); // appendToDoItem で ToDo リストの要素として追加
      }
    })
    .catch((err) => {
      // ネットワークエラーのときの処理
      alert(err);
    });
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";

  // toggleとlabelの初期状態を設定
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";
  toggle.checked = task.status === "completed";

  toggle.addEventListener("change", (e) => {
    const completed = e.target.checked;
    retryWithExponentialBackoff(
      `/api/tasks/${task.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: completed ? "completed" : "active" }),
        timeout: 3000,
      },
      5
    )
      .then((res) => {
        console.log(res);
        if (!res) {
          return;
        } else if (
          res.ok &&
          res.headers.get("Content-Type").includes("application/json")
        ) {
          return res.json();
        }
      })
      .then((task) => {
        if (task) {
          label.style.textDecorationLine =
            task.status === "completed" ? "line-through" : "none";
        }
        // さーばーからのレスポンスがない場合はトグルを戻す
        else {
          toggle.checked = !completed;
        }
      })
      .catch((err) => {
        // さーばーからのレスポンスがない場合はトグルを戻す
        toggle.checked = !completed;
        alert(err);
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌️";
  destroy.addEventListener("click", () => {
    retryWithExponentialBackoff(
      `/api/tasks/${task.id}`,
      {
        method: "DELETE",
        timeout: 3000,
      },
      5
    )
      .then((res) => {
        console.log(res);
        if (!res) {
          return;
        } else if (
          res.ok &&
          res.headers.get("Content-Type").includes("application/json")
        ) {
          elem.remove();
        }
      })
      .catch((err) => {
        alert(err);
      });
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
  console.log(document.cookie);
}

export async function retryWithExponentialBackoff(url, options, maxRetry) {
  // ローディング表示
  loading.classList.remove("hidden");

  // fetchのタイムアウト処理
  const fetchWithTimeout = (url, options = {}) => {
    if (options.timeout) {
      const controller = new AbortController();
      options.signal = controller.signal;
      setTimeout(() => {
        controller.abort();
      }, options.timeout);
    }
    return fetch(url, options);
  };

  // リトライ処理
  const retryFunc = async (ms, count) => {
    try {
      const res = await fetchWithTimeout(url, options);

      // レスポンスが正常な場合はレスポンスで解決
      if (res.ok) {
        return res;
      }
      // 500番台のエラーレスポンスの場合で、リトライ回数に達していない場合にリトライ処理を行う
      else if (res.status >= 500 && res.status < 600 && count > 0) {
        await new Promise((resolve) => setTimeout(resolve, ms)); // 設定時間待機したら解決するPromise。これを待ってから次の行に進む
        return retryFunc(ms * 2, count - 1);
      }
      // 500番台以外のエラーや、maxRetryに達した場合はアラートを表示
      else if (count === 0) {
        throw new Error("Max Retry");
      } else {
        throw new Error(res.status);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        alert("timeoutしました");
      } else if (err.message === "Max Retry") {
        alert("リトライ回数が上限に達しました");
      } else {
        alert(`Unextected response status ${err.message}`);
      }
    }
  };
  const res = await retryFunc(100, maxRetry);
  loading.classList.add("hidden"); // ローディング非表示
  return res;
}
