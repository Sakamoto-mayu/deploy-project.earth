-- supabase用sql

--@block cartitems
CREATE TABLE cartitems (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    item_id integer NOT NULL REFERENCES items(id),
    quantity integer NOT NULL
);
INSERT INTO cartitems (id,user_id,item_id,quantity) VALUES
(1,1,2,1)

--@block category
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO category (id,name,image) VALUES
(	1	,	'キャベツ'	,	'/categoryImages/キャベツ.jpg'),
(	2	,	'人参'	,	'/categoryImages/人参.jpg'),
(	3	,	'トマト'	,	'/categoryImages/トマト.jpg'),
(	4	,	'かぼちゃ'	,	'/categoryImages/かぼちゃ.jpg'),
(	5	,	'なす'	,	'/categoryImages/なす.jpg'),
(	6	,	'チンゲン菜'	,	'/categoryImages/チンゲン菜.jpg'),
(	7	,	'大根'	,	'/categoryImages/大根.jpg'),
(	8	,	'じゃがいも'	,	'/categoryImages/じゃがいも.jpg')

--@block farmer_data
CREATE TABLE farmer_data (
    id serial PRIMARY KEY,
    farm_name text NOT NULL,
    representative_name text NOT NULL,
    year integer NOT NULL,
    carryr text NOT NULL,
    prefecture text NOT NULL,
    icon_imageurl text NOT NULL,
    cover_imageurl text NOT NULL,
    voiceurl text NOT NULL,
    comment text NOT NULL
);

INSERT INTO farmer_data (id	,	farm_name	,	representative_name	,	year 	,	carryr	,	prefecture	,	icon_imageurl	,	cover_imageurl	,	voiceurl, comment) VALUES
(	1	,	'七瀬ファーム'	,	'七瀬 獅童'	,	24	,	

'夫婦で農業を始め、はや24年同い年の二人は、今年で64歳
会社員だった旦那さんは、管理職まで上り詰めたものの、日々の激務で疲弊
40歳の頃、自給自足の生活に憧れを持ち一念発起し、夫婦で北海道へ移住
現在、有機野菜の世界では知らない人がいないとまで言われる存在に
夫婦それぞれの名前がついた野菜たちは、道の駅に並べば1時間で売り切れるほどの人気ぶり'	,

	'静岡県'	,	'/farmerImages/farmer1.jpg'	,	'/farmerImages/farmerCover1.jpg'	,	'/voice/voice-example.mp3'	,	'脱サラ農業のパイオニア'	),
