const fs = require("fs");
const path = require("path");

const samplePath = path.resolve(__dirname, "sample.txt");

console.log(samplePath.length, "bytes");
fs.truncateSync(samplePath, samplePath.length + 5);
