function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

function g1() {
  // TODO: then のネストを無くしなさい
  return wait(1000).then(() => {
    console.log("A");
    return wait(2000).then(() => {
      console.log("B");
      return wait(3000).then(() => {
        console.log("C");
      });
    });
  });
}
// g1();

// then のネストをなくしたver
function g1Change() {
  return wait(1000)
    .then(() => {
      console.log("A");
    })
    .then(() => wait(2000))
    .then(() => {
      console.log("B");
    })
    .then(() => wait(3000))
    .then(() => {
      console.log("C");
    });
}
// g1Change();

function g2() {
  // TODO: new Promise を使わないように書き換えなさい
  return new Promise((resolve, reject) => {
    wait(1000)
      .then(() => console.log("A"))
      .then(() => wait(2000))
      .then(() => console.log("B"))
      .then(() => wait(3000))
      .then(() => console.log("C"))
      .then(resolve, reject);
  });
}
// g2();

// new Promise を使わないように書き換えたver
function g2Change() {
  return wait(1000)
    .then(() => console.log("A"))
    .then(() => wait(2000))
    .then(() => console.log("B"))
    .then(() => wait(3000))
    .then(() => console.log("C"));
}
// g2Change();

function g3() {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  function fetchUserFriends(user) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
  let temp = 0;
  return fetchUser()
    .then((user) => {
      temp = user;
      return fetchUserFriends(user);
    })
    .then((friends) => {
      console.log(`${temp.name} has ${friends.length} friends!`);
    });
}
// g3();

// var, let, const による変数宣言を無くしたver
function g3Change() {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  function fetchUserFriends(user) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  // 入れ子にした
  return fetchUser().then((user) => {
    fetchUserFriends(user).then((friends) => {
      console.log(`${user.name} has ${friends.length} friends!`);
    });
  });
}
// g3Change();

function g4() {
  function someFunction() {
    return 42;
  }

  // NOTE: この関数 g4 は Promise を返す必要があるものとする
  // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
  // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
  return new Promise((resolve) => {
    const value = someFunction();
    // return value;
    resolve(value); // Promiseを解決しなければ
  });
}
g4().then((value) => console.log(value));

// new Promise を使わないように書き換えたver
function g4Change() {
  function someFunction() {
    return 42;
  }

  // Pomise.resolev()メソッドを使用して、Promiseオブジェクトを返す
  return Promise.resolve(someFunction());
}
g4Change().then((value) => console.log(value));
