`index3.js`は`index2.js`をインポートし、`index2.js`は`index1.js`をインポートしているとき、`index3.js`を実行すると、

- `index1.js` -> `index2.js` -> `index3.js`という順番で実行された。
- `index2.js`の中の`index1.js`をインポートするimportキーワードの前後にプログラムを書いたが、importキーワードの前に書いたプログラムよりも先に、`index1.js`が実行された（インポートは巻き上げられる）
