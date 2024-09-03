function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}
// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
  throw new Error("X");
};
const errY = () => {
  throw new Error("Y");
};

async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}
// 図解:
//  wait1
// |-----|
//        v = 42
//       |-|
//  wait2
// |-----------|
//          log(v) 42
//         |-|
//             wait2
//           |----------|
//              v = 100
//             |-|
//                       log(v) 100
//                      |-|
// i1();
async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}
// 図解:
//  wait3
// |---------------|
//                  logA()
//                  |-|
//                    return A
//                    |-|
//  wait2
// |----------|
//            logB()
//            |-|
//               return B
//              |-|
//  wait1
// |-----|
//       logC()
//       |-|
//         return C
//         |-|
//                       log(v) ["A", "B", "C"]
//                      |-|
i2();
async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}
// 図解:
// let v = 42;
// |-|
//    wait3
//   |-----------------|
//                      v = 0
//                     |-|
//                        errX() → errY()が先に起きているのでここは実行されない
//                       |-|
//    wait2
//   |------------|
//                logB()
//                |-|
//                   return B → errY()が先に起きているのでここは実行されない
//                  |-|
//    wait1
//   |-----|
//         errY()
//         |-|
//           log(e.message) "Y"
//           |-|
//             log(v) "42"
//             |-|
//               wait3
//               |-----------------|
//                                  log(v) "0"
//                                 |-|

// i3();

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}
//  wait5
// |-------------------------|
//                           log(i) 0
//                           |-|
//                             wait4
//                             |--------------------|
//                                                   log(i) 1
//                                                  |-|
//                                                     wait3
//                                                    |---------------|
//                                                                    log(i) 2
//                                                                    |-|
//                                                                       wait2
//                                                                      |----------|
//                                                                                 log(i) 3
//                                                                                 |-|
//                                                                                   wait1
//                                                                                    |-----|
//                                                                                          log(i) 4
//                                                                                          |-|
//                                                                                            log("COMPLETED")
//                                                                                            |-|

// i4();

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

//  wait5
// |-------------------------|
//                           log(i) 0
//                           |-|
//  wait4
// |--------------------|
//                        log(i) 1
//                      |-|
//  wait3
// |---------------|
//                  log(i) 2
//                 |-|
//  wait2
// |----------|
//             log(i) 3
//            |-|
//  wait1
// |-----|
//        log(i) 4
//       |-|
//  log("COMPLETED")
// |-|

// i5();

async function i6() {
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}
//  wait5
// |-------------------------|
//                           log(i) 0
//                           |-|
//  wait4
// |--------------------|
//                        log(i) 1
//                      |-|
//  wait3
// |---------------|
//                  log(i) 2
//                 |-|
//  wait2
// |----------|
//             log(i) 3
//            |-|
//  wait1
// |-----|
//        log(i) 4
//       |-|
//                              log("COMPLETED")
//                             |-|
// i6();

async function i7() {
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
// i7();

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
// p1の処理
// wait1()
// |-----|
//        next = v(0) + 1
//       |-|
//          wait2()
//         |----------|
//                     v = next (1)
//                    |-|
// p2の処理
// next = v(0) + 1
// |-|
//    wait2()
//   |----------|
//               v = next(1)
//              |-|

// i8();
