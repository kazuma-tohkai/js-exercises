evalのときと同じで、任意のJavascriptを実行できる。  
inputにただの文字列("world"とか)が渡されるなら問題ないが、  
例えば無限ループする関数を即時実行関数式で渡すと、フリーズしたりしてしまう。

```
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
f("(() => {let hoge = 0; while(true) console.log(hoge)})()");
```
