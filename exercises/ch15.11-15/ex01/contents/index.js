const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  fetch("/api/tasks")
    .then((res) => {
      if (
        res.ok &&
        res.headers.get("Content-Type").includes("application/json")
      ) {
        return res.json();
      } else {
        alert(`Unexpected response status ${res.status} or content type`);
      }
    })
    .then((body) => {
      body.items.forEach((task) => {
        appendToDoItem(task);
      });
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
  fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ name: todo }), // POSTメソッドにはname属性のみ必要
  })
    .then((res) => {
      if (
        res.ok &&
        res.headers.get("Content-Type").includes("application/json")
      ) {
        return res.json(); // レスポンスの JSON を解釈する
      } else {
        alert(`Unexpected response status ${res.status} or content type`);
      }
    })
    .then((task) => {
      appendToDoItem(task); // appendToDoItem で ToDo リストの要素として追加
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
    fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: completed ? "completed" : "active" }),
    })
      .then((res) => {
        if (
          res.ok &&
          res.headers.get("Content-Type").includes("application/json")
        ) {
          return res.json();
        } else {
          alert(`Unexpected response status ${res.status} or content type`);
        }
      })
      .then((task) => {
        label.style.textDecorationLine =
          task.status === "completed" ? "line-through" : "none";
      })
      .catch((err) => {
        alert(err);
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌️";
  destroy.addEventListener("click", () => {
    fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (
          res.ok &&
          res.headers.get("Content-Type").includes("application/json")
        ) {
          elem.remove();
        } else {
          alert(`Unexpected response status ${res.status}`);
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
