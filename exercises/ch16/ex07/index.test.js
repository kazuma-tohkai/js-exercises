import { checkEntry } from "./index.js";

describe("checkEntry", () => {
  test("sample.txt", async () => {
    const result = await checkEntry("ch16/ex07/sample.txt");
    expect(result).toBe("file");
  });
  test("sample", async () => {
    const result = await checkEntry("ch16/ex07/sample");
    expect(result).toBe("directory");
  });
  test("sample/sample.txt", async () => {
    const result = await checkEntry("ch16/ex07/sample/sample.txt");
    expect(result).toBe("file");
  });
  test("sample/sample2", async () => {
    const result = await checkEntry("ch16/ex07/sample/sample2");
    expect(result).toBe("directory");
  });
});
