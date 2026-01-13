---
title: 'Astarピアーズプログラムシーズン3に応募する(3)'
date: 2026-01-12 14:46:41
permalink: /posts/2026/01/Asatr-Peers-Program-Season3-3/
tags:
  - Astar
header:
  image: https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210
---

![logo-primary-color-black](https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210)

## 目標

 * Astarアーカイブノードをラズパイ5のSSD上に構築する

## ラズパイ5を組み立てる

[前回](https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-2/)注文したデバイスが到着したので、組み立てていくよ。ヽ(´ー`)ノ

<img width="952" height="475" alt="image" src="https://github.com/user-attachments/assets/f7ac43ca-3937-4412-8e40-24a5bb4c2bc2" />

 * ラズパイ5のキットの確認

<img width="832" height="688" alt="image" src="https://github.com/user-attachments/assets/58d88557-2985-4b38-bec4-7fa970872b17" />

 * 電源アダプタの確認

<img width="276" height="396" alt="image" src="https://github.com/user-attachments/assets/91798520-dcaa-4fcf-862c-4e492553e2f0" />

 * ラズパイ5本体の確認

<img width="867" height="571" alt="image" src="https://github.com/user-attachments/assets/4b93a95f-f854-4471-9f02-770bddef5528" />

 * かっこいいヽ(´ー`)ノ

<img width="738" height="489" alt="image" src="https://github.com/user-attachments/assets/c35e25ad-b70e-4b80-a199-b05dba53ec75" />

 * ケースにラズパイ5を取り付けるよヽ(´ー`)ノ

<img width="854" height="579" alt="image" src="https://github.com/user-attachments/assets/69162d2a-a221-40a0-93a2-62b7876f1801" />

 * 頑張ってクーラーを取り付けたよヽ(´ー`)ノ

<img width="967" height="631" alt="image" src="https://github.com/user-attachments/assets/0ff1f12d-3979-4143-bebd-34a5a55c7adc" />

 * ラズパイ5キットの組み立ては完了だヽ(´ー`)ノ

<img width="559" height="428" alt="image" src="https://github.com/user-attachments/assets/0d5e8be7-cdcf-4848-b03a-9095f754fdcc" />

## SSHの鍵を作成する

```
$ ssh-keygen -t ed25519 -C "stardust@stardust.local"
```

## Raspberry Pi Imagerを使ってRaspberry PiをSDカードに焼く

 * Raspberry Pi5を選択する

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/f9eb5459-e99d-459e-9b9c-469a3de9ac65" />

 * 64bitOSを選択する

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/74ee7818-f7be-4a08-842c-f166b51c3e31" />

 * 手持ちのSDカードにOSを焼く

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/235ab6ce-4789-4ffd-8f59-844231cbcd74" />

 * ホスト名はstardustにする

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/44277e26-0263-4ee1-972a-dcdc2678c96e" />

 * 言語設定とキーボードレイアウト設定

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/2f94300d-ca5e-4d11-845e-06767fa7fdcd" />

 * ユーザ名もstardustにした

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/faa5e7da-2061-4390-b64b-f146f2973441" />

 * Wifiの設定を入力

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/55d942c4-9857-477d-afe0-cf8a4adac647" />

 * 事前に作成した公開鍵を指定

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/6a29a6a1-5a65-40d5-8943-9ac9dce4cf55" />

 * ラズパイコネクトの機能はとりあえず停止しておく

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/1b079af4-6396-4808-a071-e713e0de6b7b" />

　* 焼く!

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/e4b4a374-94d4-46dd-bbe2-b0ee3bb824e2" />

## WIFI経由でSSH

```
$ ssh -i stardust\@stardust.local.key stardust@100.64.1.30
Linux stardust 6.12.47+rpt-rpi-2712 #1 SMP PREEMPT Debian 1:6.12.47-1+rpt1 (2025-09-16) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Jan 12 23:08:42 2026 from 100.64.1.10
stardust@stardust:~ $
```

## 最新のパッケージを適用する

```
root@stardust:~# apt-get update && apt-get upgrade -y
```

## 現在のディスク構成を確認

```
root@stardust:~# lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0         7:0    0     2G  0 loop
mmcblk0     179:0    0 476.7G  0 disk
├─mmcblk0p1 179:1    0   512M  0 part /boot/firmware
└─mmcblk0p2 179:2    0 476.2G  0 part /
zram0       254:0    0     2G  0 disk [SWAP]
```

## EEPROM（ブートローダー）を確認

```
root@stardust:~# vcgencmd bootloader_version
2025/06/13 10:39:26
version 5855b10b2bd22b2a116dc91f6b5b1bc4b2ea849f (release)
timestamp 1749807566
update-time 0
capabilities 0x0000007f
```

## Raspberry Pi Imagerを使ってRaspberry PiをUSB-SDDに焼く

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/a8e9b2a2-e2d0-4760-9c58-9674d8fb40d5" />

```
root@stardust:/home/stardust# lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0    2G  0 loop
sda      8:0    0  3.6T  0 disk
├─sda1   8:1    0  512M  0 part /boot/firmware
└─sda2   8:2    0    2T  0 part /
zram0  254:0    0    2G  0 disk [SWAP]
root@stardust:/home/stardust# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            7.9G     0  7.9G   0% /dev
tmpfs           3.2G   15M  3.2G   1% /run
/dev/sda2       2.0T  6.5G  1.9T   1% /
tmpfs           8.0G  304K  8.0G   1% /dev/shm
tmpfs           5.0M   48K  5.0M   1% /run/lock
tmpfs           1.0M     0  1.0M   0% /run/credentials/systemd-journald.service
tmpfs           8.0G   16K  8.0G   1% /tmp
/dev/sda1       510M   86M  425M  17% /boot/firmware
tmpfs           1.6G  256K  1.6G   1% /run/user/1000
tmpfs           1.0M     0  1.0M   0% /run/credentials/getty@tty1.service
tmpfs           1.0M     0  1.0M   0% /run/credentials/serial-getty@ttyAMA10.service
```

 * USB-SDDのpartation tableがmsdosになっていて、2TB以上のパーティションを作成できない
 
 ```
stardust@stardust:~ $ sudo parted /dev/sda print
Model: SanDisk Extreme 55DD (scsi)
Disk /dev/sda: 4001GB
Sector size (logical/physical): 512B/4096B
Partition Table: msdos
Disk Flags:

Number  Start   End     Size    Type     File system  Flags
 1      8389kB  545MB   537MB   primary  fat32        lba
 2      545MB   2199GB  2198GB  primary  ext4
 ```

Astar nodeで稼働させるなら、GPTのpartion tableを作らないといけないと思う。。。


## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Astarピアーズプログラムシーズン3に応募する(3)' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-1/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-2/
 * https://www.reddit.com/r/raspberry_pi/comments/19e0x42/booting_pi_from_nvme_greater_than_2tb_gpt_as/
 * https://www.raspberrypi.com/software/
 * https://www.raspberrypi.com/documentation/services/connect.html
 * https://forum.astar.network/t/peers-program-season-3-empower-astar-together-applications-open/9283
 * https://peers.sun-t-sarah.work/
 * https://telemetry.polkadot.io/
 * https://astar.subscan.io/account/5HVsYfdgxBGWdonNt5ABnGfHMjuKMtMncqwCGpVQTHfFTjip
 * https://x.com/Rahul66267247/status/1961362805153829017
