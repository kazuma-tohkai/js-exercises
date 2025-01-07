## Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類

- SIGTERM: コンテナのGraceful Shutdownのために最初に送信されるシグナル。コンテナはこのシグナルを受け取ってクリーンアップ処理を行い、リソースを解放して終了する。
- SIGKILL: SIGTERMシグナルを受け取ったコンテナが一定時間内に終了しない場合に送信されるシグナル。コンテナを強制終了する。
