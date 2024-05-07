import { escapeLetterWithIfElse, escapeLetterWithSwitch } from "./index.js";
describe("制御文字をエスケープシーケンスに変換", () => {
  it("if-else", () => {
    expect(escapeLetterWithIfElse(`a0abatanavafara"a'`)).toBe(
      // eslint-disable-next-line
      `a\0a\ba\ta\na\va\fa\ra\"a\'`
    );
  });
  it("switch", () => {
    expect(escapeLetterWithSwitch(`a0abatanavafara"a'`)).toBe(
      // eslint-disable-next-line
      `a\0a\ba\ta\na\va\fa\ra\"a\'`
    );
  });
});
