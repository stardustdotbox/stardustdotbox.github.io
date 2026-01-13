---
title: 'Astarピアーズプログラムシーズン3に応募する(5)'
date: 2026-01-13 18:32:30
permalink: /posts/2026/01/Asatr-Peers-Program-Season3-5/
tags:
  - Astar
header:
  image: https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210
---

![logo-primary-color-black](https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210)

{% include toc %}

## 完成したノードを眺めてみるよヽ(´ー`)ノ

ラズパイ5とUSB-SSDの間にUSBハブをはさんで、USB-SSDの電力の供給不足に対処しているよ。

<img width="428" height="734" alt="image" src="https://github.com/user-attachments/assets/0232763f-5af8-473f-933b-5cfde1ae2df2" />

## システム基礎情報

### SSHログイン

```
$ ssh -i stardust\@stardust.local.key stardust@100.64.1.30
Linux stardust 6.12.47+rpt-rpi-2712 #1 SMP PREEMPT Debian 1:6.12.47-1+rpt1 (2025-09-16) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Jan 13 17:14:40 2026 from 100.64.1.10
stardust@stardust:~ $
```

### システム関連情報

```
stardust@stardust:~ $ lsb_release -a
No LSB modules are available.
Distributor ID: Debian
Description:    Debian GNU/Linux 13 (trixie)
Release:        13
Codename:       trixie
stardust@stardust:~ $ uname -a
Linux stardust 6.12.47+rpt-rpi-2712 #1 SMP PREEMPT Debian 1:6.12.47-1+rpt1 (2025-09-16) aarch64 GNU/Linux
```

<img width="1115" height="628" alt="image" src="https://github.com/user-attachments/assets/8ce51565-960a-47fb-b162-6a930530c8cf" />

### ファイル関連情報

 * lsblk

```
stardust@stardust:~ $ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0    2G  0 loop
sda      8:0    0  3.6T  0 disk
├─sda1   8:1    0  512M  0 part /boot/firmware
└─sda2   8:2    0  3.6T  0 part /
zram0  254:0    0    2G  0 disk [SWAP]
```

 * df -h

```
stardust@stardust:~ $ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            7.9G     0  7.9G   0% /dev
tmpfs           3.2G   15M  3.2G   1% /run
/dev/sda2       3.6T  7.1G  3.4T   1% /
tmpfs           8.0G  304K  8.0G   1% /dev/shm
tmpfs           5.0M   48K  5.0M   1% /run/lock
tmpfs           1.0M     0  1.0M   0% /run/credentials/systemd-journald.service
tmpfs           8.0G   16K  8.0G   1% /tmp
/dev/sda1       510M   78M  433M  16% /boot/firmware
tmpfs           1.6G  256K  1.6G   1% /run/user/1000
tmpfs           1.0M     0  1.0M   0% /run/credentials/getty@tty1.service
tmpfs           1.0M     0  1.0M   0% /run/credentials/serial-getty@ttyAMA10.service
```

## 回線速度を計測する

```
stardust✨stardust:~ $ sudo apt install -y speedtest-cli
stardust✨stardust:~ $ speedtest
Retrieving speedtest.net configuration...
Testing from QTnet (58.3.29.76)...
Retrieving speedtest.net server list...
Selecting best server based on ping...
Hosted by IPA CyberLab (Bunkyo) [794.70 km]: 38.217 ms
Testing download speed...............................................................................
.Download: 44.50 Mbit/s
Testing upload speed......................................................................................................
Upload: 70.30 Mbit/s
```

## 基礎システム設定変更

### ホスト名を修正する

```
root@stardust:~# echo 'stardust.local' > /etc/hostname
```

### sudo時にパスワードを必須にする

```
root@stardust:/etc/sudoers.d# grep -i nopasswd *
010_pi-nopasswd:stardust ALL=(ALL) NOPASSWD: ALL
90-cloud-init-users:stardust ALL=(ALL) NOPASSWD:ALL
root@stardust:/etc/sudoers.d# cat 010_pi-nopasswd
stardust ALL=(ALL) NOPASSWD: ALL
root@stardust:/etc/sudoers.d# cat 90-cloud-init-users
# Created by cloud-init v. 25.2 on Thu, 04 Dec 2025 14:50:54 +0000

# User rules for stardust
stardust ALL=(ALL) NOPASSWD:ALL
root@stardust:/etc/sudoers.d# rm 010_pi-nopasswd 90-cloud-init-users
```

