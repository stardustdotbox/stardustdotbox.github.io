---
title: 'Startale App調査メモ(1) - 基本機能概説'
date: 2026-01-25 17:24:31
permalink: /posts/2026/01/Startale-App-Research-memo-1_ja/
tags:
  - Writing
  - Technical experiments
header:
  image: https://github.com/user-attachments/assets/2953d55d-71e2-48b4-8d0b-476301f9ae6c
---

<img width="1282" height="688" alt="image" src="https://github.com/user-attachments/assets/2953d55d-71e2-48b4-8d0b-476301f9ae6c" />

{% include toc %}

## Startale Appについて

Startale Appはweb3の黎明期を経験したStartaleのノウハウが蓄積されているようなアプリケーションです。
その目的はweb2ユーザはweb3にオンボーディングする上でのGatewayアプリケーションになることを想定していると思います。
現在、Startale Appはベータテスト期間中で、招待された人のみがベータテスターとして活動しています。
僕はこのStartale Appを自分のweb3生活の基盤として使っていこうと思っています。（ ´ー｀）y―┛~~

興味が湧いたら、あなたもStartale Appベータテスターになってみてくださいね!
Startale Appベータテスター参加は以下からのStartaleのページからヽ(´ー`)ノ
 * <https://startale.com/en/app>
 * <https://startale.com/jp/app>

## 機能概説

### HOME画面

<img width="1693" height="929" alt="image" src="https://github.com/user-attachments/assets/5668e340-ad6d-4fc9-ae4a-96f8243dcc39" />

HOME画面では自分が保有しているSTAR Pointsの量や、現在実施中のミッションの進捗、流動性提供の管理のサマリが表示されます。
HOME画面は非常に重要です。なぜなら、インターフェイス上、流動性提供管理画面に飛べるのはHOME画面からだけだからですlol(タブに流動性提供メニューの追加が必要だと思う)

### Point History画面

<img width="536" height="573" alt="image" src="https://github.com/user-attachments/assets/87535456-6366-4770-a403-e0ea847aa91c" />

Point History画面では自分が保有しているSTAR Pointsがどのような経緯で入ってきたのかの履歴を閲覧することができます。

### 流動性提供画面

<img width="382" height="753" alt="image" src="https://github.com/user-attachments/assets/6e70ea4d-b086-4aae-8fb3-1a396c12e777" />

Startale AppでStar Pointsを効率的に集めるつもりなら、この機能の理解が最重要です。

 * 100USDSC以上流動性提供をした場合にのみ、流動性提供から日毎に1Star Pointsを得ることができます。200USDSC以上提供した場合は、日毎に2Star Pointsを得ることができます。
 * Star Pointsを入手するには、流動性提供してから30日待つ必要があります。
 * 長い期間、流動性提供したほうが効率的にStar Pointsを得ることができます。30日毎に乗数が上昇し、180日後に乗数は最大の2.0の上限に達します。

<img width="745" height="383" alt="image" src="https://github.com/user-attachments/assets/0ba16701-dfb0-4855-a588-f043c0d5c034" />

### 流動性提供ポジション画面

<img width="396" height="382" alt="image" src="https://github.com/user-attachments/assets/40cf5657-f0ac-4658-850f-172c5169f7f4" />

出金はラストインファーストアウト（LIFO）方式に従い、より古いポジションを保護します。親切な設計ですよね!

### Earn(Valut)画面

<img width="370" height="339" alt="image" src="https://github.com/user-attachments/assets/77fa3ec1-1972-4a15-99f3-c705d41c3bc3" />

現在のStartale USDCのValut機能でのAPYは9.42%です。
Earn Vaultでは、Startale USDを預け、短期米国国債で裏付けられた報酬を得られます。表示されているAPYが標準市場利率より高くなる場合、それは一部のユーザーがVaultで利益を請求する代わりにSTARポイントを獲得することを選んだことを反映しています。APYは競争力を保ちつつ、すべてのユーザーにとって報酬システムが持続可能であるように設計されています。
いつでも、出金できますので、僕は便利なStartale USDC置き場として使っています。ヽ(´ー`)ノ

 * <https://usd.startale.com/faq#how-does-earn-vault-work>

### Swap画面

<img width="440" height="487" alt="image" src="https://github.com/user-attachments/assets/cb6e27f7-eeb1-4b56-ba00-8f3908bdcd17" />

