export function methodCallHistory(obj) {
  const history = [];

  const handlers = {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (
        Reflect.ownKeys(target).includes(property) &&
        (typeof value === "object" || typeof value === "function")
      ) {
        return methodCallHistory(value);
      }

      // メソッド名はget、パラメータはproperty
      history.push({
        timeStamp: new Date().toISOString(),
        method: "get",
        arg: property,
      });
      return value;
    },

    set(target, prop, value, receiver) {
      // メソッド名はset、パラメータはpropとvalue
      history.push({
        timeStamp: new Date().toISOString(),
        method: "set",
        arg: { prop, value },
      });
      return Reflect.set(target, prop, value, receiver);
    },

    apply(target, receiver, args) {
      // メソッド名はapply、パラメータはargs
      history.push({
        timeStamp: new Date().toISOString(),
        method: "apply",
        arg: args,
      });
      return Reflect.apply(target, receiver, args);
    },

    construct(target, args, receiver) {
      // メソッド名はconstruct、パラメータはargs
      history.push({
        timeStamp: new Date().toISOString(),
        method: "construct",
        arg: args,
      });
      return Reflect.construct(target, args, receiver);
    },
  };

  Reflect.ownKeys(Reflect).forEach((handlerName) => {
    if (!(handlerName in handlers)) {
      handlers[handlerName] = function (target, ...args) {
        // メソッド名はhandlerName、パラメータはargs
        history.push({
          timeStamp: new Date().toISOString(),
          method: handlerName,
          arg: args,
        });
        return Reflect[handlerName](target, ...args);
      };
    }
  });

  const proxy = new Proxy(obj, handlers);

  return { proxy, history };
}

let obj1 = [10, 20];
const mch1 = methodCallHistory(obj1);
obj1 = mch1.proxy.map((x) => x * x);
console.log(obj1);
// [100, 400];
console.log(mch1.history);
// [
//   { timeStamp: "2024-10-01T11:13:38.118Z", method: "get", arg: "map" },
//   {
//     timeStamp: "2024-10-01T11:13:38.118Z",
//     method: "get",
//     arg: "length",
//   },
//   {
//     timeStamp: "2024-10-01T11:13:38.118Z",
//     method: "get",
//     arg: "constructor",
//   },
//   {
//     timeStamp: "2024-10-01T11:13:38.118Z",
//     method: "has",
//     arg: ["0"],
//   },
//   { timeStamp: "2024-10-01T11:13:38.118Z", method: "get", arg: "0" },
//   {
//     timeStamp: "2024-10-01T11:13:38.118Z",
//     method: "has",
//     arg: ["1"],
//   },
//   { timeStamp: "2024-10-01T11:13:38.118Z", method: "get", arg: "1" },
// ];

const obj2 = { a: 10, b: 20 };
const mch2 = methodCallHistory(obj2);
mch2.proxy.a = 100;
console.log(obj2);
// { a: 100, b: 20 }

console.log(mch2.history);
// [
//   {
//     timeStamp: "2024-10-01T11:13:38.165Z",
//     method: "set",
//     arg: { prop: "a", value: 100 },
//   },
//   {
//     timeStamp: "2024-10-01T11:13:38.165Z",
//     method: "getOwnPropertyDescriptor",
//     arg: ["a"],
//   },
//   {
//     timeStamp: "2024-10-01T11:13:38.165Z",
//     method: "defineProperty",
//     arg: ["a", [Object]],
//   },
// ];
