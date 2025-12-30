---
title: 'Stardust✨のおもちゃ箱を作ってみたので語る'
date: 2025-12-30
permalink: /posts/2025/12/Talk-About-stardustbox/
tags:
  - Stardust✨のおもちゃ箱
header:
  image: https://github.com/user-attachments/assets/cd41a2a9-e4ce-497c-820a-bb0287e99431
---

{% include toc %}

Stardust✨のおもちゃ箱は自分がWeb3の研究を行うのに適した環境を構築するために作った環境なんだけど、ある程度、形になったきたので今の所感について語ってみる。

<video controls width="100%">
  <source src="https://github.com/user-attachments/assets/bca3d572-6363-40f5-9dea-9c7b9ac08227" type="video/mp4">
  お使いのブラウザは動画タグをサポートしていません。
</video>

## stardust.boxドメインについて

[boxドメイン](https://my.box/)はWeb2のDNSドメインでありながら、ENSドメインとしても機能する画期的なドメインです。

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ dig stardust.box
stardust.box.           249     IN      A       3.111.169.116

┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ dig www.stardust.box
;; ANSWER SECTION:
www.stardust.box.       300     IN      CNAME   stardustdotbox.github.io.
stardustdotbox.github.io. 300   IN      A       185.199.108.153
stardustdotbox.github.io. 300   IN      A       185.199.109.153
stardustdotbox.github.io. 300   IN      A       185.199.110.153
stardustdotbox.github.io. 300   IN      A       185.199.111.153
```

年間費用は120USDCと高額ですが、Web2とWeb3の拠点を同時に持てる特性があるので、がんばってこのドメインを育てていく所存です。

<img width="720" height="111" alt="image" src="https://github.com/user-attachments/assets/02ec6617-aff1-40b0-995b-8b12e92a8691" />


## Github Pages & Jekyllでホームページを作成する

### テンプレートを利用してstardustdotbox.github.ioレポジトリを作成する

以下のレポジトリにアクセスして、Github Pagesのテンプレートとして使用する

 * https://github.com/academicpages/academicpages.github.io

<img width="830" height="735" alt="image" src="https://github.com/user-attachments/assets/cfa47c73-9d2a-463f-aaee-ec2bcdd87e8a" />

### 独自ドメイン設定をしてstardust.boxと紐づける

<img width="1027" height="711" alt="image" src="https://github.com/user-attachments/assets/a73dcf26-9a80-479d-bf12-4f22a75ee561" />

## stardust.box VPSについて

Web3の開発や調査のために構築されたVPSだが、用途は多岐にわたる。ディスとリビュージョンはkali linuxを使用しているため、安定性は高くない。

### スペック

AWS EC2インスタンスで構築されたVPSで、2コア、4メモリで起動している。

<img width="1569" height="557" alt="image" src="https://github.com/user-attachments/assets/6523ff66-3626-4692-8f9d-02798ce5c9a7" />

```
┌──(stardust✨stardust)-[~]
└─$ inxi -CmD
Memory:
  System RAM: total: 4 GiB available: 3.83 GiB used: 1.14 GiB (29.9%)
  Array-1: capacity: 4 GiB slots: 1 modules: 1 EC: Multi-bit ECC
  Device-1: DIMM 0 type: RAM size: 4 GiB speed: N/A
CPU:
  Info: dual core model: Intel Xeon E5-2686 v4 bits: 64 type: MCP cache: L2: 512 KiB
  Speed (MHz): avg: 2300 min/max: N/A cores: 1: 2300 2: 2300
Drives:
  Local Storage: total: 30 GiB used: 2.77 GiB (9.2%)
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ lsb_release -a
No LSB modules are available.
Distributor ID: Kali
Description:    Kali GNU/Linux Rolling
Release:        2025.4
Codename:       kali-rolling
```

### stardustレポジトリの取得

メインレポジトリであるが、Sandboxとして使用する。公開用レポジトリなので機微な情報は配置しない。

```
┌──(stardust✨stardust)-[~]
└─$ git clone git@github.com:stardustdotbox/stardust.git

┌──(stardust✨stardust)-[~]
└─$ cd stardust

┌──(stardust✨stardust)-[~/stardust]
└─$ git config user.name "Stardust✨"

┌──(stardust✨stardust)-[~/stardust]
└─$ git config user.email "stardustdotbox@gmail.com"
```

### anyenvのインストール

```
┌──(stardust✨stardust)-[~]
└─$ git clone https://github.com/anyenv/anyenv ~/.anyenv
┌──(stardust✨stardust)-[~]
└─$  echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.bashrc
┌──(stardust✨stardust)-[~]
└─$ echo 'eval "$(anyenv init -)"' >> ~/.bashrc
┌──(stardust✨stardust)-[~]
└─$ exec $SHELL -l
┌──(stardust✨stardust)-[~]
└─$ anyenv -v
anyenv 1.1.5-1-g5c58783
┌──(stardust✨stardust)-[~]
└─$ anyenv install --init
┌──(stardust✨stardust)-[~]
└─$ anyenv --version
anyenv 1.1.5-1-g5c58783
```

### rbenvとruby 3.3.10のインストール

```
┌──(stardust✨stardust)-[~]
└─$ sudo apt install -y build-essential libssl-dev libreadline-dev zlib1g-dev \
  libyaml-dev libffi-dev libgdbm-dev libncurses5-dev libgdbm-compat-dev \
  bison libbz2-dev
┌──(stardust✨stardust)-[~]
└─$ anyenv install rbenv
┌──(stardust✨stardust)-[~]
└─$ exec $SHELL -l
┌──(stardust✨stardust)-[~]
└─$ rbenv install 3.3.10
```

### stardustdotbox.github.ioレポジトリをクローンする

```
┌──(stardust✨stardust)-[~]
└─$ git clone git@github.com:stardustdotbox/stardustdotbox.github.io.git
┌──(stardust✨stardust)-[~]
└─$ cd stardustdotbox.github.io/
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git config user.name "Stardust✨"
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git config user.email "stardustdotbox@gmail.com"
```

### jekyllを使用してテストサーバを立ち上げる

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ rbenv local 3.3.10
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ gem install bundler jekyll
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ bundle install
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ bundle exec jekyll serve
Configuration file: /home/stardust/stardustdotbox.github.io/_config.yml
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
            Source: /home/stardust/stardustdotbox.github.io
       Destination: /home/stardust/stardustdotbox.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 5.725 seconds.
 Auto-regeneration: enabled for '/home/stardust/stardustdotbox.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

### Cursorを使用してvpsに接続する

CursorのSSH接続越しにkali linuxにAIエージェントから指示を出すのは最高の快感であるヽ(´ー`)ノ

<img width="2560" height="1392" alt="image" src="https://github.com/user-attachments/assets/7902e051-3705-4f1e-91c3-e5b7deda098f" />

## Googleアナリティクスで計測する

### 計測用プロジェクトを作成する

<img width="1355" height="369" alt="image" src="https://github.com/user-attachments/assets/52ff39c0-104f-425f-8d03-8f75c1e4867e" />

<img width="887" height="571" alt="image" src="https://github.com/user-attachments/assets/08f61ff4-06dd-415d-9b6e-6240c141a901" />

<img width="1335" height="479" alt="image" src="https://github.com/user-attachments/assets/000e6bad-7189-4af6-a1b4-339b26e97491" />

### 計測できていることを確認する

<img width="1688" height="929" alt="image" src="https://github.com/user-attachments/assets/21730a5f-1554-4ba3-871e-51f86508c9a1" />


## 参考文献

 * https://github.com/stardustdotbox/stardustdotbox.github.io/wiki/Pastebin_2025
 * https://my.box/
 * https://docs.my.box/docs/
 * https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
 * https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
 * https://analytics.google.com/