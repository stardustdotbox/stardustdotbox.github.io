---
title: 'Astarピアーズプログラムシーズン3に応募する(6)'
date: 2026-01-26 04:34:20
permalink: /posts/2026/01/Asatr-Peers-Program-Season3-6/
tags:
  - Astar
header:
  image: https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210
---

![logo-primary-color-black](https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210)

{% include toc %}

## Astarアーカイブノードは16GBでもメモリが足りない件（ ´ー｀）y―┛~~

<img width="2048" height="376" alt="image" src="https://github.com/user-attachments/assets/e0960cad-586f-4e42-b16e-f4d155d7b0c3" />

Out of MemoryでAstarノードプロセスが殺されている。。。

```
stardust✨stardust:~ $ free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi        12Gi       387Mi        15Mi       3.6Gi       3.6Gi
Swap:          2.0Gi       2.0Gi          0B
stardust✨stardust:~ $ dmesg -T | egrep -i 'oom|killed process|out of memory'
[月  1月 26 01:49:41 2026] systemd invoked oom-killer: gfp_mask=0x140cca(GFP_HIGHUSER_MOVABLE|__GFP_COMP), order=0, oom_score_adj=0
[月  1月 26 01:49:41 2026]  oom_kill_process+0x29c/0x320
[月  1月 26 01:49:41 2026] [  pid  ]   uid  tgid total_vm      rss rss_anon rss_file rss_shmem pgtables_bytes swapents oom_score_adj name
[月  1月 26 01:49:41 2026] oom-kill:constraint=CONSTRAINT_NONE,nodemask=(null),cpuset=/,mems_allowed=0-7,global_oom,task_memcg=/,task=astar-collator,pid=1888,uid=1001
[月  1月 26 01:49:41 2026] Out of memory: Killed process 1888 (astar-collator) total-vm:1254255840kB, anon-rss:15096608kB, file-rss:0kB, shmem-rss:0kB, UID:1001 pgtables:16960kB oom_score_adj:0
```

## ラズパイ5のswapを2GBから8GBに増やす

### ラズパイ5のデフォルトのswap状況を確認する

```
stardust✨stardust:~ $ swapon --show
NAME       TYPE      SIZE USED PRIO
/dev/zram0 partition   2G   0B  100
```

### /etc/rpi/swap.confの編集

/etc/rpi/swap.confのFileセクションとZramセクションのMaxSizeMiBを8192に設定する

```
stardust✨stardust:~ $ cat /etc/rpi/swap.conf
#  This file is part of rpi-swap.
#
#  Defaults are provided as commented-out options. Local configuration
#  should be created by either modifying this file, or by creating "drop-ins" in
#  the swap.conf.d/ subdirectory. The latter is generally recommended.
#
#  See swap.conf(5) for details.

[Main]
#Mechanism=auto

[File]
#Path=/var/swap
#RamMultiplier=1
MaxSizeMiB=8192
#MaxDiskPercent=50
#FixedSizeMiB=

[Zram]
#RamMultiplier=1
MaxSizeMiB=8192
#FixedSizeMiB=
# Writeback settings (for zram+file mechanism):
#WritebackTrigger=auto
#WritebackInitialDelay=180min
#WritebackPeriodicInterval=24h
```

### 現状のswapを止める

```
stardust✨stardust:~ $ sudo systemctl stop dev-zram0.swap
stardust✨stardust:~ $ sudo systemctl stop systemd-zram-setup@zram0.service
```

### zram0をリセット

```
stardust✨stardust:~ $ echo 1 | sudo tee /sys/block/zram0/reset
1
```

### swap設定を反映して起動

```
stardust✨stardust:~ $ sudo systemctl daemon-reload
stardust✨stardust:~ $ sudo systemctl start systemd-zram-setup@zram0.service
stardust✨stardust:~ $ sudo systemctl start dev-zram0.swap
```

### Swapが2GBから8GB担ったことを確認

```
stardust✨stardust:~ $ swapon --show
NAME       TYPE      SIZE   USED PRIO
/dev/zram0 partition   8G 205.6M  100
```

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Astarピアーズプログラムシーズン3に応募する(6)' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-1/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-2/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-3/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-4/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-5/
 * https://telemetry.polkadot.io/
 * https://forums.raspberrypi.com/viewtopic.php?t=390708