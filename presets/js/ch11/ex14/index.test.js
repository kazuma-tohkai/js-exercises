import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("日本語フォーマットのテスト", () => {
  it("sortJapanese", () => {
    expect(
      sortJapanese(["あ", "え", "い", "う", "え", "お", "さ", "か"])
    ).toStrictEqual(["あ", "い", "う", "え", "え", "お", "か", "さ"]);
    expect(
      sortJapanese([
        "あ",
        "か",
        "つ",
        "き",
        "っ",
        "ば",
        "つ",
        "し",
        "は",
        "か",
        "ぱ",
      ])
    ).toStrictEqual([
      "あ",
      "か",
      "か",
      "き",
      "し",
      "つ",
      "っ",
      "つ",
      "ば",
      "は",
      "ぱ",
    ]);
  });

  it("toJapaneseDateString", () => {
    const date = new Date();

    date.setFullYear(2024, 6, 1);
    expect(toJapaneseDateString(date)).toBe("令和6年7月1日");

    date.setFullYear(1989);
    expect(toJapaneseDateString(date)).toBe("平成1年7月1日");

    date.setFullYear(1989, 0, 2);
    expect(toJapaneseDateString(date)).toBe("昭和64年1月2日");

    date.setFullYear(1607);
    expect(toJapaneseDateString(date)).toBe("慶長12年1月2日");
  });
});
