---
title: 'Lootcoinの勇者物語(2)'
date: 2026-01-02 22:23:41
permalink: /posts/2026/01/Lootcoin-Hero-Story-2/
tags:
  - Lootcoin
  - Soneium
header:
  image: https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41
---

<img width="1500" height="500" alt="image" src="https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41" />

{% include toc %}

大好きなdAppsであるLootcoinのHTTP通信やSoneiumチェイン上でのトランザクションを少し見てみます。

## Lootcoinの通信を観察してみる

 * リクエスト

```
POST / HTTP/2
Host: rpc.soneium.org
Content-Length: 323
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
Accept: application/json
Content-Type: application/json
Sec-Gpc: 1
Origin: chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn
Sec-Fetch-Site: none
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Sec-Fetch-Storage-Access: active
Accept-Encoding: gzip, deflate, br
Accept-Language: ja,en-US;q=0.9,en;q=0.8
Priority: u=1, i

{"id":3465700904,"jsonrpc":"2.0","method":"eth_getLogs","params":[{"fromBlock":"0xf2d2a8","toBlock":"0x1053481","address":"0xbe883340192802a3f308864c9b06b8da2ef5574f","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",null,"0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"]}]}
```

 * レスポンス

```
HTTP/2 200 OK
Date: Fri, 02 Jan 2026 16:30:26 GMT
Content-Type: application/json; charset=utf-8
X-Ratelimit-Limit-Minute: 1800
Ratelimit-Remaining: 1749
Ratelimit-Reset: 34
Ratelimit-Limit: 1800
X-Ratelimit-Remaining-Minute: 1749
Vary: origin, access-control-request-method, access-control-request-headers
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: *
X-Kong-Upstream-Latency: 27
X-Kong-Proxy-Latency: 1
Via: kong/3.6.1
X-Kong-Request-Id: 3979b33d3056c151abc74f4f47584c2c
Cf-Cache-Status: DYNAMIC
Server: cloudflare
Cf-Ray: 9b7ba4171d7a7e2f-NRT

{"jsonrpc":"2.0","id":3465700904,"result":[{"address":"0xbe883340192802a3f308864c9b06b8da2ef5574f","blockHash":"0x4574b6f3ca659bf91c0256e8aaaababe40818e756c952ec9ce5b1a248b859454","blockNumber":"0xfc3bc9","blockTimestamp":"0x69460131","data":"0x","logIndex":"0x4","removed":false,"topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253","0x00000000000000000000000000000000000000000000000000000000000000e2"],"transactionHash":"0x793ee4be4e8ac4c5a30958604c30baec5ee5ed5efff0adb93b3e37f3e02d5ba7","transactionIndex":"0xa"}]}
```

## リクエストとレスポンスの解説

### リクエストの詳細

このリクエストは**Ethereum JSON-RPC 2.0**形式で、`eth_getLogs`メソッドを使用してイベントログを取得しています。

**リクエストボディの構造：**
```json
{
  "id": 3465700904,                    // リクエストID（レスポンスと対応）
  "jsonrpc": "2.0",                    // JSON-RPCバージョン
  "method": "eth_getLogs",            // メソッド名：イベントログを取得
  "params": [{
    "fromBlock": "0xf2d2a8",          // 開始ブロック番号（16進数）
    "toBlock": "0x1053481",          // 終了ブロック番号（16進数）
    "address": "0xbe883340192802a3f308864c9b06b8da2ef5574f",  // コントラクトアドレス
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",  // Transferイベントのシグネチャ
      null,                            // fromアドレス（null = 任意）
      "0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"  // toアドレス（特定のアドレス）
    ]
  }]
}
```

**パラメータの意味：**
- `fromBlock` / `toBlock`: 検索するブロック範囲（16進数表記）
  - `0xf2d2a8` = 15,906,984（10進数）
  - `0x1053481` = 17,110,657（10進数）
- `address`: 検索対象のコントラクトアドレス（Lootcoinのコントラクト）
- `topics`: イベントログのフィルタ条件
  - `topics[0]`: Transferイベントのシグネチャ（ERC-20標準）
  - `topics[1]`: `from`アドレス（null = すべての送信元）
  - `topics[2]`: `to`アドレス（`0x53869b...` = 特定の受信アドレス）

**リクエストヘッダー：**
- `Origin: chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn`: MetaMask拡張機能からのリクエスト
- `Content-Type: application/json`: JSON形式のデータ