Swap機能は手持ちのtokenを別のtokenにswapすることができます。Startale USDCを購入するときは現在、この機能を使用するのが主流のようです。
バックエンドはuniswapを使っているような気がするので、実はuniswapのほうがswapにかかるコストは安いんじゃないかという噂もあります。((*´∀`))ｹﾗｹﾗ

### Activity画面

<img width="451" height="826" alt="image" src="https://github.com/user-attachments/assets/c64cfdbe-a94e-4fa0-bb8c-e006b3d3e384" />

僕のお気に入りの機能です。ウォレットで起きたイベントのActivityログが表示されます。自分の好きな国の通貨単価に表示変更できるみたいですし、ありがたいですよね。ヽ(´ー`)ノ

## Wallet画面

<img width="1147" height="441" alt="image" src="https://github.com/user-attachments/assets/d13a882e-1975-4358-b5ee-f93328dcf453" />

ウォレットにある主要tokenの保持量と価格変動が一目で見ることができます。

## Token/NFT送信画面

<img width="459" height="367" alt="image" src="https://github.com/user-attachments/assets/53410889-898f-47b4-a603-8c9ad230a7ad" />

自分の保有しているtokenやNFTを、他のウォレットに送信することができます。Startale Appがこの基本機能を実装してくれているのはうれしいですね。

## Recieve画面

<img width="492" height="357" alt="image" src="https://github.com/user-attachments/assets/da71db8e-8525-47d7-b4e8-5b89aac1c692" />

QRコードでtokenを受け取れるようにしてくれるのかな？まだ使ったことがないからよくわからない。
Op Networkからのオートブリッジもおもしろそうな機能ではあるけど、一度有効化したら、無効化する方法がわからない。
僕はまだ必要と思ったことがないので、あんまり触っていません。（ ´ー｀）y―┛~~

 * <https://startale.com/ja/app/faq#getting-started-7>

## Referral画面

<img width="370" height="514" alt="image" src="https://github.com/user-attachments/assets/f10be9c6-e6da-4cc2-b851-44dc1d6988bc" />

Startale Appは招待コードを渡して、渡した人が稼いだスターポイントの10%を得ることができます。
招待コードは今後追加されるかもしれませんが、一人3つが初期設計なので、スターポイントを稼いでくれそうな人に渡すと、自分もスターポイントを稼げてうれしいですね。ヽ(´ー`)ノ

## まとめ

Startale Appは現状、web3で活動するために必要な主要機能をSoneium上のdappsとして開発することに成功していることがわかります。
また、今回は説明していませんが、アカウントアブストラクションなどのWeb2ユーザをSoneiumにオンボードする機能も備えているため、今後、Soneium上のStartaleが展開するメインアプリケーションになることが予想されます。


## Xスレッド

### スレッド0

Startale Appはweb3の黎明期を経験したStartaleのノウハウが蓄積されているようなアプリケーションです。
その目的はweb2ユーザはweb3にオンボーディングする上でのGatewayアプリケーションになることを想定していると思います。
現在、Startale Appはベータテスト期間中で、招待された人のみがベータテスターとして活動しています。
僕はこのStartale Appを自分のweb3生活の基盤として使っていこうと思っています。（ ´ー｀）y―┛~~

興味が湧いたら、あなたもStartale Appベータテスターになってみてくださいね!
Startale Appベータテスター参加は以下からのStartaleのページからヽ(´ー`)ノ
 * <https://startale.com/en/app>
 * <https://startale.com/jp/app>

以下のスレッドではStartale Appの主要機能について画面毎に概説します。（ ´ー｀）y―┛~~

#Soneium #Startale #StartaleApp

### スレッド1

[HOME画面]

<img width="1693" height="929" alt="image" src="https://github.com/user-attachments/assets/5668e340-ad6d-4fc9-ae4a-96f8243dcc39" />

HOME画面では自分が保有しているSTAR Pointsの量や、現在実施中のミッションの進捗、流動性提供の管理のサマリが表示されます。
HOME画面は非常に重要です。なぜなら、インターフェイス上、流動性提供管理画面に飛べるのはHOME画面からだけだからですlol(タブに流動性提供メニューの追加が必要だと思う)

### スレッド2

[流動性提供画面]

<img width="382" height="753" alt="image" src="https://github.com/user-attachments/assets/6e70ea4d-b086-4aae-8fb3-1a396c12e777" />
<img width="745" height="383" alt="image" src="https://github.com/user-attachments/assets/0ba16701-dfb0-4855-a588-f043c0d5c034" />

Startale AppでStar Pointsを効率的に集めるつもりなら、この機能の理解が最重要です。

 * 100USDSC以上流動性提供をした場合にのみ、流動性提供から日毎に1Star Pointsを得ることができます。200USDSC以上提供した場合は、日毎に2Star Pointsを得ることができます。
 * Star Pointsを入手するには、流動性提供してから30日待つ必要があります。
 * 長い期間、流動性提供したほうが効率的にStar Pointsを得ることができます。30日毎に乗数が上昇し、180日後に乗数は最大の2.0の上限に達します。

### スレッド3

[流動性提供ポジション画面]

<img width="396" height="382" alt="image" src="https://github.com/user-attachments/assets/40cf5657-f0ac-4658-850f-172c5169f7f4" />

出金はラストインファーストアウト（LIFO）方式に従い、より古いポジションを保護します。親切な設計ですよね!

### スレッド4

<img width="370" height="339" alt="image" src="https://github.com/user-attachments/assets/77fa3ec1-1972-4a15-99f3-c705d41c3bc3" />

現在のStartale USDCのValut機能でのAPYは9.42%です。
Earn Vaultでは、Startale USDを預け、短期米国国債で裏付けられた報酬を得られます。表示されているAPYが標準市場利率より高くなる場合、それは一部のユーザーがVaultで利益を請求する代わりにSTARポイントを獲得することを選んだことを反映しています。APYは競争力を保ちつつ、すべてのユーザーにとって報酬システムが持続可能であるように設計されています。
いつでも、出金できますので、僕は便利なStartale USDC置き場として使っています。ヽ(´ー`)ノ

 * <https://usd.startale.com/faq#how-does-earn-vault-work>

### スレッド5

[Swap画面]

<img width="440" height="487" alt="image" src="https://github.com/user-attachments/assets/cb6e27f7-eeb1-4b56-ba00-8f3908bdcd17" />

Swap機能は手持ちのtokenを別のtokenにswapすることができます。Startale USDCを購入するときは現在、この機能を使用するのが主流のようです。
バックエンドはuniswapを使っているような気がするので、実はuniswapのほうがswapにかかるコストは安いんじゃないかという噂もあります。((*´∀`))ｹﾗｹﾗ

