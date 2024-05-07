import { isHolidayWithIfElse, isHolidayWithSwitch } from "./index.js";
describe("休日判定", () => {
  describe("if-else", () => {
    it("月", () => {
      expect(isHolidayWithIfElse("月")).toBe(false);
    });
    it("火", () => {
      expect(isHolidayWithIfElse("火")).toBe(false);
    });
    it("水", () => {
      expect(isHolidayWithIfElse("水")).toBe(false);
    });
    it("木", () => {
      expect(isHolidayWithIfElse("木")).toBe(false);
    });
    it("金", () => {
      expect(isHolidayWithIfElse("金")).toBe(false);
    });
    it("土", () => {
      expect(isHolidayWithIfElse("土")).toBe(true);
    });
    it("日", () => {
      expect(isHolidayWithIfElse("日")).toBe(true);
    });
  });
  describe("switch", () => {
    it("月", () => {
      expect(isHolidayWithSwitch("月")).toBe(false);
    });
    it("火", () => {
      expect(isHolidayWithSwitch("火")).toBe(false);
    });
    it("水", () => {
      expect(isHolidayWithSwitch("水")).toBe(false);
    });
    it("木", () => {
      expect(isHolidayWithSwitch("木")).toBe(false);
    });
    it("金", () => {
      expect(isHolidayWithSwitch("金")).toBe(false);
    });
    it("土", () => {
      expect(isHolidayWithSwitch("土")).toBe(true);
    });
    it("日", () => {
      expect(isHolidayWithSwitch("日")).toBe(true);
    });
  });
});
