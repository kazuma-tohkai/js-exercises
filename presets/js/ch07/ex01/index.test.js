import { add, mul } from "./index.js";

describe("加算", () => {
  it("行数および列数が同じ", () => {
    const tableA = [
      [2, 3, -4],
      [11, 8, 7],
      [2, 5, 3],
    ];
    const tableB = [
      [3, 1, 2],
      [2, 4, 4],
      [-1, 5, 6],
    ];

    expect(add(tableA, tableB)).toEqual([
      [5, 4, -2],
      [13, 12, 11],
      [1, 10, 9],
    ]);
  });

  it("疎な配列を含む", () => {
    const tableA = [
      [2, 3, -4],
      // eslint-disable-next-line
      [11, , 7],
      [2, 5, 3],
    ];
    const tableB = [
      [3, 1, 2],
      [2, 4, 4],
      [-1, 5, 6],
    ];

    expect(() => {
      add(tableA, tableB);
    }).toThrow("無効な要素が含まれています");
  });

  it("undefinedを含む", () => {
    const tableA = [
      [2, 3, -4],
      [11, 8, 7],
      [2, 5, 3],
    ];
    const tableB = [
      [3, 1, 2],
      [undefined, 4, 4],
      [-1, 5, 6],
    ];

    expect(() => {
      add(tableA, tableB);
    }).toThrow("無効な要素が含まれています");
  });

  it("nullを含む", () => {
    const tableA = [
      [2, 3, -4],
      [11, 8, 7],
      [2, 5, 3],
    ];
    const tableB = [
      [3, 1, 2],
      [null, 4, 4],
      [-1, 5, 6],
    ];

    expect(() => {
      add(tableA, tableB);
    }).toThrow("無効な要素が含まれています");
  });

  it("NaNを含む", () => {
    const tableA = [
      [2, 3, -4],
      [11, 8, 7],
      [2, 5, 3],
    ];
    const tableB = [
      [3, 1, 2],
      [0 / 0, 4, 4],
      [-1, 5, 6],
    ];

    expect(() => {
      add(tableA, tableB);
    }).toThrow("無効な要素が含まれています");
  });

  it("行数が異なる", () => {
    const tableA = [
      [2, 3, -4],
      [11, 8, 7],
      [2, 5, 3],
    ];
    const tableB = [
      [3, 1, 2],
      [2, 4, 4],
      // 1行少ない
    ];

    expect(() => {
      add(tableA, tableB);
    }).toThrow("行列の行数が異なります");
  });

  it("列数が異なる", () => {
    const tableA = [
      [2, 3, -4],
      [11, 8, 7],
      [2, 5, 3],
    ];
    const tableB = [
      [3, 1, 2],
      [2, 4], //1列少ない
      [-1, 5, 6],
    ];

    expect(() => {
      add(tableA, tableB);
    }).toThrow("行列の列数が異なります");
  });
});

describe("乗算", () => {
  it("tableAの列数 = tableBの行数 && tableAの行数 = tableBの列数", () => {
    const tableA = [
      [2, 3],
      [1, 4],
      [2, 1],
    ];
    const tableB = [
      [3, 1, 2],
      [2, 4, 2],
    ];

    expect(mul(tableA, tableB)).toEqual([
      [12, 14, 10],
      [11, 17, 10],
      [8, 6, 6],
    ]);
  });

  it("tableAの列数 = tableBの行数 && tableAの行数 != tableBの列数", () => {
    const tableA = [
      [2, 3],
      [1, 4],
      [2, 1],
    ];
    const tableB = [
      [3, 1],
      [2, 4],
    ];

    expect(mul(tableA, tableB)).toEqual([
      [12, 14],
      [11, 17],
      [8, 6],
    ]);
  });

  it("tableAの列数 != tableBの行数", () => {
    const tableA = [
      [2, 3],
      [1], // 1列少ない
      [2, 1],
    ];
    const tableB = [
      [3, 1, 2],
      [2, 4, 2],
    ];

    expect(() => {
      mul(tableA, tableB);
    }).toThrow("tableAの列数とtableBの行数が異なります");
  });

  it("tableAの列数 != tableBの行数", () => {
    const tableA = [
      [2, 3],
      [1, 4],
      [2, 1],
    ];
    const tableB = [
      [3, 1, 2],
      // 1行少ない
    ];

    expect(() => {
      mul(tableA, tableB);
    }).toThrow("tableAの列数とtableBの行数が異なります");
  });

  it("tableBの列数がすべての行で同じではありません", () => {
    const tableA = [
      [2, 3],
      [1, 4],
      [2, 1],
    ];
    const tableB = [[3], [2, 4]];

    expect(() => {
      mul(tableA, tableB);
    }).toThrow("tableBの列数がすべての行で同じではありません");
  });
});
