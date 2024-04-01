// Symbol()
const symbol1 = Symbol("propertyName");
const symbol2 = Symbol("propertyName");
const obj1 = {};
obj1[symbol1] = "1";
obj1[symbol2] = "2";
console.log(obj1[symbol1]);
console.log(obj1[symbol2]);

// Symbol.for()
const symbolFor1 = Symbol.for("propertyName");
const symbolFor2 = Symbol.for("propertyName");
const obj2 = {};
obj2[symbolFor1] = "1";
obj2[symbolFor2] = "2";
console.log(obj2[symbolFor1]);
console.log(obj2[symbolFor2]);
