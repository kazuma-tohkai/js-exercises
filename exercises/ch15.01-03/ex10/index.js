const div = document.querySelector("#editor-front");
const input = document.querySelector("#editor-back");
div.style.backgroundColor = "rgb(255, 255, 255)"; // divを白色にする

div.addEventListener("click", () => {
  input.focus();
});

input.addEventListener("focus", () => {
  div.style.backgroundColor = "rgb(192, 192, 192)"; // divを灰色にする
});

input.addEventListener("blur", () => {
  div.style.backgroundColor = "rgb(255, 255, 255)"; // divを白色にする
});

input.addEventListener("input", () => {
  div.textContent = input.value;
});
