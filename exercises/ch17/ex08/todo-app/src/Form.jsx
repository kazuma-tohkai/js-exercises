export function Form(props) {
  // eslint-disable-next-line react/prop-types
  const { handleClickSubmit, handleChangeInput, inputValue } = props;

  return (
    <form id="new-todo-form">
      <input
        type="text"
        id="new-todo"
        placeholder="What needs to be done?"
        onChange={handleChangeInput}
        value={inputValue}
      />
      <button type="submit" onClick={handleClickSubmit}>
        Add
      </button>
    </form>
  );
}
