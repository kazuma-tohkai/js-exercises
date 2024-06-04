| writable | enumerable | configurable | プロパティの変更 | プロパティの削除 | hasOwnProperty | propertyIsEnumerable |
| -------- | ---------- | ------------ | ---------------- | ---------------- | -------------- | -------------------- |
| true     | true       | true         | ◯                | ◯                | ◯              | ◯                    |
| true     | true       | false        | ◯                | ×                | ◯              | ◯                    |
| true     | false      | true         | ◯                | ◯                | ◯              | ×                    |
| false    | true       | true         | ×                | ◯                | ◯              | ◯                    |
| false    | false      | false        | ×                | ×                | ◯              | ×                    |
