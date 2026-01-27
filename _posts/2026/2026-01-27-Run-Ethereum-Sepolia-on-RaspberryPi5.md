---
title: 'ラズパイ5上でEthereum Sepolia（L1）を稼働させる'
date: 2026-01-27 20:40:26
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

## ラズパイ5(ノードマシン)のスペック紹介

ラズパイ5(16GB)と4TBのUSB-SSDの構成になっているよヽ(´ー`)ノ

### ハードウェアの外観

<img width="428" height="734" alt="image" src="https://github.com/user-attachments/assets/0232763f-5af8-473f-933b-5cfde1ae2df2" />

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

### メモリとスワップ情報

```
stardust✨stardust:~ $ free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi       6.1Gi       3.1Gi        36Mi       7.0Gi       9.8Gi
Swap:           15Gi       2.0Mi        15Gi
stardust✨stardust:~ $ swapon --show
NAME          TYPE      SIZE USED PRIO
/dev/zram0    partition   8G   8M  100
/var/swapfile file        8G   0B   10
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

## Sepolia ノードを構築する

```
stardust.local (Raspberry Pi 5)
│
├─ Execution Layer (EL)
│    └─ geth  ── RPC :8545 / Engine :8551
│
└─ Consensus Layer (CL)
     └─ lighthouse (Beacon Node)
```

### anyenvのインストール

```
stardust✨stardust:~ $ git clone https://github.com/anyenv/anyenv ~/.anyenv
Cloning into '/home/stardust/.anyenv'...
remote: Enumerating objects: 505, done.
remote: Counting objects: 100% (109/109), done.
remote: Compressing objects: 100% (66/66), done.
remote: Total 505 (delta 54), reused 77 (delta 36), pack-reused 396 (from 1)
Receiving objects: 100% (505/505), 89.55 KiB | 1.57 MiB/s, done.
Resolving deltas: 100% (234/234), done.
stardust✨stardust:~ $ echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.bashrc
stardust✨stardust:~ $ echo 'eval "$(anyenv init -)"' >> ~/.bashrc
stardust✨stardust:~ $ source ~/.bashrc
ANYENV_DEFINITION_ROOT(/home/stardust/.config/anyenv/anyenv-install) doesn't exist. You can initialize it by:
> anyenv install --init
stardust✨stardust:~ $ anyenv install --init
Manifest directory doesn't exist: /home/stardust/.config/anyenv/anyenv-install
Do you want to checkout https://github.com/anyenv/anyenv-install.git? [y/N]: y
Cloning https://github.com/anyenv/anyenv-install.git master to /home/stardust/.config/anyenv/anyenv-install...
Cloning into '/home/stardust/.config/anyenv/anyenv-install'...
remote: Enumerating objects: 71, done.
remote: Counting objects: 100% (14/14), done.
remote: Compressing objects: 100% (13/13), done.
remote: Total 71 (delta 4), reused 4 (delta 1), pack-reused 57 (from 1)
Receiving objects: 100% (71/71), 13.15 KiB | 498.00 KiB/s, done.
Resolving deltas: 100% (11/11), done.

Completed!
stardust✨stardust:~ $ exec $SHELL -l
stardust✨stardust:~ $ anyenv -v
anyenv 1.1.5-1-g5c58783
```

### Go言語をgoenvでインストールする

```
stardust✨stardust:~ $ sudo apt install -y \
  gcc g++ \
  libc6-dev \
  libssl-dev \
  zlib1g-dev \
  libbz2-dev \
  libreadline-dev \
  libsqlite3-dev \
  libffi-dev \
  pkg-config
stardust✨stardust:~ $ anyenv install goenv
stardust✨stardust:~ $ exec $SHELL -l
stardust✨stardust:~ $ goenv install -l | tail -n 30
  1.23.3
  1.23.4
  1.23.5
  1.23.6
  1.23.7
  1.23.8
  1.23.9
  1.23.10
  1.23.11
  1.23.12
  1.24.0
  1.24.1
  1.24.2
  1.24.3
  1.24.4
  1.24.5
  1.24.6
  1.24.7
  1.24.8
  1.24.9
  1.24.10
  1.24.11
  1.24.12
  1.25.0
  1.25.1
  1.25.2
  1.25.3
  1.25.4
  1.25.5
  1.25.6
stardust✨stardust:~ $ goenv install 1.25.5
Downloading go1.25.5.linux-arm64.tar.gz...
-> go1.25.5.linux-arm64.tar.gz
########################################################################################################################################################## 100.0%
Installing Go Linux arm 64bit 1.25.5...
Installed Go Linux arm 64bit 1.25.5 to /home/stardust/.anyenv/envs/goenv/versions/1.25.5
```


### gethのインストール

```
stardust✨stardust:~ $ git clone https://github.com/ethereum/go-ethereum.git
stardust✨stardust:~ $ cd go-ethereum/
stardust✨stardust:~/go-ethereum $ go version
goenv: 'go' command not found

The 'go' command exists in these Go versions:
  1.25.5

stardust✨stardust:~/go-ethereum $ goenv local 1.25.5
stardust✨stardust:~/go-ethereum $ goenv rehash
stardust✨stardust:~/go-ethereum $ go version
go version go1.25.5 linux/arm64
stardust✨stardust:~/go-ethereum $ make geth
stardust✨stardust:~/go-ethereum $ ./build/bin/geth version
Geth
Version: 1.17.0-unstable
Git Commit: 181a3ae9e0d6cfdb887454995d22e495fe67e9c4
Git Commit Date: 20260127
Architecture: arm64
Go Version: go1.25.5
Operating System: linux
GOPATH=/home/stardust/go/1.25.5
GOROOT=/home/stardust/.anyenv/envs/goenv/versions/1.25.5
```

### stable版のgethに切り替える

```
stardust✨stardust:~/go-ethereum $ git fetch --all --tags
stardust✨stardust:~/go-ethereum $ git tag --list "v1.*" --sort=version:refname | tail -n 20
v1.15.1
v1.15.2
v1.15.3
v1.15.4
v1.15.5
v1.15.6
v1.15.7
v1.15.8
v1.15.9
v1.15.10
v1.15.11
v1.16.0
v1.16.1
v1.16.2
v1.16.3
v1.16.4
v1.16.5
v1.16.6
v1.16.7
v1.16.8
stardust✨stardust:~/go-ethereum $ git checkout v1.16.8
Note: switching to 'v1.16.8'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at abeb78c64 Merge branch 'dos-fixes' into release/1.16
stardust✨stardust:~/go-ethereum $ make clean
go clean -cache
rm -fr build/_workspace/pkg/ ./build/bin/*
stardust✨stardust:~/go-ethereum $ make geth
stardust✨stardust:~/go-ethereum $  ./build/bin/geth version
Geth
Version: 1.16.8-stable
Git Commit: abeb78c647e354ed922726a1d719ac7bc64a07e2
Git Commit Date: 20260114
Architecture: arm64
Go Version: go1.25.5
Operating System: linux
GOPATH=/home/stardust/go/1.25.5
GOROOT=/home/stardust/.anyenv/envs/goenv/versions/1.25.5
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
 * https://geth.ethereum.org/docs
 * https://geth.ethereum.org/downloads
 * https://github.com/ethereum/go-ethereum/releases