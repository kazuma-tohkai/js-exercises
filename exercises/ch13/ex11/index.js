function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

export function retryWithExponentialBackoff(func, maxRetry) {
  let retryCount = 0;

  return new Promise((resolve, reject) => {
    function retryFunc() {
      // 引数の func は Promise を返す関数
      func()
        .then((result) => {
          // func の返り値が成功した場合は retryWithExponentialBackoff の返り値をその値で解決
          resolve(result);
        })
        .catch((e) => {
          retryCount++;

          // 一定回数以上 func が失敗した場合は retryWithExponentialBackoff の返り値を失敗させる
          if (retryCount > maxRetry) {
            reject(e);
            return;
          }
          // func の返り値が失敗した場合は一定時間後にリトライ
          const interval = 2 ** (retryCount - 1) * 1000;
          wait(interval).then(retryFunc);
        });
    }

    // 最初の試行を非同期で開始
    retryFunc();
  });
}
