- "𠮷野家"[0]や "👨‍👨‍👧‍👧"[0] が何を返す調べなさい。

  - 両方ともに�が返された。�は該当する文字がないときの代替文字。  
    JavaScriptの文字列操作メソッドは文字に対してではなく16ビットの値に対して処理を行う。  
    𠮷 と 👨‍👨‍👧‍👧 は両方ともサロゲートペアなので、最初の16ビット値のみでは文字と認識できないため、�となった。

- 問題 7.8 で得た絵文字に対する知見も述べなさい。
  - Unicodeの絵文字は連結することができる
  - 👨‍👨‍👧‍👧 は'👨','👨','👧','👧'‍の4つの絵文字を連結している