# イテレータ

### [Symbol.iterator]メソッド

- コード

```
const a = counterIter(3);
console.log(a[Symbol.iterator]());
```

- 結果

```
counterIter
counterIter: Symbol.iterator
{
next: [Function: next],
return: [Function: return],
throw: [Function: throw],
[Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
}
```

- 説明
  - counterIter関数を実行すると一番最初にある`concole.log("counterIter")`が実行される
  - 反復可能オブジェクトのイテレータメソッドを呼ぶと、イテレータオブジェクト自身が出力される

### nextメソッド

- コード

```
const a = counterIter(3);
const iterator = a[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

- 結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: next
{ value: undefined, done: true }
```

- 説明
  - イテレータオブジェクトのnext()メソッドを呼ぶと、反復結果オブジェクトが出力される

### returnメソッド

- コード

```
const a = counterIter(3);
const iterator = a[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.return(5));
```

- 結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
{ value: 1, done: false }
counterIter: return: 5
{ value: 5, done: true }
```

- 説明
  - イテレータオブジェクトのreturn(value)メソッドを呼ぶと、引数で渡したvalueを含む反復結果オブジェクトが出力される

### throwメソッド

- コード

```
const a = counterIter(3);
const iterator = a[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.throw("Error"));
```

- 結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
{ value: 1, done: false }
counterIter: throw: Error

node:internal/process/esm_loader:97
    internalBinding('errors').triggerUncaughtException(
                              ^
Error
(Use `node --trace-uncaught ...` to show where the exception was thrown)

Node.js v18.16.1
```

- 説明
  - イテレータオブジェクトのthrow(e)メソッドを呼ぶと、引数で渡したエラーが出力される

### 間接的に

- コード

```
const a = counterIter(3);
console.log([...a]);
```

- 結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
counterIter: next
counterIter: next
counterIter: next
[ 1, 2, 3 ]
```

- 説明
  - スプレッド演算子を使ってイテレータオブジェクトを展開すると、next()メソッドが呼ばれる

# ジェネレータ

### [Symbol.iterator]メソッド

- コード

```
const a = counterGen(3);
console.log(a[Symbol.iterator]());
```

- 結果

```
Object [Generator] {}
```

- 説明
  - ジェネレータも[Synbol.iterator]()メソッドを持っている。
  - [Synbol.iterator]()を呼んでもジェネレータの中身はまだ実行されない

### nextメソッド

- コード

```
const a = counterGen(3);
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
```

- 結果

```
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: next
{ value: 3, done: false }
counterGen: finally
{ value: undefined, done: true }
```

- 説明
  - next()メソッドを呼ぶと、ジェネレータの中身が実行された
  - 次のyieldまでforループが実行されている

### returnメソッド

- コード

```
const a = counterGen(3);
console.log(a.next());
console.log(a.return(5));
```

- 結果

```
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: finally
{ value: 5, done: true }
```

- 説明
  - return()メソッドを呼ぶと、finally節が実行され、反復結果オブジェクトが返される

### throwメソッド

- コード

```
const a = counterGen(3);
console.log(a.next());
console.log(a.throw("Error"));
```

- 結果

```
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: catch: Error
counterGen: finally
{ value: undefined, done: true }
```

- 説明
  - throw()メソッドを呼ぶと、catch節、finally節の順に実行される

### 間接的に

- コード

```
const a = counterGen(3);
console.log([...a]);
```

- 結果

```
counterGen
counterGen: next
counterGen: next
counterGen: next
counterGen: finally
[ 1, 2, 3 ]
```

- 説明
  - スプレッド演算子を使ってイテレータオブジェクトを展開すると、next()メソッドが呼ばれ、最後にfinally節が実行される

### ジェネレータまとめ

- ジェネレータもイテレータインターフェースを満たしていることがわかった

# return() や throw() がどのようなときに呼ばれるのか確認する

### return()

- コード

```
const a = counterIter(3);
for (const x of a) {
if (x === 2) break;
console.log(x);
}
```

- 結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
counterIter: return: undefined
```

- 説明
  - for/ofループをbreak分で抜けると、return()メソッドが引数なしで呼ばれる。

### throw()

- コード

```
const a = counterIter(3);
for (const x of a) {
  if (x === 2) throw new Error("Error");
  console.log(x);
}
```

- 結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
counterIter: return: undefined
file:///home/r00516659/js-exercises/exercises/ch12/ex01/index.js:50
  if (x === 2) throw new Error("Error");
                     ^

Error: Error
    at file:///home/r00516659/js-exercises/exercises/ch12/ex01/index.js:50:22
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)

Node.js v18.16.1
```

- 説明
  - 例外を発生させると、returnメソッドが呼ばれたあとに、throwメソッドが実行される
