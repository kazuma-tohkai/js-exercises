function hoge() {
  // constで宣言された変数はブロックスコープなので、文ブロックを使えば同じ関数内に同じ変数名の変数を宣言できる
  {
    const fuga = 1;
    console.log(fuga);
  }
  {
    const fuga = 2;
    console.log(fuga);
  }
}
hoge();
