"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  const chat = new EventSource("/message");
  chat.addEventListener("message", (event) => {
    button.disabled = true;
    messageElement.textContent += JSON.parse(event.data).value;
  });

  fetch("/message").catch((err) => {
    console.error(err);
  });
}
