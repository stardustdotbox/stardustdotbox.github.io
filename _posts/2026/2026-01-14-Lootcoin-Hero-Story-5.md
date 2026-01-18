---
title: 'Lootcoinの勇者物語(5)'
date: 2026-01-14 17:10:31
permalink: /posts/2026/01/Lootcoin-Hero-Story-5/
tags:
  - Lootcoin
  - Soneium
header:
  image: https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41
---

<img width="1500" height="500" alt="image" src="https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41" />

{% include toc %}

2026-01-14、今日もLootcoinにアップグレードがあったようなので、ヒーローを進化させていく予定ですが、7日前にアップデートあったばかりなんだよな。

<img width="505" height="840" alt="image" src="https://github.com/user-attachments/assets/a75c3149-5e4f-4870-acf8-adb4abfb4dc4" />

## アップデート内容

 * ヒーローが追加できるようになった(2560$LOOT)

<img width="366" height="288" alt="image" src="https://github.com/user-attachments/assets/d1b7cbe1-efe3-4182-bfa5-7997e4557fb4" />

 * LEGENDARYクラスの武器が追加された。(695$LOOT*4)

 * 前回のアップデートから1730$LOOTしか稼げてないのでとんでもなく赤字ではある。

## $LOOTの価格推移

 * LOOTの価格は上昇しているってことはみんなついていってるんだな。

```
┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py loot
=== Lootcoin (LOOT) Price Data ===
0.013905USD
2.21JPY
```

## 僕の勇者パーティーの状況

パーティーを3人にして、一人の勇者の装備をすべて破棄し、二人の勇者に最強装備をつけた。

```
┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ echo '960 + (305 *4) * 2' | bc
3400
```

 * ヒーローを一人追加した(2560$LOOT)

<img width="308" height="84" alt="image" src="https://github.com/user-attachments/assets/4631c2d4-f43b-4024-9f4a-61f93c3a2900" />

 * 新しいヒーローに伝説級武器を装備させる(2780$LOOT)

```
┌──(venv)(stardust✨stardust)-[~]
└─$ echo '2560 + 695*4' | bc
5340
```

<img width="514" height="697" alt="image" src="https://github.com/user-attachments/assets/6c8a2e6c-9458-48ca-9f3c-5533a349a986" />

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Lootcoinの勇者物語(5)' && git push
```

## 参考文献

 * [Lootcoin](https://lootcoin.tech?ref=0x53869B88306EB505f0fC66DaE482D42033F85253)
 * [Lootcoin BlackPaper.pdf](https://lootcoin.tech/blackpaper.pdf)
 * https://x.com/Lootcointech
 * https://www.coingecko.com/en/coins/lootcoin
 * https://github.com/stardustdotbox/Lootcoin
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-1/
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-2/
