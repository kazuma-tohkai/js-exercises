### プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

- 末尾再帰は呼び出し時に引数に計算結果を渡すので、呼び出し元関数が呼び出し先関数の返却値を必要としない。そのため返却値を待つ必要がないので最適化できる。

### JavaScript で末尾再帰最適化を実装している処理系を答えなさい。利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。

- Safariで実行するとエラーは出なかった。結果はInfinityが表示された。
