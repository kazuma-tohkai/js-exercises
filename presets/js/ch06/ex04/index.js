const obj = {};

// writable,enumerable,configurable
Object.defineProperty(obj, "writable,enumerable,configurable", {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
});
console.log("writable,enumerable,configurable");
// hasOwnProperty
console.log(
  Object.prototype.hasOwnProperty.call(obj, "writable,enumerable,configurable")
);
// propetyIsEnumerable
console.log(
  Object.prototype.propertyIsEnumerable.call(
    obj,
    "writable,enumerable,configurable"
  )
);
// プロパティの変更
try {
  console.log((obj["writable,enumerable,configurable"] = 2));
} catch (e) {
  console.log(e.message);
}
// プロパティの削除
try {
  console.log(delete obj["writable,enumerable,configurable"]);
} catch (e) {
  console.log(e.message);
}

// writable,enumerable
Object.defineProperty(obj, "writable,enumerable", {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: false,
});
console.log("writable,enumerable");
console.log(Object.prototype.hasOwnProperty.call(obj, "writable,enumerable"));
console.log(
  Object.prototype.propertyIsEnumerable.call(obj, "writable,enumerable")
);
try {
  console.log((obj["writable,enumerable"] = 2));
} catch (e) {
  console.log(e.message);
}
try {
  console.log(delete obj["writable,enumerable"]);
} catch (e) {
  console.log(e.message);
}

// writable,configurable
Object.defineProperty(obj, "writable,configurable", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true,
});
console.log("writable,configurable");
console.log(Object.prototype.hasOwnProperty.call(obj, "writable,configurable"));
console.log(
  Object.prototype.propertyIsEnumerable.call(obj, "writable,configurable")
);
try {
  console.log((obj["writable,configurable"] = 2));
} catch (e) {
  console.log(e.message);
}
try {
  console.log(delete obj["writable,configurable"]);
} catch (e) {
  console.log(e.message);
}

// enumerable,configurable
Object.defineProperty(obj, "enumerable,configurable", {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: true,
});
console.log("enumerable,configurable");
console.log(
  Object.prototype.hasOwnProperty.call(obj, "enumerable,configurable")
);
console.log(
  Object.prototype.propertyIsEnumerable.call(obj, "enumerable,configurable")
);
try {
  console.log((obj["enumerable,configurable"] = 2));
} catch (e) {
  console.log(e.message);
}
try {
  console.log(delete obj["enumerable,configurable"]);
} catch (e) {
  console.log(e.message);
}

// ""
Object.defineProperty(obj, "", {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false,
});
console.log("");
console.log(Object.prototype.hasOwnProperty.call(obj, ""));
console.log(Object.prototype.propertyIsEnumerable.call(obj, ""));
try {
  console.log((obj[""] = 2));
} catch (e) {
  console.log(e.message);
}
try {
  console.log(delete obj[""]);
} catch (e) {
  console.log(e.message);
}
