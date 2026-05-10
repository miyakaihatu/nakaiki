# 身体の返事

「身体の返事」は、SNSアカウントや投稿場所が変わっても、発信の現在地・思想・SNSリンク・note記事一覧を見られるようにするための静的な個人サイトです。

HTML / CSS / JavaScriptだけで作っているため、GitHub Pagesにそのまま置いて無料公開できます。フォーム送信やサーバー処理はありません。

## GitHub Pagesで公開する手順

1. GitHubのリポジトリ画面で「Settings」を開きます。
2. 「Pages」を開きます。
3. 「Build and deployment」のSourceで「Deploy from a branch」を選びます。
4. Branchで `main` と `/root` を選んで保存します。
5. 数分後に `https://miyakaihatu.github.io/nakaiki/` へアクセスします。

## Google Search Console登録

公開後、Google Search ConsoleでサイトURLを登録します。登録後、以下のサイトマップURLを送信してください。

```text
https://miyakaihatu.github.io/nakaiki/sitemap.xml
```

## SNSリンクの変更方法

`links.html` の各リンクカードにある `href="#"` を、実際のSNS URLに差し替えます。フッターのSNSリンクも同じように変更してください。

「現在はこちらで更新中」のラベルを別のSNSへ移したい場合は、`is-current` クラスと `<em>現在はこちらで更新中</em>` を移動します。

## note記事リンクの追加方法

`articles.html` の `.article-card` をコピーして、タイトル、説明、タグ、リンク先を差し替えます。説明文は100文字前後にすると、スマホでも読みやすくなります。

## note最新記事の自動更新

トップページの「note最新記事」は `data/note.json` を読み込んで表示します。`data/note.json` は `.github/workflows/update-note-rss.yml` のGitHub Actionsが1日1回更新します。GitHubのActions画面から `Update note RSS` を選ぶと、手動実行もできます。

noteユーザー名を変える場合は、`.github/workflows/update-note-rss.yml` の `NOTE_USER: miyaaromassage` を新しいユーザー名に差し替えてください。RSS URLを直接指定したい場合は、`NOTE_RSS_URL` に `https://note.com/あなたのnoteユーザー名/rss` の形で設定できます。

`scripts/fetch-note-rss.js` はRSSから `title`、`link`、`pubDate`、`description`、画像がある場合は `image` を取得し、最大5件を保存します。トップページではそのうち最大3件だけを静かに表示します。

RSS取得に失敗した場合でも、公開中のページ自体は崩れません。既存の `data/note.json` が残っていればその内容が表示され、読み込みに失敗した時は控えめな案内文を表示します。

## 画像やリンクの差し替え方法

このサイトは画像なしでも成立するデザインです。画像を追加する場合は `images` フォルダを作り、HTMLに `img` タグを追加してください。画像には必ず内容が伝わる `alt` を入れてください。

## 独自ドメインについて

あとから独自ドメインに変更できます。変更後は、`canonical`、OGP URL、`sitemap.xml`、`robots.txt` のURLも新しいドメインに更新してください。

## 個人情報を載せない注意

このサイトには本名、住所、電話番号、メールアドレスなどの個人情報を載せない運用を想定しています。連絡先はSNSリンクだけにしてください。
