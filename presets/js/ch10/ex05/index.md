- ES6のモジュール index1.jsの各
  - デフォルトエクスポートの場合は、インポート側の名前は変わらない
  - 名前変更を伴うインポートの場合は、インポート側のasキーワードの前の名前が自動で変更された。asキーワードの後ろの名前は変わらない。
  - 再エクスポートの場合は、エクスポート構文にasキーワードが自動的に付加され、asキーワードの前に変更された名前が入った。
- Nodeのモジュール
  - エクスポート元で名前を変更すると、module.exportオブジェクトが簡略記法ではなく、通常のリテラル記法に変更され、コロンの後ろに変更された名前が自動的に入った。