(	2	,	'溝口ファクトリー'	,	'溝口 由宇'	,	4	,	

'23歳
東京でアパレル店員
高校時代の友人と群馬へ旅行に行った際に、キャベツの美味しさに感動
農家の方と意気投合し、21歳の頃勢いで農家で働くことにn令和の「ギャル農家」として一躍話題に
自ら考案し命名した「GODキャベツ」は味も見た目も神クラスとのこと'	,

	'兵庫県'	,	'/farmerImages/farmer2.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'ギャルが農業の未来を変える'	),
(	3	,	'黒谷農園'	,	'黒谷 光博'	,	12	,	'キャリア'	,	'大阪府'	,	'/farmerImages/farmer3.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'黒谷家、期待の新星4代目'	),
(	4	,	'矢島農園'	,	'矢島 仁晶'	,	20	,	'キャリア'	,	'東京都'	,	'/farmerImages/farmer4.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'都会のど真ん中農業'	),
(	5	,	'MIZUTA FARM'	,	'水田 耕司'	,	13	,	'キャリア'	,	'北海道'	,	'/farmerImages/farmer5.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'富良野の地でたくましく育った野菜'	),
(	6	,	'渡辺ファーム'	,	'渡辺 一輝'	,	5	,	'キャリア'	,	'東京都'	,	'/farmerImages/farmer6.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'水耕栽培で育てています'	),
(	7	,	'太陽農場'	,	'熊田 景子'	,	7	,	'キャリア'	,	'佐賀県'	,	'/farmerImages/farmer7.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'九州の綺麗な水で育った野菜'	),
(	8	,	'西井サンファーム'	,	'西井 サンタマリア'	,	8	,	'キャリア'	,	'佐賀県'	,	'/farmerImages/farmer8.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'無農薬栽培にこだわった生産法'	),
(	9	,	'多岐川農園'	,	'多岐川 知世'	,	2	,	'キャリア'	,	'兵庫県'	,	'/farmerImages/farmer9.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'イケメン農家が作るこだわり野菜'	),
(	10	,	'勝田ヴィレッジ'	,	'勝田 芳正'	,	4	,	'キャリア'	,	'大阪府'	,	'/farmerImages/farmer2.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'南大阪でひっそり育てる野菜は絶品'	),
(	11	,	'FARM NAKA'	,	'中 長利'	,	5	,	'キャリア'	,	'北海道'	,	'/farmerImages/farmer1.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'とにかく甘いと評判の中さんの野菜'	),
(	12	,	'ドラゴン農園'	,	'大島 竜次'	,	7	,	'キャリア'	,	'大阪府'	,	'/farmerImages/farmer2.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'ドラゴン級の美味しさ！！'	),
(	13	,	'高野農場'	,	'高野 璃奈子'	,	8	,	'キャリア'	,	'岩手県'	,	'/farmerImages/farmer3.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'盛岡の土地から新鮮をお届け'	),
(	14	,	'広瀬ファクトリー'	,	'広瀬 豊'	,	2	,	'キャリア'	,	'京都府'	,	'/farmerImages/farmer4.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'京都市内のはんなりお野菜'	),
(	15	,	'山西ファーム'	,	'山西 朝陽'	,	3	,	'キャリア'	,	'富山県'	,	'/farmerImages/farmer5.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'富山の水で育てた野菜は絶品！'	),
(	16	,	'富田農園'	,	'富田 有海'	,	2	,	'キャリア'	,	'兵庫県'	,	'/farmerImages/farmer6.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'18歳の5代目が作る最高の野菜'	),
(	17	,	'永田さん家のお野菜'	,	'永田 竜也'	,	35	,	'キャリア'	,	'千葉県'	,	'/farmerImages/farmer7.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'千葉の田舎でひっそり育てています'	),
(	18	,	'こばやしふぁーむ'	,	'小林 賢二'	,	21	,	'キャリア'	,	'新潟県'	,	'/farmerImages/farmer8.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'雪降る土地のおいしいお野菜'	),
(	19	,	'竹下農園'	,	'竹下 理紗'	,	2	,	'キャリア'	,	'兵庫県'	,	'/farmerImages/farmer2.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'胆っ玉母ちゃんの作った自慢の野菜'	),
(	20	,	'NAKANO FARM'	,	'中野 那奈'	,	5	,	'キャリア'	,	'福島県'	,	'/farmerImages/farmer2.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'東北から送る新鮮野菜'	),
(	21	,	'かんばやし農園'	,	'上林 太郎'	,	8	,	'キャリア'	,	'滋賀県'	,	'/farmerImages/farmer1.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'琵琶湖の水で育った野菜は新鮮そのもの'	),
(	22	,	'もりおかファーム'	,	'盛岡 淳'	,	6	,	'キャリア'	,	'山形県'	,	'/farmerImages/farmer2.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'無農薬栽培のこだわり製法'	),
(	23	,	'斎藤ファクトリー'	,	'斎藤 駿'	,	9	,	'キャリア'	,	'京都府'	,	'/farmerImages/farmer3.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'京都の田舎から安心をお届け'	),
(	24	,	'能村農場'	,	'能村 隆史'	,	34	,	'キャリア'	,	'秋田県'	,	'/farmerImages/farmer4.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'田舎に戻った長男が作ってます！'	),
(	25	,	'あだち農場'	,	'足立 雄二'	,	12	,	'キャリア'	,	'栃木県'	,	'/farmerImages/farmer5.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'栃木から新鮮野菜をお届け！！'	),
(	26	,	'村岡商店'	,	'村岡 康'	,	14	,	'キャリア'	,	'埼玉県'	,	'/farmerImages/farmer6.jpg'	,	'/farmerImages/farmerCover2.jpg'	,	'/voice/voice-example.mp3'	,	'埼玉の名産品、作ってます'	)

--@block items
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    farmer_id INTEGER NOT NULL REFERENCES farmer_data(id),
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    comment TEXT,
    expaire TEXT,
    items_search TEXT
);

INSERT INTO items (id,category_id,farmer_id,name, price,image,comment,expaire,items_search) VALUES 
(	1	,	1	,	1	,	'男前小玉キャベツ'	,	150	,	'/cabbage/cabbage-mini.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	2	,	1	,	1	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	3	,	1	,	1	,	'男前紫キャベツ'	,	100	,	'/cabbage/cabbage-purple.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	4	,	1	,	1	,	'男前キャベツのピクルス（100g）'	,	50	,	'/cabbage/cabbage-pickles.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	5	,	2	,	1	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	6	,	2	,	1	,	'みよばぁの不揃い人参'	,	120	,	'/carrot/carrot-irregular.jpg'	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	7	,	2	,	1	,	'みよばぁの金時人参'	,	300	,	'/carrot/carrot-kintoki.jpg'	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	8	,	2	,	1	,	'みよばぁのにんじんしりしり（100g）'	,	200	,	'/carrot/shirishiri.jpg'	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'  )	,
(	9	,	3	,	1	,	'男前トマト'	,	240	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	10	,	3	,	1	,	'男前フルーツトマト'	,	240	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	11	,	3	,	1	,	'男前トマト（不揃い）'	,	180	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	12	,	3	,	1	,	'男前トマトのゼリー（1個）'	,	400	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	13	,	4	,	1	,	'たつじぃのかぼちゃ'	,	500	,	''	,	''	,	'5日以内'	,	'南瓜, かぼちゃ, カボチャ, pumpkin, kabotya, kabocha'	)	,
(	14	,	4	,	1	,	'たつじぃの種無しかぼちゃ'	,	580	,	''	,	''	,	'5日以内'	,	'南瓜, かぼちゃ, カボチャ, pumpkin, kabotya, kabocha'	)	,
(	15	,	4	,	1	,	'たつじぃの不揃いかぼちゃ'	,	420	,	''	,	''	,	'5日以内'	,	'南瓜, かぼちゃ, カボチャ, pumpkin, kabotya, kabocha'	)	,
(	16	,	4	,	1	,	'たつじぃのかぼちゃの煮物（100g）'	,	550	,	''	,	''	,	'5日以内'	,	'南瓜, かぼちゃ, カボチャ, pumpkin, kabotya, kabocha'	)	,
(	17	,	7	,	1	,	'男前大根'	,	150	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	18	,	7	,	1	,	'男前青首大根'	,	150	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	19	,	7	,	1	,	'男前大根（不揃い）'	,	70	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	20	,	7	,	1	,	'男前大根の旨煮（100g）'	,	250	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	21	,	5	,	2	,	'GODナス'	,	80	,	''	,	''	,	'5日以内'	,	'茄子, なす, ナス, eggplant, nasu'	)	,
(	22	,	5	,	2	,	'GOD米ナス'	,	150	,	''	,	''	,	'5日以内'	,	'茄子, なす, ナス, eggplant, nasu'	)	,
(	23	,	5	,	2	,	'GODナス（不揃い）'	,	40	,	''	,	''	,	'5日以内'	,	'茄子, なす, ナス, eggplant, nasu'	)	,
(	24	,	5	,	2	,	'GODナスの漬物（100g）'	,	150	,	''	,	''	,	'5日以内'	,	'茄子, なす, ナス, eggplant, nasu'	)	,
(	25	,	6	,	2	,	'GODほうれん草'	,	150	,	''	,	''	,	'5日以内'	,	'ほうれん草, ほうれんそう, ホウレンソウ, spinach, hourensou, hourennsou'	)	,
(	26	,	6	,	2	,	'GODサラダほうれん草'	,	180	,	''	,	''	,	'5日以内'	,	'ほうれん草, ほうれんそう, ホウレンソウ, spinach, hourensou, hourennsou'	)	,
(	27	,	6	,	2	,	'GODほうれん草（不揃い）'	,	100	,	''	,	''	,	'5日以内'	,	'ほうれん草, ほうれんそう, ホウレンソウ, spinach, hourensou, hourennsou'	)	,
(	28	,	6	,	2	,	'GODほうれん草の煮浸し（100g）'	,	300	,	''	,	''	,	'5日以内'	,	'ほうれん草, ほうれんそう, ホウレンソウ, spinach, hourensou, hourennsou'	)	,
(	29	,	7	,	2	,	'GOD大根'	,	150	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	30	,	7	,	2	,	'GOD青首大根'	,	150	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	31	,	7	,	2	,	'GOD大根（不揃い）'	,	80	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	32	,	7	,	2	,	'GOD大根のはりはり漬け（100g）'	,	300	,	''	,	''	,	'5日以内'	,	'大根, だいこん, ダイコン, radish, daikon, daikonn'	)	,
(	33	,	3	,	2	,	'GODトマト'	,	80	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	34	,	3	,	2	,	'GODフルーツトマト'	,	130	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	35	,	3	,	2	,	'GODトマト（不揃い）'	,	240	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	36	,	3	,	2	,	'GODトマトの漬物（100g）'	,	400	,	''	,	''	,	'5日以内'	,	'とまと, トマト, tomato'	)	,
(	37	,	2	,	2	,	'GOD人参'	,	60	,	''	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	38	,	2	,	2	,	'GOD金時人参'	,	150	,	''	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	39	,	2	,	2	,	'GOD人参（不揃い）'	,	70	,	''	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	40	,	2	,	2	,	'GOD人参ピクルス（100g）'	,	300	,	''	,	''	,	'5日以内'	,	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	41	,	1	,	3	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	42	,	1	,	4	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	43	,	1	,	5	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	44	,	1	,	6	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	45	,	1	,	7	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	46	,	1	,	8	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	47	,	1	,	9	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	48	,	1	,	10	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	49	,	1	,	11	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	50	,	1	,	12	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	51	,	1	,	13	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	52	,	1	,	14	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	53	,	1	,	15	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	54	,	1	,	16	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	55	,	1	,	17	,	'男前キャベツ'	,	100	,	'/cabbage/cabbage-one.jpg'	,	''	,	'5日以内'	,	'きゃべつ, キャベツ, cabbage, kyabetu, kyabetsu'	)	,
(	56	,	2	,	18	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',  	'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	57	,	2	,	19	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	58	,	2	,	20	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	59	,	2	,	21	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	60	,	2	,	22	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	61	,	2	,	23	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	62	,	2	,	24	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	63	,	2	,	25	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)	,
(	64	,	2	,	26	,	'みよばぁの人参'	,	180	,	'/carrot/carrot1.jpg'	,	''	,	'5日以内',		'人参, にんじん, ニンジン, carrot, ninzin, ninjin, ninnzinn, ninnjinn'	)

--@block sales
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    item_id INTEGER NOT NULL REFERENCES items(id),
    farmer_id INTEGER NOT NULL REFERENCES farmer_data(id),
    quantity INTEGER NOT NULL
    -- name,price
);

INSERT INTO sales (id,user_id,item_id,farmer_id,quantity) VALUES
(1,1,2,1,1)

--@block suggest
CREATE TABLE suggest (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    searchtext TEXT
);


--@block
INSERT INTO suggest (id,text,searchtext) VALUES
(1,'人参','人参,にんじん,ニンジン,carrot,ninzin'),
(2,'キャベツ','きゃべつ,キャベツ,cabbage,kyabetu,kyabetsu'),
(3,'トマト','とまと,トマト,tomato'),
(4,'カボチャ','南瓜,かぼちゃ,カボチャ,pumpkin,kabotya'),
(5,'大根','大根,だいこん,ダイコン,radish,daikon'),
(6,'ナス','茄子,なす,ナス,eggplant,nasu'),
(7,'ほうれん草','ほうれん草,ほうれんそう,ホウレンソウ,spinach,hourensou')

--@block users
CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    prefecture text NOT NULL,
    city text NOT NULL,
    address text NOT NULL,
    zipcode text NOT NULL
);

INSERT INTO users (id,name,email,password,prefecture,city,address,zipcode) VALUES 
(1,'田中角栄','kakuei@example.com','kakuei','新潟県','柏崎市','日石町2番1号','945-8511')
