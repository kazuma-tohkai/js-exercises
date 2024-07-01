import { any, catching } from "./index.js";

describe("any", () => {
  it("引数に1つでも0でない数字があれば、trueを返す関数", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(0)).toBeFalsy();
    expect(isNonZero(42)).toBeTruthy();
    expect(isNonZero(-0.5)).toBeTruthy();
    expect(isNonZero(-0.5, 2, 4)).toBeTruthy();
    expect(isNonZero(-0.5, 0, 4)).toBeTruthy();
  });
  it("配列の長さが3以上もしくは、配列の要素に「hoge」という文字列があるか", () => {
    const test = any(
      (n) => n.length >= 3,
      (n) => n.find((a) => a === "hoge")
    );
    expect(test(["hoge", 2])).toBeTruthy();
    expect(test(["fuga", 2])).toBeFalsy();
    expect(test(["fuga", 2, "fuga"])).toBeTruthy();
  });
});

describe("catching", () => {
  it("Jsonにデシリアライズしてその値を返す。できなければエラーメッセージを返す", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse('{"a": 1}')).toStrictEqual({ a: 1 });
    expect(safeJsonParse("{Invalid Json}")).toStrictEqual({
      error: "SyntaxError: Unexpected token I in JSON at position 1",
    });
  });
});
