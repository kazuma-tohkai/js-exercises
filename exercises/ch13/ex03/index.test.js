import { readdir, stat } from "./index.js";
import * as fs from "node:fs";
import { jest } from "@jest/globals";

test("readdir", () => {
  return readdir("ch13/ex03/A").then((files) => {
    expect(files).toStrictEqual(["B", "a.txt"]);
  });
});

test("stat", () => {
  const mockCallback = jest.fn((err, stat) => {
    return err ? err : stat;
  });
  fs.stat("ch13/ex03/A/a.txt", mockCallback);
  return stat("ch13/ex03/A/a.txt").then((result) => {
    expect(result.size).toBe(mockCallback.mock.results[0].value.size);
  });
});
