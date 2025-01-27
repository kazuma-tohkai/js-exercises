import "./App.css";
import { useState } from "react";
import { Form } from "./Form";
import { List } from "./List";

function App() {
  // todoの入力フォームに入力したテキスト
  const [text, setText] = useState("");

  // Addボタンで登録したtodoのリスト
  // listはtodoのオブジェクトの配列で、各オブジェクトは{todo: string, complete: boolean}の形式
  const [list, setList] = useState([]);

  // Addボタンがクリックされた際の処理
  const handleClickSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      return;
    }
    const todo = text.trim();

    // listにtodoを追加
    setList([...list, { todo: todo, complete: false }]);

    // 入力フォームを空にする
    setText("");
  };

  // 入力フォームのテキストが変更された際の処理
  const handleChangeInput = (e) => {
    setText(e.target.value);
  };

  // ❌ボタンがクリックされた際の処理
  const handleClickDestroy = (e) => {
    setList(
      list.filter((item, index) => {
        return index !== Number(e.target.parentNode.id);
      })
    );
  };

  // checkboxがクリックされた際の処理
  const handleChangeCheckbox = (e) => {
    setList(
      list.map((item, index) => {
        if (index === Number(e.target.parentNode.id)) {
          return { todo: item.todo, complete: e.target.checked };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div>
      <Form
        handleClickSubmit={handleClickSubmit}
        handleChangeInput={handleChangeInput}
        inputValue={text}
      />
      <ul id="todo-list">
        {list?.map((item, index) => (
          <List
            key={index}
            id={index}
            todo={item.todo}
            complete={item.complete}
            handleClickDestroy={handleClickDestroy}
            handleChangeCheckbox={handleChangeCheckbox}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
