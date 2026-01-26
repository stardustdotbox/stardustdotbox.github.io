---
title: 'Astarピアーズプログラムシーズン3に応募する(2)'
date: 2026-01-10 12:57:21
permalink: /posts/2026/01/Astar-Peers-Program-Season3-2/
tags:
  - Astar
header:
  image: https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210
---

![logo-primary-color-black](https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210)

{% include toc %}

## 目標

 * Astarアーカイブノードをラズパイ5のSSD上に構築する

## デバイス選定

色々考えて、以下の二つのモデルを考えてみた。（ ´ー｀）y―┛~~

 * Astarアーカイブノードの運用には1.2TBのdiskスペースが必要
 * ノード運用として考えると、diskの安定電源確保は必須

### HDDモデル

<img width="1166" height="818" alt="image" src="https://github.com/user-attachments/assets/ae845911-e742-4166-acf3-b8339459a03a" />

### SSDモデル

<img width="1047" height="768" alt="image" src="https://github.com/user-attachments/assets/debc704b-37bc-44db-82d2-0160ae8a181c" />

### コスト

結局はSSDモデルを選定してみた。Astarノード以外にも追加でローカルマシンでやりたいことがあったし、ちょうどいいよね。ヽ(´ー`)ノ

```
￥91,897(582USD)
```

問題なのは毎月30ドル分ずつAstarもらえるとしても、一年半以上運営しないと元がとれないことである。((*´∀`))ｹﾗｹﾗ
デバイスが来るのが楽しみだな。

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Astarピアーズプログラムシーズン3に応募する(2)' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-1/
 * https://forum.astar.network/t/peers-program-season-3-empower-astar-together-applications-open/9283
 * https://peers.sun-t-sarah.work/
 * https://telemetry.polkadot.io/
 * https://astar.subscan.io/account/5HVsYfdgxBGWdonNt5ABnGfHMjuKMtMncqwCGpVQTHfFTjip
 * https://x.com/Rahul66267247/status/1961362805153829017
