class FileSizeError extends Error {
  constructor(filePass, fileSize, threshold) {
    super(
      `The file size of "${filePass}" is ${fileSize}MB, exceeding the threshold of ${threshold}MB`
    );
    this.filePass = filePass;
    this.fileSize = fileSize;
    this.threshold = threshold;
  }
  get name() {
    return "FileSizeError";
  }
}

function fileSizeCheck(filePass, threshold) {
  const fileSize = 100; // filePassからファイルサイズを取得する処理(ダミー)

  if (fileSize > threshold)
    throw new FileSizeError(filePass, fileSize, threshold);
}

const error = new FileSizeError("a.txt", 300, 200);
console.log(error.filePass, error.fileSize, error.threshold, error.name); // a.txt 300 200 FileSizeError

fileSizeCheck("hoge.jpg", 200);
fileSizeCheck("fuga.jpg", 50);
//     throw new FileSizeError(filePass, fileSize, threshold);
// FileSizeError: The file size of "fuga.jpg" is 100MB, exceeding the threshold of 50MB
//     at fileSizeCheck (file:///home/r00516659/js-exercises/presets/js/ch11/ex12/index.js:19:11)
//     at file:///home/r00516659/js-exercises/presets/js/ch11/ex12/index.js:23:1
//     at ModuleJob.run (node:internal/modules/esm/module_job:194:25) {
//   filePass: 'fuga.jpg',
//   fileSize: 100,
//   threshold: 50
// }
