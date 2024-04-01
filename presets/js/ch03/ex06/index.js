export function substring(str, indexStart, indexEnd) {
  if (indexEnd === undefined) indexEnd = str.length;
  if (Number.isNaN(indexStart)) indexStart = 0;
  if (Number.isNaN(indexEnd)) indexEnd = 0;
  if (indexStart < 0) indexStart = 0;
  if (indexEnd < 0) indexEnd = 0;
  if (indexStart > str.length) indexStart = str.length;
  if (indexEnd > str.length) indexEnd = str.length;
  if (indexStart > indexEnd) {
    const temp = indexStart;
    indexStart = indexEnd;
    indexEnd = temp;
  }
  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  let substring = "";
  for (let i = indexStart; i < indexEnd; i++) {
    substring += str[i];
  }
  return substring;
}

export function slice(str, indexStart, indexEnd) {
  if (indexStart >= str.length) return "";

  if (
    indexStart === null ||
    indexStart === undefined ||
    Number.isNaN(indexStart)
  )
    indexStart = 0;
  if (indexEnd === null || indexEnd === undefined || indexEnd >= str.length)
    indexEnd = str.length;
  if (Number.isNaN(indexEnd)) indexEnd = 0;

  if (indexStart < 0) indexStart = Math.max(indexStart + str.length, 0);
  if (indexEnd < 0) indexEnd = Math.max(indexEnd + str.length, 0);
  if (indexStart >= indexEnd) {
    return "";
  }
  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  let slice = "";
  for (let i = indexStart; i < indexEnd; i++) {
    slice += str[i];
  }
  return slice;
}

export function padStart(str, targetLength, padString) {
  if (str.length >= targetLength) return str;

  const addLength = targetLength - str.length;
  let addString = "";
  for (let i = 1; i <= addLength; i++) {
    // padStringが渡されなかったら空白で延長する
    if (!padString) {
      addString += " ";
    }
    // iがpadStrings.lengthの倍数なら、padStringの最後の文字を入れる
    else if (i % padString.length === 0) {
      addString += padString[padString.length - 1];
    }
    // iをpadString.lengthで除算したときの余りのインデックスの文字を入れる
    else {
      addString += padString[(i % padString.length) - 1];
    }
  }
  return addString + str;
}

export function trim(str) {
  let trim = "";
  for (let i = 0; i < str.length; i++) {
    if (
      str[i] !== "\u0009" &&
      str[i] !== "\u000B" &&
      str[i] !== "\u000C" &&
      str[i] !== "\u0020" &&
      str[i] !== "\u00A0" &&
      str[i] !== "\uFEFF" &&
      str[i] !== "\u000A" &&
      str[i] !== "\u000D" &&
      str[i] !== "\u2028" &&
      str[i] !== "\u2029"
    ) {
      trim += str[i];
    }
    // 自分の前後どちらかがホワイトスペースでない場合
    else if (
      str[i - 1] !== "\u0009" &&
      str[i - 1] !== "\u000B" &&
      str[i - 1] !== "\u000C" &&
      str[i - 1] !== "\u0020" &&
      str[i - 1] !== "\u00A0" &&
      str[i - 1] !== "\uFEFF" &&
      str[i - 1] !== "\u000A" &&
      str[i - 1] !== "\u000D" &&
      str[i - 1] !== "\u2028" &&
      str[i - 1] !== "\u2029" &&
      str[i + 1] !== "\u0009" &&
      str[i + 1] !== "\u000B" &&
      str[i + 1] !== "\u000C" &&
      str[i + 1] !== "\u0020" &&
      str[i + 1] !== "\u00A0" &&
      str[i + 1] !== "\uFEFF" &&
      str[i + 1] !== "\u000A" &&
      str[i + 1] !== "\u000D" &&
      str[i + 1] !== "\u2028" &&
      str[i + 1] !== "\u2029"
    ) {
      trim += str[i];
    }
  }
  return trim;
}
