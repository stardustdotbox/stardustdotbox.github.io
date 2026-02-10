---
title: 'Astarピアーズプログラムシーズン3に応募する(7)'
date: 2026-02-10 14:58
permalink: /posts/2026/02/Astar-Peers-Program-Season3-7/
tags:
  - Astar
  - RaspberryPi5
header:
  image: https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210
---

![logo-primary-color-black](https://github.com/user-attachments/assets/88a35b01-514e-4d31-a949-e28218da5210)

{% include toc %}

### SanDisk Extreme のUAS（USB Attached SCSI）を無効化する

SanDisk Extreme のUASが有効化されていると、 高I/O時にOSがハングするので、無効化します。

 * デバイス確認

```
stardust✨stardust:~ $ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 2109:2817 VIA Labs, Inc. USB2.0 Hub             
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 002 Device 002: ID 2109:0817 VIA Labs, Inc. USB3.0 Hub             
Bus 002 Device 003: ID 0781:55dd SanDisk Corp. Extreme 55DD
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```

 * bootコマンドを編集(usb-storage.quirks=0781:55dd:uを追加)

```
stardust✨stardust:~ $ cat /boot/firmware/cmdline.txt
console=serial0,115200 console=tty1 root=PARTUUID=ca9636a7-465b-434c-a65d-f1ae7c347e60 rootfstype=ext4 fsck.repair=yes rootwait quiet splash plymouth.ignore-serial-consoles cgroup_enable=memory swapaccount=1 cfg80211.ieee80211_regdom=JP usb-storage.quirks=0781:55dd:u
```

 * 再起動

```
stardust✨stardust:~ $ reboot
```

 * UASが無効化されたことを確認

```
stardust✨stardust:~ $ dmesg | grep -i -E "uas|usb-storage" 
[    0.000000] Kernel command line: reboot=w coherent_pool=1M 8250.nr_uarts=1 pci=pcie_bus_safe cgroup_disable=memory numa_policy=interleave nvme.max_host_mem_size_mb=0  numa=fake=8 system_heap.max_order=0 smsc95xx.macaddr=88:A2:9E:4C:29:65 vc_mem.mem_base=0x3fc00000 vc_mem.mem_size=0x40000000  console=ttyAMA10,115200 console=tty1 root=PARTUUID=ca9636a7-465b-434c-a65d-f1ae7c347e60 rootfstype=ext4 fsck.repair=yes rootwait quiet splash plymouth.ignore-serial-consoles cgroup_enable=memory swapaccount=1 cfg80211.ieee80211_regdom=JP usb-storage.quirks=0781:55dd:u
[    0.396376] usbcore: registered new interface driver uas
[    0.396387] usbcore: registered new interface driver usb-storage
[    1.933266] usb 2-1.1: UAS is ignored for this device, using usb-storage instead
[    1.933279] usb 2-1.1: UAS is ignored for this device, using usb-storage instead
[    1.933282] usb-storage 2-1.1:1.0: USB Mass Storage device detected
[    1.933382] usb-storage 2-1.1:1.0: Quirks match for vid 0781 pid 55dd: 800000
[    1.933404] scsi host0: usb-storage 2-1.1:1.0
```

### ノードが同期されるとメモリが逼迫されてノードが落ちる

```
stardust✨stardust:~ $ sudo -u astar /usr/local/bin/astar-collator \
  --pruning archive \
  --chain astar \
  --base-path /var/lib/Astar \
  --name AstarNode \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --rpc-cors all
```

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Astarピアーズプログラムシーズン3に応募する(7)' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-1/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-2/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-3/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-4/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-5/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-6/
 * https://telemetry.polkadot.io/
