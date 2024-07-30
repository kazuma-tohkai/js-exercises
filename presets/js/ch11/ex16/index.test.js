// タイマーのテストの書き方がわからなかった

// import { retryWithExponentialBackoff } from "./index.js";
// import { jest } from "@jest/globals";
// // jest.useFakeTimers();

// describe("", () => {
//   it("should call the callback immediately if func returns true initially", () => {
//     const func = jest.fn().mockReturnValue(true);
//     const callback = jest.fn();

//     retryWithExponentialBackoff(func, 5, callback);

//     expect(func).toHaveBeenCalledTimes(1);
//     expect(callback).not.toHaveBeenCalled();
//   });
//   it("", () => {
//     const func = jest
//       .fn()
//       .mockReturnValueOnce(false)
//       .mockReturnValueOnce(true)
//       .mockReturnValueOnce(false);
//     const callback = jest.fn();
//     retryWithExponentialBackoff(func, 2, callback);

//     // jest.runAllTimers();
//     setTimeout(() => {
//       expect(func).toHaveBeenCalledTimes(3);
//       expect(callback).toHaveBeenCalledWith(true);
//     }, 30000);
//   });
// });
