export function List(props) {
  // eslint-disable-next-line react/prop-types
  const { id, todo, complete, handleClickDestroy, handleChangeCheckbox } =
    props;

  // checkboxの状態によってlabelのスタイルを変更する
  const labelStyleUnchecked = {
    textDecorationLine: "none",
  };
  const labelStyleChecked = {
    textDecorationLine: "line-through",
  };

  return (
    <div id={id}>
      <input
        type="checkbox"
        onChange={handleChangeCheckbox}
        checked={complete}
      ></input>
      <label style={complete ? labelStyleChecked : labelStyleUnchecked}>
        {todo}
      </label>
      <button onClick={handleClickDestroy}>❌</button>
    </div>
  );
}
