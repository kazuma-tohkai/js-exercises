function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
f("(() => {let hoge = 0; while(true) console.log(hoge)})()");
