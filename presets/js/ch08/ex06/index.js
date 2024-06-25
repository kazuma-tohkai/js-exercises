const m = function (...arg) {
  console.log(arg[1]);
};
m("a", "b");

const n = (...arg) => console.log(arg[1]);
n("a", "b");
