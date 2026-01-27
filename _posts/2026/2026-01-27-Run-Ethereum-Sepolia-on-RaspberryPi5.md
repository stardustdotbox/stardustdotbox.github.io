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

## はじめに

SepoliaはEthereum L1の公式テストネットであり、EVM・Execution Layer（geth）・Consensus Layer（lighthouse）・RPC仕様はMainnetと同一です。
ラズパイ5上でSepoliaノードを稼働させることで、以下の点を学ぶことができます。

 - EVMの挙動
 - トランザクション処理フロー
 - ブロック生成・確定（finality）
 - Execution / Consensus の役割分離

これは、RPCプロバイダ利用やL2のみの開発では得られないEthereumの基礎構造そのものの理解につながります。ヽ(´ー`)ノ

## Execution / Consensus の役割分離

Ethereum は The Merge 以降、ノードの役割が Execution Layer（実行） と Consensus Layer（合意） に明確に分離された。
この分離は「性能のため」だけではなく、責務を分けて安全性・拡張性・クライアント多様性を確保するためのアーキテクチャである。

 * EL（Execution Layer） はこのトランザクションを実行したら、状態（state）はどう変わるか？を解く (EVM / トランザクション / state / ガス / ストレージ)
 * CL（Consensus Layer） は次のブロックはどれで、どの順番が正史（canonical）か？ を解く (PoS / フォーク選択 / finality / validator / ブロック提案)

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

## anyenvのインストール

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

## Go言語をgoenvでインストールする

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

## gethのインストール

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

### 本番環境にgethを配置する

```
stardust✨stardust:~ $ sudo cp ~/go-ethereum/build/bin/geth /usr/local/bin/geth
stardust✨stardust:~ $ sudo chmod +x /usr/local/bin/geth
stardust✨stardust:~ $ which geth
/usr/local/bin/geth
stardust✨stardust:~ $ geth version
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

### sepolia実行ユーザの作成

```
stardust✨stardust:~ $ sudo useradd --no-create-home --shell /usr/sbin/nologin sepolia
```

### データディレクトリを作成する

```
stardust✨stardust:~ $ sudo mkdir -p /var/lib/Sepolia/geth
stardust✨stardust:~ $ sudo chown -R sepolia:sepolia /var/lib/Sepolia
stardust✨stardust:~ $ sudo chmod 700 /var/lib/Sepolia
```

### JWT secret 作成

```
stardust✨stardust:~ $ sudo sh -c 'umask 077; openssl rand -hex 32 > /var/lib/Sepolia/jwt.hex'
stardust✨stardust:~ $ sudo chown sepolia:sepolia /var/lib/Sepolia/jwt.hex
```

### systemdサービス作成

```
stardust✨stardust:~ $ cat /etc/systemd/system/geth-sepolia.service
[Unit]
Description=Sepolia Execution node (geth)
After=network-online.target
Wants=network-online.target

[Service]
User=sepolia
Group=sepolia

ExecStart=/usr/local/bin/geth \
  --sepolia \
  --datadir /var/lib/Sepolia/geth \
  --syncmode snap \
  --http \
  --http.addr 127.0.0.1 \
  --http.port 8545 \
  --http.api eth,net,web3 \
  --authrpc.addr 127.0.0.1 \
  --authrpc.port 8551 \
  --authrpc.jwtsecret /var/lib/Sepolia/jwt.hex \
  --port 30303 \
  --cache 1024

Restart=always
RestartSec=10
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

### systemdサービス有効化

```
stardust✨stardust:~ $ sudo systemctl daemon-reload
stardust✨stardust:~ $ sudo systemctl status geth-sepolia
○ geth-sepolia.service - Sepolia Execution node (geth)
     Loaded: loaded (/etc/systemd/system/geth-sepolia.service; disabled; preset: enabled)
     Active: inactive (dead)
stardust✨stardust:~ $ sudo systemctl restart geth-sepolia
```

### systemdでgeth-sepoliaの状態を確認する

```
stardust✨stardust:~ $ systemctl status geth-sepolia --no-pager
● geth-sepolia.service - Sepolia Execution node (geth)
     Loaded: loaded (/etc/systemd/system/geth-sepolia.service; disabled; preset: enabled)
     Active: active (running) since Tue 2026-01-27 23:18:37 JST; 1min 51s ago
 Invocation: b3ca250183884dc785177d7528c42465
   Main PID: 22309 (geth)
      Tasks: 11 (limit: 19362)
     Memory: 42.1M (peak: 47M)
        CPU: 16.207s
     CGroup: /system.slice/geth-sepolia.service
             └─22309 /usr/local/bin/geth --sepolia --datadir /var/lib/Sepolia/geth --syncmode snap --http --http.addr 127.0.0.1 --http.port 8545 --http.api eth,net,web3 --authrpc.addr 127.0.0.1 --authrpc.port…

 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.697] Started P2P networking                   self=enode://4efc82dcfac118323294a55f99319054ec6c7bf8143bcff7921b31df8a2f8feaf571170…0@127.0.0.1:30303
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.701] IPC endpoint opened                      url=/var/lib/Sepolia/geth/geth.ipc
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.702] Loaded JWT secret file                   path=/var/lib/Sepolia/jwt.hex crc32=0xd1658b68
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.703] HTTP server started                      endpoint=127.0.0.1:8545 auth=false prefix= cors= vhosts=localhost
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.703] WebSocket enabled                        url=ws://127.0.0.1:8551
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.703] HTTP server started                      endpoint=127.0.0.1:8551 auth=true  prefix= cors=localhost vhosts=localhost
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.705] Started log indexer
 1月 27 23:18:40 stardust geth[22309]: INFO [01-27|23:18:40.836] New local node record                    seq=1,769,523,519,657 id=cfaaa087d21527ac ip=58.3.29.76 udp=30303 tcp=30303
 1月 27 23:18:41 stardust geth[22309]: INFO [01-27|23:18:41.947] New local node record                    seq=1,769,523,519,658 id=cfaaa087d21527ac ip=10.128.1.3 udp=30303 tcp=30303
 1月 27 23:19:14 stardust geth[22309]: WARN [01-27|23:19:14.643] Beacon client online, but no consensus updates received in a while. Please fix your beacon client to follow the chain!
