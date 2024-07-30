export function sortJapanese(str) {
  const collator = new Intl.Collator("ja-JP", { sensitivity: "base" }).compare;
  return str.sort(collator);
}

export function toJapaneseDateString(date) {
  const opts = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    era: "long",
  };
  const formatDate = Intl.DateTimeFormat("ja-u-ca-japanese", opts).format;
  let japaneseDateString = formatDate(date); // 「令和6/7/26」という文字列が表示される

  // スラッシュを年・月に置き換えて、最後に日をつける
  japaneseDateString =
    japaneseDateString.replace(/\//, "年").replace(/\//, "月") + "日";

  return japaneseDateString;
}