### 言語設定をja_JP.UTF-8に変更する

```
stardust✨stardust:~ $ sudo dpkg-reconfigure locales
```

### bashrcに追加する

```
# dateコマンドを見やすくする
alias 'date'='LANG=ja_JP.UTF-8 date "+%Y-%m-%d(%a) %H:%M"'

# Bash履歴のカスタマイズ
HISTSIZE=10000
HISTFILESIZE=20000
export HISTCONTROL=ignoredups
export HISTTIMEFORMAT='%F %T '
```

## Astarのアーカイブノードを実行する

 * getsubstrate.ioで指定されているパッケージ名が微妙にラズパイ5のパッケージ名とは異なるみたいなので、修正して実行する
 
```
stardust✨stardust:~ $ sudo apt install -y protobuf-compiler libprotobuf-dev pkg-config
stardust✨stardust:~ $ curl -fsSL https://getsubstrate.io -o getsubstrate.sh
stardust✨stardust:~ $ grep -n "protobuf" getsubstrate.sh
16:             $MAKE_ME_ROOT yum install -y cmake openssl-devel git protobuf protobuf-compiler clang clang-devel
35:             $MAKE_ME_ROOT apt install -y cmake pkg-config libssl-dev git gcc build-essential git protobuf protobuf-compiler clang libclang-dev
stardust✨stardust:~ $ sudo sed -i -E '/(apt|yum).*install/ s/ protobuf / protobuf-compiler /g' getsubstrate.sh
stardust✨stardust:~ $ bash getsubstrate.sh --fast
```

 * Astarノードのレポジトリを取得する

```
stardust✨stardust:~ $ git clone --recurse-submodules https://github.com/AstarNetwork/Astar.git
stardust✨stardust:~/Astar $ git fetch --tags
```

 * コンパイルする(1時間ぐらいかかる)

```
stardust✨stardust:~/Astar $ exec $SHELL -l
stardust✨stardust:~/Astar $ cargo build --profile production
stardust✨stardust:~/Astar $ ./target/production/astar-collator --version
astar-collator 5.48.0-7502f2de834
```

 * データディレクトリを作成する

```
stardust✨stardust:~ $ sudo mkdir -p /var/lib/astar
stardust✨stardust:~ $ sudo chown -R $USER:$USER /var/lib/astar
```

 * テスト起動する

