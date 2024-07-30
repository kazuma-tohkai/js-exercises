import {
  getMonthDays,
  countWeekDays,
  getDayByLocale,
  getLastMonth,
} from "./index.js";

describe("Dateのテスト", () => {
  it("getMonthDays", () => {
    expect(getMonthDays(2024, 1)).toBe(31);
    expect(getMonthDays(2024, 2)).toBe(29);
    expect(getMonthDays(2024, 3)).toBe(31);
    expect(getMonthDays(2024, 4)).toBe(30);
    expect(getMonthDays(2024, 5)).toBe(31);
    expect(getMonthDays(2024, 6)).toBe(30);
    expect(getMonthDays(2024, 7)).toBe(31);
    expect(getMonthDays(2024, 8)).toBe(31);
    expect(getMonthDays(2024, 9)).toBe(30);
    expect(getMonthDays(2024, 10)).toBe(31);
    expect(getMonthDays(2024, 11)).toBe(30);
    expect(getMonthDays(2024, 12)).toBe(31);
    expect(getMonthDays(2025, 2)).toBe(28);
  });

  it("countWeekDays", () => {
    expect(countWeekDays("2024-06-03", "2024-07-31")).toBe(43);
    expect(countWeekDays("2024-12-25", "2025-01-10")).toBe(13);
  });

  it("getDayByLocale", () => {
    expect(getDayByLocale("2024-07-24", "en-US")).toBe("Wednesday");
    expect(getDayByLocale("2024-07-24", "ja-JP")).toBe("水曜日");
    expect(getDayByLocale("2024-07-24", "zh-CN")).toBe("星期三");
  });

  it("getDayByLocale", () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1, 1);
    lastMonth.setHours(0, 0, 0, 0);
    expect(getLastMonth()).toStrictEqual(lastMonth);
  });
});
