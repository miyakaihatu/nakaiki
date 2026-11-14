# 検索流入を増やすための追加・変更（ブランチ `fable/seo-content`）

作成：2026-11-14。main には入れていません（未公開）。見てよければ main に merge すると GitHub Pages に出ます。

注意：このファイルは merge するとそのままサイト上でも読めてしまいます（`.nojekyll` のため）。merge の前に消すか、消してから merge してください。

## 先に知っておいてほしいこと（材料の制約）

- `ai-workspace/content/note/published/` は空で、作業環境から note.com にもつながらなかったため、**公開済み note 70本のうち本文を読めたのは6本**です（下書きフォルダに残っていた原稿）。
  - 中イキ開発とは（n523fde7c95c9）／呼吸・体外式（n627d2a0e2259）／眠れない夜と休めない脳（n76f51d99e763）／力を抜けない人へ（n880b4ec04b9b）／「気持ちいい」と「性感」は別もの（n3abca5600c5a）／未公開の下書き「おしっこ出そう」まとめ（`drafts/oshikko-desou-sonosaki.md`、status: review）
- 新しいページの本文は、この6本と既存のサイトのページ（テーマページ・Q&A・プロフィール・施術について）に書かれていることだけで組み立てました。本文を読めなかった記事は、ページ末尾の「ミヤのnoteで詳しく読む」にタイトルでリンクしただけで、中身は使っていません。
- そのため、検索でいちばん読まれている「私、イッたの？」（イったか分からない）や、ポルチオ、脳イキ、足先の冷え、オイルマッサージで感度が上がる理由などは、**ページを作っていません**（本文がないと作り話になるため）。本文があれば追加できます。

## 追加したページ（8本）

