# TypeScriptのトランスパイルは@babel/preset-typescriptやtscによって可能だが、それぞれの違いを調べなさい。

- 参考URL:[TypeScript: ドキュメント - TypeScript で Babel を使用する](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)
- 参考URL:[tscとBabel | みどりのさるのエンジニア](https://t-yng.jp/post/tsc-and-babel)
- 参考URL:[@babel/preset-typescriptを使ってTypeScriptを変換する #TypeScript - Qiita](https://qiita.com/nacam403/items/edf3e2c8ff364aff910f)

## @babel/preset-typescript

- TypeScriptのコードをJavaScriptにトランスパイルしてくれるが、型チェックは行われない
- 仮に型の不整合が存在しても、トランスパイルが成功してしまう
- そのため、Babelでトランスパイルをする場合は、事前にtscで型チェックを実施する
- TypeScript用の.d.tsファイル(型定義ファイル)を作成できない
- 既存プロジェクトでBabelを使っていたら、そこに組み込むことができる（一番のメリットと思われる）

## tsc

- tscのトランスパイル対象となるのは JavaScriptの構文だけ
- Promiseなどの組み込みオブジェクトは構文ではないため、トランスパイル対象から外れてしまう（IEとかの古いブラウザに対応できないが、いまは特に問題ない？）
