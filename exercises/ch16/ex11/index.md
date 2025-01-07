## 複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい。

- client.cjs を作成して、createConnection()メソッドで20000個のクライアントを接続はできたが、30000個だとエラーが出た。
- 原因はC10K問題だと思われる（16.12で調べた）

```
node:events:496
      throw er; // Unhandled 'error' event
      ^

Error: connect EADDRNOTAVAIL 127.0.0.1:8000 - Local (0.0.0.0:0)
    at internalConnect (node:net:1097:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:464:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1496:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:132:8)
Emitted 'error' event on Socket instance at:
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -99,
  code: 'EADDRNOTAVAIL',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8000
}

Node.js v22.11.0
```