```
stardust✨stardust:~/Astar $ ./target/production/astar-collator \
  --chain astar \
  --base-path /var/lib/astar \
  --name Stardust✨ \
  --port 30333 \
  --rpc-port 9944 \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --rpc-cors all \
  --collator
2026-01-13 21:51:12 Astar Collator
2026-01-13 21:51:12 ✌️  version 5.48.0-7502f2de834
2026-01-13 21:51:12 ❤️  by Stake Technologies <devops@stake.co.jp>, 2019-2026
2026-01-13 21:51:12 📋 Chain specification: Astar
2026-01-13 21:51:12 🏷  Node name: Stardust✨
2026-01-13 21:51:12 👤 Role: AUTHORITY
2026-01-13 21:51:12 💾 Database: RocksDb at /var/lib/astar/chains/astar/db/full
2026-01-13 21:51:12 Parachain id: Id(2006)
2026-01-13 21:51:12 Parachain Account: 5Ec4AhPW97z4ZyYkd3mYkJrSeZWcwVv4wiANES2QrJi1x17F
2026-01-13 21:51:12 Is collating: yes
2026-01-13 21:51:14 [Parachain] Creating transaction pool txpool_type=ForkAware ready=Limit { count: 8192, total_bytes: 20971520 } future=Limit { count: 819, total_bytes: 2097152 }
2026-01-13 21:51:15 [Relaychain] Creating transaction pool txpool_type=ForkAware ready=Limit { count: 8192, total_bytes: 20971520 } future=Limit { count: 819, total_bytes: 2097152 }
2026-01-13 21:51:16 [Relaychain] Local node identity is: 12D3KooWNVgUpZAAPj7MkZCfFxYnxsiYDLaSAxFBX1TJG1wq4TNT
2026-01-13 21:51:16 [Relaychain] Running litep2p network backend
2026-01-13 21:51:16 [Relaychain] 💻 Operating system: linux
2026-01-13 21:51:16 [Relaychain] 💻 CPU architecture: aarch64
2026-01-13 21:51:16 [Relaychain] 💻 Target environment: gnu
2026-01-13 21:51:16 [Relaychain] 💻 Memory: 16218MB
2026-01-13 21:51:16 [Relaychain] 💻 Kernel: 6.12.62+rpt-rpi-2712
2026-01-13 21:51:16 [Relaychain] 💻 Linux distribution: Debian GNU/Linux 13 (trixie)
2026-01-13 21:51:16 [Relaychain] 💻 Virtual machine: no
2026-01-13 21:51:16 [Relaychain] 📦 Highest known block at #192
2026-01-13 21:51:16 [Relaychain] 〽️ Prometheus exporter started at 127.0.0.1:9616
2026-01-13 21:51:16 [Relaychain] Running JSON-RPC server: addr=127.0.0.1:9945,[::1]:9945
2026-01-13 21:51:16 [Relaychain] 🏁 CPU single core score: 449.48 MiBs, parallelism score: 240.52 MiBs with expected cores: 8
2026-01-13 21:51:16 [Relaychain] 🏁 Memory score: 5.37 GiBs
2026-01-13 21:51:16 [Relaychain] 🏁 Disk score (seq. writes): 294.88 MiBs
2026-01-13 21:51:16 [Relaychain] 🏁 Disk score (rand. writes): 138.81 MiBs
 ```

 * Astarノードがリソースをどれぐらい食うかを調査

<img width="1914" height="399" alt="image" src="https://github.com/user-attachments/assets/092c16df-a163-4fc0-806e-253974ce9165" />

## 長期運用設計

### テスト環境のクリーンアップ

 * データディレクトリの削除

```
stardust✨stardust:/var/lib $ sudo rm -fr astar
```

### 本番環境の構築

 * astarノード実行ユーザの作成

```
stardust✨stardust:~ $ sudo useradd --no-create-home --shell /usr/sbin/nologin astar
```

 * データディレクトリを作成する

```
stardust✨stardust:~ $ sudo mkdir -p /var/lib/Astar
stardust✨stardust:~ $ sudo chown -R $USER:$USER /var/lib/Astar
```

 * 本番用のノードバイナリを配置する

```
stardust✨stardust:~ $ sudo cp /home/stardust/Astar/target/production/astar-collator /usr/local/bin/
stardust✨stardust:~ $ sudo chown astar:astar /usr/local/bin/astar-collator
```

 * データディレクトリの所有権をastarユーザにする

```
stardust✨stardust:~ $ sudo chown -R astar:astar /var/lib/Astar
stardust✨stardust:~ $ sudo chmod 700 /var/lib/Astar
```

### systemdでサービス化する

 * unitファイルの作成

```
stardust✨stardust:~ $ sudo cat /etc/systemd/system/astar.service
[Unit]
Description=Astar Archive node

[Service]
User=astar
Group=astar

ExecStart=/usr/local/bin/astar-collator \
  --pruning archive \
  --chain astar \
  --base-path /var/lib/Astar \
  --name [好きなノード名] \
  --port 30333 \
  --rpc-port 9944 \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --rpc-cors all

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

 * ユニットファイル書き換えの適用

```
stardust✨stardust:~ $ sudo systemctl daemon-reload
```

 * Astarノードの再起動

```
stardust✨stardust:~ $ sudo systemctl status astar.service
stardust✨stardust:~ $ sudo systemctl start astar.service
stardust✨stardust:~ $ sudo systemctl restart astar.service
stardust✨stardust:~ $ sudo systemctl stop astar.service
```

## 検証時

 * サービスが停止していることを確認する

```
stardust✨stardust:~ $ sudo systemctl stop astar.service
```

 * データディレクトリの削除

```
stardust✨stardust:~ $ sudo rm -fr /var/lib/Astar/
```

 * データディレクトリを作成する

```
stardust✨stardust:~ $ sudo mkdir -p /var/lib/Astar
stardust✨stardust:~ $ sudo chown -R $USER:$USER /var/lib/Astar
```

 * 検証用バイナリを起動する

```
stardust✨stardust:~ $ /home/stardust/Astar/target/production/astar-collator \
  --pruning archive \
  --chain astar \
  --base-path /var/lib/Astar \
  --name [好きなノード名] \
  --port 30333 \
  --rpc-port 9944 \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --rpc-cors all
