---
title: 'Stardust✨のおもちゃ箱を作ってみたので語る'
date: 2025-12-30
permalink: /posts/2025/12/Talk-About-stardustbox/
tags:
  - Stardust✨のおもちゃ箱
header:
  image: https://github.com/user-attachments/assets/cd41a2a9-e4ce-497c-820a-bb0287e99431
---

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

## 参考文献

 * https://github.com/stardustdotbox/stardustdotbox.github.io/wiki/Pastebin_2025
 * https://my.box/
 * https://docs.my.box/docs/

