import { jest } from "@jest/globals";
const mock = jest.fn();

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

// ここに１行のコードを書く
obj.toJSON = function () {
  return { x: this.x, y: this.y, sum: this.sum() };
};
obj.x = 1;
obj.y = 2;

// itブロックを追加しないと、Your test suite must contain at least one test.というエラーが出てしまう
it("JSON.stringfy", () => {
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
});
it("mock関数が呼ばれたか", () => {
  expect(mock).toHaveBeenCalled();
});
