export function* counter() {
  let x = 0;
  for (;;) {
    try {
      x++;
      yield x;
    } catch (e) {
      // エラーがthrowされるとここが実行された後、次のyieldまで進む
      if (e === "Reset") x = 0;
    }
  }
}
