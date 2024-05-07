import { jsonParse } from "./index.js";

describe("JSONパース", () => {
  it("パースできる場合", () => {
    expect(jsonParse('{"result":true, "count":42}')).toEqual({
      success: true,
      data: { result: true, count: 42 },
    });
  });
  it("パースできない場合", () => {
    expect(jsonParse('{result":true, "count":42}')).toEqual({
      success: false,
      error: "Unexpected token r in JSON at position 1",
    });
  });
});
