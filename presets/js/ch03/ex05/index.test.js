import { replaceNewLineCode } from "./index.js";
describe("replaceNewLineCode", () => {
  it("LF to CR+LF", () => {
    expect(replaceNewLineCode("two\nlines")).toBe("two\r\nlines");
  });
  it("CR + LF to LF", () => {
    expect(replaceNewLineCode("two\r\nlines")).toBe("two\nlines");
  });
});
