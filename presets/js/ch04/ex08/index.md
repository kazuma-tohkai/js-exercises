undefinedはグローバル変数なので、書き換えることが可能だから。
その点、void関数は常にundefinedを返すので、よく使われていた。

ただし、[undefinedのMDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined)にあるように最近のブラウザでは書き換えができなくなっており、わざわざ`void 0`を使用する必要が薄れている。

> 最近のブラウザー (JavaScript 1.8.5 / Firefox 4 以降) での undefined は、 ECMAScript 5 仕様により、設定不可、書込不可のプロパティとなります。 (そうでない場合でも、上書きは避けてください。)

また、ESLintでもエラーが出る。