```

### systemdでgeth-sepoliaのログを確認する

```
stardust✨stardust:~ $ journalctl -u geth-sepolia -n 50 --no-pager
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] ---------------------------------------------------------------------------------------------------------------------------------------------------------
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] Chain ID:  11155111 (sepolia)
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] Consensus: Beacon (proof-of-stake), merged from Ethash (proof-of-work)
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] Pre-Merge hard forks (block based):
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Homestead:                   #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Tangerine Whistle (EIP 150): #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Spurious Dragon/1 (EIP 155): #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Spurious Dragon/2 (EIP 158): #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Byzantium:                   #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Constantinople:              #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Petersburg:                  #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Istanbul:                    #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Muir Glacier:                #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Berlin:                      #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - London:                      #0
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] Merge configured:
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Total terminal difficulty:  17000000000000000
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Merge netsplit block:       #1735371
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] Post-Merge hard forks (timestamp based):
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Shanghai:                    @1677557088
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Cancun:                      @1706655072 blob: (target: 3, max: 6, fraction: 3338477)
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Prague:                      @1741159776 blob: (target: 6, max: 9, fraction: 5007716)
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - Osaka:                       @1760427360 blob: (target: 6, max: 9, fraction: 5007716)
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - BPO1:                        @1761017184 blob: (target: 10, max: 15, fraction: 8346193)
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]  - BPO2:                        @1761607008 blob: (target: 14, max: 21, fraction: 11684671)
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] All fork specifications can be found at https://ethereum.github.io/execution-specs/src/ethereum/forks/
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333] ---------------------------------------------------------------------------------------------------------------------------------------------------------
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.333]
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.334] Loaded most recent local block           number=0 hash=25a5cc..3e6dd9 age=4y4mo2w
 1月 27 23:18:38 stardust geth[22309]: INFO [01-27|23:18:38.335] Initialized transaction indexer          range="last 2350000 blocks"
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.638] Enabled snap sync                        head=0 hash=25a5cc..3e6dd9
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.638] Gasprice oracle is ignoring threshold set threshold=2
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.641] Registered sync override service
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.641] Starting peer-to-peer node               instance=Geth/v1.16.8-stable-abeb78c6/linux-arm64/go1.25.5
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.693] New local node record                    seq=1,769,523,519,656 id=cfaaa087d21527ac ip=127.0.0.1 udp=30303 tcp=30303
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.697] Started P2P networking                   self=enode://4efc82dcfac118323294a55f99319054ec6c7bf8143bcff7921b31df8a2f8feaf5711700c56caf882dacccaf85fc0dfd37fa03b97797eb5655b431809cf1ce20@127.0.0.1:30303
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.701] IPC endpoint opened                      url=/var/lib/Sepolia/geth/geth.ipc
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.702] Loaded JWT secret file                   path=/var/lib/Sepolia/jwt.hex crc32=0xd1658b68
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.703] HTTP server started                      endpoint=127.0.0.1:8545 auth=false prefix= cors= vhosts=localhost
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.703] WebSocket enabled                        url=ws://127.0.0.1:8551
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.703] HTTP server started                      endpoint=127.0.0.1:8551 auth=true  prefix= cors=localhost vhosts=localhost
 1月 27 23:18:39 stardust geth[22309]: INFO [01-27|23:18:39.705] Started log indexer
 1月 27 23:18:40 stardust geth[22309]: INFO [01-27|23:18:40.836] New local node record                    seq=1,769,523,519,657 id=cfaaa087d21527ac ip=58.3.29.76 udp=30303 tcp=30303
 1月 27 23:18:41 stardust geth[22309]: INFO [01-27|23:18:41.947] New local node record                    seq=1,769,523,519,658 id=cfaaa087d21527ac ip=10.128.1.3 udp=30303 tcp=30303
 1月 27 23:19:14 stardust geth[22309]: WARN [01-27|23:19:14.643] Beacon client online, but no consensus updates received in a while. Please fix your beacon client to follow the chain!
