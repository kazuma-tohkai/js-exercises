export function modifyUrl(obj) {
  try {
    const url = new URL(obj.base);

    // addQueryプロパティ
    if ("addQuery" in obj) {
      for (const param of obj.addQuery) {
        url.searchParams.append(param[0], param[1]);
      }
    }

    // pathプロパティ
    if ("path" in obj) {
      url.pathname = obj.path;
    }

    return url.toString();
  } catch {
    // baseプロパティがURLのフォーマットでない場合はエラー
    throw new Error();
  }
}
