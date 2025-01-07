import fs from "fs";
export async function checkEntry(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.isFile()) {
        resolve("file");
      } else if (stats.isDirectory()) {
        resolve("directory");
      }
    });
  });
}
