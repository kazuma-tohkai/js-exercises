`false`がコンソール出力される。

理由はテキストの下記の部分による。

> retrun文やcontinue文、break文で処理がtryブロックから移動する場合は、処理が移動する前にfinallyブロックが実行されます。  
> finallyブロック自体で、return文やcontinue文、break文、throw文を使用したり、例外をスローする関数を呼び出したりして処理が移動することになる場合は、この移動が行われます。
