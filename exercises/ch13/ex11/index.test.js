import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";
jest.useFakeTimers();

describe("retryWithExponentialBackoff", () => {
  it("成功する場合はリトライせずに結果を返す", async () => {
    const mockFunc = jest.fn().mockResolvedValue("success");

    const result = await retryWithExponentialBackoff(mockFunc, 5);

    expect(result).toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("失敗した場合は指定回数リトライする", async () => {
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("success");

    const result = await retryWithExponentialBackoff(mockFunc, 5);

    expect(result).toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });

  // このテストだけ成功しない
  it("最大リトライ回数を超えた場合はエラーを返す", async () => {
    const mockFunc = jest.fn().mockRejectedValue(new Error("fail"));
    const result = await retryWithExponentialBackoff(mockFunc, 5);
    expect(result).rejects.toBe("fail");
    expect(mockFunc).toHaveBeenCalledTimes(5);
  });
});
