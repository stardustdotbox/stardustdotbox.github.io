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

大好きなdAppsであるLootcoinのHTTP通信やSoneiumチェイン上でのトランザクションを少し深堀してみます。Lootcoinの内部構造について知ることはおもしろいですね。ヽ(´ー`)ノ

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

FoundryでRPC URLやPRIVATE_KEYを設定する方法は複数あります。

#### 方法1: foundry.tomlファイルを使用（推奨）

プロジェクトのルートディレクトリに`foundry.toml`ファイルを作成し、設定を記述します。

```toml
# foundry.toml
[rpc_endpoints]
soneium = "https://rpc.soneium.org"
mainnet = "https://eth.llamarpc.com"
sepolia = "https://rpc.sepolia.org"

[etherscan]
soneium = { key = "YOUR_ETHERSCAN_API_KEY" }
```

**使用方法：**

```bash
# foundry.tomlで設定したエンドポイントを使用
┌──(stardust✨stardust)-[~]
└─$ cast tx $TX_HASH --rpc-url soneium
```

**注意：** `foundry.toml`には秘密鍵を直接書き込まないでください。秘密鍵は環境変数や`.env`ファイルを使用します。

#### 方法2: .envファイルを使用

プロジェクトのルートディレクトリに`.env`ファイルを作成します。

```bash
# .env
RPC_URL=https://rpc.soneium.org
PRIVATE_KEY=0xあなたの秘密鍵
ETHERSCAN_API_KEY=あなたのAPIキー
```

**使用方法：**

```bash
# .envファイルを読み込む
┌──(stardust✨stardust)-[~]
└─$ source .env

# または、direnvを使用（自動的に読み込まれる）
┌──(stardust✨stardust)-[~]
└─$ export $(cat .env | xargs)
```

**direnvの設定（オプション）：**

```bash
# direnvをインストール
sudo apt install direnv

# .envrcファイルを作成
echo 'dotenv' > .envrc
direnv allow
```

#### 方法3: 環境変数を直接設定

```bash
┌──(stardust✨stardust)-[~]
└─$ export RPC_URL=https://rpc.soneium.org

┌──(stardust✨stardust)-[~]
└─$ export PRIVATE_KEY=0xあなたの秘密鍵

┌──(stardust✨stardust)-[~]
└─$ export TX_HASH=0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91
```

#### 方法4: foundry.tomlと環境変数の組み合わせ

`foundry.toml`でRPCエンドポイントを設定し、秘密鍵は環境変数で管理する方法が推奨されます。

**foundry.toml:**

```toml
[rpc_endpoints]
soneium = "https://rpc.soneium.org"
```

**.env（.gitignoreに追加すること）:**

```bash
PRIVATE_KEY=0xあなたの秘密鍵
```

**使用例：**

```bash
# RPC URLはfoundry.tomlから、PRIVATE_KEYは環境変数から
┌──(stardust✨stardust)-[~]
└─$ cast send 0x... "function()" --rpc-url soneium --private-key $PRIVATE_KEY
```

#### セキュリティのベストプラクティス

1. **`.env`ファイルを`.gitignore`に追加**
   ```bash
   echo ".env" >> .gitignore
   ```

2. **`.env.example`ファイルを作成**
   ```bash
   # .env.example
   RPC_URL=https://rpc.soneium.org
   PRIVATE_KEY=0x...
   ETHERSCAN_API_KEY=...
   ```

3. **秘密鍵は環境変数で管理**
   - `foundry.toml`には秘密鍵を書き込まない
   - `.env`ファイルは`.gitignore`に追加
   - 本番環境では、環境変数やシークレット管理サービスを使用

#### 実際の設定例

**プロジェクト構造：**

```
my-project/
├── foundry.toml
├── .env          # .gitignoreに追加
├── .env.example  # テンプレート
└── .gitignore
```

**foundry.toml:**

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]

[rpc_endpoints]
soneium = "https://rpc.soneium.org"
mainnet = "https://eth.llamarpc.com"

[etherscan]
soneium = { key = "${ETHERSCAN_API_KEY}" }
```

**.env:**

```bash
PRIVATE_KEY=0xあなたの秘密鍵
ETHERSCAN_API_KEY=あなたのAPIキー
```

**使用例：**

```bash
# foundry.tomlで設定したエンドポイントを使用
┌──(stardust✨stardust)-[~]
└─$ cast tx $TX_HASH --rpc-url soneium

# 環境変数から秘密鍵を読み込む
┌──(stardust✨stardust)-[~]
└─$ cast send 0x... "function()" --rpc-url soneium --private-key $PRIVATE_KEY
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
cast call <コントラクトアドレス> "<関数シグネチャ>(戻り値の型)" [パラメータ...] --rpc-url <RPC_URL>
```

**重要なポイント：**
- 関数シグネチャと戻り値の型を`()`で囲んで指定します
- 引数がない関数の場合：`"functionName()(戻り値の型)"`
- 引数がある関数の場合：`"functionName(引数の型)(戻り値の型)" 引数の値`
- 複数の戻り値がある場合：`"functionName()(型1,型2,型3)"`

**例：**
```bash
# 引数なし、戻り値がstring
cast call <アドレス> "name()(string)" --rpc-url $RPC_URL

# 引数が1つ（address）、戻り値がuint256
cast call <アドレス> "balanceOf(address)(uint256)" <アドレス> --rpc-url $RPC_URL

# 引数が2つ、戻り値がuint256
cast call <アドレス> "allowance(address,address)(uint256)" <アドレス1> <アドレス2> --rpc-url $RPC_URL
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

**3. トークン名を取得（name()メソッド）**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "name()(string)" \
  --rpc-url $RPC_URL
Lootcoin
```

**4. トークンシンボルを取得**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "symbol()(string)" \
  --rpc-url $RPC_URL
LOOT
```

**5. 小数点以下の桁数を取得**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "decimals()(uint8)" \
  --rpc-url $RPC_URL
18
```

**6. 最大供給量を確認**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "MAX_SUPPLY()(uint256)" \
  --rpc-url $RPC_URL
21000000000000000000000000 [2.1e25]
```

**7. オーナーアドレスを確認**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "owner()(address)" \
  --rpc-url $RPC_URL
0xD33367e2aEF56D700c1918C8a79Fba54c0C9aa57
```

**8. ミント権限を持つアドレスを確認**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "minter()(address)" \
  --rpc-url $RPC_URL
0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751
```

**9. バーンされた総量を確認**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast call 0x9317841C2e9F6BCb44119C184152cfb1EF79034a \
  "amtBurned()(uint256)" \
  --rpc-url $RPC_URL
630153000000000000000000 [6.301e23]
```

### まとめ

Foundryの`cast`コマンドを使用することで、トランザクションの詳細な分析が可能です：

1. **基本情報**: `cast tx`でトランザクションの基本データを取得
2. **実行結果**: `cast receipt`でレシートとイベントログを確認
3. **詳細トレース**: `cast run`で実行フローを追跡
4. **状態確認**: `cast call`でコントラクトの状態を確認

### コントラクトのメソッド一覧を取得

コントラクトアドレス `0x9317841C2e9F6BCb44119C184152cfb1EF79034a` が持っているメソッドを一覧表示する方法です。

#### 方法1: BlockscoutのAPIを使用（推奨）

BlockscoutのAPIを使用してコントラクトのABIを取得し、メソッド一覧を表示します。

```bash
┌──(stardust✨stardust)-[~]
└─$ curl -s "https://soneium.blockscout.com/api?module=contract&action=getabi&address=0x9317841C2e9F6BCb44119C184152cfb1EF79034a" | \
  jq -r '.result' | \
  jq -r '.[] | select(.type == "function") | .name + "(" + (.inputs | map(.type) | join(",")) + ")"'
MAX_SUPPLY()
allowance(address,address)
amtBurned()
approve(address,uint256)
balanceOf(address)
burn(uint256)
decimals()
mint(address,uint256)
minter()
name()
owner()
renounceOwnership()
setMinter(address)
symbol()
totalSupply()
transfer(address,uint256)
transferFrom(address,address,uint256)
transferOwnership(address)
```

このコマンドで、コントラクトのすべての関数シグネチャが表示されます。

#### 方法2: コントラクトのバイトコードから関数セレクターを抽出

バイトコードから関数セレクター（4バイト）を抽出して、4byteデータベースで関数名を検索します。

```bash
# コントラクトのバイトコードを取得
┌──(stardust✨stardust)-[~]
└─$ cast code 0x9317841C2e9F6BCb44119C184152cfb1EF79034a --rpc-url $RPC_URL
0x608060405234801561000f575f80fd5b5060043610610111575f3560e01c806342966c681161009e57806395d89b411161006e57806395d89b411461023d578063a9059cbb14610245578063dd62ed3e14610258578063f2fde38b14610290578063fca3b5aa146102a3575f80fd5b806342966c68146101e957806370a08231146101fc578063715018a6146102245780638da5cb5b1461022c575f80fd5b806318160ddd116100e457806318160ddd1461019857806323b872dd146101a0578063313ce567146101b357806332cb6b0c146101c257806340c10f19146101d4575f80fd5b806306fdde03146101155780630754617214610133578063095ea7b31461015e5780630a7d242c14610181575b5f80fd5b...
```

**バイトコードから関数セレクターを抽出：**

バイトコード内の`8063`で始まる4バイトの値が関数セレクターです。以下のように抽出できます：

```bash
┌──(stardust✨stardust)-[~]
└─$ # バイトコードから関数セレクターを抽出（8063で始まる4バイトを抽出）
BYTECODE=$(cast code 0x9317841C2e9F6BCb44119C184152cfb1EF79034a --rpc-url $RPC_URL)

# 関数セレクターを抽出（8063で始まる4バイト）
echo "$BYTECODE" | grep -oE '8063[0-9a-f]{8}' | sort -u | while read selector; do
  # 8063を削除して4バイトのセレクターを取得
  FUNC_SELECTOR="0x${selector:4:8}"
  echo "Function selector: $FUNC_SELECTOR"
  # 4byteデータベースで検索
  cast 4byte $FUNC_SELECTOR 2>/dev/null || echo "  Not found in 4byte database"
done
Function selector: 0x06fdde03
name()
Function selector: 0x07546172
minter()
Function selector: 0x095ea7b3
approve(address,uint256)
Function selector: 0x0a7d242c
amtBurned()
Function selector: 0x18160ddd
totalSupply()
Function selector: 0x23b872dd
transferFrom(address,address,uint256)
Function selector: 0x313ce567
decimals()
Function selector: 0x32cb6b0c
MAX_SUPPLY()
Function selector: 0x40c10f19
mint(address,uint256)
cat642998653(address,uint256)
Function selector: 0x42966c68
burn(uint256)
collate_propagate_storage(bytes16)
Function selector: 0x70a08231
balanceOf(address)
Function selector: 0x715018a6
renounceOwnership()
Function selector: 0x8da5cb5b
owner()
Function selector: 0x95d89b41
symbol()
Function selector: 0xa9059cbb
transfer(address,uint256)
Function selector: 0xdd62ed3e
allowance(address,address)
Function selector: 0xf2fde38b
transferOwnership(address)
_SIMONdotBLACK_(int8[],uint256,address,bytes8,int96)
Function selector: 0xfca3b5aa
setMinter(address)
```

**実際の抽出例：**

バイトコードから以下のような関数セレクターが見つかります：
- `0x06fdde03` - name()
- `0x07546172` - symbol()
- `0x095ea7b3` - approve(address,uint256)
- `0x18160ddd` - totalSupply()
- `0x23b872dd` - transferFrom(address,address,uint256)
- `0x313ce567` - decimals()
- `0x40c10f19` - mint(address,uint256)
- `0x42966c68` - burn(uint256)
- `0x70a08231` - balanceOf(address)
- `0x715018a6` - renounceOwnership()
- `0x8da5cb5b` - owner()
- `0x95d89b41` - symbol() (別の実装)
- `0xa9059cbb` - transfer(address,uint256)
- `0xdd62ed3e` - allowance(address,address)
- `0xf2fde38b` - transferOwnership(address)
- `0xfca3b5aa` - setMinter(address)

**各関数セレクターを4byteデータベースで検索：**

```bash
┌──(stardust✨stardust)-[~]
└─$ cast 4byte 0x70a08231
balanceOf(address)

┌──(stardust✨stardust)-[~]
└─$ cast 4byte 0xa9059cbb
transfer(address,uint256)

┌──(stardust✨stardust)-[~]
└─$ cast 4byte 0x40c10f19
mint(address,uint256)
```

**注意事項：**
- この方法はバイトコードに含まれる関数セレクターを抽出しますが、すべての関数が検出されるとは限りません
- プライベート関数や内部関数はバイトコードに含まれない場合があります
- より正確な結果を得るには、BlockscoutのAPIを使用する方法1を推奨します

#### 方法3: cast interfaceを使用（ABIファイルがある場合）

`cast interface`はローカルのABIファイルからインターフェースを生成するコマンドです。ABIファイルを取得してから使用します。

```bash
┌──(stardust✨stardust)-[~]
└─$ curl -s "https://soneium.blockscout.com/api?module=contract&action=getabi&address=0x9317841C2e9F6BCb44119C184152cfb1EF79034a" | \
  jq -r '.result' > lootcoin.abi

┌──(stardust✨stardust)-[~]
└─$ cast interface lootcoin.abi
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface Interface {
    error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed);
    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);
    error ERC20InvalidApprover(address approver);
    error ERC20InvalidReceiver(address receiver);
    error ERC20InvalidSender(address sender);
    error ERC20InvalidSpender(address spender);
    error NotMinter();
    error OwnableInvalidOwner(address owner);
    error OwnableUnauthorizedAccount(address account);

    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function MAX_SUPPLY() external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function amtBurned() external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function burn(uint256 value) external;
    function decimals() external view returns (uint8);
    function mint(address to, uint256 amount) external;
    function minter() external view returns (address);
    function name() external view returns (string memory);
    function owner() external view returns (address);
    function renounceOwnership() external;
    function setMinter(address _minter) external;
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function transferOwnership(address newOwner) external;
}
```

#### 方法4: 既知の標準メソッドを確認

LootcoinコントラクトはERC-20準拠の可能性が高いため、以下の標準メソッドが含まれている可能性があります：

**ERC-20標準メソッド：**
- `totalSupply()(uint256)` - 総供給量
- `balanceOf(address)(uint256)` - 残高確認
- `transfer(address,uint256)(bool)` - 転送
- `transferFrom(address,address,uint256)(bool)` - 承認済み転送
- `approve(address,uint256)(bool)` - 承認
- `allowance(address,address)(uint256)` - 承認額確認

**追加メソッド（トレースから確認）：**
- `mint(address,uint256)` - ミント（新規発行）


#### 注意事項

- `cast interface`は、コントラクトが`public`または`external`関数を持っている場合にのみ機能します
- プライベート関数や内部関数は表示されません
- コントラクトがプロキシパターンを使用している場合、実装コントラクトのアドレスを指定する必要がある場合があります

## 参考文献

 * [Lootcoin](https://lootcoin.tech?ref=0x53869B88306EB505f0fC66DaE482D42033F85253)
 * [Lootcoin BlackPaper.pdf](https://lootcoin.tech/blackpaper.pdf)
 * https://x.com/Lootcointech
 * https://www.coingecko.com/en/coins/lootcoin
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-1/