2026-01-14 00:59:43 Astar Collator
2026-01-14 00:59:43 ✌️  version 5.48.0-7502f2de834
2026-01-14 00:59:43 ❤️  by Stake Technologies <devops@stake.co.jp>, 2019-2026
2026-01-14 00:59:43 📋 Chain specification: Astar
2026-01-14 00:59:43 👤 Role: FULL
2026-01-14 00:59:43 💾 Database: RocksDb at /var/lib/Astar/chains/astar/db/full
2026-01-14 00:59:43 Parachain id: Id(2006)
2026-01-14 00:59:43 Parachain Account: 5Ec4AhPW97z4ZyYkd3mYkJrSeZWcwVv4wiANES2QrJi1x17F
```


 * データディレクトリの削除

```
stardust✨stardust:~ $ sudo rm -fr /var/lib/Astar/
```

 * データディレクトリを作成する

```
stardust✨stardust:~ $ sudo mkdir -p /var/lib/Astar
stardust✨stardust:~ $ sudo chown -R astar:astar /var/lib/Astar
```

 * 本番用サービスを起動する

```
stardust✨stardust:~ $ sudo systemctl status astar.service
● astar.service - Astar Archive node
     Loaded: loaded (/etc/systemd/system/astar.service; disabled; preset: enabled)
     Active: active (running) since Wed 2026-01-14 01:02:47 JST; 8s ago
 Invocation: 4bc0ccd63e284926b66806c402a96bf5
   Main PID: 69305 (astar-collator)
      Tasks: 50 (limit: 19362)
        CPU: 10.864s
     CGroup: /system.slice/astar.service
             └─69305 /usr/local/bin/astar-collator --pruning archive --chain astar --base-path /var/lib/Astar --name AstarNode --port 30333 --rpc-port 9944 --telemetry-url "wss://telemetry.polkadot.io/submit/>

Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 💻 Kernel: 6.12.62+rpt-rpi-2712
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 💻 Linux distribution: Debian GNU/Linux 13 (trixie)
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 💻 Virtual machine: no
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 📦 Highest known block at #0
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 〽️ Prometheus exporter started at 127.0.0.1:9615
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] Running JSON-RPC server: addr=127.0.0.1:9944,[::1]:9944
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 🏁 CPU single core score: 425.54 MiBs, parallelism score: 258.48 MiBs with expected cores: 8
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 🏁 Memory score: 4.27 GiBs
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 🏁 Disk score (seq. writes): 293.61 MiBs
Jan 14 01:02:53 stardust astar-collator[69305]: 2026-01-14 01:02:53 [Parachain] 🏁 Disk score (rand. writes): 140.76 MiBs
```

 * Astarノードが使用しているデータ量を確認する

```
stardust✨stardust:~ $ df -h /var/lib/Astar/
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2       3.6T   28G  3.4T   1% /
```

 * 同期中であることを確認する

```
stardust✨stardust:~ $ curl -s -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"system_health","params":[]}' \
  http://127.0.0.1:9944 | jq
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "peers": 8,
    "isSyncing": true,
    "shouldHavePeers": true
  }
}
```

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Astarピアーズプログラムシーズン3に応募する(5)' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-1/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-2/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-3/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-4/
 * https://github.com/AstarNetwork/Astar/
 * https://docs.astar.network/docs/build/nodes/archive-node/binary/
 * https://telemetry.polkadot.io/
