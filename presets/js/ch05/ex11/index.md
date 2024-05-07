- Nodeでdebugger文を使ってデバッグする方法

  - ブレークポイントを設定したい場所に`debugger`文を挿入する
  - inspectを使用する(`node inspect hoge.js`)
  - 1行目にブレークポイントが置かれた状態で開始される
  - `c`を入力すると最初のdeguggerを挿入した箇所で止まる（`c`を入力するたびにdebuggerを挿入した次の箇所に進む）
  - 例えば変数やオブジェクトの値を調べたいときは`repl`コマンドを使う

- 参考URL
  - [Node.jsのアプリケーションデバッグ・改善方法をおさらいする](https://hiroppy.me/blog/nodejs-performance/)
  - [初心者向けにNode.jsのデバッグ(debug)手法を徹底解説](https://www.sejuku.net/blog/87186)
