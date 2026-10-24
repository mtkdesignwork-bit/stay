# 写真の候補と使用ルール

## 1. 使用するサイトとライセンス

**Unsplash**（https://unsplash.com/license ）を使う。確認日：2026-10-21

- 商用・非商用を問わず、無料でダウンロードして使える
- 許可は不要。クレジット（撮影者名の表示）は**任意だが推奨**
- 加工してよい（トリミング・色調整・圧縮など）
- **してはいけないこと**
  - 大きく手を加えないまま、写真そのものを販売する
  - Unsplashの写真を集めて、似たサービスや競合サービスを作る
- **Unsplash+（有料）の写真は対象外**。下の候補はすべて、写真ページで「無料・Unsplashライセンス」と表示されることを確認済み

### NAGIでの運用ルール
1. **人物の顔が分かる写真、ブランドや商品名が分かる写真、実在の宿と特定できる写真は使わない**（ライセンス上は使えても、モデルや施設の権利、誤解のおそれがあるため）
2. **クレジットを入れる**：フッターに「Photos: Unsplash」と入れ、ポートフォリオの説明文に撮影者の一覧を載せる
3. NAGIは架空のブランドのため、ポートフォリオでは「写真はUnsplashのフリー素材を使用」と明記する
4. ダウンロードは写真ページの「無料ダウンロード」ボタンから行う（Unsplashの推奨）
5. Webサイト用に、横幅最大2000px程度に縮小・圧縮して `assets/images/` に置く

### WebP への変換（2026-10-22）
- サイトで使う写真は、すべて WebP にした（`assets/images/` の JPG と同じ場所・同じ大きさで `.webp` を作り、HTML・JS の参照を書き換えた）
- 画質 78 で変換し、62枚の合計は 17.0MB → 8.6MB（約50%減）。美瑛のFV（`stays/biei/hero.webp`）だけは重いため画質 68（467KB）
- 使わなくなった元の JPG 61枚は、2026-10-22 にゴミ箱（`~/.Trash/NAGI-元のJPG-20261022/`）へ移した。Unsplash の写真なので、必要になれば各写真ページから取り直せる
- `top/hero.jpg`（TOPのFV）だけは、ユーザーが用意した取り直せない原本のため残している（サイトで使っているのは `top/hero.webp`）
- 下の表のファイル名は `.jpg` のまま書いているが、サイトで使っているのは同じ名前の `.webp`
- OGP（SNSで共有されたときの画像）は、WebP を表示できないSNSがあるため、作るときは JPG で別に用意する

## 2. 候補一覧

本命と予備を2枚ずつ用意。**本命9枚は 2026-10-21 にダウンロードし、`assets/images/` に配置済み**（images.unsplash.com から横幅1200〜2000pxで取得。1枚 116〜628KB）。

