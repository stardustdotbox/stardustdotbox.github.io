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
多くの人はMatrixに囚われて人生の大半の時間を費やしており、気づくことなくその生を終えることも少なくありません。
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

## Soneiumに参加する

## Web3とOG文化

A data-driven personal website
======
Like many other Jekyll-based GitHub Pages templates, Academic Pages makes you separate the website's content from its form. The content & metadata of your website are in structured Markdown files, while various other files constitute the theme, specifying how to transform that content & metadata into HTML pages. You keep these various Markdown (.md), YAML (.yml), HTML, and CSS files in a public GitHub repository. Each time you commit and push an update to the repository, the [GitHub pages](https://pages.github.com/) service creates static HTML pages based on these files, which are hosted on GitHub's servers free of charge.

Many of the features of dynamic content management systems (like Wordpress) can be achieved in this fashion, using a fraction of the computational resources and with far less vulnerability to hacking and DDoSing. You can also modify the theme to your heart's content without touching the content of your site. If you get to a point where you've broken something in Jekyll/HTML/CSS beyond repair, your Markdown files describing your talks, publications, etc. are safe. You can rollback the changes or even delete the repository and start over - just be sure to save the Markdown files! You can also write scripts that process the structured data on the site, such as [this one](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb) that analyzes metadata in pages about talks to display [a map of every location you've given a talk](https://academicpages.github.io/talkmap.html).

For those users that need more advanced functionality, the template also supports the following popular tools:
- [MathJax](https://www.mathjax.org/) for mathematical equations
- [Mermaid](https://mermaid.js.org/) for diagraming
- [Plotly](https://plotly.com/javascript/) for plotting

Getting started
======
1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this template](https://github.com/academicpages/academicpages.github.io) by clicking the "Use this template" button in the top right. 
1. Go to the repository's settings (rightmost item in the tabs that start with "Code", should be below "Unwatch"). Rename the repository "[your GitHub username].github.io", which will also be your website's URL.
1. Set site-wide configuration and create content & metadata (see below -- also see [this set of diffs](https://archive.is/3TPas) showing what files were changed to set up [an example site](https://getorg-testacct.github.io) for a user with the username "getorg-testacct")
1. Upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.  
1. Check status by going to the repository settings, in the "GitHub pages" section

Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one Markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a Markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each Markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

The repository includes [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual Markdown files that will be properly formatted for the Academic Pages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the Markdown files, then commit and push them to the GitHub repository.

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and Markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a Markdown file for a talk
![Editing a Markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring Academic Pages can be found in [the guide](https://academicpages.github.io/markdown/), the [growing wiki](https://github.com/academicpages/academicpages.github.io/wiki), and you can always [ask a question on GitHub](https://github.com/academicpages/academicpages.github.io/discussions). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful.
