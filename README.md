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

## 画像やリンクの差し替え方法

このサイトは画像なしでも成立するデザインです。画像を追加する場合は `images` フォルダを作り、HTMLに `img` タグを追加してください。画像には必ず内容が伝わる `alt` を入れてください。

## 独自ドメインについて

あとから独自ドメインに変更できます。変更後は、`canonical`、OGP URL、`sitemap.xml`、`robots.txt` のURLも新しいドメインに更新してください。

## 個人情報を載せない注意

このサイトには本名、住所、電話番号、メールアドレスなどの個人情報を載せない運用を想定しています。連絡先はSNSリンクだけにしてください。