| ファイル | 狙った検索語 | 元にした note 記事・ページ |
|---|---|---|
| [nakaiki-kaihatsu-towa.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/nakaiki-kaihatsu-towa.html) | 中イキ開発 とは／中イキ 開発 やり方／中イキ開発 流れ | n523fde7c95c9（中イキ開発とは） |
| [nakaiki-dekinai.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/nakaiki-dekinai.html) | 中イキ できない／中でイけない 原因／中イキ 体質 | n523fde7c95c9、n76f51d99e763、n627d2a0e2259、about.html「これまでの記録」 |
| [nakaiki-kankaku.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/nakaiki-kankaku.html) | 中イキ どんな感覚／外イキ 中イキ 違い／クリイキ 中イキ 違い | n523fde7c95c9、n627d2a0e2259（「変な感じ」の扱い）、n76f51d99e763 |
| [nakaiki-kokyu.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/nakaiki-kokyu.html) | 中イキ 呼吸／腹式呼吸 感じやすくなる／体外式 とは | n627d2a0e2259 |
| [chikara-nukenai.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/chikara-nukenai.html) | 力を抜いて 抜けない／リラックスできない 感じない／力の抜き方 | n880b4ec04b9b、n76f51d99e763 |
| [oshikko-desou.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/oshikko-desou.html) | 中 触られる 尿意／イきそう おしっこ出そう／潮吹き 尿意 | 未公開の下書き「おしっこ出そう」まとめ、questions.html の「イきそうになると怖くなる」 |
| [seikan-towa.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/seikan-towa.html) | 性感 とは／性感 気持ちいい 違い／性感 わからない | n3abca5600c5a、n76f51d99e763 |
| [nakaiki-jiko-kaihatsu.html](https://github.com/miyakaihatu/nakaiki/blob/fable/seo-content/nakaiki-jiko-kaihatsu.html) | 中イキ 自己開発 やり方／中イキ 練習 ひとり | 上の呼吸・力の抜き方・中イキ開発の記事と、既存ページ（ひとりならいける／落ち着けない）をまとめ直したもの |

どのページも、既存のテーマページ（`hitori-dewa-ikeru.html`）と同じ head・ヘッダー・フッター・GA4 タグ・`js/main.js`・Article の構造化データをそのまま使っています。ページ末尾の応募案内は、既存どおり `main.js` が自動で付けます（18歳未満不可・無料・送信だけでは確定しない、の表示もそこに入ります）。

## 既存ページで変えた箇所

本文の意味は変えていません。変えたのは title・meta description・og:title・見出しの一部と、リンクの追加です。

| ページ | title（変更後） | 見出しなど |
|---|---|---|
| nureru-kimochiyoku-nai.html | 濡れるのに気持ちよくない理由｜反応はあるのに感じない時 | 「よくある背景」→「濡れるのに気持ちよくない時の、よくある背景」 |
| kincho-katamaru.html | 緊張すると身体が固まる時｜触れられると力が入って感じにくい理由 | 「感覚が遠くなる理由」→「緊張すると感覚が遠くなる理由」 |
| tsuyoi-shigeki-nare.html | 強い刺激でないと感じない時｜強い刺激に慣れると弱い感覚を拾いにくい理由 | 「戻し方のヒント」→「弱い刺激でも感じられる状態への戻し方」 |
| ochitsukenai-kanjinikui.html | 落ち着けなくて感じにくい時｜リラックスできない・瞑想が苦手な人へ | 見出しは変更なし |
| kankaku-aru-kimochiyoku-naranai.html | 触られている感覚はあるのに気持ちよくない時｜感覚と快感は別 | 「感覚と気持ちよさは別」→「触られている感覚と、気持ちよさは別」 |
| kofun-aru-seikan-wakaranai.html | 興奮はするのに、どこが気持ちいいかわからない時｜興奮と性感の違い | 見出しは変更なし |
| hitori-dewa-ikeru.html | ひとりではイけるのに、2人だとイけない理由｜足ピン・おもちゃに慣れている時 | 見出し・本文は「いける」のまま |
| themes.html | 中イキ・感じにくさのテーマ一覧｜中イキできない、感じにくい時の入口 | 先頭に「中イキについて知る」（新8ページ）を追加。01〜05・07 のカードにサイト内ページへの「詳しく読む」を追加 |
| questions.html | 中イキ・感じにくさの悩みQ&A｜ミヤに届く悩みと身体の返事 | 先頭に「中イキできないのは、体質ですか。」を追加。緊張・呼吸・怖さの回答に新ページへのリンクを追加 |
| articles.html | note記事・長文記事一覧｜中イキ・身体感覚の記事 | 「サイト内で読める記事」（新8ページ）を追加 |
| index.html | 変更なし | 「今の状態から読む」の前に「中イキについて知る」（6ページへのカード）を追加 |
| sitemap.xml | — | 新8ページを追加（17 → 25 URL） |

- 上の7つのテーマページすべてに「あわせて読む」（サイト内の関連ページ3本）を足しました。meta description にも検索される言い方（「感じない」「リラックスできない」「イけない」など）を足しています。
- themes.html で見つけたこと：カード01〜07の「詳しく読む」は `main.js` が後から付ける作りでしたが、どのカードにも note へのリンクが先にあるため、実際には一度も付いていませんでした。HTML に直接書きました。

## 壊れていないかの確認結果

- 全 HTML（26ファイル）のタグの開き・閉じ：不一致なし
- サイト内リンクと `#` 付きリンクの行き先：リンク切れなし
- 構造化データ（JSON-LD）：全ページで読み込みエラーなし
- sitemap.xml：XML として正常、25 URL、重複なし、どの URL もファイルあり
- 新8ページ：canonical・GA4 タグ・`main.js` あり、h1 は1つずつ、note へのリンク先はすべて `articles.csv` にある記事
- 見た目：スマホ幅でヘッドレス Chrome に表示して確認（新ページ1本と themes.html）。崩れなし
- 確認していないこと：note 側のリンク先が今も開けるか（作業環境から note.com につながらないため）。パソコン幅の表示

もとからあった点（今回は触っていません）：`emergency.html` は h1 と meta description がないまま sitemap に載っています。

## 尾田さんに判断してほしい点

1. **「おしっこ出そう」のページ**は、まだ公開していない下書きを元にしています。ホテル・意地悪して続ける・癖になる、の話は入れず、尿意が自然な反応であること、7人の研究、「自分で出すか勝手に出るか」の見方、トイレとタオルの準備、相手への伝え方だけ使いました。note より先にサイトに出てよいか、見てください。
2. **事例の書き方**。呼吸のページに「自己開発を頑張っていたのに初回は胸郭が動かなかった人が、練習して2回目に変わった」話を、note に書かれている範囲で載せています。サイトにも載せてよいか。
3. **「イける／いける」の表記**。`hitori-dewa-ikeru.html` は本文がひらがなの「いける」なので、title と description だけ検索されやすい「イける」にしました。本文もそろえるか、title を戻すかは好みで決めてください。
4. **「体外式」という言葉**。呼吸のページで一度だけ説明つきで使っています。サイトで使いたくなければ消せます。
5. **言い切りの強さ**。note の「俺／〜だ」を、サイトに合わせて「ミヤ／です・ます」に直しています。言い方が自分と違う所があれば直します。
6. **次に作ると効きそうなページ**（本文が必要）：「イったのかわからない」（note でいちばん検索から読まれている記事）、「おしがま」、ポルチオと中の違い、脳イキ、足ピン。note の本文を `content/note/published/` に置いてもらえれば同じ形で作れます。
7. merge したあと、Google Search Console でサイトマップを送り直すと、新しいページが早く見つけてもらえます。note の記事末尾からサイトの該当ページへリンクを足すのも効きます（例：「中イキ開発とは」の記事 → `nakaiki-kaihatsu-towa.html`）。
8. 構造化データは既存と同じ最小の形（Article、著者名「身体の返事」、日付なし）に合わせました。著者を「ミヤ」にして公開日を入れる形に全ページそろえることもできます。
