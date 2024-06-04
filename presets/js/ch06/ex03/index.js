const o = {};
o.x = 1;
const p = Object.create(o);
p.y = 2;
const q = Object.create(p);
q.z = 3;

// isPrototypeOfメソッドはMDNに書かれている構文では使えなかった
// eslint.org/docs/latest/rules/no-prototype-builtins
console.log(
  "oがpのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(o, p)
); // true
console.log(
  "oがqのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(o, q)
); // true
console.log(
  "pがqのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(p, q)
); // true

const obj = new Object();
const a = new Array();
const d = new Date();
const r = new Map();
console.log("Object");
console.log(
  "ObjectがArrayのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Object.prototype, a)
); // true
console.log(
  "ObjectがDateのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Object.prototype, d)
); // true
console.log(
  "ObjectがMapのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Object.prototype, r)
); // true

console.log("Array");
console.log(
  "ArrayがObjectのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Array.prototype, obj)
); // false
console.log(
  "ArrayがDateのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Array.prototype, d)
); // false
console.log(
  "ArrayがMapのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Array.prototype, r)
); // false

console.log("Date");
console.log(
  "DateがObjectのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Date.prototype, obj)
); // false
console.log(
  "DateがArrayのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Date.prototype, a)
); // false
console.log(
  "DateがMapのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Date.prototype, r)
); // false

console.log("Map");
console.log(
  "MapがObjectのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Map.prototype, obj)
); // false
console.log(
  "MapがArrayのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Map.prototype, a)
); // false
console.log(
  "MapがDateのプロトタイプチェーン上に存在するか:" +
  Object.prototype.isPrototypeOf.call(Map.prototype, d)
); // false
