## Slack や O365 の API は機密情報をヘッダーで指定する。パスやクエリでないのは何故かセキュリティの観点で記載しなさい。

- 参考：[api開発において、api_keyをheaderに入れて認証する仕組みを多く見かけますが、何故paramsに入れないのでしょうか？headerの方が安全なのでしょうか？ - Quora](https://jp.quora.com/api-kaihatsu-nioite-api-key-wo-header-ni-ire-te-ninshou-suru-shikumi-wo-ooku-mikake-masu-ga-naze-params-ni-ire-nai-node-shou-ka-header-no-hou-ga-anzen-nanode-shou-ka)

paramsにapi_keyを指定するとurlとして表現されてしまいます。例えばこんな感じです。

http://hogehoge.com/mypage/?api_key=yourapikey

これはコピペできてしまうので、うっかりTwitterなんかで投稿できてしまいます。すると本人ではない他人でもそのurlをクリックするだけでapi_keyで認証できてしまうからです。
