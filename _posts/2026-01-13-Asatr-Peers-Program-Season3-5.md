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

## 基礎システム設定変更

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
```

 * コンパイルする

```
stardust✨stardust:~/Astar $ exec $SHELL -l
stardust✨stardust:~/Astar $ cargo build --profile production
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