/* eslint-disable */
export function isEmailAddress(str) {
  if (!str) return false; // 引数がnullやundefinedの場合はfalse

  if (!str.match(/@/)) return false; // 「@」が含まれていない場合はfalse

  const conditions = [
    /(\.)\1/, // 「.」が連続する場合はfalse
    /(\.@)|(@\.)/, // 「.」が「@」の直前もしくは直後にある場合はfalse
    /\w{65,}@/, // 「@」の前の文字列が65文字以上の場合はfalse
    /([\(\)\<\>\[\]\:\;\@\,\\\\\"]{1}@)|(@[\(\)\<\>\[\]\:\;\@\,\\\\\"]{1})/, // 「@」の前もしくは後ろの文字列が「(」「)」「<」「>」「[」「]」「:」「;」「@」「,」「\\」「"」のいずれかだけの場合はfalse
    /\s/, //  空白文字が含まれている場合はfalse
    /[^\w@\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\.\{\|\}\~]/, // \w、!#$%&'*+-/=?^_`{|}~以外の文字が含まれている場合はfalse
    /@\w{253,}/, // 「@」の後ろの文字列が253文字以上の場合はfalse
    /(^@)|(@$)/, // 先頭が「@」もしくは末尾が「@」の場合はfalse
    /(^\.)|(\.$)/, // 先頭が「.」もしくは末尾が「.」の場合はfalse
  ];

  for (const condtion of conditions) {
    if (str.match(condtion)) return false;
  }

  return true; // 上記いずれにも該当しなかったらtrue
}