| 枠 | 保存するファイル名 | 本命 | 予備 |
|---|---|---|---|
| TOP メインビジュアル | `top/hero.jpg` | **2026-10-21 にユーザー提供の画像（森に囲まれた客室・室内からの眺め）へ差し替え済み。この画像は ChatGPT（画像生成AI）で作成したもの。OpenAI の利用規約では生成物の権利は利用者にあり、商用利用もできる。ポートフォリオの説明では「TOPのFVは画像生成AIで作成」と明記する**。以前の本命：[霧の森（Philipp）](https://unsplash.com/photos/upR8raSXvwg) | [霧の常緑樹林（Dejan Zakic）](https://unsplash.com/photos/rr2EF3J5F2Y) |
| TOP ご利用案内 | `top/guide.jpg` | [庭が見える木の出窓（Yikai Sun）](https://unsplash.com/photos/9s8kKkS_Qcw) | [窓辺のディフューザー（Alexandr Popadin）](https://unsplash.com/photos/cy3-3Yom89Y) |
| TOP 予約への入口 | `top/reserve.jpg` | [暗闇の焚き火（CHUTTERSNAP）](https://unsplash.com/photos/rLm4Wq96h_0) | [浜辺の焚き火（Joshua Newton）](https://unsplash.com/photos/8z9pi6GgOo4) ※タグに人物あり。使う前に確認 |
| 美瑛 ツリーハウス | `stays/biei/main.jpg` | [森の中の高床の小屋（Paul Bill）](https://unsplash.com/photos/cjVjE-WulUk) | [森のツリーハウス（Miryam León）](https://unsplash.com/photos/BwITbaWSPjk) |
| 八ヶ岳 サウナヴィラ | `stays/yatsugatake/main.jpg` | [煙突から煙が上がる森の小屋（Romanas）](https://unsplash.com/photos/PYkX4ruvXXs) | [夕暮れのサウナポッド（Auroom Wellness）](https://unsplash.com/photos/s_ZBw3FzJSw) ※サウナメーカーの製品写真。避けるのが無難 |
| 朝霧高原 グランピング | `stays/asagiri/main.jpg` | **2026-10-22 に [夕暮れの草原と富士山（Robert Bant）](https://unsplash.com/photos/BQZze2Ap_4s) へ差し替え済み**（テントの外の2人の後ろ姿が写っていたため）。以前の本命：[テントの中から見る雪山（dreokt）](https://unsplash.com/photos/JfAAiJrzW2M) | [夕暮れの草原の白いテント（Nicola Pavan）](https://unsplash.com/photos/cZPQ6RwYwho) |
| 瀬戸内 一棟貸し | `stays/setouchi/main.jpg` | [海辺の草原の白い家（Barnaby Woodrow）](https://unsplash.com/photos/1pT0Cs91a9I) | [直島の穏やかな海（Lee Thom）](https://unsplash.com/photos/V5q7BMXfAv0) |
| 阿蘇 ドームテント | `stays/aso/main.jpg` | [緑の向こうのドームテント（Abdullah Ahmad）](https://unsplash.com/photos/wEIiQiW-yJU) | [夜に灯るドームテント（Tommaso Ubezio）](https://unsplash.com/photos/KCVp2nvM5kU) |
| やんばる ヴィラ | `stays/yanbaru/main.jpg` | [森に面したプール（Nerissa J）](https://unsplash.com/photos/qawgWgMATzQ) | [植栽に囲まれたプール（Sanju Pandita）](https://unsplash.com/photos/8M5IpE2Jz7Y) |

## 3. クレジット表記（差し替え後に使う）

フッター：`Photos: Unsplash`

ポートフォリオ用の一覧（本命を使った場合）：
- Yikai Sun / CHUTTERSNAP / Paul Bill / Romanas / Robert Bant / Barnaby Woodrow / Abdullah Ahmad / Nerissa J — on Unsplash

## 4. CONCEPTページの写真

2026-10-22 にUnsplashで「無料（Unsplashライセンス）」に絞って検索し、`assets/images/concept/` に配置済み（images.unsplash.com から横幅1000〜2000pxで取得。1枚 92〜512KB）。

| 枠 | ファイル名 | 写真 |
|---|---|---|
| ファーストビュー | `concept/hero.jpg` | [山あいの静かな湖（Rajesh Kavasseri）](https://unsplash.com/photos/hrHsSoY4lWY)。青みが強いため、CSSで彩度を60%に抑えて表示 |
| 「凪」という名前 1 | `concept/nagi-mist.jpg` | [霧の湖（Timothy Black）](https://unsplash.com/photos/0wJUR024tdM) |
| 「凪」という名前 2 | `concept/nagi-tea.jpg` | [湯気の立つ湯呑み（Masaaki Komori）](https://unsplash.com/photos/p8roxdB6whM) |
| 「凪」という名前 3 | `concept/nagi-forest.jpg` | [霧の森に差し込む光（Tim Umphreys）](https://unsplash.com/photos/oQhnbwh3948) |
| 「凪」という名前 4 | `concept/nagi-ripple.jpg` | [水面の波紋（Linus Nylund）](https://unsplash.com/photos/Q5QspluNZmM) |
| 過ごし方：サウナ | `concept/scene-sauna.jpg` | [木のサウナ室と手桶（Anne Nygård）](https://unsplash.com/photos/FQDaYrXjkKo) |
| 過ごし方：星空 | `concept/scene-stars.jpg` | [星空の下のベルテント（Cindy Chen）](https://unsplash.com/photos/EP4VrAn-WaY) |
| 過ごし方：焚き火 | `concept/scene-fire.jpg` | [夕暮れの湖畔の焚き火（Vadim Sadovski）](https://unsplash.com/photos/AmtDxJpEEEg) |
| 過ごし方：海 | `concept/scene-sea.jpg` | [夕暮れの穏やかな海（Jonathan Bean）](https://unsplash.com/photos/ywnnwzcdR5o) |

- サウナは当初、湯気の立つサウナストーブの写真（HUUM）を候補にしたが、撮影者がサウナメーカーで製品写真のため、運用ルール1により除外した

ポートフォリオ用の一覧（CONCEPT分）：
- Rajesh Kavasseri / Timothy Black / Masaaki Komori / Tim Umphreys / Linus Nylund / Anne Nygård / Cindy Chen / Vadim Sadovski / Jonathan Bean — on Unsplash

## 5. STAYSページの写真

| 枠 | ファイル名 | 写真 |
|---|---|---|
| ファーストビュー | `stays/hero.jpg` | [森のシルエットと満天の星空（Kody Dahl）](https://unsplash.com/photos/PCuuOOTo14g)。2026-10-22 に配置（横幅2000px、512KB）。以前の写真：[霧に重なる山並み（Matteo Piscioneri）](https://unsplash.com/photos/7N5bUmBmWXM) |

- 6つの宿のどれかの写真を使うとその宿だけが特別に見えるため、特定の宿に寄らない写真にする
- 最初は霧の山並みにしたが、夜の静けさを伝えるため満天の星空に差し替えた。CONCEPT（霧の湖・朝）と時間帯で変化がつき、星空は6つのうち4つの宿で楽しめるので偏りも出にくい
- テントや建物が写っているもの（阿蘇・朝霧の写真に見える）、天の川が紫やピンクに強く色づいたもの、特定の場所と分かるもの（ヨセミテのハーフドームなど）は外した
- 施設カードは各宿の `main.jpg` を使う

ポートフォリオ用の一覧（STAYS分）：
- Kody Dahl — on Unsplash

## 6. STAY DETAIL：美瑛の写真

2026-10-22 に配置（`assets/images/stays/biei/`）。

| 枠 | ファイル名 | 写真 |
|---|---|---|
| FV | `hero.jpg` | カードと同じ [森の中の高床の小屋（Paul Bill）](https://unsplash.com/photos/cjVjE-WulUk) を、PCの全画面用に横幅1500pxで取り直したもの（832KB） |
| 過ごし方：午後 | `scene-afternoon.jpg` | [白樺の森の小径（T）](https://unsplash.com/photos/Rvx9LtK8OUU) |
| 過ごし方：夜 | `scene-night.jpg` | [木々のあいだの星空（Tyler Domingue）](https://unsplash.com/photos/xQZwc4FkZdQ) |
| 過ごし方：朝 | `scene-morning.jpg` | [朝の光が差す屋根裏の寝室（ann svanidze）](https://unsplash.com/photos/3lQautLFzMs) |
| ギャラリー（大） | `gallery-window.jpg` | [窓辺のマグカップ（Tiasha B）](https://unsplash.com/photos/griDRvxByAo) |
| ギャラリー（小） | `gallery-birch.jpg` | [白樺の幹（Dallas Reedy）](https://unsplash.com/photos/SzEKnr8UETQ) |
| ギャラリー（小） | `gallery-lantern.jpg` | [枝に吊るしたランタン（Dhilip Antony）](https://unsplash.com/photos/ivHhjNnrU3w) |

- 別のツリーハウスが写った写真は、FVの宿と違う建物に見えるため外した

ポートフォリオ用の一覧（美瑛分）：
- T / Tyler Domingue / ann svanidze / Tiasha B / Dallas Reedy / Dhilip Antony — on Unsplash

## 7. STAY DETAIL：残り5つの宿の写真

2026-10-22 に配置（`assets/images/stays/{スラッグ}/`）。各宿の `hero.jpg` は、カードと同じ写真をPCの全画面用に大きく取り直したもの（下の表では省略）。1枚600KBを超えたら画質を下げて取り直した。

| 宿 | 枠 | ファイル名 | 写真 |
|---|---|---|---|
| 八ヶ岳 | 過ごし方：午後 | `scene-afternoon.jpg` | [窓から森が見える薪ストーブの小屋（Clay Banks）](https://unsplash.com/photos/sDqyw1c5xaM) |
| 八ヶ岳 | 過ごし方：夕方 | `scene-evening.jpg` | [霧の森を見下ろすデッキの椅子（Jade Stephens）](https://unsplash.com/photos/yn-2hKBciQM) |
| 八ヶ岳 | 過ごし方：朝 | `scene-morning.jpg` | [朝霧のカラマツ（Alexander Kaufmann）](https://unsplash.com/photos/Ew-N53mWVAQ) |
| 八ヶ岳 | ギャラリー（大） | `gallery-stove.jpg` | [薪ストーブとやかん（Clay Banks）](https://unsplash.com/photos/iagFgaWL_qE) |
| 八ヶ岳 | ギャラリー（小） | `gallery-fire.jpg` | [ストーブの中の火（Jen Dries）](https://unsplash.com/photos/hwMmAIMOzxU) |
| 八ヶ岳 | ギャラリー（小） | `gallery-towel.jpg` | [サウナのベンチのタオル（Clay Banks）](https://unsplash.com/photos/Y8nh7e2ihmE) |
| 朝霧高原 | 過ごし方：午後 | `scene-afternoon.jpg` | [牧草地と富士山（Hyunsoo Kim）](https://unsplash.com/photos/7Dm7dKSrofE) |
| 朝霧高原 | 過ごし方：夜 | `scene-night.jpg` | [星空の下の焚き火（Kevin Erdvig）](https://unsplash.com/photos/k7fUP9RQj3Y) |
| 朝霧高原 | 過ごし方：朝 | `scene-morning.jpg` | [朝霧の草原と一本の木（Artem Balashevsky）](https://unsplash.com/photos/biWIhjjgSDM) |
| 朝霧高原 | ギャラリー（大） | `gallery-kettle.jpg` | [焚き火のやかん（Anne Nygård）](https://unsplash.com/photos/uJr64s3Msno) |
| 朝霧高原 | ギャラリー（小） | `gallery-mug.jpg` | [毛布の上のマグカップ（Vanesa Giaconi）](https://unsplash.com/photos/crpDt5YdodU) |
| 朝霧高原 | ギャラリー（小） | `gallery-blanket.jpg` | [椅子に掛けた毛布（Balikó András）](https://unsplash.com/photos/6nId0y3Wpvk) |
| 瀬戸内 | 過ごし方：午後 | `scene-afternoon.jpg` | [障子の窓から海の見える部屋（ZENG YILI）](https://unsplash.com/photos/fta5pzyM0T8) |
| 瀬戸内 | 過ごし方：夕方 | `scene-evening.jpg` | [海辺の岩の上のサウナ小屋（Atle Mo）](https://unsplash.com/photos/ibqEcam6ns4) |
| 瀬戸内 | 過ごし方：朝 | `scene-morning.jpg` | [海を見渡すテーブルのコーヒー（Quentin Rogeret）](https://unsplash.com/photos/VWAAMWxQkPY) |
| 瀬戸内 | ギャラリー（大） | `gallery-curtain.jpg` | [海の見える窓のカーテン（NUNANNA NUN）](https://unsplash.com/photos/ZjcNxpAXwc4) |
| 瀬戸内 | ギャラリー（小） | `gallery-bowls.jpg` | [白い器（Frédéric Dupont）](https://unsplash.com/photos/X2TRduCQgOQ) |
| 瀬戸内 | ギャラリー（小） | `gallery-driftwood.jpg` | [砂浜の流木（Martin Hayes）](https://unsplash.com/photos/UFDj3ZQFJ_o) |
| 阿蘇 | 過ごし方：午後 | `scene-afternoon.jpg` | [草原の丘の馬（Zijian Wang）](https://unsplash.com/photos/c_zLe-9wh3k) |
| 阿蘇 | 過ごし方：夜 | `scene-night.jpg` | [草原の上の天の川（Taylor Durrer）](https://unsplash.com/photos/t2XKo0kn8as) |
| 阿蘇 | 過ごし方：朝 | `scene-morning.jpg` | [雲海（Mitsuo Komoriya）](https://unsplash.com/photos/w8U-DUDAv40) |
| 阿蘇 | ギャラリー（大） | `gallery-susuki.jpg` | [夕日に透けるすすき（Anna）](https://unsplash.com/photos/freHVW5ugo4) |
| 阿蘇 | ギャラリー（小） | `gallery-mug.jpg` | [草むらのマグカップ（Jonas Brief）](https://unsplash.com/photos/tAz3Ve2qPio) |
| 阿蘇 | ギャラリー（小） | `gallery-firepit.jpg` | [芝生の焚き火台（R.D. Smith）](https://unsplash.com/photos/xGtkdXvt4k8) |
| やんばる | 過ごし方：午後 | `scene-afternoon.jpg` | [森を望むポーチのハンモック（Brooke Balentine）](https://unsplash.com/photos/zTVGO4IUmJg) |
| やんばる | 過ごし方：夕方 | `scene-evening.jpg` | [夕暮れの海と岬（Syuhei Inoue）](https://unsplash.com/photos/xOcCR9Q0f9s) |
| やんばる | 過ごし方：夜 | `scene-night.jpg` | [月明かりと星空（Aral Tasher）](https://unsplash.com/photos/njMi2OFoQqQ) |
| やんばる | ギャラリー（大） | `gallery-shadow.jpg` | [白い壁のヤシの葉の影（Augustine Wong）](https://unsplash.com/photos/zB1JO_sWlOE) |
| やんばる | ギャラリー（小） | `gallery-shisa.jpg` | [素焼きのシーサー（William Warby）](https://unsplash.com/photos/MbLCsIVSrwg) |
| やんばる | ギャラリー（小） | `gallery-shower.jpg` | [植物に囲まれた屋外シャワー（Alexander Davies）](https://unsplash.com/photos/EL2cArqkB_Y) |

- サウナメーカー（HUUM、Auroom Wellness）が撮影した製品写真は、運用ルール1により外した
- 朝霧高原の夜（焚き火）と阿蘇の午後（草原の馬）には、遠くに小さく人が写っている。顔は分からないため使用した
- 朝霧高原のFVは、カードと同じ写真（テントの外に2人の後ろ姿）だと全画面で人が目立つため、2026-10-22 に [夕暮れの草原と富士山（Robert Bant）](https://unsplash.com/photos/BQZze2Ap_4s) に差し替えた（`asagiri/hero.jpg`、横幅2000px、256KB）。カード（`main.jpg`）も同じ日に同じ写真へ差し替えた（横幅1200px、128KB）
- 差し替えの候補だった [富士山と灯りのともるドームテント（takahiro taguchi）](https://unsplash.com/photos/8F59AdH6WKk) は、テントの中に人影が写り、車やほかのキャンプサイトから実在のキャンプ場と分かりそうなため見送った

ポートフォリオ用の一覧（残り5つの宿の分）：
- Clay Banks / Jade Stephens / Alexander Kaufmann / Jen Dries / Robert Bant / Hyunsoo Kim / Kevin Erdvig / Artem Balashevsky / Anne Nygård / Vanesa Giaconi / Balikó András / ZENG YILI / Atle Mo / Quentin Rogeret / NUNANNA NUN / Frédéric Dupont / Martin Hayes / Zijian Wang / Taylor Durrer / Mitsuo Komoriya / Anna / Jonas Brief / R.D. Smith / Brooke Balentine / Syuhei Inoue / Aral Tasher / Augustine Wong / William Warby / Alexander Davies — on Unsplash

## 8. NEWS・GUIDEのFV

2026-10-22 に、NEWS（一覧）とGUIDEにも高さ約50%の写真のFVを付けた。

| 枠 | ファイル名 | 写真 |
|---|---|---|
| NEWS FV | `news/hero.jpg` | [色づいた木々のあいだの森の小径（Daniel Seßler）](https://unsplash.com/photos/_3DI_vx2ygg)（横幅1600px、512KB） |
| GUIDE FV | `top/guide.jpg` | TOPの「はじめての方へ」と同じ写真を使い回し（Yikai Sun） |

- NEWSは季節の移ろいが伝わる写真にした。霧の森の小径の写真も候補にしたが、色が明るく加工が強いため、落ち着いたトーンのこちらを選んだ

ポートフォリオ用の一覧（NEWS分）：
- Daniel Seßler — on Unsplash


## 9. クレジットのページ（2026-10-24）

- `credits/index.html`（写真について）に、使っている写真 55枚・撮影者 52名を、ページ・宿ごとに一覧にした。撮影者名は Unsplash の元の写真ページへのリンク
- 全ページのフッターの「Photos: Unsplash」は「Photo Credits」にして、このページへリンクした
- 写真を差し替えたときは、このページの一覧も直す
