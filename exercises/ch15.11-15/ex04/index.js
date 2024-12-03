const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// localStrageからアイテムを読み出したときに、登録順に並べるたいので連番(非負数の整数）をkeyにする
// Object.keys()で呼び出しても順番に読み出されなかったので、一旦配列に入れてソートする
// 複数の関数で使用するため、グローバル変数として定義
let keys = [];

// localStrageから取得して表示する
document.addEventListener("DOMContentLoaded", () => {
  readFromLocalStorage();
});

export function readFromLocalStorage() {
  list.innerHTML = ""; // 一旦リストを空にする
  keys = []; // 初期化
  for (const key of Object.keys(localStorage)) {
    keys.push(parseInt(key));
  }
  keys.sort((a, b) => a - b);
  console.log(keys);

  for (const key of keys) {
    const item = JSON.parse(localStorage[key]);
    // ここから下はch15.1-3.1のコードとほぼ同じ
    // inputの情報ではなく、localStrageの情報(item)を使う
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

      // localStrageのstatusを更新する
      localStorage[key] = JSON.stringify({
        name: item.name,
        status: toggle.checked ? "completed" : "active",
      });
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      elem.remove();
      // localStrageからも削除する
      localStorage.removeItem(key);
    });

    elem.append(toggle, label, destroy);
    elem.id = key; // idを設定する
    list.prepend(elem);
    console.log(key, item);
  }
}

// 他のタブでの変更を検知して表示を更新する
window.addEventListener("storage", () => {
  readFromLocalStorage(); // localStrageから読み出して表示する
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

  // localStrageのkeyの一番大きい値を取得して、それに1を足す
  const id = keys.length > 0 ? keys[keys.length - 1] + 1 : 0;

  // localStrageに保存する
  // プロパティ名をid、値はname,status
  localStorage[id] = JSON.stringify({ name: todo, status: "active" });
  readFromLocalStorage();
  console.log(id, todo);
});