### レスポンスの詳細

**HTTPステータス：**
- `200 OK`: リクエスト成功

**レスポンスヘッダー：**
- `X-Ratelimit-Limit-Minute: 1800`: 1分あたりのリクエスト上限（1800回）
- `Ratelimit-Remaining: 1749`: 残りのリクエスト数
- `X-Kong-Upstream-Latency: 27`: アップストリームサーバーの処理時間（27ms）
- `Via: kong/3.6.1`: Kong API Gateway経由
- `Server: cloudflare`: Cloudflare経由

**レスポンスボディの構造：**
```json
{
  "jsonrpc": "2.0",
  "id": 3465700904,                   // リクエストIDと対応
  "result": [{
    "address": "0xbe883340192802a3f308864c9b06b8da2ef5574f",  // コントラクトアドレス
    "blockHash": "0x4574b6f3ca659bf91c0256e8aaaababe40818e756c952ec9ce5b1a248b859454",
    "blockNumber": "0xfc3bc9",       // ブロック番号（16進数）
    "blockTimestamp": "0x69460131",  // ブロックタイムスタンプ（Unix時間）
    "data": "0x",                     // イベントデータ（空）
    "logIndex": "0x4",               // ログのインデックス
    "removed": false,                 // チェーン再編成で削除されていない
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",  // Transferイベント
      "0x0000000000000000000000000000000000000000000000000000000000000000",  // from: ゼロアドレス（ミント）
      "0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253",  // to: 受信アドレス
      "0x00000000000000000000000000000000000000000000000000000000000000e2"   // トークンID（226）
    ],
    "transactionHash": "0x793ee4be4e8ac4c5a30958604c30baec5ee5ed5efff0adb93b3e37f3e02d5ba7",
    "transactionIndex": "0xa"
  }]
}
```

**イベントログの解釈：**
- `topics[0]`: Transferイベント（ERC-721/ERC-1155の転送）
- `topics[1]`: `from`アドレスがゼロアドレス = **ミント（新規発行）**
- `topics[2]`: `to`アドレス = 受信者のアドレス
- `topics[3]`: トークンID = `0xe2` = 226（10進数）

### まとめ

この通信は、Lootcoinのコントラクトから特定のアドレスへのトークン転送イベントを監視するために使用されています。MetaMaskなどのウォレット拡張機能が、ユーザーのアドレスに関連するトークン転送を検出するために定期的にこのようなリクエストを送信します。

## LOOTCOINのCLAIMトランザクションを確認する

<img width="445" height="116" alt="image" src="https://github.com/user-attachments/assets/f3b48482-2688-4d82-863d-1b3ff3deccbb" />

 * https://soneium.blockscout.com/tx/0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91

Foundryの`cast`コマンドを使用して、トランザクションの詳細を分析します。

### 環境設定

まず、SoneiumネットワークのRPCエンドポイントを設定します。

```bash
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ export RPC_URL=https://rpc.soneium.org

┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ export TX_HASH=0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91
```

### トランザクションの基本情報を取得

```bash
┌──(stardust✨stardust)-[~]
└─$ cast tx $TX_HASH --rpc-url $RPC_URL

blockHash            0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e
blockNumber          17118914
from                 0x53869B88306EB505f0fC66DaE482D42033F85253
transactionIndex     11
effectiveGasPrice    169415

accessList           []
chainId              1868
gasLimit             113264
hash                 0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91
input                0x372500ab
maxFeePerGas         308869
maxPriorityFeePerGas 100000
nonce                6910
r                    0x7f917b89eef0048288a8d9c5286a95fb9ab5fff3ddbfac13d87645b92c84f8f3
s                    0x2c8698b95a5349ce9e45f048651f3da693ca5e41b27e9996c59fba39bcf3a8f8
to                   0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751
type                 2
value                0
yParity              0
```

このコマンドで、トランザクションの以下の情報が取得できます：
- `from`: 送信者アドレス
- `to`: 受信者アドレス（コントラクトアドレス）
- `value`: 送信されたETHの量
- `input`: 呼び出された関数のデータ
- `gas`: ガス制限
- `gasPrice`: ガス価格

### トランザクションレシートを取得

