# オリジン間リソース共有（CORS）について、以下の問いに答えなさい。

## クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい

制約がないと、任意のサイトに対してリソースの共有が可能になる。
悪意のある罠サイトを閲覧した際に、罠サイトから取得したJavascriptコードなどによって認証情報や個人情報などを取得されたり、書き換えられたりする。

## クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい

Preflight Request はメインのリクエストを送信しても問題ないかを事前に確認するために送信されるもの

- CORS以前から存在するリクエストの場合はPreflightリクエストは送信されない

  - サーバー側でCORS対応が追いついていなければ、CORSエラーのためリクエストが送信されなくなってしまうため

- 参考：[オリジン間リソース共有 (CORS) - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E5%88%B6%E5%BE%A1%E3%82%B7%E3%83%8A%E3%83%AA%E3%82%AA%E3%81%AE%E4%BE%8B)

- 参考：[【CORS】なぜ、Preflight Request が発生するときとしないときがあるのか](https://zenn.dev/tm35/articles/ad05d8605588bd)