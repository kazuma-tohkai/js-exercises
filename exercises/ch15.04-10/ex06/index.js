const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装

    // シャドウDOM中の要素の参照を取得する
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    // ここから下はch15.01-03/ex01/index.jsのコード
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.input.value.trim() === "") {
        return;
      }
      const todo = this.input.value.trim();
      this.input.value = "";

      const elem = document.createElement("li");
      const label = document.createElement("label");
      label.textContent = todo;
      label.style.textDecorationLine = "none";

      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.addEventListener("change", () => {
        if (toggle.checked) label.style.textDecorationLine = "line-through";
        else label.style.textDecorationLine = "none";
      });
      const destroy = document.createElement("button");
      destroy.textContent = "❌";
      destroy.addEventListener("click", () => {
        elem.remove();
      });
      elem.append(toggle, label, destroy);
      this.list.prepend(elem);
    });
  }
}

customElements.define("todo-app", TodoApp);
