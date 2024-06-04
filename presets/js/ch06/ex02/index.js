const obj1 = { a: 1, b: 2 };
const obj2 = Object.create(obj1);
console.log(Object.getPrototypeOf(obj2) === obj1); //true
