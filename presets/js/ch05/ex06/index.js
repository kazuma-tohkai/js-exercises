console.log("例外なし");
try {
  console.log("try");
} catch (e) {
  console.log(e);
} finally {
  console.log("finally");
}

console.log("例外あり");
try {
  console.log("try");
  throw new Error("error");
} catch (e) {
  console.log(e);
} finally {
  console.log("finally");
}
