---
title: "Foundryの学習帳"
collection: teaching
type: "Workshop"
permalink: /teaching/2026-01-01-Learning-Foundry/
venue: "Ethereium Sepolia"
date: 2026-01-01
header:
  image: stardust.jpg
tags:
  - Foundry
---

{% include toc %}

## Foundryとは？

[Foundry](https://github.com/foundry-rs/foundry)は、**Ethereumアプリケーション開発のためのポータブルでモジュール型のツールキット**です。Rustで書かれており、高速で効率的なスマートコントラクト開発環境を提供します。

### 主な特徴

1. **高速なテスト実行**
   - Rustで実装されているため、**非常に高速**なテスト実行が可能
   - Solidityで直接テストを書ける（JavaScript/TypeScript不要）

2. **主要なツール**
   - **Forge**: スマートコントラクトのビルド、テスト、デプロイを行うツール
   - **Cast**: EVMチェーンと対話するためのCLIツール
   - **Anvil**: ローカルEthereumノード（Hardhat NetworkやGanacheに相当）
   - **Chisel**: Solidity REPL（対話型シェル）。Solidityコードを対話的に実行・テストできる

3. **開発体験**
   - シンプルで直感的なコマンドラインインターフェース
   - 依存関係管理が簡単
   - 強力なデバッグ機能

4. **Solidityネイティブ**
   - Solidityで直接テストを記述可能
   - Solidityの最新機能をサポート

### 他のツールとの比較

- **Hardhat**: JavaScript/TypeScriptベース、豊富なプラグイン
- **Foundry**: Rustベース、**高速なテスト実行**、Solidityネイティブ

Foundryは、特に**テストの実行速度**と**Solidityネイティブな開発体験**を重視する開発者に人気があります。

## Foundryのインストール

```
┌──(stardust✨stardust)-[~]
└─$ curl -L https://foundry.paradigm.xyz | bash
┌──(stardust✨stardust)-[~]
└─$ exec $SHELL -l
┌──(stardust✨stardust)-[~]
└─$ foundryup


.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx

 ╔═╗ ╔═╗ ╦ ╦ ╔╗╔ ╔╦╗ ╦═╗ ╦ ╦         Portable and modular toolkit
 ╠╣  ║ ║ ║ ║ ║║║  ║║ ╠╦╝ ╚╦╝    for Ethereum Application Development
 ╚   ╚═╝ ╚═╝ ╝╚╝ ═╩╝ ╩╚═  ╩                 written in Rust.

.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx

Repo       : https://github.com/foundry-rs/foundry
Book       : https://book.getfoundry.sh/
Chat       : https://t.me/foundry_rs/
Support    : https://t.me/foundry_support/
Contribute : https://github.com/foundry-rs/foundry/blob/HEAD/CONTRIBUTING.md

.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx
(snip)

┌──(stardust✨stardust)-[~]
└─$ forge --version
forge Version: 1.5.1-stable
Commit SHA: b0a9dd9ceda36f63e2326ce530c10e6916f4b8a2
Build Timestamp: 2025-12-22T11:39:01.425730780Z (1766403541)
Build Profile: maxperf

┌──(stardust✨stardust)-[~]
└─$ cast --version
cast Version: 1.5.1-stable
Commit SHA: b0a9dd9ceda36f63e2326ce530c10e6916f4b8a2
Build Timestamp: 2025-12-22T11:39:01.425730780Z (1766403541)
Build Profile: maxperf

┌──(stardust✨stardust)-[~]
└─$ anvil --version
anvil Version: 1.5.1-stable
Commit SHA: b0a9dd9ceda36f63e2326ce530c10e6916f4b8a2
Build Timestamp: 2025-12-22T11:39:01.425730780Z (1766403541)
Build Profile: maxperf

┌──(stardust✨stardust)-[~]
└─$ chisel --version
chisel Version: 1.5.1-stable
Commit SHA: b0a9dd9ceda36f63e2326ce530c10e6916f4b8a2
Build Timestamp: 2025-12-22T11:39:01.425730780Z (1766403541)
Build Profile: maxperf
```

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Foundryの学習帳' && git push
```

## 参考文献

 * https://github.com/foundry-rs/foundry
 * https://book.getfoundry.sh/