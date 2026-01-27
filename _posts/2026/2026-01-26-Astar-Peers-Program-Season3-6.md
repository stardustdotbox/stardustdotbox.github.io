---
title: 'Astarピアーズプログラムシーズン3に応募する(6)'
date: 2026-01-26 04:34:20
permalink: /posts/2026/01/Astar-Peers-Program-Season3-6/
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

## Cgroupのメモリ管理を有効化する

systemdでメモリ管理を行うために、cgroupによるメモリ管理をラズパイ5で有効化しているが、特に今回はこの機能は使用しなかったけど、後々のことを考えて有効化する。（ ´ー｀）y―┛~~

### 初期状態でラズパイ5のcgroupによるメモリ管理が無効化されていることを確認する

```
stardust✨stardust:~ $ cat /sys/fs/cgroup/cgroup.controllers
cpuset cpu io pids
```

### boot時のコマンドラインを書き換える

/boot/firmware/cmdline.txtにcgroup_enable=memory swapaccount=1オプションを追加する

```
stardust✨stardust:~ $ cat /boot/firmware/cmdline.txt
console=serial0,115200 console=tty1 root=PARTUUID=ca9636a7-465b-434c-a65d-f1ae7c347e60 rootfstype=ext4 fsck.repair=yes rootwait quiet splash plymouth.ignore-serial-consoles cfg80211.ieee80211_regdom=JP cgroup_enable=memory swapaccount=1
stardust✨stardust:~ $ sudo reboot
```

### cgroupによるメモリ管理が無効化されていることを確認する

```
stardust✨stardust:~ $ cat /sys/fs/cgroup/cgroup.controllers
cpuset cpu io memory pids
```

## ラズパイ5のswap設計

/etc/rpi/swap.confを設定して、swap関連の設定をするのが基本みたい。zramを8GBとswapfileを8GB確保していくよヽ(´ー`)ノ

```
stardust✨stardust:~ $ cat /etc/rpi/swap.conf
[Main]
Mechanism=zram+file

[File]
Path=/var/swapfile
MaxSizeMiB=8192

[Zram]
MaxSizeMiB=8192

# zramが埋まってきたらfileへ書き戻す（有効化）
WritebackTrigger=auto
WritebackInitialDelay=30min
WritebackPeriodicInterval=6h
```

### 現状のswapを止める

```
stardust✨stardust:~ $ sudo swapoff /dev/zram0
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

### Swapがzramを使用して、2GBから8GBに増えたことを確認

```
stardust✨stardust:~ $ swapon --show
NAME       TYPE      SIZE   USED PRIO
/dev/zram0 partition   8G 205.6M  100
```

### swapfileが作成されていることを確認する

```
stardust✨stardust:~ $ ls -lh /var/swapfile
-rw------- 1 root root 8.0G  1月 26 23:48 /var/swapfile
```

### swapfileをswap領域として適用する

```
root@stardust:/etc/rpi# sudo swapon -p 10 /var/swapfile
root@stardust:/etc/rpi# swapon --show
NAME          TYPE      SIZE USED PRIO
/dev/zram0    partition   8G   0B  100
/var/swapfile file        8G   0B   10
```

<img width="1901" height="327" alt="image" src="https://github.com/user-attachments/assets/54a2fd09-7c1e-495f-b488-943214c8b26a" />

かなり、Astarアーカイブノードとしては安定してきたように感じるぞ。
というか、かなり汎用性のあるラズパイ5の構成ではないだろうか。（ ´ー｀）y―┛~~

## swapfileの読み込みをunitファイル化する

```
root@stardust:~# cat > /etc/systemd/system/enable-swapfile.service
[Unit]
Description=Enable /var/swapfile with priority 10 (keep zram enabled)
After=dev-zram0.swap
Wants=dev-zram0.swap
ConditionPathExists=/var/swapfile

[Service]
Type=oneshot
ExecStart=/sbin/swapon -p 10 /var/swapfile
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
^C
root@stardust:~# sudo systemctl daemon-reload
root@stardust:~# sudo systemctl enable --now enable-swapfile.service
Created symlink '/etc/systemd/system/multi-user.target.wants/enable-swapfile.service' → '/etc/systemd/system/enable-swapfile.service'.
root@stardust:~# swapon --show --output=NAME,TYPE,SIZE,PRIO
swapon: option '--output-all' doesn't allow an argument
Try 'swapon --help' for more information.
root@stardust:~# swapon --show
NAME          TYPE      SIZE USED PRIO
/dev/zram0    partition   8G   0B  100
/var/swapfile file        8G   0B   10
```

## 同期状況

 * データをすべて削除

```
stardust✨stardust:~ $ date
2026-01-27(火) 03:24
stardust✨stardust:/var/lib/Astar $ sudo rm -fr *
```

 * リレーチェインの同期状態を確認

```
stardust✨stardust:~ $ journalctl -u astar -n 2 --no-pager | egrep "Relaychain"
 1月 27 02:06:47 stardust astar-collator[1861]: 2026-01-27 02:06:47 [Relaychain] ⚙️  Syncing  8.0 bps, target=#29683475 (8 peers), best: #18859008 (0x225b…5ab9), finalized #18858496 (0xcb6f…5f9c), ⬇ 598.1kiB/s ⬆ 6.5kiB/s
```

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Astarピアーズプログラムシーズン3に応募する(6)' && git push
```

## 参考文献

 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-1/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-2/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-3/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-4/
 * https://www.stardust.box/posts/2026/01/Astar-Peers-Program-Season3-5/
 * https://telemetry.polkadot.io/
 * https://forums.raspberrypi.com/viewtopic.php?t=390708
 * https://medium.com/@sequaja.marco/astar-peers-program-troubleshooting-guide-and-faq-a6958a76d021
 * https://docs.astar.network/docs/build/nodes/rpi-cheat-sheet