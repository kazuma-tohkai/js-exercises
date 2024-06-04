export function add(tableA, tableB) {
  // 行列Aと行列Bは行数および列数が同じ場合のみ、行列の加減算が可能
  // C = A±B
  // C[row][col] = A[row][col] + B[row][col]

  if (tableA.length !== tableB.length) {
    throw new Error("行列の行数が異なります");
  }

  // 計算結果の行列の行を生成
  const tableC = new Array(tableA.length);

  for (let row = 0; row < tableA.length; row++) {
    if (tableA[row].length !== tableB[row].length) {
      throw new Error("行列の列数が異なります");
    }

    // 計算結果の行列の列を生成
    tableC[row] = new Array(tableA[row].length);

    for (let col = 0; col < tableA[row].length; col++) {
      // 疎な配列、undefined、null、NaNが含まれていないか
      if (
        (!tableA[row][col] && tableA[row][col] !== 0) ||
        (!tableB[row][col] && tableB[row][col] !== 0)
      ) {
        throw new Error("無効な要素が含まれています");
      }

      tableC[row][col] = tableA[row][col] + tableB[row][col];
    }
  }
  return tableC;
}

export function mul(tableA, tableB) {
  // 行列A(m行n列)、行列B(n行l列)のとき、
  // 行列の積ABは、m行l列の行列を返す。またAの列数mとBの行数lが同じ場合のみ乗算が可能
  // AB = C
  // C[row][col] = Σ[k=1 → n](A[row][k]B[k][col])

  // 行列Bの列数がすべての行で同じか
  for (let row = 0; row + 1 < tableB.length; row++) {
    if (tableB[row].length !== tableB[row + 1].length) {
      throw new Error("tableBの列数がすべての行で同じではありません");
    }
  }

  // 計算結果の行列の行を生成(行数はtableAと同じ)
  const tableC = new Array(tableA.length);

  for (let row = 0; row < tableA.length; row++) {
    if (tableA[row].length !== tableB.length) {
      throw new Error("tableAの列数とtableBの行数が異なります");
    }

    // 計算結果の行列の列を生成(列数はtableBと同じ)
    tableC[row] = new Array(tableB[0].length);

    for (let col = 0; col < tableB[0].length; col++) {
      let temp = 0;
      for (let k = 0; k < tableB.length; k++) {
        // 疎な配列、undefined、null、NaNが含まれていないか
        if (
          (!tableA[row][k] && tableA[row][k] !== 0) ||
          (!tableB[k][col] && tableB[k][col] !== 0)
        ) {
          throw new Error("無効な要素が含まれています");
        }

        temp += tableA[row][k] * tableB[k][col];
      }
      tableC[row][col] = temp;
    }
  }
  return tableC;
}
