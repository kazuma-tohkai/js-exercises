const net = require("net");
const fs = require("fs");
const path = require("path");

const server = net.createServer();
// server.maxConnections = 5; // 最大同時接続数を設定
server.listen(8000);

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    console.log(request);
    const [method, endpoint] = request.split(" ");

    if (endpoint === "/") {
      if (method === "GET") {
        // "/"が GET されたとき /contents/index.html を返却する
        const filePath = path.resolve(__dirname, "./contents/index.html");
        const content = fs.readFileSync(filePath);
        socket.write("HTTP/1.1 200 OK\r\n");
        socket.write("Content-Type: text/html\r\n");
        socket.write("\r\n");
        socket.write(content);
        socket.end();
      } else {
        // GET以外のメソッドが指定された場合、HTTP のプロトコルにしたがい 405 を返す
        socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
        socket.end();
      }
    } else if (endpoint === "/greeting") {
      if (method === "POST") {
        // /greetingに POST されたとき、nameとgreetingの内容をボディに含むHTMLを返却する
        const body = request.split("\r\n\r\n")[1]; // ボディ部の手前に空行がある
        let [name, greeting] = body
          .split("&")
          .map((parameter) => parameter.split("=")[1]); // name=hoge&greeting=fuga の形式
        name = decodeURIComponent(name); // URLエンコードされた文字列をデコード
        greeting = decodeURIComponent(greeting); // URLエンコードされた文字列をデコード
        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><p>${name}! ${greeting}!</p></body></html>`;
        socket.write("HTTP/1.1 200 OK\r\n");
        socket.write("Content-Type: text/html\r\n");
        socket.write("\r\n");
        socket.write(html);
        socket.end();
      } else {
        // POST以外のメソッドが指定された場合、HTTP のプロトコルにしたがい 405 を返す
        socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
        socket.end();
      }
    } else {
      // それ以外のエンドポイントが指定された場合、HTTP のプロトコルにしたがい 404 を返す
      socket.write("HTTP/1.1 404 Not Found\r\n");
      socket.end();
    }
  });
});

module.exports = { server };
