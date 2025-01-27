# npm install すると作成される package-lock.json はどのような役割を持つのか。また、リポジトリにコミットすべきか、について説明しなさい。

- package.json ではパッケージのバージョンは `^4.8.0` のような表記になっている（この例だと、4.8.0以上の4.x.xのバージョンだと何でもOK）
- package.json のみgit管理している場合、各開発者が npm install したタイミングによって異なるバージョンのパッケージがインストールされてしまう。
- 一方、package-lock.json は npm install で実際にインストールしたパッケージのバージョンが記録されている。
- package-lock.jsonもgit管理していた場合、npm install したときに、package-lock.json に記録されているバージョンがインストールされ、開発者によってバージョンがずれてしまうことがなくなる。

よって、package-lock.jsonもリポジトリにコミットすべきである。

参考URL:[package.jsonとpackage-lock.jsonの運用方法について – もばらぶエンジニアブログ](https://engineering.mobalab.net/2019/08/08/package-json%E3%81%A8package-lock-json%E3%81%AE%E9%81%8B%E7%94%A8%E6%96%B9%E6%B3%95%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/)
