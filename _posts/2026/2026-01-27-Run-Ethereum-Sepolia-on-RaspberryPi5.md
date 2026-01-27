---
title: 'ラズパイ5上でEthereum Sepolia（L1）を稼働させる'
date: 2025-01-01 00:00:00
permalink: /posts/2026/01/Run-Ethereum-Sepolia-on-RaspberryPi5/
tags:
  - Ethereum
header:
  image: https://github.com/user-attachments/assets/ed5db34b-38eb-4638-b480-cc8b7818435e
---

<img width="1920" height="600" alt="image" src="https://github.com/user-attachments/assets/ed5db34b-38eb-4638-b480-cc8b7818435e" />

{% include toc %}

### 記事作成コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io/_posts]
└─$ cp 2000-01-01-template.md 2026/2026-01-27-Run-Ethereum-Sepolia-on-RaspberryPi5.md
```

## ノードのスペック紹介

### CPU情報

```
stardust✨stardust:~ $ lscpu
Architecture:                aarch64
  CPU op-mode(s):            32-bit, 64-bit
  Byte Order:                Little Endian
CPU(s):                      4
  On-line CPU(s) list:       0-3
Vendor ID:                   ARM
  Model name:                Cortex-A76
    Model:                   1
    Thread(s) per core:      1
    Core(s) per cluster:     4
    Socket(s):               -
    Cluster(s):              1
    Stepping:                r4p1
    CPU(s) scaling MHz:      100%
    CPU max MHz:             2400.0000
    CPU min MHz:             1500.0000
    BogoMIPS:                108.00
    Flags:                   fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp
Caches (sum of all):
  L1d:                       256 KiB (4 instances)
  L1i:                       256 KiB (4 instances)
  L2:                        2 MiB (4 instances)
  L3:                        2 MiB (1 instance)
NUMA:
  NUMA node(s):              8
  NUMA node0 CPU(s):         0-3
  NUMA node1 CPU(s):         0-3
  NUMA node2 CPU(s):         0-3
  NUMA node3 CPU(s):         0-3
  NUMA node4 CPU(s):         0-3
  NUMA node5 CPU(s):         0-3
  NUMA node6 CPU(s):         0-3
  NUMA node7 CPU(s):         0-3
Vulnerabilities:
  Gather data sampling:      Not affected
  Indirect target selection: Not affected
  Itlb multihit:             Not affected
  L1tf:                      Not affected
  Mds:                       Not affected
  Meltdown:                  Not affected
  Mmio stale data:           Not affected
  Reg file data sampling:    Not affected
  Retbleed:                  Not affected
  Spec rstack overflow:      Not affected
  Spec store bypass:         Mitigation; Speculative Store Bypass disabled via prctl
  Spectre v1:                Mitigation; __user pointer sanitization
  Spectre v2:                Mitigation; CSV2, BHB
  Srbds:                     Not affected
  Tsa:                       Not affected
  Tsx async abort:           Not affected
  Vmscape:                   Not affected
```

### メモリスワップ情報

```
stardust✨stardust:~ $ free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi       6.1Gi       3.1Gi        36Mi       7.0Gi       9.8Gi
Swap:           15Gi       2.0Mi        15Gi
```

### カーネル情報

```
stardust✨stardust:~ $ uname -a
Linux stardust 6.12.62+rpt-rpi-2712 #1 SMP PREEMPT Debian 1:6.12.62-1+rpt1 (2025-12-18) aarch64 GNU/Linux
```

### ディスク情報

```
stardust✨stardust:~ $ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0    8G  0 loop
sda      8:0    0  3.6T  0 disk
├─sda1   8:1    0  512M  0 part /boot/firmware
└─sda2   8:2    0  3.6T  0 part /
zram0  254:0    0    8G  0 disk [SWAP]
```

## Startaleポートフォリオ

### タイトル

 * ラズパイ5上でEthereum Sepolia（L1）を稼働させる

### タグ

 * technical experiments

### これはなんですか？

 * ラズパイ5上でEthereum Sepolia（L1）を稼働させる

### なぜ重要ですか？

 * Ethereumおよび、Soneiumの実験をするためのベースを構築します。

### ブログポスト

 * 英語版 : https://www.stardust.box/
 * 日本語版 : https://www.stardust.box/

### Xスレッド

 * 英語版 : https://x.com/stardustdotbox
 * 日本語版 : https://x.com/stardustdotbox

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'ラズパイ5上でEthereum Sepolia（L1）を稼働させる' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-1/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-2/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-3/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-4/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-5/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-6/
