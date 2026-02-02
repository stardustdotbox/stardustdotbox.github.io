---
permalink: /
title: "Stardust✨のおもちゃ箱"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
img_base: /images/about/
header:
  image: stardust.jpg
---

ようこそ！ようこそ！ゆっくりしていってね！
此処は僕がWeb3を中心に学んだことや体験したことをおもしろおかしく記録していく個人ホームページです。
どうぞ、末永くよろしくおねがいします。ヽ(´ー`)ノ

本日2025年12月27日、Web3の世界が徐々にですが確実に拡大しているのを感じます。私たちは一度は奪われたインターネットを我々の手に取り戻すチャンスを突如手に入れました。このまたとない機会を逃してはいけないとひしひしと感じるのです。そうでしょ？アングラの諸兄達。僕はまだ此処にいるよ。（ ´ー｀）y―┛~~

あなたは[The Matrix](https://thehidden-wiki.org/wiki/index.php?title=The_Matrix)いう映画を見たことがありますか？
あの映画は現実社会に実在するバビロンシステムを抽象化し、比喩的な表現の結果として生まれた作品です。
多くの人はMatrixに囚われて人生の大半の時間を費やしており、気づくことなく人生を終えることも少なくありません。
インターネットは黎明期(Web1時代)は意外なことに分散化されており、Matrixに囚われていなかったと記憶しています。
Web2時代に企業にインターネットの表層が支配され、Web3でインターネットはWeb2で育んだ技術をブロックチェインと連携させ、再度分散化を目指します。

[長きに渡って続いた自由への戦い](https://museum.scenecritique.com/categories/library/defcon0/1st.htm)はWeb3時代を迎え、ついに我々の勝利という形で終結を迎えるはずだ。
インターネットの片隅からMatrixに抗うことを此処に誓う。((*´∀`))ｹﾗｹﾗ

## Web3を俯瞰する

Nakamoto Satoshiが開発した[Bitcoin](https://bitcoin.org/files/bitcoin-paper/bitcoin_jp.pdf)により、オンライン決算は金融機関を介することなく、P2P電子通貨を用いて決算きることになり、ブロックチェインは分散台帳として機能し、電子通貨は実際に価値を持ち、誰もがインターネット上で自由に決算をしたり、流動性提供をしたり、トレードしたりして、金融機関を排して金融活動を個人で行えるようになりました。
金融機関を排してインターネット上で経済活動を行うのはサイファーパンクの長年の悲願でありましたが、2025年12月時点でBTC価格は1300万円を超えているため、この悲願はすでに達成されているように思います。

Ethereumはブロックチェイン上でEVMを稼働させることでWeb3に革命をもたらしました。(ブロックチェイン上で任意の状態のマシン状態を作るのは危険だと、Nakamoto Satoshiは思ってたように僕は思います。)
[EVM](https://ethereum.org/ja/developers/docs/evm/)の発明によりブロックチェーンは分散台帳ではなく、分散型の状態マシンとなりました。 Ethereumの状態とは、全アカウントとその残高を保持するだけでなく、予め定義されたルールに従ってブロックごとに変化し、任意のマシンコードを実行できる_マシンの状態_を保持する、巨大なデータ構造です。

インターネットのルールは変わりました。価値や状態は金融機関や信用情報機関に保存されるのではなく、ブロックチェイン上に保存されます。

## EthereumとPolkadotの戦い

[Gavin Wood](https://gavwood.com/)はEtherumの共同創業者であり、Solidityと初期EVMを開発した人物です。[Web3](https://ethereum.org/ja/web3/)の提唱者でもあります。
彼はEthereum財団を退職後、EthereumはL1がスケールできなくなり、Ethereumは崩壊するという予測の元、Layer 0として動作するpolkadotを開発しました。
彼の予想は正しかったのでしょうか？
2025年12月現在の状況を見ると、とてもそうは思えません。
[DefiLlmaのチェーン一覧情報](https://defillama.com/chains)を見てみましょう。
![ブロックチェイン情報一覧]({{ page.img_base }}/chains.png)
Ethereumが最も資金を集めており、Ethereum L2のBaseも資金を集めていることがわかります。
Etherumはシャーディングという手法を編み出し、OP / zk roll up手法が開発され、Etherum L1はセキュリティの担保に比重を置き、Etherum L2でUXを提供することで、L1のスケーリング問題を解消しました。

[L2beat](https://l2beat.com/)ではEthereum L2のメトリクスを参照することがきます。Web3は2025年12月時点ではEthereum L2の黎明期を迎えているように思えます。

![alt text]({{ page.img_base }}/l2beat.png)

## Ethereumを学ぶ

## Soneiumを学ぶ

## Astarを学ぶ

## Web3とOG文化

## AIと友達になる

## 本webサイトについて

[Akacemic Pages](https://github.com/academicpages/academicpages.github.io)をテンプレートとして使用させていただいております。ヽ(´ー`)ノ
以下のツールもサポートしています。

- [MathJax](https://www.mathjax.org/) for mathematical equations
- [Mermaid](https://mermaid.js.org/) for diagraming
- [Plotly](https://plotly.com/javascript/) for plotting


Create content & metadata
------
For site content, there is one Markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a Markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each Markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

### レポジトリのクローン

```
stardust✨stardust:~ $ git clone git@github.com:stardustdotbox/stardustdotbox.github.io.git
```

### ruby3.3.10環境の構築

```
stardust✨stardust:~ $ anyenv install rbenv
stardust✨stardust:~ $ exec $SHELL -l
stardust✨stardust:~ $ sudo apt-get install -y libyaml-dev
stardust✨stardust:~ $ rbenv install 3.3.10
stardust✨stardust:~/stardustdotbox.github.io $ (master) gem install bundler jekyll
stardust✨stardust:~/stardustdotbox.github.io $ (master) bundle instal
```

### テストサーバの起動

```
stardust✨stardust:~/stardustdotbox.github.io $ (master) bundle exec jekyll serve
```

### ブログ更新コマンド

```
stardust✨stardust:~/stardustdotbox.github.io $ (master) git config --global user.name "Stardust✨"
stardust✨stardust:~/stardustdotbox.github.io $ (master) git config --global user.email "stardustdotbox@gmail.com"
stardust✨stardust:~/stardustdotbox.github.io $ (master) git add -A && git commit -m 'aboutを更新する' && git push
```

