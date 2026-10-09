# 画像の出典と権利

確認日：2026-10-10。写真は説明用の参考写真であり、今回の事件の現場写真ではない。写真の16:9への切り抜きと墨・シアンへの加工は後工程で行う。

| ファイル名 | 出典 | 作者 | ライセンス・権利 | 元のページのURL | 確かめた方法 |
| --- | --- | --- | --- | --- | --- |
| fsa-identity-check.svg | 金融庁「現下の情勢を踏まえたサイバーセキュリティ対策の強化と各種取引申込等における対応について」 | 星屑新報 | © Stardust | https://www.fsa.go.jp/news/r8/sonota/20261009/20261009.html | 公式本文をcurlで取得して読解。2026年10月9日の要請と2027年4月1日の施行日を照合し、独自に作図。 |
| anthropic-cyber-defense.svg | Anthropic「Introducing the Anthropic Cyber Mission」 | 星屑新報 | © Stardust | https://www.anthropic.com/news/anthropic-cyber-mission | 公式発表の2026年10月8日の日付、OSS Scannerの無料・定期検査・人の事前確認なしという条件、インフラ支援と日立の参加を確認して独自に作図。 |
| server-room.jpg | Wikimedia Commons「Server Room (22397102849).jpg」。Credit：Real Estate（Flickr） | Carl Lender from Sunrise, USA | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | https://commons.wikimedia.org/wiki/File:Server_Room_(22397102849).jpg | Commons APIのimageinfo/extmetadataでLicenseShortName=CC BY 2.0、Artist=Carl Lender、Credit=Real Estateを確認。iiurlwidth=1600のthumburlをcurlで取得。人物が主題でないことを目視確認。500KB以下にするためJPEGを再圧縮。（加工: 星屑新報） |
| prudential-order-timeline.svg | 金融庁「プルデンシャル生命保険株式会社、ジブラルタ生命保険株式会社及びプルデンシャル・ホールディング・オブ・ジャパン株式会社に対する行政処分について」 | 星屑新報 | © Stardust | https://www.fsa.go.jp/news/r8/hoken/20261009/20261009.html | 公式本文の発表日、停止期間、改善計画提出期限、契約者保護の例外を照合して独自に作図。 |

写真のAPI確認URL：
<https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=1600&titles=File%3AServer%20Room%20%2822397102849%29.jpg>

APIのCreditが指す元投稿：<https://www.flickr.com/photos/clender/22397102849/>。作者ページ：<https://www.flickr.com/people/43547797@N00>。

使用したthumburl：
<https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Server_Room_%2822397102849%29.jpg/1920px-Server_Room_%2822397102849%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail>

APIはthumbwidth=1600と返したが、取得したJPEGの実寸は1920×1280だった。返されたthumburlをそのまま使用し、切り抜きと二色化は未実施。圧縮後の写真は466235バイト。
