## hash-bangとは
[XMLの第一人者Tim Bray氏「URLに#!入れるな」 | gihyo.jp](https://gihyo.jp/dev/clip/01/orangenews/vol62/0005)
- hash-bangを含むURLはAjaxを利用するために考えられたしくみです。#以降は単なるフラグメントとして処理されるため、サーバは#より前のURLを解釈しコンテンツを出力します。そしてブラウザにてJavaScriptが#以降を解釈し、以降のパスに相当するコンテンツをAjaxにて取得しコンテンツを書き換えます。
- このしくみができた背景は、Ajax後のコンテンツをSEO（Search Engine Optimization、検索エンジン最適化）の観点からPermalink（固定リンク）にしたいが、一部のブラウザがURLを変更できないため、JavaScriptでフラグメントが変更できるしくみを利用しよう、という事情があります。

## Ajaxとは
[JavascriptのAjaxについての基本まとめ #JavaScript - Qiita](https://qiita.com/katsunory/items/9bf9ee49ee5c08bf2b3d)
- Asynchronous JavaScript + XMLの略。
- すなわちJavascriptとXMLを使用して非同期（Asynchronous）でページ内容を更新する技術のこと。

1. クライアントから非同期更新に必要なデータをサーバに送る
1. サーバはデータを受け取ってクライアントに整形済データを返す
1. クライアントはサーバから受け取った整形済データをDOMに反映する

- ざっくりこのような流れでAjaxは実現されている。クライアントからデータを送ったり、サーバから整形済データが返ってきたと検知するところにJavascriptのXTR（XMLHttpRequest）という技術が使われていて、返ってくる整形済データがXMLだったりするのでAsynchronous JavaScript + XMLと呼ばれている。ただしXMLは名前だけ残っている感じで、今は返ってくるデータはJSONというフォーマットであることが多い。

## No more #!
[Twitterがページ表示時間を5分の1に高速化。どのようなテクニックを使ったのか？ － Publickey](https://www.publickey1.jp/blog/12/twitter51.html)
- ページのURLに含まれているHashbangスタイルのURL（#!）を廃止。これまではHTMLをロードし、JavaScriptをロードし、HashbangスタイルのURLを認識してレンダリングが行われる、というステップでページが表示されてたが、今後は通常のURLでHTMLがロードされすぐに表示されるため、最初のページ表示が非常に高速になっている。