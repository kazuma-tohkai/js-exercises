const threads = require("worker_threads");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.method === "GET") {
    handleGetRequest(req, res);
  } else if (req.method === "POST") {
    handlePostRequest(req, res);
  }
});

function handleGetRequest(request, response) {
  const endpoint = new URL(request.url, `http://${request.headers.host}`)
    .pathname;
  if (endpoint === "/") {
    const filePath = path.resolve(__dirname, "./contents/index.html");
    const content = fs.readFileSync(filePath);
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.write(content);
    response.end();
  }
  if (endpoint === "/index.js") {
    const filePath = path.resolve(__dirname, "./contents/index.js");
    const content = fs.readFileSync(filePath);
    response.setHeader("Content-Type", "text/javascript");
    response.writeHead(200);
    response.write(content);
    response.end();
  }
}

function handlePostRequest(request, response) {
  const endpoint = new URL(request.url, `http://${request.headers.host}`)
    .pathname;
  if (endpoint === "/gaussian") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      const { imageData, originalWidth, originalHeight } = JSON.parse(body);
      const filePath = path.resolve(__dirname, "./imageConvert.cjs");
      const worker = new threads.Worker(filePath);
      worker.postMessage({ imageData, originalWidth, originalHeight });
      worker.on("message", (outputData) => {
        response.setHeader("Content-Type", "application/json");
        response.writeHead(200);
        response.write(JSON.stringify(outputData));
        response.end();
      });
    });
  }
}

server.listen(3000, () => {
  console.log("Listening on port3000");
});