### スレッド6

[Token/NFT送信画面]

<img width="459" height="367" alt="image" src="https://github.com/user-attachments/assets/53410889-898f-47b4-a603-8c9ad230a7ad" />

自分の保有しているtokenやNFTを、他のウォレットに送信することができます。Startale Appがこの基本機能を実装してくれているのはうれしいですね。

### スレッド7

[Referral画面]

<img width="370" height="514" alt="image" src="https://github.com/user-attachments/assets/f10be9c6-e6da-4cc2-b851-44dc1d6988bc" />

Startale Appは招待コードを渡して、渡した人が稼いだスターポイントの10%を得ることができます。
招待コードは今後追加されるかもしれませんが、一人3つが初期設計なので、スターポイントを稼いでくれそうな人に渡すと、自分もスターポイントを稼げてうれしいですね。ヽ(´ー`)ノ

### スレッド8

[まとめ]

Startale Appは現状、web3で活動するために必要な主要機能をSoneium上のdappsとして開発することに成功していることがわかります。
また、今回は説明していませんが、アカウントアブストラクションなどのWeb2ユーザをSoneiumにオンボードする機能も備えているため、今後、Soneium上のStartaleが展開するメインアプリケーションになることが予想されます。

さらに詳細を知りたい人は以下の僕のブログ記事をみてくださいね。ヽ(´ー`)ノ
https://www.stardust.box/posts/2026/01/Startale-App-Research-memo-1_ja/

## Startaleポートフォリオ

### タイトル

 * Startale App調査メモ(1) - 基本機能概説

### タグ

 * Writing

### これはなんですか？

 * 個人的なStartale Appを調査した際のメモ書きです。

### なぜ重要ですか？

 * Startale Appの認知を高め、Startale Appに対しての知識を世の中に広めることに貢献する

### ブログポスト

 * 英語版 : https://www.stardust.box/
 * 日本語版 : https://www.stardust.box/posts/2026/01/Startale-App-Research-memo-1_ja/

### Xスレッド

 * 英語版 : https://x.com/stardustdotbox
 * 日本語版 : https://x.com/stardustdotbox

### ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Startale App調査メモ(1) - 基本機能概説' && git push
```

## 参考文献

 * <https://www.stardust.box/posts/2026/01/Startale-Portofolio/>
 * <https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-2/>
 * <https://app.startale.com/>
 * <https://startale.com/en/app>
 * <https://startale.com/ja/app>
 * <https://startale.com/ja/app/faq>
 * <https://github.com/orgs/StartaleGroup/repositories>
 * <https://github.com/StartaleGroup/stablecoin-vault-contracts>
 * <https://usd.startale.com/>
 * <https://usd.startale.com/faq#star-points>
 * <https://usd.startale.com/news/usdsc-faq>