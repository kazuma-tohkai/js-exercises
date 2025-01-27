// let a, x, y;
const r = 10;

// with (Math) {
//   a = PI * r * r;
//   x = r * cos(PI);
//   y = r * sin(PI / 2);
// }

const a = Math.PI * r * r;
const x = r * Math.cos(Math.PI);
const y = r * Math.sin(Math.PI / 2);

console.log(a, x, y);

// 1:1   error  Split 'let' declarations into multiple statements  one-var
// 4:1   error  Unexpected use of 'with' statement                 no-with
// 5:7   error  'PI' is not defined                                no-undef
// 6:11  error  'cos' is not defined                               no-undef
// 6:15  error  'PI' is not defined                                no-undef
// 7:11  error  'sin' is not defined                               no-undef
// 7:15  error  'PI' is not defined                                no-undef

// 対応：letをやめてconstを使う。withをやめる。