```bash
┌──(stardust✨stardust)-[~]
└─$ cast receipt $TX_HASH --rpc-url $RPC_URL

blockHash            0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e
blockNumber          17118914
contractAddress      
cumulativeGasUsed    1133337
effectiveGasPrice    169415
from                 0x53869B88306EB505f0fC66DaE482D42033F85253
gasUsed              92251
logs                 [{"address":"0x9317841c2e9f6bcb44119c184152cfb1ef79034a","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"],"data":"0x00000000000000000000000000000000000000000000001bc73179bb1068105b","blockHash":"0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e","blockNumber":"0x10536c2","blockTimestamp":"0x6957f723","transactionHash":"0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91","transactionIndex":"0xb","logIndex":"0x11","removed":false},{"address":"0x9317841c2e9f6bcb44119c184152cfb1ef79034a","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000b755b1e6418d34d5533267af10322d9b79b93dd3"],"data":"0x0000000000000000000000000000000000000000000000017645f8eee5ea8799","blockHash":"0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e","blockNumber":"0x10536c2","blockTimestamp":"0x6957f723","transactionHash":"0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91","transactionIndex":"0xb","logIndex":"0x12","removed":false},{"address":"0x21be1d69a77ea5882accd5c5319feb7ac3854751","topics":["0xfc30cddea38e2bf4d6ea7d3f9ed3b6ad7f176419f4963bd81318067a4aee73fe","0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"],"data":"0x00000000000000000000000000000000000000000000001d3d7772a9f65297f4","blockHash":"0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e","blockNumber":"0x10536c2","blockTimestamp":"0x6957f723","transactionHash":"0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91","transactionIndex":"0xb","logIndex":"0x13","removed":false}]
logsBloom            0x00000000000000000000000000000000008000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000001000000000000000000000000000010000000020000000000000000000800000020000000000000000010000004000000000000000040000000000000000000000080000000000000000000000000000000000000000002000000008000000000000000000000000200000000008000000002000000000000000000000000000000000000000000000000400020800000000000000000080000000000000000000000000000000000000000000000
root                 
status               1 (success)
transactionHash      0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91
transactionIndex     11
type                 2
blobGasPrice         
blobGasUsed          40000
to                   0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751
daFootprintGasScalar 400
l1BaseFeeScalar      9736
l1BlobBaseFee        23248065
l1BlobBaseFeeScalar  1540079
l1Fee                9833984542
l1GasPrice           401448161
l1GasUsed            1600
```

レシートから取得できる情報：
- `status`: トランザクションの成功/失敗
- `gasUsed`: 実際に使用されたガス量
- `logs`: 発行されたイベントログ
- `logsBloom`: ログのブルームフィルター

### 呼び出された関数をデコード

トランザクションの`input`データから、呼び出された関数を特定します。

```bash
# 関数セレクター（最初の4バイト）を取得
# 方法1: JSON形式で取得
┌──(stardust✨stardust)-[~]
└─$ cast tx $TX_HASH --rpc-url $RPC_URL --json | jq -r '.input' | head -c 10
0x372500ab

# 方法2: 人間可読形式から抽出
┌──(stardust✨stardust)-[~]
└─$ cast tx $TX_HASH --rpc-url $RPC_URL | grep "^input" | awk '{print $2}' | head -c 10
0x372500ab

# 実際の実行例
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ cast 4byte 0x372500ab
claimRewards()
```

### イベントログをデコード

トランザクションで発行されたイベントログを確認します。

```bash
┌──(stardust✨stardust)-[~]
└─$ cast receipt $TX_HASH --rpc-url $RPC_URL --json | jq '.logs'
[
  {
    "address": "0x9317841c2e9f6bcb44119c184152cfb1ef79034a",
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"
    ],
    "data": "0x00000000000000000000000000000000000000000000001bc73179bb1068105b",
    "blockHash": "0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e",
    "blockNumber": "0x10536c2",
    "blockTimestamp": "0x6957f723",
    "transactionHash": "0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91",
    "transactionIndex": "0xb",
    "logIndex": "0x11",
    "removed": false
  },
  {
    "address": "0x9317841c2e9f6bcb44119c184152cfb1ef79034a",
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x000000000000000000000000b755b1e6418d34d5533267af10322d9b79b93dd3"
    ],
    "data": "0x0000000000000000000000000000000000000000000000017645f8eee5ea8799",
    "blockHash": "0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e",
    "blockNumber": "0x10536c2",
    "blockTimestamp": "0x6957f723",
    "transactionHash": "0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91",
    "transactionIndex": "0xb",
    "logIndex": "0x12",
    "removed": false
  },
  {
    "address": "0x21be1d69a77ea5882accd5c5319feb7ac3854751",
    "topics": [
      "0xfc30cddea38e2bf4d6ea7d3f9ed3b6ad7f176419f4963bd81318067a4aee73fe",
      "0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"
    ],
    "data": "0x00000000000000000000000000000000000000000000001d3d7772a9f65297f4",
    "blockHash": "0x088204d6478a599ce8d5339e750915a94837f3e10ca9e048b308f2517f895b0e",
    "blockNumber": "0x10536c2",
    "blockTimestamp": "0x6957f723",
    "transactionHash": "0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91",
    "transactionIndex": "0xb",
    "logIndex": "0x13",
    "removed": false
  }
]
```

