function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

const a = counterIter(3);
// console.log(a[Symbol.iterator]());
// console.log(a.hoge());
// for (const x of a) {
//   console.log(x);
// }
for (const x of a) {
  if (x === 2) throw new Error("Error");
  console.log(x);
}
// console.log(a[Symbol.iterator]());
// const iterator = a[Symbol.iterator]();
// iterator.next();
// iterator.next();
// iterator.next();
// iterator.next();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// const a = counterGen(-1);
// console.log(a[Symbol.iterator]());
// console.log(a.next());
// console.log(iterator.throw("Error"));
// console.log(iterator.return(5));
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// console.log([...a]);
// console.log(a[Symbol.iterator]());
