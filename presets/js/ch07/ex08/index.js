export function reverse(str) {
  const segmenterJa = new Intl.Segmenter("ja-JP");
  const segments = segmenterJa.segment(str);
  return Array.from(segments)
    .map((x) => x.segment)
    .reverse()
    .join("");
}
