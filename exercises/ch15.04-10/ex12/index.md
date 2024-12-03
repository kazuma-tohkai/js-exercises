# Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい(ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。

## hashchange

### 実装

- ドキュメントのフラグメント識別子が変更されたときに発生する

### 実際にリロードしてみると

- `Active`を選択してからリロード
- リロードすると、`todo-list`内のアイテムが初期化されるので何も表示されなくなる
- `http://localhost:3002/ch15.04-10/ex11/`にGETメソッドを投げている

## pushState

### 実装

- ブラウザの履歴スタックに、Webアプリケーションの状態を表すオブジェクトを追加し、URLを変更する

### 実際にリロードしてみると

- `Active`を選択してからリロード
- 404エラーが発生する
- `http://localhost:3002/ch15.04-10/ex12/active`にGETメソッドを投げている
- URLが変更されているので、末尾に`/active`がついている。そのようなページは存在しないので404エラーになる。

## ここまでの例は serve コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。

-