describe("💯のテスト", () => {
  it("💯の長さは2", () => {
    expect("💯".length).toBe(2);
  });
  it("💯のutf-16コードポイント表現", () => {
    expect("💯").toBe("\uD83D\uDCAF");
  });
  it("💯のutf-32コードポイント表現", () => {
    expect("💯").toBe("\u{0001F4AF}");
  });
});
