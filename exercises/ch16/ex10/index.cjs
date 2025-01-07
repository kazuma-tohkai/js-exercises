const http = require("http");
const path = require("path");
const fs = require("fs");
const rootDirectory = process.argv[2] || "/tmp";
const port = parseInt(process.argv[3]) || 8000;

// メソッドに応じて処理を分岐する
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    handleGetRequest(req, res);
  } else if (req.method === "PUT") {
    handlePutRequest(req, res);
  }
});

function handleGetRequest(request, response) {
  // テキストのコードと同じ
  const endpoint = new URL(request.url, `http://${request.headers.host}`)
    .pathname;

  if (endpoint === "/test/mirror") {
    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
    response.writeHead(200);
    response.write(
      `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
    );
    const headers = request.rawHeaders;
    for (let i = 0; i < headers.length; i += 2) {
      response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }
    response.write("\r\n");
    request.pipe(response);
  } else {
    let filename = endpoint.substring(1);
    filename = filename.replace(/\.\./g, "");
    filename = path.resolve(rootDirectory, filename);

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

    const stream = fs.createReadStream(filename);

    stream.once("readable", () => {
      response.setHeader("Content-Type", type);
      response.writeHead(200);
      stream.pipe(response);
    });

    stream.on("error", (err) => {
      response.setHeader("Content-Type", "text/plain; charset=UTF-8");
      response.writeHead(404);
      response.end(err.message);
    });
  }
}

function handlePutRequest(request, response) {
  const endpoint = new URL(request.url, `http://${request.headers.host}`)
    .pathname;

  let filename = endpoint.substring(1);
  filename = filename.replace(/\.\./g, "");
  filename = path.resolve(rootDirectory, filename);

  const dir = path.dirname(filename);

  // ディレクトリが存在しない場合は再帰的に作成する
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const stream = fs.createWriteStream(filename);

  request.pipe(stream);

  request.on("end", () => {
    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
    response.statusCode = 201;
    response.end("File uploaded");
  });

  request.on("error", (err) => {
    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
    response.statusCode = 500;
    response.end(err.message);
  });
}

server.listen(port, () => {
  console.log("Listening on port", port);
});

// curl -X PUT -H 'Content-Type: text/plain' --data-binary @<自分のHomeディレクトリ>/js-exercises/exercises/ch16/ex10/sample/sample.txt http://localhost:8000/sample2/sample2.txt
