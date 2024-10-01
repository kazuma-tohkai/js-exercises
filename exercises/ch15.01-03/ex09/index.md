# React

## XSS対策

- 自動エスケープReact

  - JSXを使うことにより、埋め込まれた値をレンダリングされる前にエスケープ処理を行うことでXSSを防止する。
  - [XSS（クロスサイトスクリプティング）対策](https://fintan-contents.github.io/spa-restapi-guide/xss/)

## 残る危険

- dangerouslySetInnerHTMLの誤用

  - `dangerouslySetInnerHTML`というプロパティを使うと、HTMLをエスケープ処理をせずにそのまま埋め込むため、XSSを引き起こすことができる。
  - 参考：[React は javascript スキームを使った XSS を防ぐことができない](https://azukiazusa.dev/blog/react-javascript-xss/)
