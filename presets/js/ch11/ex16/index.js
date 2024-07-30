export function retryWithExponentialBackoff(func, maxRetry, callback) {
  const result = func(); // まずfuncを実行する
  if (result) return; // funcがtrueを返せば終了する

  // funcがfalseの場合はリトライする
  let interval = 1000; // インターバルの初期値は1秒
  let timeFromStart = interval; // スタートからの時間

  // maxRetry回数までのタイマーを一気に設定する
  for (let retryCount = 0; retryCount < maxRetry; retryCount++) {
    const timers = {}; // リトライ途中でfuncが成功したらタイマー全クリアするため、タイマーをオブジェクトに保存しておく

    timers[retryCount] = setTimeout(() => {
      const lastTry = retryCount + 1 === maxRetry; // 一番最後のタイマーかどうか
      const result = func(); // funcを実行
      if (result) {
        // funcがtrueを返せばその結果を引数にcallbackを呼び出す。タイマーは全てクリアする
        callback(result);
        for (const timer of Object.values(timers)) {
          clearTimeout(timer);
        }
      }
      if (lastTry) callback(result); // maxRetry回のリトライが失敗し終了する際、funcの結果を引数にcallbackを呼び出す
    }, timeFromStart);

    interval = interval * 2; // インターバルは2倍に増えていく
    timeFromStart = timeFromStart + interval;
  }
}
