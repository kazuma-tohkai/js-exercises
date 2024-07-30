export function getMonthDays(year, month) {
  // Dateオブジェクトのmonthのインデックスは0始まり。パラメータのmonthは1から始まるとする
  const nextMonth = new Date(year, month); // 来月1日のDateオブジェクト
  const thatMonth = new Date(year, --month); // 今月1日のDateオブジェクト
  return (nextMonth - thatMonth) / 1000 / 60 / 60 / 24; // 2つの日時の差を求め、日数に換算
}

export function countWeekDays(start, end) {
  const startDate = new Date(start + "T00:00:00.000"); // 開始日
  const endDate = new Date(end + "T00:00:00.000"); // 終了日
  let weekDaysCount = 0; // 平日の日数
  while (startDate <= endDate) {
    // 開始日が終了日以下のとき（終了日も含む）
    const day = startDate.getDay(); // 曜日取得
    if (day !== 0 && day !== 6) weekDaysCount++; // 土日以外なら平日の日数をインクリメント
    startDate.setDate(startDate.getDate() + 1); // 開始日をインクリメント
  }
  return weekDaysCount;
}

export function getDayByLocale(dateString, locale) {
  const date = new Date(dateString + "T00:00:00.000"); // Dateオブジェクトを生成
  return date.toLocaleString(locale, { weekday: "long" }); // 引数のロケールで曜日を返す
}

export function getLastMonth() {
  const thisMonth = new Date(); // 今月のDateオブジェクト
  const offset = thisMonth.getTimezoneOffset() * 60 * 1000; // オフセット時間をミリ秒で取得
  thisMonth.setTime(thisMonth.getTime() - offset); // Dateオブジェクトからオフセット分減算(toISOStringがUTCでしか取得できないため)
  const thisMonthString = thisMonth.toISOString(); // ISO形式の日時(UTC)にする

  // ISO形式の文字列から年と月を数値で取得
  let year = Number(thisMonthString.substring(0, 4));
  let month = Number(thisMonthString.substring(5, 7)) - 1; // monthのインデックスは0始まりなので-1する

  if (month !== 0) month--; // 1月じゃなければ月をデクリメント
  else {
    // 1月なら昨年の12月にする
    month = 11;
    year--;
  }
  return new Date(year, month); // 先月のDateオブジェクトを生成して返す
}
