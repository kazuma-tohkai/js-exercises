const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");

const helloPath = path.resolve(__dirname, "hello.txt");

fs.createReadStream(helloPath)
  .pipe(iconv.decodeStream("Shift_JIS"))
  .pipe(process.stdout);