### トランザクションのトレース（詳細な実行フロー）

より詳細な分析には、トランザクションのトレースを取得します。

```bash
# トランザクションのトレースを取得（人間可読形式）
┌──(stardust✨stardust)-[~]
└─$ cast run $TX_HASH --rpc-url $RPC_URL --trace-printer
Executing previous transactions from the block.
SM Address: 0x21be1d69a77ea5882accd5c5319feb7ac3854751, caller:0x53869b88306eb505f0fc66dae482d42033f85253,target:0x21be1d69a77ea5882accd5c5319feb7ac3854751 is_static:false, transfer:Transfer(0), input_size:4
(snip)
Traces:
  [91099] 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751::claimRewards()
    ├─ [17244] 0x9317841C2e9F6BCb44119C184152cfb1EF79034a::mint(0x53869B88306EB505f0fC66DaE482D42033F85253, 512415477321905475675 [5.124e20])
    │   ├─ emit Transfer(param0: 0x0000000000000000000000000000000000000000, param1: 0x53869B88306EB505f0fC66DaE482D42033F85253, param2: 512415477321905475675 [5.124e20])
    │   └─ ← [Stop]
    ├─ [8444] 0x9317841C2e9F6BCb44119C184152cfb1EF79034a::mint(0xB755B1E6418D34D5533267aF10322d9B79B93dd3, 26969235648521340825 [2.696e19])
    │   ├─ emit Transfer(param0: 0x0000000000000000000000000000000000000000, param1: 0xB755B1E6418D34D5533267aF10322d9B79B93dd3, param2: 26969235648521340825 [2.696e19])
    │   └─ ← [Stop]
    ├─ emit RewardsClaimed(param0: 0x53869B88306EB505f0fC66DaE482D42033F85253, param1: 539384712970426816500 [5.393e20])
    └─ ← [Stop]


Transaction successfully executed.
Gas used: 92251
```

トレースから分かること：
- 呼び出されたすべてのコントラクト関数
- 内部トランザクション（もしあれば）
- ガス使用量の内訳
- 状態変更の詳細

### コントラクトの状態を確認（cast call）

`cast call`を使用して、コントラクトの現在の状態や特定の関数の戻り値を取得できます。

#### 基本的な使用方法

```bash
# 基本的な構文
cast call <コントラクトアドレス> "<関数シグネチャ>" [パラメータ...] --rpc-url <RPC_URL>
```

#### Lootcoinコントラクトの使用例

**1. トークン残高を確認**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "balanceOf(address)(uint256)" \
  0x53869B88306EB505f0fC66DaE482D42033F85253 \
  --rpc-url $RPC_URL
3765103443149382517892 [3.765e21]
```

**2. トークンの総供給量を確認**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "totalSupply()(uint256)" \
  --rpc-url $RPC_URL
1734748426936369140698390 [1.734e24]
```

### まとめ

Foundryの`cast`コマンドを使用することで、トランザクションの詳細な分析が可能です：

1. **基本情報**: `cast tx`でトランザクションの基本データを取得
2. **実行結果**: `cast receipt`でレシートとイベントログを確認
3. **詳細トレース**: `cast run`で実行フローを追跡
4. **状態確認**: `cast call`でコントラクトの状態を確認

## 参考文献

 * [Lootcoin](https://lootcoin.tech?ref=0x53869B88306EB505f0fC66DaE482D42033F85253)
 * [Lootcoin BlackPaper.pdf](https://lootcoin.tech/blackpaper.pdf)
 * https://x.com/Lootcointech
 * https://www.coingecko.com/en/coins/lootcoin
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-1/