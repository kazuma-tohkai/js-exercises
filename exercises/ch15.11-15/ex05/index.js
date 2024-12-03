const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", () => {
  getAllTodos(appendTodos);
});

function withDB(callback) {
  const request = indexedDB.open("todos", 1);
  request.onerror = console.error;
  request.onupgradeneeded = () => {
    initdb(request.result);
  };
  request.onsuccess = () => {
    // 初期化が完了したらcallbackを実行する
    const db = request.result;
    if (db.version === 1) {
      callback(db);
    }
  };
}

function initdb(db) {
  // autoIncrement: true で自動でインクリメントするキーを設定
  const store = db.createObjectStore("todos", {
    autoIncrement: true,
  });
  store.createIndex("status", "status");
}

export function getAllTodos(callback) {
  withDB((db) => {
    const transaction = db.transaction(["todos"]);
    const store = transaction.objectStore("todos");

    // putとdeleteを実行するのにキーが必要なため、keyとvalueの組み合わせを取得する
    // 下記のようなデータが取得される
    // [ { 1: { name: "todo1", status: "active" } }, { 2: { name: "todo2", status: "completed" } } ]
    const requestValues = store.getAll();
    const requestKeys = store.getAllKeys();

    requestValues.onerror = console.error;
    requestKeys.onerror = console.error;

    requestValues.onsuccess = () => {
      const values = requestValues.result;
      requestKeys.onsuccess = () => {
        const keys = requestKeys.result;
        const todos = keys.map((key, index) => ({ [key]: values[index] }));
        callback(todos);
      };
    };
  });
}

export function postTodo(todo) {
  withDB((db) => {
    const transaction = db.transaction(["todos"], "readwrite");
    const store = transaction.objectStore("todos");
    store.add(todo);
    transaction.oncomplete = () => {
      window.dispatchEvent(new CustomEvent("IndexedDB"));
    };
  });
}

export function putTodo(todo, key) {
  withDB((db) => {
    const transaction = db.transaction(["todos"], "readwrite");
    const store = transaction.objectStore("todos");
    store.put(todo, key);
    transaction.oncomplete = () => {
      window.dispatchEvent(new CustomEvent("IndexedDB"));
    };
  });
}

export function deleteTodo(key) {
  withDB((db) => {
    const transaction = db.transaction(["todos"], "readwrite");
    const store = transaction.objectStore("todos");
    store.delete(key);
    transaction.oncomplete = () => {
      window.dispatchEvent(new CustomEvent("IndexedDB"));
    };
  });
}

export function appendTodos(todos) {
  list.innerHTML = ""; // 一旦リストを空にする

  for (const todo of todos) {
    // オブジェクトのプロパティは1つだけなので、最初のプロパティを取得する
    const key = parseInt(Object.keys(todo)[0]);
    const item = Object.values(todo)[0];

    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = item.name;
    label.style.textDecorationLine =
      item.status === "active" ? "none" : "line-through"; // item.statusによって表示を変える

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = item.status === "active" ? false : true; // item.statusによって表示を変える
    toggle.addEventListener("change", () => {
      if (toggle.checked) label.style.textDecorationLine = "line-through";
      else label.style.textDecorationLine = "none";

      // indexDBのstatusを更新する
      putTodo(
        {
          name: item.name,
          status: toggle.checked ? "completed" : "active",
        },
        key // keyを指定する
      );
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      elem.remove();
      // indexDBからも削除する
      deleteTodo(key); // keyを指定する
    });

    elem.append(toggle, label, destroy);
    elem.id = key; // idを設定する
    list.prepend(elem);
  }
}

// 他のタブでの変更を検知して表示を更新する
// dispatchEventでカスタムイベントをディスパッチしても、他のドキュメントには伝わらない
window.addEventListener("IndexedDB", () => {
  console.log("IndexedDB");
  getAllTodos(appendTodos);
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // indexDBに保存する
  // プロパティ名をid、値はname,status
  postTodo({ name: todo, status: "active" });
  getAllTodos(appendTodos);
});
