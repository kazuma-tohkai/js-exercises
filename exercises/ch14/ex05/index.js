export function templateLiteralToTypeNameString(strings, ...values) {
  const escaped = values.map((v) => typeof v);

  let s = strings[0];
  for (let i = 0; i < escaped.length; i++) {
    s += escaped[i] + strings[i + 1];
  }
  return s;
}
