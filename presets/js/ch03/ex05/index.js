export function replaceNewLineCode(targetString) {
  return targetString.replace("\n", "\r\n").replace("\r\r\n", "\n");
}
