### 組み込み関数

- コード

```
const arr = new Array();
console.log(arr.slice.toString());
```

- 出力結果

```
function slice() { [native code] }
```

### 自作関数

- コード

```
function hoge() {
  return 1 + 1;
}
console.log(hoge.toString());
```

- 出力結果

```
function hoge() {
 return 1 + 1;
}
```
