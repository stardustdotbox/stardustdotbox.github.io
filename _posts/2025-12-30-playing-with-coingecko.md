---
title: 'coingeckoと遊んでみる'
date: 2025-12-30
permalink: /posts/2025/12/playing-with-coingecko/
tags:
  - coingecko
header:
  image: https://github.com/user-attachments/assets/36534d64-aa5e-4f90-a534-491f57559b09
---

<img width="2344" height="512" alt="image" src="https://github.com/user-attachments/assets/36534d64-aa5e-4f90-a534-491f57559b09" />

## レポジトリのクローン

```
┌──(stardust✨stardust)-[~]
└─$ git clone https://github.com/stardustdotbox/coingecko
```

## Python 3.12.8の構築

```
┌──(stardust✨stardust)-[~/coingecko]
└─$ sudo apt-get update && sudo apt-get install -y libsqlite3-dev liblzma-dev libbz2-dev libreadline-dev libssl-dev zlib1g-dev libffi-dev
┌──(stardust✨stardust)-[~/coingecko]
└─$ pyenv install 3.12.8
pyenv: /home/stardust/.anyenv/envs/pyenv/versions/3.12.8 already exists
continue with installation? (y/N) y
Downloading Python-3.12.8.tar.xz...
-> https://www.python.org/ftp/python/3.12.8/Python-3.12.8.tar.xz
Installing Python-3.12.8...
Installed Python-3.12.8 to /home/stardust/.anyenv/envs/pyenv/versions/3.12.8
┌──(stardust✨stardust)-[~/coingecko]
└─$ pyenv local 3.12.8

┌──(stardust✨stardust)-[~/coingecko]
└─$ exec $SHEL -l

┌──(stardust✨stardust)-[~/coingecko]
└─$ python -V
Python 3.12.8

┌──(stardust✨stardust)-[~/coingecko]
└─$ python -m venv venv

┌──(stardust✨stardust)-[~/coingecko]
└─$ source venv/bin/activate

┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python -V
Python 3.12.8
```

## ライブラリのインストール

```
┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ pip install -r requirements.txt
```

## 使用例

```
┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py 
使用方法:
  価格表示: python coingecko.py <暗号通貨名>
  通貨換算: python coingecko.py <金額><通貨> <暗号通貨名>

例:
  python coingecko.py ETH
  python coingecko.py 100JPY ETH
  python coingecko.py 100JPY USDC

┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py BTC
87,932.00USDC
13,734,967.00JPY

┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py ETH
2,971.37USDC
464,127.00JPY

┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py 1ETH JPYC
399107.76JPYC

┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py 1JPY JPYC
0.862069JPYC

┌──(venv)(stardust✨stardust)-[~/coingecko]
└─$ python coingecko.py JPYC
0.01USDC
1.16JPY
```

適当なREADMEを書いてCursorのAgentにお願いしただけで一行もプログラミングすることなく、通貨換算スクリプトが完成した。AI駆動開発時代はすごいなあヽ(´ー`)ノ

## 参考文献

 * [coingecko](https://www.coingecko.com/)
 * [geckoterminal](https://www.geckoterminal.com/ja)
 * https://github.com/stardustdotbox/coingecko
