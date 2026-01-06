---
title: 'JPYCをSoneium上のETHに変換するの巻'
date: 2026-01-19 20:55:20
permalink: /posts/2025/01/2026-01-06-JPYC-to-Eth-on-Soneium/
tags:
  - jpyc
header:
  image: https://github.com/user-attachments/assets/dc44e241-1730-430b-9cd3-98604ad89eb4
---

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/dc44e241-1730-430b-9cd3-98604ad89eb4" />

{% include toc %}

JPYCのおかげで日本人は本当にweb3にアクセスしやすくなりました。ありがとうございます。岡部典孝さん。ヽ(´ー`)ノ
今日は僕がよくやるJPYCからSoneium上のETHに変換する手順を書いてみます。
もっといい方法があるとかあれば、ぜひ、Xで教えてくださいね！

## 現在のETHの価格を確認する

```
┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py ETH
=== Ethereum (ETH) Price Data ===
3237.89USD
506298JPY

=== Ethereum (ETH) Market Data ===
Market Cap (USD): $390,894,400,796.88
Market Cap (JPY): ¥61,141,678,719,508.38
Fully Diluted Valuation (USD): $390,894,400,797
Fully Diluted Valuation (JPY): ¥61,141,678,719,508
24 Hour Trading Vol (USD): $26,903,241,116.37
24 Hour Trading Vol (JPY): ¥4,206,775,740,738.25

=== Ethereum (ETH) Supply ===
Circulating Supply: 120,694,828.98 ETH
Total Supply: 120,694,828.98 ETH
```

## Ethereum上にJPYCを発行する

 * 5万円分のJPYCを発行してみます。

<img width="1233" height="571" alt="image" src="https://github.com/user-attachments/assets/50651350-66b8-4a56-b472-1ade65198a96" />

 * 指定された口座に5万円を振り込みます。

<img width="477" height="201" alt="image" src="https://github.com/user-attachments/assets/0d375909-a66d-4ff5-9bf4-4427a5c76d9f" />

 * DebankでEthreum上にJPYCが発行されたことを確認します。

<img width="1281" height="267" alt="image" src="https://github.com/user-attachments/assets/1b2f9b18-036d-4f89-b5ea-31ccf0b9b188" />

## Ethereum上でJPYCをETHにスワップする

 * 僕はuniswapを使用しています。

<img width="432" height="535" alt="image" src="https://github.com/user-attachments/assets/a5c82930-e927-404b-b063-f0a68d2c57d6" />

 * JPYCがETHになったことを確認します。

<img width="1301" height="225" alt="image" src="https://github.com/user-attachments/assets/118877e4-57f8-4dc0-90a6-611df5fd4f01" />

## ETHをEthereumからSoneiumにブリッジする

 * 僕は[スーパーブリッジ](https://superbridge.app/?fromChainId=1&toChainId=1868)を使用しています。

<img width="528" height="596" alt="image" src="https://github.com/user-attachments/assets/efd83f0d-ab83-4c4c-b659-2409d0bc8450" />

 * DebankでETHがEthereumからSoneiumにブリッジされたことを確認します。

 <img width="1196" height="62" alt="image" src="https://github.com/user-attachments/assets/31a67a7d-3f03-4867-926c-77d9c6503ade" />

## 参考文献

 * https://debank.com/profile/0x53869b88306eb505f0fc66dae482d42033f85253

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'JPYCをSoneium上のETHに変換するの巻' && git push
```