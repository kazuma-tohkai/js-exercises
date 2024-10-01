参考：[サブリソース完全性](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity)

# サブリソース完全性

サブリソース完全性 (Subresource Integrity, SRI) は、 (CDN などから) 取得したリソースが意図せず改ざんされていないかをブラウザーが検証するセキュリティ機能です。 SRI を利用する際には、取得したリソースのハッシュ値と一致すべきハッシュ値を指定します。

## サブリソース完全性の必要性

複数のサイトで使われるスクリプトやスタイルシートなどのファイルをコンテンツ配信ネットワーク (CDN) にホストすることにより、読み込みに必要な時間や通信帯域を減らすことができます。しかし、 CDN はリスクにもなり得ます。仮に攻撃者が CDN を掌握できれば、攻撃者は CDN 上のファイルに悪意あるコンテンツを挿入することにより (あるいは完全に置き換えることにより)、その CDN からファイルを読み込む全てのサイトを攻撃対象とすることができます。

サブリソース完全性は、ウェブアプリケーションやウェブ文書が (CDN など任意の場所から) 取得したファイルについて、第三者によってファイルの中に別のものが挿入されていないか、そして、それらのファイルに対してその他の改ざんが行われていないかを検証することにより、先程のような攻撃のリスクを軽減します。

## 動作確認

- ex01のスクリプト、テストファイルを使って動作確認

- まずは`integrity`属性に設定するハッシュ値を生成  
  `cat index.js | openssl dgst -sha384 -binary | openssl base64 -A`

### 適切なintegrity値の場合

- index.html の scriptタグの integrity属性に生成したハッシュ値を設定

```
    <script
      type="module"
      integrity="sha384-EKck5JmAzAlg5AM2XNgBvHeKhwE5+G8zDXN+cHA5w9JrBZVFnREXns76iVaCDHel"
      src="./index.js"
    ></script>
```

- テスト結果  
  すべて成功

### 適切なintegrity値でない場合

- ハッシュ値を少し変更した

```
    <script
      type="module"
      integrity="sha384-DKck5JmAzAlg5AM2XNgBvHeKhwE5+G8zDXN+cHA5w9JrBZVFnREXns76iVaCDHel"
      src="./index.js"
    ></script>
```

- テスト結果

```
Running 5 tests using 1 worker

  ✓  1 ch15.01-03/ex03/index.spec.js:52:3 › simple todo app › no default todos (661ms)
  ✘  2 ch15.01-03/ex03/index.spec.js:56:3 › simple todo app › add new todo (340ms)
Testing stopped early after 1 maximum allowed failures.


  1) ch15.01-03/ex03/index.spec.js:56:3 › simple todo app › add new todo ───────────────────────────

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 0

      57 |     await addToDo(page, "質問表に質問を記載する");
      58 |
    > 59 |     expect(await countToDos(page)).toBe(1);
         |                                    ^
      60 |
      61 |     const todo = queryToDo(page, 0);
      62 |     const label = todo.getByText("質問表に質問を記載する");

        at /home/r00516659/js-exercises/exercises/ch15.01-03/ex03/index.spec.js:59:36

  1 failed
    ch15.01-03/ex03/index.spec.js:56:3 › simple todo app › add new todo ────────────────────────────
  3 did not run
  1 passed (3.8s)
  1 error was not a part of any test, see above for details
```

- 説明

```
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);
```

で失敗している。  
addToDo関数はtodoパラメータをテキストボックスに入力して`Add`ボタンを押す処理をする。  
index.jsファイルがロードされていないので、AddボタンによるリストへのToDo項目の追加が行われず、エラーが出ていると考えられる。
