const input = document.querySelector("#input");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
input.focus();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 送信したメッセージ
  const li = document.createElement("li");
  li.classList.add("chat", "me");
  li.innerHTML = `<p>${input.value}</p>`;
  list.appendChild(li);

  fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      model: "gemma:2b",
      messages: [{ role: "user", content: input.value }],
    }),
  })
    .then((res) => {
      return streamBody(res);
    })
    .then((bodyText) => {
      console.log(bodyText);
    })
    .catch((e) => console.error);
  input.value = "";
});

async function streamBody(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let body = "";

  // LLMが返した答えを表示する要素
  const li = document.createElement("li");
  li.classList.add("chat", "you");
  li.innerHTML = `<p></p>`;
  list.appendChild(li);
  const message = li.querySelector("p");

  while (true) {
    const { done, value } = await reader.read();
    if (value) {
      const valueDecode = decoder.decode(value, { stream: true });
      const valueDecodeJson = JSON.parse(valueDecode);
      body += valueDecodeJson.message.content;
      message.innerHTML += valueDecodeJson.message.content;
    }
    if (done) {
      break;
    }
  }
  return body;
}
