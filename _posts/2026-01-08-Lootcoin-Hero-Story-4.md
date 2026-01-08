---
title: 'Lootcoinの勇者物語(4)'
date: 2026-01-08 18:34:09
permalink: /posts/2026/01/Lootcoin-Hero-Story-4/
tags:
  - Lootcoin
  - Soneium
header:
  image: https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41
---

<img width="1500" height="500" alt="image" src="https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41" />

{% include toc %}

2026-01-08、今日もLootcoinにアップグレードがあったようなので、ヒーローを進化させていきます。

## アップデート内容

 * Epicクラスの武器が購入できるようになった。(305 $LOOT X 4)

<img width="372" height="363" alt="image" src="https://github.com/user-attachments/assets/7635a4cb-8d10-489b-ae36-955099704cf0" />

 * 3人目ヒーローを追加できるようになった。(960 $LOOT)

<img width="266" height="65" alt="image" src="https://github.com/user-attachments/assets/683317de-4d7d-4a2f-8242-2b74254e4e38" />

## $LOOTの価格推移

　* アップデート前

```
=== Lootcoin (LOOT) Price Data ===
0.0079757USD
1.25JPY
```

 * アップデート後

```
┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py loot
=== Lootcoin (LOOT) Price Data ===
0.013379USD
2.1JPY
```

## 僕の勇者パーティーの状況

パーティーを3人にして、一人の勇者の装備をすべて破棄し、二人の勇者に最強装備をつけた。

```
┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ echo '960 + (305 *4) * 2' | bc
3400
```

使用したコストは3400$LOOTのはず。。。たぶん。。。

 * アップデート前

<img width="524" height="689" alt="image" src="https://github.com/user-attachments/assets/52cd567e-d9c3-4c07-aa6f-032307084c5b" />

 * アップデート後

<img width="460" height="704" alt="image" src="https://github.com/user-attachments/assets/6936254e-c1b6-45d9-b1d9-e8ebfbc32a87" />

うーん。今んところ間違いなく最強パーティーなんだけど、儲かるのかな。これ。w

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Lootcoinの勇者物語(4)' && git push
```

## 参考文献

 * [Lootcoin](https://lootcoin.tech?ref=0x53869B88306EB505f0fC66DaE482D42033F85253)
 * [Lootcoin BlackPaper.pdf](https://lootcoin.tech/blackpaper.pdf)
 * https://x.com/Lootcointech
 * https://www.coingecko.com/en/coins/lootcoin
 * https://github.com/stardustdotbox/Lootcoin
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-1/
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-2/
