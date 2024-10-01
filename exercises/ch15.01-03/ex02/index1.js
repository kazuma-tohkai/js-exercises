// ボタンを押すとモジュールが読み込まれる
const button = document.querySelector("#importTest");
button.addEventListener("click", async () => {
  const module = await import("/ch15.01-03/ex02/index2.js");
  module.importTest();
});
