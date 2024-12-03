## 実際のサービスの通信をデベロッパーツールなどで眺めて CORS の設定を確認しなさい。

- https://www.aws.training/
  - AWSトレーニングのページを見るとCORS設定が入っていた
  - リクエスト URL:
    https://d2c.aws.amazon.com/csds/collector/v1/events/batch
  - リクエスト メソッド:POST
    - access-control-allow-credentials:true
    - access-control-allow-origin: https://www.aws.training
    - access-control-expose-headers:x-amzn-RequestId,x-amzn-ErrorType,x-amzn-ErrorMessage,Date
