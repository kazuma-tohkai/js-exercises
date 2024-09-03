import {
  fetchFirstFileSizePromise,
  fetchSumOfFileSizesPromise,
} from "./index.js";
import * as fs from "node:fs";
import { jest } from "@jest/globals";

describe("fetchFirstFileSize", () => {
  // もとのコード
  function fetchFirstFileSize(path, callback) {
    fs.readdir(path, (err, files) => {
      if (err) {
        callback(err);
        return;
      }
      if (files.length === 0) {
        callback(null, null);
        return;
      }

      fs.stat(path + "/" + files[0], (err, stats) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, stats.size);
      });
    });
  }

  test("正常", () => {
    // モック関数
    const mockCallback = jest.fn((err, size) => {
      return err ? err : size ? size : null;
    });
    fetchFirstFileSize("ch13/ex04", mockCallback);
    return fetchFirstFileSizePromise("ch13/ex04").then((result) => {
      setTimeout(() => {
        // コールバックの結果とPromiseの結果が同じであることを評価
        expect(result).toBe(mockCallback.mock.results[0].value);
      }, 100);
    });
  });

  test("ディレクトリ内にファイルがない", () => {
    // モック関数
    const mockCallback = jest.fn((err, size) => {
      return err ? err : size ? size : null;
    });
    fetchFirstFileSize("ch13/ex04/nofiles", mockCallback);
    return fetchFirstFileSizePromise("ch13/ex04/nofiles").then((result) => {
      setTimeout(() => {
        // コールバックの結果とPromiseの結果が同じであることを評価
        expect(result).toBe(mockCallback.mock.results[0].value);
      }, 100);
    });
  });

  test("引数として渡したディレクトリが存在しない", () => {
    // モック関数
    const mockCallback = jest.fn((err, size) => {
      return err ? err : size ? size : null;
    });
    fetchFirstFileSize("ch13/ex04/noDirectory", mockCallback);
    return fetchFirstFileSizePromise("ch13/ex04/noDirectory").then((result) => {
      setTimeout(() => {
        // コールバックの結果とPromiseの結果が同じであることを評価
        expect(result).toStrictEqual(mockCallback.mock.results[0].value);
      }, 100);
    });
  });
});

describe("fetchFirstFileSize", () => {
  // もとのコード
  function fetchSumOfFileSizes(path, callback) {
    fs.readdir(path, (err, files) => {
      if (err) {
        callback(err);
        return;
      }

      let total = 0;
      const rest = [...files];

      function iter() {
        if (rest.length === 0) {
          callback(null, total);
          return;
        }

        const next = rest.pop();
        fs.stat(path + "/" + next, (err, stats) => {
          if (err) {
            callback(err);
            return;
          }
          total += stats.size;
          iter();
        });
      }
      iter();
    });
  }

  test("正常", () => {
    // モック関数
    const mockCallback = jest.fn((err, total) => {
      return err ? err : total;
    });
    fetchSumOfFileSizes("ch13/ex04", mockCallback);
    return fetchSumOfFileSizesPromise("ch13/ex04").then((result) => {
      setTimeout(() => {
        // コールバックの結果とPromiseの結果が同じであることを評価
        expect(result).toBe(mockCallback.mock.results[0].value);
      }, 100);
    });
  });
  test("ディレクトリ内にファイルがない(合計サイズが0)", () => {
    // モック関数
    const mockCallback = jest.fn((err, total) => {
      return err ? err : total;
    });
    fetchSumOfFileSizes("ch13/ex04/nofiles", mockCallback);
    return fetchSumOfFileSizesPromise("ch13/ex04/nofiles").then((result) => {
      setTimeout(() => {
        // コールバックの結果とPromiseの結果が同じであることを評価
        expect(result).toBe(mockCallback.mock.results[0].value);
      }, 100);
    });
  });
  test("引数として渡したディレクトリが存在しない", () => {
    // モック関数
    const mockCallback = jest.fn((err, total) => {
      return err ? err : total;
    });
    fetchSumOfFileSizes("ch13/ex04/noDirectory", mockCallback);
    return fetchSumOfFileSizesPromise("ch13/ex04/noDirectory").then(
      (result) => {
        setTimeout(() => {
          // コールバックの結果とPromiseの結果が同じであることを評価
          expect(result).toStrictEqual(mockCallback.mock.results[0].value);
        }, 100);
      }
    );
  });
});
