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
Bus 002 Device 003: ID 0781:55dd SanDisk Corp. Extreme 55DD
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

### GUIを落とす

```
stardust✨stardust:~ $ sudo systemctl isolate multi-user.target
```

### 手動起動で安定稼働を確認する

```
sudo -u astar /usr/local/bin/astar-collator \
    --state-pruning archive \
    --blocks-pruning archive \
    --name AstarNode \
    --chain astar \
    --base-path /var/lib/Astar \
    --db-cache 2048 \
    --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
    -- \
    --state-pruning 100 \
    --blocks-pruning 100 
```


### rocskdbからparitydbに切り替える

 * データベースを再構築

```
stardust✨stardust:~ $ sudo rm -fr /var/lib/astar
stardust✨stardust:~ $ sudo mkdir -p /var/lib/astar
stardust✨stardust:~ $ sudo chown -R astar:astar /var/lib/astar
```

```
sudo -u astar /usr/local/bin/astar-collator \
    --state-pruning archive \
    --blocks-pruning archive \
    --name AstarNode \
    --chain astar \
    --base-path /var/lib/astar \
    --database paritydb \
    --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
    -- \
    --state-pruning 100 \
    --blocks-pruning 100 
```

 * systemdのユニットファイルを書き換える

```
stardust✨stardust:~ $ cat /etc/systemd/system/astar.service
[Unit]
Description=Astar Archive node

[Service]
User=astar
Group=astar

ExecStart=/usr/local/bin/astar-collator \
  --state-pruning archive \
  --blocks-pruning archive \
  --name AstarNode \
  --chain astar \
  --base-path /var/lib/astar \
  --database paritydb \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  -- \
  --state-pruning 100 \
  --blocks-pruning 100 

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### 同期失敗

起動から8日後、同期データが350GBに達する時にこんな感じで同期データが壊れた。

```
Thread 'tokio-runtime-worker' panicked at 'Externalities not allowed to fail within runtime: "Trie lookup error: Database missing expected key: 0x248b102f247eef0aea46da479b8b3de89072abda81dea5a1338a2d1979a3d76b"', /home/stardust/.cargo/git/checkouts/polkadot-sdk-dee0edd6eefa0594/dc937dd/substrate/primitives/state-machine/src/ext.rs:175
```

### TRIMサービスを停止する

```
stardust✨stardust:~ $ sudo systemctl status fstrim.timer
● fstrim.timer - Discard unused filesystem blocks once a week
     Loaded: loaded (/usr/lib/systemd/system/fstrim.timer; enabled; preset: enabled)
     Active: active (waiting) since Thu 2026-02-12 13:24:48 JST; 6 days ago
 Invocation: 98d25b800c7d4470ab635908fdd6d826
    Trigger: Mon 2026-02-23 01:25:37 JST; 4 days left
   Triggers: ● fstrim.service
       Docs: man:fstrim
tarted fstrim.timer - Discard unused filesystem blocks once a week.
stardust✨stardust:~ $ sudo systemctl disable fstrim.timer
Removed '/etc/systemd/system/timers.target.wants/fstrim.timer'.
stardust✨stardust:~ $ sudo systemctl stop fstrim.timer
```

### 同期データ再作成

```
sudo systemctl stop astar
sudo rm -rf /var/lib/astar
sudo mkdir /var/lib/astar
sudo chown -R astar:astar /var/lib/astar
```

### 実行コマンドシンプル化

```
sudo -u astar /usr/local/bin/astar-collator \
    --pruning archive \
    --chain astar \
    --base-path /var/lib/astar \
    --database paritydb \
    --name AstarNode \
    --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' 
```

### スナップショットデータを取得する

 * https://snapshots.stakecraft.com/
 * https://services.stakecraft.com/docs/snapshots/substrate-astar-snapshot

```
stardust✨stardust:~ $ axel -c https://snapshots.stakecraft.com/astar_2026-02-10.tar
```

### Astarフォーラムの状況

 * https://forum.astar.network/t/peers-program-season-3-empower-astar-together-applications-open/9283/22

うーん。一生懸命Astarアーカイブノード構築したけど、選考に漏れたみたい。一体どういったノードが今回のプログラムでいくつ立ち上がるんだろう。
ノード建てたけど、多分無駄だったぽいな。（ ´ー｀）y―┛~~
Astarとはとことん、相性が悪いらしい。。。

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
 * https://docs.astar.network/docs/build/nodes/snapshots
 * https://all4nodes.io/
 * https://docs.astar.network/docs/build/nodes/archive-node/
 * https://docs.astar.network/docs/build/nodes/rpi-cheat-sheet
 * https://snapshots.stakecraft.com/
 * https://github.com/bld75/Plasm-RPI/blob/main/astar-rpi-cheatsheet.md
 * https://medium.com/@sequaja.marco/astar-peers-program-troubleshooting-guide-and-faq-a6958a76d021
 * https://docs.astar.network/docs/build/nodes/collator/spinup_collator/#identity
 * https://github.com/paritytech/substrate/issues/11503
 * https://github.com/paritytech/substrate/issues/11513
 * https://substrate.stackexchange.com/questions/tagged/rocks-db?tab=Trending