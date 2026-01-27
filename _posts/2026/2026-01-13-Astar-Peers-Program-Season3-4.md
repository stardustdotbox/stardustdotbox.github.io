---
title: 'Astarピアーズプログラムシーズン3に応募する(4)'
date: 2026-01-13 14:09:30
permalink: /posts/2026/01/Asatr-Peers-Program-Season3-4/
tags:
  - Astar
  - RaspberryPi5
header:
  image: https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210
---

![logo-primary-color-black](https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210)

{% include toc %}

## 目標

 * Astarアーカイブノードをラズパイ5のSSD上に構築する

## 前回までのまとめ

 * USB-SSD経由でOS起動したが、ラズパイOSはどのdistro使ってもMSDOSパーティションテーブルになる。(Ubuntu Server for ラズパイも同じ)
 * Astar nodeを立ち上げるなら2TB制限は迂回しないと後々問題になりそう。

## ラズパイ5をUSB-SSD(GPT)環境を構築する

### Raspberry Pi Imagerを使ってRaspberry PiをSDカードに焼く

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/c929ce48-01ac-4347-89d1-c8163eeb90c0" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/b449c73f-b773-41bf-bf8a-979f57026dde" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/4ef74cf0-90c2-460a-b231-3d1311ea7ba3" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/717d2b2c-5bb9-417a-bbb4-f113da91031c" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/dd61032d-f3b8-4d59-881b-3353b17584e1" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/2a8d6e10-235d-4af6-88ab-03a8a49915c5" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/432f2f4a-5050-4f5b-b8ce-0e8ba922de26" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/51a94e1d-9052-49de-b554-8ffb240a34be" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/e71e8cd4-3f50-4478-a3d9-f2cd6b611712" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/a67cc572-86e8-4ac3-8df0-dc1fadd64eac" />

<img width="682" height="482" alt="image" src="https://github.com/user-attachments/assets/4985abbc-b476-444d-8894-8c1e0539f5e6" />

### SDカードからラズパイOSを起動する

 * パッケージを最新化する

```
stardust@stardust:~ $ sudo apt-get update && sudo apt-get upgrade -y
```

 * パーティション構成を確認

```
stardust@stardust:~ $ lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0         7:0    0    2G  0 loop
mmcblk0     179:0    0 29.7G  0 disk
├─mmcblk0p1 179:1    0  512M  0 part /boot/firmware
└─mmcblk0p2 179:2    0 29.2G  0 part /
zram0       254:0    0    2G  0 disk [SWAP]
```

 * USB-SSDを差した後に再度実行

```
stardust@stardust:~ $ lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0         7:0    0    2G  0 loop
sda           8:0    0  3.6T  0 disk
├─sda1        8:1    0  512M  0 part /media/stardust/bootfs
└─sda2        8:2    0    2T  0 part
mmcblk0     179:0    0 29.7G  0 disk
├─mmcblk0p1 179:1    0  512M  0 part /boot/firmware
└─mmcblk0p2 179:2    0 29.2G  0 part /
zram0       254:0    0    2G  0 disk [SWAP]
```

### USB-BOOTを使用してGPT化してUSB-SSDにシステムを焼く

 * USB-BOOTのダウンロード

```
stardust@stardust:~ $ wget https://forums.raspberrypi.com/download/file.php?id=74754 -O usb-boot.zip
```

 * 解凍

```
stardust@stardust:~ $ mkdir usb-boot && unzip usb-boot.zip -d usb-boot
Archive:  usb-boot.zip
  inflating: usb-boot/mbr2gpt
  inflating: usb-boot/sdc-boot
  inflating: usb-boot/set-partuuid
  inflating: usb-boot/usb-boot
  inflating: usb-boot/usb-boot.txt
```

 * USB-SDDをアンマウント

```
stardust@stardust:~/usb-boot $ sudo umount /dev/sda1
```

 * USB-BOOTの実行

```
stardust@stardust:~/usb-boot $ chmod +x usb-boot
stardust@stardust:~/usb-boot $ sudo ./usb-boot
Replicating BOOT/ROOT contents from /dev/mmcblk0 to /dev/sda (this will take a while)

BOOT/ROOT contents replicated from /dev/mmcblk0 to /dev/sda

SD card must be removed to boot the USB device
```

<img width="472" height="335" alt="image" src="https://github.com/user-attachments/assets/06821ae2-b5a1-412d-befe-5ac1deb6b638" />

<img width="582" height="355" alt="image" src="https://github.com/user-attachments/assets/f1e09114-8a79-4b60-80e8-a4aeb1e6696e" />

<img width="790" height="359" alt="image" src="https://github.com/user-attachments/assets/495e33d5-c78d-43f2-b1b6-ed3a96bfdfef" />

<img width="730" height="327" alt="image" src="https://github.com/user-attachments/assets/7fae4b5b-d9ef-4053-ac20-101e62931481" />

<img width="668" height="255" alt="image" src="https://github.com/user-attachments/assets/9905ce64-78df-4da6-869c-fc9eb535293f" />

<img width="680" height="342" alt="image" src="https://github.com/user-attachments/assets/ed27a827-1707-470c-801d-3c151b81dba2" />


 * GPT化されたことを確認する(2TBサイズ制限を超えた)

```
stardust@stardust:~ $ sudo parted /dev/sda print
Model: SanDisk Extreme 55DD (scsi)
Disk /dev/sda: 4001GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
 1      1049kB  538MB   537MB   fat32              msftdata
 2      538MB   4001GB  4000GB  ext4
```

 * パーティション構成を確認

```
 stardust@stardust:~ $ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0    2G  0 loop
sda      8:0    0  3.6T  0 disk
├─sda1   8:1    0  512M  0 part /boot/firmware
└─sda2   8:2    0  3.6T  0 part /
zram0  254:0    0    2G  0 disk [SWAP]
```

 * 想定通りrootパーティションに3.4Tバイトのファイルスペースが生まれた


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

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Astarピアーズプログラムシーズン3に応募する(4)' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-1/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-2/
 * https://www.stardust.box/posts/2026/01/Asatr-Peers-Program-Season3-3/
 * https://github.com/raspberrypi/rpi-imager/issues/755
 * https://forums.raspberrypi.com/viewtopic.php?f=29&t=196778
 * https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
 * https://forums.raspberrypi.com/viewtopic.php?f=29&t=283347
 * https://forums.raspberrypi.com/viewtopic.php?t=196778&start=325#p1756488
 * https://forums.raspberrypi.com/viewtopic.php?t=196778&start=375#p1796413
 * https://forums.raspberrypi.com/viewtopic.php?f=29&t=283347
 * https://forums.raspberrypi.com/viewtopic.php?t=196778&start=500#p2087364
 * https://forums.raspberrypi.com/viewtopic.php?t=196778&sid=8434f9f20671d0ccf57f757a2313e249&start=525#p2142568
 * https://forums.raspberrypi.com/viewtopic.php?t=196778&start=550#p2306155
 * https://forums.raspberrypi.com/viewtopic.php?t=196778&start=550#p2318378
 * https://forums.raspberrypi.com/viewtopic.php?t=196778&start=575#p2350238