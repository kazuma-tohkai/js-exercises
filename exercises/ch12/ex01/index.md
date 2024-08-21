### [Symbol.iterator]メソッド

`const a = counterIter(3);
console.log(a[Symbol.iterator]());`

`counterIter
counterIter: Symbol.iterator
{
next: [Function: next],
return: [Function: return],
throw: [Function: throw],
[Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
}`

### nextメソッド

`const a = counterIter(3);
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());`

`counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: next
{ value: undefined, done: true }`

### returnメソッド

`const a = counterIter(3);
console.log(a.next());
console.log(a.return(5));`

`counterIter
counterIter: next
{ value: 1, done: false }
counterIter: return: 5
{ value: 5, done: true }`

### throwメソッド

`const a = counterIter(3);
console.log(a.next());
console.log(a.throw("Error"));`

`
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: throw: Error

node:internal/process/esm_loader:97
internalBinding('errors').triggerUncaughtException(
^
Error
(Use `node --trace-uncaught ...` to show where the exception was thrown)

Node.js v18.16.1
`

### 間接的に

`const a = counterIter(3);
console.log([...a]);`

`counterIter
counterIter: Symbol.iterator
counterIter: next
counterIter: next
counterIter: next
counterIter: next
[ 1, 2, 3 ]`

# ジェネレータ

### [Symbol.iterator]メソッド

`const a = counterGen(3);
console.log(a[Symbol.iterator]());`

`Object [Generator] {}`

### nextメソッド

`const a = counterGen(3);
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());`

`counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: next
{ value: 3, done: false }
counterGen: finally
{ value: undefined, done: true }`

### returnメソッド

`const a = counterGen(3);
console.log(a.next());
console.log(a.return(5));`

`
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: finally
{ value: 5, done: true }`

### throwメソッド

`const a = counterGen(3);
console.log(a.next());
console.log(a.throw("Error"));`

`counterGen
counterGen: next
{ value: 1, done: false }
counterGen: catch: Error
counterGen: finally
{ value: undefined, done: true }`

### 間接的に

`const a = counterGen(3);
console.log([...a]);`

`counterGen
counterGen: next
counterGen: next
counterGen: next
counterGen: finally
[ 1, 2, 3 ]`

# return() や throw() がどのようなときに呼ばれるのか確認する

### return()

`const a = counterIter(3);
for (const x of a) {
  if (x === 2) break;
  console.log(x);
}`

`counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
counterIter: return: undefined`
