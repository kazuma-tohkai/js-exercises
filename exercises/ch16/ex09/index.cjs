const express = require("express");
const app = express();
const path = require("path");

app.get("/test/mirror", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.status(200).send(
    // sendメソッドを使う。テキストのコードでresponse.writeメソッドの引数に渡しているものと同じ
    `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n` +
      req.rawHeaders
        .map((header, index) =>
          index % 2 === 0 ? `${header}: ${req.rawHeaders[index + 1]}\r\n` : ""
        )
        .join("") +
      "\r\n"
  );
});

app.get("/*", (req, res) => {
  const endpoint = new URL(req.url, `http://${req.headers.host}`).pathname;

  let filename = endpoint.substring(1);
  filename = filename.replace(/\.\./g, "");
  filename = path.resolve(process.argv[2] || "ch16/ex09/sample", filename);

  let type;
  switch (path.extname(filename)) {
    case ".html":
    case ".htm":
      type = "text/html;";
      break;
    case ".js":
      type = "text/javascript;";
      break;
    case ".css":
      type = "text/css;";
      break;
    case ".png":
      type = "image/png";
      break;
    case ".txt":
      type = "text/plain;";
      break;
    default:
      type = "application/octet-stream";
      break;
  }

  res.setHeader("Content-Type", type);
  res.status(200).sendFile(filename, (err) => {
    // sendFileメソッドを使う
    if (err) {
      res.setHeader("Content-Type", "text/plain; charset=UTF-8");
      res.status(404);
      res.end(err.message);
    }
  });
});

app.listen(process.argv[3] || 3000, () => {
  console.log("Listening on port ", process.argv[3] || 3000);
});

module.exports = { app };
