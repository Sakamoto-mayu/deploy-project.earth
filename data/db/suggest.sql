--@block
DROP TABLE IF EXISTS api.suggest;
CREATE TABLE api.suggest (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    searchtext TEXT
);
GRANT SELECT ON api.suggest TO web_anon;
GRANT ALL ON api.suggest to api_user;


--@block
INSERT INTO api.suggest (id,text,searchtext) VALUES
(1,'人参','人参,にんじん,ニンジン,carrot,ninzin'),
(2,'キャベツ','きゃべつ,キャベツ,cabbage,kyabetu,kyabetsu'),
(3,'トマト','とまと,トマト,tomato'),
(4,'カボチャ','南瓜,かぼちゃ,カボチャ,pumpkin,kabotya'),
(5,'大根','大根,だいこん,ダイコン,radish,daikon'),
(6,'ナス','茄子,なす,ナス,eggplant,nasu'),
(7,'ほうれん草','ほうれん草,ほうれんそう,ホウレンソウ,spinach,hourensou')