```

### RPC通信の接続確認

```
stardust✨stardust:~ $ curl -s http://127.0.0.1:8545 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}'
{"jsonrpc":"2.0","id":1,"result":"0xaa36a7"}
```

## lighthouseのインストール

```
stardust✨stardust:~ $ rustc --version
rustc 1.92.0 (ded5c06cf 2025-12-08)
stardust✨stardust:~ $ cargo --version
cargo 1.92.0 (344c4567c 2025-10-21)
stardust✨stardust:~ $ git clone https://github.com/sigp/lighthouse.git
stardust✨stardust:~ $ cd ~/lighthouse
stardust✨stardust:~/lighthouse $ git fetch --all --tags
stardust✨stardust:~/lighthouse $ git tag --list "v*" --sort=version:refname | tail -n 10
v7.0.0-beta.4
v7.0.0-beta.5
v7.0.0-beta.7
v7.0.1
v7.1.0
v8.0.0
v8.0.0-rc.0
v8.0.0-rc.1
v8.0.0-rc.2
v8.0.1
stardust✨stardust:~/lighthouse $ git checkout v8.0.1
Note: switching to 'v8.0.1'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at ced49dd26 Release v8.0.1 (#8414)
stardust✨stardust:~/lighthouse $ make
stardust✨stardust:~/lighthouse $ ./target/release/lighthouse --version
Lighthouse v8.0.1-ced49dd
BLS library: blst
BLS hardware acceleration: true
SHA256 hardware acceleration: false
Allocator: jemalloc (16K)
Profile: release
Specs: mainnet (true), minimal (false), gnosis (false)
```

### 本番環境に構築する

```
stardust✨stardust:~ $ sudo cp ~/lighthouse/target/release/lighthouse /usr/local/bin/lighthouse
stardust✨stardust:~ $ sudo chmod +x /usr/local/bin/lighthouse
stardust✨stardust:~ $ lighthouse --version
Lighthouse v8.0.1-ced49dd
BLS library: blst
BLS hardware acceleration: true
SHA256 hardware acceleration: false
Allocator: jemalloc (16K)
Profile: release
Specs: mainnet (true), minimal (false), gnosis (false)
```

### データディレクトリを作成する

```
stardust✨stardust:~ $ sudo mkdir -p /var/lib/Sepolia/lighthouse
stardust✨stardust:~ $ sudo chown -R sepolia:sepolia /var/lib/Sepolia/lighthouse
```

### systemd サービス作成（Sepolia / geth と連携）

```
stardust✨stardust:~ $ cat /etc/systemd/system/lighthouse-sepolia.service
[Unit]
Description=Sepolia Consensus node (lighthouse)
After=geth-sepolia.service
Wants=geth-sepolia.service

[Service]
User=sepolia
Group=sepolia

ExecStart=/usr/local/bin/lighthouse beacon_node \
  --network sepolia \
  --datadir /var/lib/Sepolia/lighthouse \
  --execution-endpoint http://127.0.0.1:8551 \
  --execution-jwt /var/lib/Sepolia/jwt.hex \
  --checkpoint-sync-url https://sepolia.checkpoint-sync.ethpandaops.io \
  --http --http-address 127.0.0.1 --http-port 5052

Restart=always
RestartSec=10
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

### 有効化して起動する

```
stardust✨stardust:~ $ sudo systemctl daemon-reload
stardust✨stardust:~ $ sudo systemctl status lighthouse-sepolia
○ lighthouse-sepolia.service - Sepolia Consensus node (lighthouse)
     Loaded: loaded (/etc/systemd/system/lighthouse-sepolia.service; disabled; preset: enabled)
     Active: inactive (dead)
stardust✨stardust:~ $ sudo systemctl start lighthouse-sepolia
```

### ログを確認する

```
stardust✨stardust:~ $ journalctl -u lighthouse-sepolia -n 120 --no-pager
 1月 28 00:57:39 stardust systemd[1]: Started lighthouse-sepolia.service - Sepolia Consensus node (lighthouse).
 1月 28 00:57:39 stardust lighthouse[63133]: Jan 28 00:57:39.753 INFO  Lighthouse started                            version: "Lighthouse/v8.0.1-ced49dd"
 1月 28 00:57:39 stardust lighthouse[63133]: Jan 28 00:57:39.753 INFO  Configured network                            network_name: "sepolia"
 1月 28 00:57:39 stardust lighthouse[63133]: Jan 28 00:57:39.755 INFO  Data directory initialised                    datadir: /var/lib/Sepolia/lighthouse
 1月 28 00:57:39 stardust lighthouse[63133]: Jan 28 00:57:39.756 INFO  Deposit contract                              deploy_block: 1273020, address: 0x7f02c3e3c98b133055b8b348b2ac625669ed295d
 1月 28 00:57:39 stardust lighthouse[63133]: Jan 28 00:57:39.758 WARN  Fork boundaries are not well aligned / multiples of 256  info: "This may cause issues as fork boundaries do not align with the start of sync committee period.", misaligned_forks: [(Altair, Epoch(50)), (Bellatrix, Epoch(100))]
 1月 28 00:57:39 stardust lighthouse[63133]: Jan 28 00:57:39.790 INFO  Blob DB initialized                           path: "/var/lib/Sepolia/lighthouse/beacon/blobs_db", oldest_blob_slot: Some(Slot(4243456)), oldest_data_column_slot: Some(Slot(8724480))
```

### EL(Geth)の同期状態を確認する

 * eth_syncingの返り値がfalseになったら、同期が完了している

```
stardust✨stardust:~ $ curl -s http://127.0.0.1:8545 -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"eth_syncing","params":[]}' | jq
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x1e275b",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x9aa7dc",
    "startingBlock": "0x1a050b",
    "stateIndexRemaining": "0x0",
    "syncedAccountBytes": "0x238c4f4c",
    "syncedAccounts": "0x290fd6",
    "syncedBytecodeBytes": "0x2a37a3b7",
    "syncedBytecodes": "0x4ecb8",
    "syncedStorage": "0xa86b70",
    "syncedStorageBytes": "0x9474f7df",
    "txIndexFinishedBlocks": "0x0",
    "txIndexRemainingBlocks": "0x1"
  }
}
```

### CL(Lighthouse)の同期状態を確認する

 * 追従モード

```
stardust✨stardust:~ $ curl -s http://127.0.0.1:5052/eth/v1/node/syncing | jq
{
  "data": {
    "is_syncing": false,
    "is_optimistic": true,
    "el_offline": false,
    "head_slot": "9483106",
    "sync_distance": "0"
  }
}
```

### 正規チェインになれたことを確認する

```
stardust✨stardust:~ $ curl -s http://127.0.0.1:8545 -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"eth_blockNumber","params":[]}' | jq -r .result
0x0
```

## Sepoliaノードの起動と終了

 * 起動

```
stardust✨stardust:~ $ sudo systemctl start geth-sepolia && sudo systemctl start lighthouse-sepolia
```

 * 終了

```
stardust✨stardust:~ $ sudo systemctl stop geth-sepolia && sudo systemctl stop lighthouse-sepolia
```

## まとめ

本当はsepolia(Ethereum L1)とSoneium Minato(Ethereum L2)を接続させる予定だったけど、なぜか公式のSoneium minatoの構築ページが削除されている。。。

## Startaleポートフォリオ

### タイトル

 * ラズパイ5上でEthereum Sepolia（L1）を稼働させる

### タグ

 * technical experiments

### これはなんですか？

 * ラズパイ5上でEthereum Sepolia（L1）を稼働させた時の作業ログです。

### なぜ重要ですか？

 * EVM学習のための基礎を固めます。

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
 * https://github.com/sigp/lighthouse/