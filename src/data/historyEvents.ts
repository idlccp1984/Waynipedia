import { HistoryEvent } from '../types';
import { articles } from './articles';

const rawEvents = [
  // 增修重大事件檔案
  { date: "2024-03-15", title: "台北市議員陳重文涉台智光弊案遭羈押禁見，引爆柯蔣前後任市府傳輸費子約攻防", articleId: "taizhiguang" },
  { date: "2024-04-08", title: "蔣萬安市長召開記者會宣布終止警察局監視器專案子約，傳輸費調降為公定價", articleId: "taizhiguang" },
  { date: "2024-05-02", title: "北士科T17、T18地上權免企劃書招標爭議，蔣萬安指示政風處立案全面調查並移送檢調", articleId: "beishike" },
  { date: "2024-05-08", title: "第一果菜及魚類批發市場改建案減項發包追加近50億元擴充預算，市議會質疑涉圖利", articleId: "fishmarket" },
  { date: "2024-09-05", title: "京華城容積率840%弊案遭台北地院裁准扣押土地，蔣市府建管處依法祭出「不予施工勘驗」", articleId: "corepacific" },
  { date: "2024-10-18", title: "南港轉運站東側BOT案新光人壽工程進度落後逾兩成，公運處下達限期改善通牒並開罰", articleId: "nangangbot" },
  { date: "2024-03-06", title: "台北市政府社會局公務員涉在市政大樓內公然販賣大麻毒品遭檢調查獲", articleId: "methbureau" },
  { date: "2024-03-22", title: "剴剴虐童案台北市議會召開臨時會，國民黨議員集體缺席流會護航蔣萬安免報告", articleId: "kaikai" },
  { date: "2024-04-10", title: "世壯運耗資1.45億元修繕場館爆發延宕，市府宣布比賽結束後半年才開工引發譁然", articleId: "wmgbuild" },
  { date: "2024-07-11", title: "午後暴雨內湖淹大水側溝淤積嚴重，市府社會局發放救助金後又登門討回惹民怨", articleId: "neihuflood" },
  { date: "2024-08-15", title: "國防部委託平安新村教保中心爆發狼師性侵幼童案，市府通報機制失能遭批未改進", articleId: "pingan" },
  { date: "2024-08-19", title: "市區雨水箱涵長出30公分野生大山蘇，水利處硬拗「上游沖下來」被學者無情打臉", articleId: "birdnest" },
  { date: "2024-08-28", title: "免費營養午餐政策支票招標價格過苛，多校標案連續流標險些開學無餐可吃", articleId: "lunchbid" },
  { date: "2024-09-05", title: "公共運輸處造價413萬智慧候車亭尚未完工即嚴重氧化滴落紅褐色鏽水，遭質疑豆腐渣", articleId: "rustbus" },
  { date: "2024-10-02", title: "蔣萬安提前宣布山陀兒颱風停班課，白天艷陽高照無風無雨引爆「颱風整備假」論戰", articleId: "typhoonvac" },
  { date: "2024-10-18", title: "校園營養午餐多所學校爆發集體急性腸胃炎腹瀉，上百名師生送醫", articleId: "lunchsick" },
  { date: "2024-11-04", title: "夏莉絲幼兒園掛蔣萬安親筆信招生爆發大規模兒虐，集團事後換殼繼續招生營利", articleId: "charisse" },
  { date: "2024-11-20", title: "蔣萬安擔任北市食品安全委員會召集人，被抓包任內15次食安會報竟缺席高達11次", articleId: "foodabsent" },
  { date: "2025-01-16", title: "萬芳高中教師涉性騷調查期間竟獲回聘主管，監察院正式糾正台北市教育局", articleId: "wanfang" },
  { date: "2025-02-14", title: "密室逃脫公安致死悲劇，市府初稱無法可罰挨轟後才重罰104萬元", articleId: "escapekill" },
  { date: "2025-03-12", title: "市民檢舉黑心油品，衛生局以「電腦剛好當機」為由拒供市議會稽查紀錄涉嫌蓋牌", articleId: "oilcover" },
  { date: "2025-05-08", title: "10歲女童遭猥褻求助安置，北市社會局拖延240天無作為且局長質詢台洩露個資", articleId: "girl10" },
  { date: "2025-05-15", title: "世壯運宣傳看板台北拼成TAIIPEI、轉播將恰恰彭政閔打成林郁婷，文宣出盡洋相", articleId: "wmgpromo" },
  { date: "2025-05-20", title: "世壯運賽務荒腔走板：裁判試騎骨折、送淘寶貼牌手錶、晚宴席地而坐、接駁車不載單車", articleId: "wmgevent" },
  { date: "2025-06-28", title: "台北捷運隨機暴力攻擊釀4死11傷慘劇，嫌犯多次進出徘徊通報聯防體系全面失靈", articleId: "mrtattack" },
  { date: "2025-09-18", title: "大安信義連鎖醫美診所爆發更衣室偷拍風暴，蔣萬安受訪推諉中央法規卸責地方稽查", articleId: "cliniccam" },
  { date: "2024-03-10", title: "市府執意拆除公館圓環並填平公車地下道，尖峰車陣大回堵塞爆新北市", articleId: "gongguan" },
  { date: "2024-04-18", title: "市府宣示公文全面無紙化，蔣萬安進議會卻刻意抱著30公分厚傳統紙本公文供媒體擺拍", articleId: "paperdoc" },
  { date: "2024-05-18", title: "《紐約時報》全球72大城市氣候災害應對與韌性評比，台北市奪下全球倒數第10名", articleId: "resilience" },
  { date: "2024-06-12", title: "蔣萬安多場國內外演講反覆以「火鍋 Hotpot」比喻台北，被網友抓包一稿五用", articleId: "hotpot" },
  { date: "2024-07-25", title: "北市府官方粉專湧入數千名印尼幽靈假帳號讚聲，長子特權爭議再爆海外水軍洗版", articleId: "indonesia" },
  { date: "2024-08-25", title: "針對蔣萬安曾酸「普發1萬不夠應發2萬」，北市議會綠營正式提案加碼普發每人2萬元反將一軍", articleId: "bonus20k" },
  { date: "2024-09-29", title: "螢橋國中學區清晨黑幫當街開槍槍手在逃，蔣萬安受訪誇口大談「台北市治安非常安全」", articleId: "firearms" },
  { date: "2024-10-02", title: "台北馬拉松官方路線地圖重大地理錯置，國父紀念館被畫在市民大道北側、市民大道接松山路", articleId: "marathon" },
  { date: "2024-10-04", title: "萬華分局搜索同志店家遭控違法盤查與歧視言詞羞辱身障者，多個民間人權團體發表聯合聲明抗議", articleId: "wanhua" },

  // 1月
  { date: '2016-01-16', title: '第九屆立法委員選舉，蔣萬安代表國民黨首次當選台北市第三選區立法委員', articleId: 'chiang' },
  { date: '2020-01-11', title: '第十屆立法委員選舉，蔣萬安以11萬餘票連任成功，確立藍營青年指標地位', articleId: 'chiang' },
  { date: '2024-01-02', title: '台北大巨蛋場地租用費率與運動賽事收費標準正式對外公布', articleId: 'dome' },
  { date: '2025-01-15', title: '台北大巨蛋啟用滿週年，市府與遠雄完成首波場館營運及賽事收益分潤結算', articleId: 'dome' },
  { date: '2024-01-12', title: '台北市全面宣示「無菸城市」願景，全市規劃劃設指定吸菸區共267處', articleId: 'smoke' },

  // 2月
  { date: '2024-02-17', title: '2025雙北世界壯年運動會開放報名，蔣萬安與侯友宜同台宣布迎接逾3萬名全球跑者', articleId: 'wmg' },
  { date: '2024-02-28', title: '台北市正式恢復「YouBike前30分鐘免費」綠運輸減碳政策全面上路', articleId: 'youbike' },

  // 3月
  { date: '2024-03-20', title: '台北市政府宣布加速推動公辦都更專案，降低受理門檻協助老舊耐震弱化社區', articleId: 'dazhi' },
  { date: '2024-03-24', title: '信義遠百寶林茶室通報首例邦克列酸食物中毒，北市府展開緊急採檢溯源', articleId: 'baolin' },
  { date: '2025-03-11', title: '中央停辦後北市自籌1.84億元，蔣萬安拍板「生生喝鮮乳」4月上路', articleId: 'milk' },

  // 4月
  { date: '2023-04-11', title: '蔣萬安親赴台北大巨蛋工地進行消檢現勘，嚴格要求遠雄改善逃生避難防護動線', articleId: 'dome' },
  { date: '2024-04-02', title: '寶林茶室廚師手部生物跡證檢驗出邦克列酸陽性，市府公布時序自清', articleId: 'baolin' },

  // 5月
  { date: '2019-05-17', title: '立法院審查同婚專法第四條登記條款，蔣萬安投下贊成票展現青壯價值', articleId: 'chiang' },
  { date: '2022-05-25', title: '國民黨中常會正式通過徵召提名蔣萬安參選台北市長，宣示擘劃台北願景', articleId: 'chiang' },
  { date: '2025-05-10', title: '蔣萬安率市府產發團隊赴美國矽谷參訪AI科技新創加速器，推動雙向青年創業合作', articleId: 'chiang' },
  { date: '2024-05-05', title: '蔣萬安召開鼠害防治記者會，宣布全市設置「鼠類偵防師」展開大清消', articleId: 'rat' },
  { date: '2024-05-16', title: '網友架設「蔣萬安回應產生器」諷刺網站，五大模式在社群爆紅', articleId: 'gen' },

  // 6月
  { date: '2023-06-15', title: '北藝2.36億調解款遭台北市議會委員會全數刪除，市府啟動法律複查', articleId: 'tpa' },
  { date: '2024-06-02', title: '蔣萬安議會備詢風格被批評為「蔣稿機」，「殷瑋答」新詞彙成焦點', articleId: 'yin' },
  { date: '2024-06-05', title: '大巨蛋中職賽事期間再度傳出外野座位漏水，議員促請市府要求遠雄限期改善', articleId: 'dome' },
  { date: '2024-06-09', title: '市議會總質詢，研考會主委殷瑋主動上台拿麥克風代為答詢引發爭端', articleId: 'yin' },
  { date: '2024-06-09', title: '信義區8座行人遮陽傘動支平均地權基金增至4966萬元，遭疑天價', articleId: 'umb' },

  // 7月
  { date: '2023-07-20', title: '北流爆出1.9億工程爭議款每月衍生80萬利息，蔣萬安拍板動用二備金墊付止血', articleId: 'tmc' },
  { date: '2024-07-19', title: '信義區幼兒園重大狼師案引爆社會痛心，蔣萬安市長公開深深鞠躬致歉並啟動全流程檢視', articleId: 'kindergarten' },
  { date: '2024-07-23', title: '凱米颱風來襲，蔣萬安在Threads貼出「明天放」成為年度流行語', articleId: 'tmr' },
  { date: '2024-07-09', title: '巴威颱風逼近，網友洗版朝聖「明天放」，市府當晚宣布停班停課', articleId: 'tmr' },
  { date: '2024-07-12', title: '台北市路樹一年移除3,164棵引發護樹團體爭論，市府表示為公安考量', articleId: 'trees' },
  { date: '2024-07-16', title: '蔣萬安在市議會總質詢怒斥議員簡舒培為「索資佛地魔」引爆口角中斷', articleId: 'data' },
  { date: '2024-07-27', title: '蔣萬安受訪針對毒油事件表示：對卓榮泰內閣倒閣案「樂觀其成」', articleId: 'cabinet' },

  // 8月
  { date: '2023-08-09', title: '盛夏市民抱怨捷運小巨蛋悶熱，蔣萬安宣布全系統冷氣尖峰調降至23度', articleId: 'ac' },
  { date: '2023-08-29', title: '蔣萬安親率團抵達上海出席雙城論壇，提出「雙城好、兩岸好」論述', articleId: 'shanghai' },
  { date: '2023-08-30', title: '蔣萬安於雙城論壇主論壇致詞，簽署減碳綠能、醫療與動保三項MOU', articleId: 'forum' },
  { date: '2025-08-27', title: '李四川開箱智慧機器狗巡檢，議員爆料本體為中國宇樹科技製造', articleId: 'dog' },
  { date: '2024-08-04', title: '黃清龍新書與郭貽熹發聲願驗DNA，蔣家身世血緣爭議再度被政壇討論', articleId: 'blood' },
  { date: '2024-08-26', title: '公館商圈7座柵欄式吸菸區被譏諷像「狗籠」，市府緊急下令拆除並修訂標準', articleId: 'smoke' },
  { date: '2024-08-28', title: '議會質詢10歲女童保護案，蔣萬安稱已跨局處訪視714次並承諾改善待遇', articleId: 'child' },

  // 9月
  { date: '2023-09-07', title: '中山區大直街工地連續壁破裂民宅整棟下陷，市府連夜緊急疏散400餘人', articleId: 'dazhi' },
  { date: '2023-09-20', title: '進口蛋產地標示不實引發食安恐慌，台北市率先宣布學校營養午餐全面禁用液蛋', articleId: 'egg' },
  { date: '2024-09-02', title: '首屆「潮台北 TRENDY TAIPEI」登場，在野黨質疑千萬公帑與售票效益', articleId: 'trendy' },
  { date: '2024-09-09', title: '蔣萬安在哈佛大學甘迺迪學院發表演講〈全球臺北〉，以「火鍋」比喻台北', articleId: 'harvard' },
  { date: '2024-09-02', title: '長子錄取公費交換生引發利益衝突質疑，蔣萬安宣布放棄全額補助自費', articleId: 'exchange' },
  { date: '2024-09-04', title: '金華國中學生食用營養午餐「鮮味小卷」後多人不適，引發留樣過期爭議', articleId: 'food' },
  { date: '2024-09-14', title: '「你知道記者剛剛問蔣萬安什麼嗎？」14題反向測驗引發全網挑戰熱潮', articleId: 'quiz' },
  { date: '2024-09-14', title: '「問A答B」拉霸機在社群瘋傳，調侃政治人物面對質疑之經典語錄', articleId: 'ab' },
  { date: '2024-09-22', title: '多起幼兒園受害家長前往台北市政府舉白布條陳情，呼籲調查報告公開化', articleId: 'child' },
  { date: '2024-09-24', title: '工務局大地工程處「臺北大地誌」粉專遭盜用，連播28則中國AI短劇', articleId: 'ai' },
  { date: '2024-09-26', title: '蔣萬安出席中山區中庄仔福德宮晚宴，接過董事長林春裕贈送之祈福甘蔗', articleId: 'cane' },
  { date: '2024-09-29', title: '祈福甘蔗被遺留廟旁引發風波，蔣萬安承認疏忽並致電廟方董事長道歉', articleId: 'cane' },

  // 10月
  { date: '2022-10-08', title: '蔣萬安出席氣候論壇倡議「深蹲20次換免費搭公車」，引發全台模仿迷因與可行性論戰', articleId: 'squat' },
  { date: '2024-10-08', title: '立法院英文網頁學位JD誤植SJD引熱議，市府發言體系澄清引發公器私用質疑', articleId: 'resume' },
  { date: '2024-10-10', title: '雙十國慶升旗典禮，蔣萬安市長致詞強調堅守中華民國憲法與首都市民福祉', articleId: 'chiang' },
  { date: '2024-10-15', title: '大地工程處官方粉專遭駭發布中國AI影片，市府資安防護與處置速度挨批螺絲鬆散', articleId: 'geohack' },
  { date: '2024-10-02', title: '大地工程處歷經8天向Meta與數發部申訴後，成功取回粉專管理權', articleId: 'ai' },
  { date: '2024-10-03', title: '蔣萬安臉書發文「不要拿美沙冬計畫遮掩」，質疑沈伯洋減害政策舊文', articleId: 'meth' },
  { date: '2024-10-03', title: '美沙冬貼文24小時內留言暴增逾37.7萬則，引發網軍機器人灌水指控', articleId: 'fb' },
  { date: '2024-10-08', title: '蔣萬安正式宣布規劃2033年遷移松山機場，原址釋出300公頃發展AI聚落', articleId: 'airport' },
  { date: '2024-10-08', title: '蔣萬安接受網路專訪談連任期許，舉手振臂高喊「開創未來」成為洗腦迷因', articleId: 'future' },
  { date: '2024-10-09', title: '蔣萬安提2033遷建松機打造AI園區，新北市長侯友宜強調牽涉國安與離島救援「非單一地方能決定」', articleId: 'airport' },
  { date: '2024-10-09', title: '競選主題曲《台北安可》發表，MV擅用世界棒球經典賽張育成畫面引版權爭端', articleId: 'encore' },
  { date: '2024-10-10', title: '沈伯洋批評蔣萬安團隊遭遇市政質疑便祭出「死貓戰術」轉移焦點', articleId: 'cat' },
  { date: '2024-10-10', title: '沈伯洋在國慶升旗典禮退場當面向蔣萬安遞交首都市長電視辯論意向書', articleId: 'debate' },
  { date: '2024-10-10', title: '像素風RPG網頁遊戲《蔣出來》上線，打老鼠砍樹彩蛋引發近3萬人遊玩', articleId: 'out' },
  { date: '2024-10-11', title: '《台北安可》更換爭議素材後新版MV重新上架，競辦重申歌曲原創性', articleId: 'encore' },
  { date: '2024-10-11', title: '蔣萬安受訪回應電視辯論：強調重點在落實舉辦而非當成選舉話題不斷喊價', articleId: 'debate' },
  { date: '2024-10-14', title: '台北市長蔣萬安向外賓介紹台北垃圾車播《給愛麗絲》脫口稱「trash time」，引發外賓困惑神情與全網英文討論', articleId: 'trashtime' },
  { date: '2024-10-14', title: '台北市議會總質詢期間天花板無預警墜落40公分大灰鼠砸落地面，引爆議會清潔防鼠與虛設鼠類偵防師爭議', articleId: 'rat' },
  { date: '2024-10-14', title: '工務局水利處就主要防汛排水涵管長出直徑30公分野生大山蘇備詢，遭批推諉卸責', articleId: 'birdnest' },
  { date: '2024-10-14', title: '台北市公運處造價413萬元智慧公車候車亭未驗收即嚴重氧化滴落鏽水毀損人行道地磚', articleId: 'rustbus' },
  { date: '2024-10-16', title: '蔣萬安於市議會備詢台面對簡舒培索資激烈交鋒怒斥對方為「索資佛地魔」', articleId: 'data' },
  { date: '2024-10-17', title: '信義計畫區8座巨型行人遮陽傘動支基金達4966萬元，折算單座造價高達約700萬元遭議員痛批天價', articleId: 'umb' },
  { date: '2024-10-22', title: '公館商圈7座金屬柵欄式吸菸區遭市民與網民譏諷像「狗籠」，啟用未滿一個月即下令拆除', articleId: 'smoke' },
  { date: '2024-10-25', title: '市府展示智慧城市巡檢機器狗宣稱來自波士頓動力，遭議員踢爆實為中國宇樹科技製造', articleId: 'dog' },

  // 11月
  { date: '2017-11-23', title: '立法院審查勞基法修正案，蔣萬安發動冗長發言站立發言超過2小時杯葛表決', articleId: 'chiang' },
  { date: '2022-11-26', title: '台北市長選舉投票，蔣萬安以575,590票勝選當選第八屆台北市市長', articleId: 'chiang' },
  { date: '2024-11-04', title: '工務局張貼拆除和平新生天橋公告，文史自救會發起抗爭與守夜行動', articleId: 'bridge' },
  { date: '2024-11-13', title: '文化局現勘和平新生天橋，文資審議委員會作成不予列冊處分引發爭端', articleId: 'bridge' },
  { date: '2024-11-19', title: '深夜市府調派優勢警力封橋排除靜坐抗議，工務局大型切割機具進場拆除天橋', articleId: 'bridge' },

  // 12月
  { date: '2022-12-25', title: '蔣萬安正式宣誓就職第八屆台北市市長，宣示以服務市民為核心帶領首都市政', articleId: 'chiang' },
  { date: '2023-12-03', title: '台北大巨蛋首場國際賽開打，湧入1.7萬球迷見證歷史，蔣萬安致詞感謝李四川與工務同仁', articleId: 'dome' },
  { date: '2023-12-13', title: '中央建立蛋品流向追溯後，台北市政府宣布各級學校營養午餐恢復使用殺菌液蛋', articleId: 'egg' },
  { date: '2024-12-01', title: '世界愛滋病日，台北市立聯合醫院昆明防治中心推動多元篩檢與友善醫療平權宣導', articleId: 'meth' },
  { date: '2024-12-10', title: '國際人權日，台北市政府舉行民主紀念特展，蔣萬安強調記取歷史教訓深耕法治人權', articleId: 'chiang' },
  { date: '2024-12-15', title: '新北投溫泉季與冬日生活節登場，市府整合商圈推出溫泉專車與文化散策優惠引觀光人潮', articleId: 'chiang' },
  { date: '2024-12-24', title: '平安夜報佳音，蔣萬安前往台北天主教聖家堂與信義商圈發送糖果祝福市民聖誕快樂', articleId: 'chiang' },
  { date: '2024-12-31', title: '台北最High新年城跨年晚會登場，台北101施放300秒跨年大煙火，蔣萬安與數十萬民眾倒數狂歡', articleId: 'chiang' },

  // 更多全年精選歷史事件擴充
  { date: '2024-01-05', title: '台北市政府新春首場市政會議，蔣萬安市長宣誓「永續首都、希望台北」年度五大市政施政方針', articleId: 'chiang' },
  { date: '2024-01-18', title: '大學學測登場，蔣萬安視察台北捷運與交通疏運應變中心，下令考場周邊工程全面暫停噪音施作', articleId: 'chiang' },
  { date: '2024-01-26', title: '台北年貨大街於迪化街熱鬧開跑，蔣萬安親臨現場揮毫發送限量龍年發財金引排隊人潮', articleId: 'chiang' },
  { date: '2023-02-05', title: '2023台灣燈會在台北正式點燈，蔣萬安偕同歷任市長同台為城市點亮祈福主燈', articleId: 'chiang' },
  { date: '2024-02-07', title: '春節前夕垃圾清運最高峰，蔣萬安夜間慰問第一線清潔隊員並發送熱薑茶與慰問金', articleId: 'trashtime' },
  { date: '2024-02-15', title: '台北市政府新春團拜，蔣萬安提出「面對問題、解決問題」惕勵全體公務同仁', articleId: 'chiang' },
  { date: '2024-02-24', title: '台北燈節全國各級學校花燈競賽展出，眾多吸睛祈福花燈引發社群拍照打卡熱潮', articleId: 'chiang' },
  { date: '2024-03-08', title: '國際婦女節，台北市政府宣布擴大生育獎勵金補助與好孕專車乘車補貼擴增服務', articleId: 'child' },
  { date: '2024-03-18', title: '面對太陽花運動十週年媒體詢問，蔣萬安強調民主多元價值與推動青年參與公共事務', articleId: 'chiang' },
  { date: '2024-03-29', title: '青年節台北青年創業高峰論壇，蔣萬安宣示成立跨局處青年局並擴大AI新創天使資金', articleId: 'ai' },
  { date: '2024-04-03', title: '花蓮大地震震度波及台北，市府災害應變中心二級開設，全面清查校舍與高架橋樑安全', articleId: 'resilience' },
  { date: '2024-04-04', title: '兒童節連假台北市立動物園與兒童新樂園湧入數萬家庭，市府祭出全國國小學生免門票優惠', articleId: 'child' },
  { date: '2024-04-22', title: '世界地球日，蔣萬安宣布推動低碳運輸網，宣示市區公車全面電動化與擴建太陽光電設施', articleId: 'youbike' },
  { date: '2024-05-01', title: '五一勞動節，蔣萬安出席模範勞工表揚大會，重申捍衛勞動權益與降低青年低薪困境', articleId: 'chiang' },
  { date: '2024-05-12', title: '國際護師節，蔣萬安親赴台北市立聯合醫院各院區致贈花束慰問第一線白衣天使', articleId: 'chiang' },
  { date: '2024-05-28', title: '台北市議會市政總質詢，藍綠議員就大巨蛋安全、食安監測與少子化政策展開激烈質詢攻防', articleId: 'dome' },
  { date: '2024-06-04', title: '六四事件週年，蔣萬安在社群發文重申自由、民主與人權為普世不可退讓之核心價值', articleId: 'chiang' },
  { date: '2024-06-10', title: '端午節台北國際龍舟錦標賽在大佳河濱公園開划，蔣萬安親自登上龍舟擊鼓助陣展現活力', articleId: 'chiang' },
  { date: '2024-06-21', title: '夏至飆破38度高溫，市府啟動熱浪防禦通報，環保局出動洗街車灑水降溫並呼籲勞工防中暑', articleId: 'ac' },
  { date: '2024-07-01', title: '台北市宣布YouBike 2.0E電動輔助自行車正式擴大納入前30分鐘補助範圍，引發市民熱烈借用', articleId: 'youbike' },
  { date: '2024-07-06', title: '公館自來水園區台北親水節熱鬧揭幕，蔣萬安與小朋友打水仗消暑，宣傳節水與親水設施', articleId: 'gongguan' },
  { date: '2024-07-15', title: '台北大巨蛋舉辦大型職棒明星賽吸引4萬球迷滿場，市府成立跨局處疏運指揮所維持秩序', articleId: 'dome' },
  { date: '2024-08-01', title: '全國原住民族日，蔣萬安身著原民傳統背心出席紀念活動，承諾健全族語教育與文化深耕', articleId: 'chiang' },
  { date: '2024-08-08', title: '父親節，蔣萬安在臉書曬出與三名子女溫馨合照，分享身為「三寶爸」蠟燭兩頭燒的心得', articleId: 'child' },
  { date: '2024-08-20', title: '大稻埕夏日節閉幕壓軸煙火秀吸引逾13萬人湧入大稻埕碼頭，水門疏散動線成為交通焦點', articleId: 'neihuflood' },
  { date: '2024-09-01', title: '九月開學首日，蔣萬安視察國小營養午餐供餐衛生與校園門禁，宣導校園防範腸病毒', articleId: 'food' },
  { date: '2024-09-10', title: '世界自殺防治日，市府衛生局擴大青年心理諮商補助方案，強化社區心衛中心服務量能', articleId: 'child' },
  { date: '2024-09-28', title: '教師節孔廟釋奠大典，蔣萬安擔任正獻官行三獻禮，並宣布加碼發放資深優良教師敬師禮券', articleId: 'chiang' },
  { date: '2024-10-01', title: '全台公費流感與COVID-19疫苗開打，蔣萬安親赴聯合醫院中興院區挽袖接種示範防疫', articleId: 'chiang' },
  { date: '2024-10-05', title: '台北白晝之夜在大安森林公園登場，以自然生態與夜間當代藝術為主題吸引25萬夜遊市民', articleId: 'trendy' },
  { date: '2024-10-12', title: '台北時裝週開幕大秀，蔣萬安身穿台灣設計師剪裁前衛飛行風衣壓軸登台走秀展現氣場', articleId: 'trendy' },
  { date: '2024-10-13', title: '大巨蛋迎來國慶晚會與亞洲棒球錦標賽前置測試，屋頂排水與逃生導引再次成焦點', articleId: 'dome' },
  { date: '2024-10-20', title: '台灣同志遊行前夕，蔣萬安重申台北為亞洲最具包容性之多元友善平權之都', articleId: 'wanhua' },
  { date: '2024-10-26', title: '天母搞什麼鬼萬聖節變裝嘉年華，蔣萬安化身動漫經典角色與數萬親子上街討糖歡慶', articleId: 'chiang' },
  { date: '2024-10-31', title: '先總統蔣中正誕辰紀念日，蔣萬安依往例前往大溪慈湖謁陵致意，身世與歷史定位引關注', articleId: 'blood' },
  { date: '2024-11-01', title: '第二階段公費流感疫苗擴大開放，台北市設置百處社區接種站提高長者防護覆蓋率', articleId: 'chiang' },
  { date: '2024-11-10', title: '大巨蛋通過消防安全基金會各項避難逃生演練驗證，市府正式准予核發非體育賽事使用許可', articleId: 'dome' },
  { date: '2024-11-12', title: '國父誕辰紀念日，蔣萬安赴國父紀念館獻花致意，對文化資產活化與周邊整建工程發表談話', articleId: 'marathon' },
  { date: '2024-11-20', title: '世界兒童日，市府社會局發表兒少保護白皮書，宣示建構更周延之跨局處脆弱家庭安全網', articleId: 'child' },
];

const articleMap = new Map(articles.map((a) => [a.id, a]));

export const allHistoryEvents: HistoryEvent[] = rawEvents
  .map((e) => {
    const [yearStr, monthStr, dayStr] = e.date.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const monthDay = `${monthStr}-${dayStr}`;
    const art = articleMap.get(e.articleId);

    return {
      date: e.date,
      monthDay,
      year,
      month,
      day,
      title: e.title,
      articleId: e.articleId,
      articleTitle: art ? art.title : e.articleId,
      category: art ? art.category : '歷史事件',
    };
  })
  .sort((a, b) => {
    if (a.monthDay !== b.monthDay) {
      return a.monthDay.localeCompare(b.monthDay);
    }
    return b.year - a.year;
  });

export function formatEventDate(dateStr: string): string {
  const parts = dateStr.split('-');
  return `${parts[0]}年${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日`;
}

export interface MonthEventsGroup {
  month: number;
  eventsCount: number;
  days: {
    day: number;
    monthDay: string;
    events: HistoryEvent[];
  }[];
}

export function getAllEventsGroupedByMonth(): MonthEventsGroup[] {
  const monthMap = new Map<number, Map<number, HistoryEvent[]>>();

  for (const event of allHistoryEvents) {
    if (!monthMap.has(event.month)) {
      monthMap.set(event.month, new Map());
    }
    const dayMap = monthMap.get(event.month)!;
    if (!dayMap.has(event.day)) {
      dayMap.set(event.day, []);
    }
    dayMap.get(event.day)!.push(event);
  }

  const result: MonthEventsGroup[] = [];

  for (let m = 1; m <= 12; m++) {
    const dayMap = monthMap.get(m);
    if (!dayMap || dayMap.size === 0) continue;

    const daysList = Array.from(dayMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([day, events]) => ({
        day,
        monthDay: `${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        events,
      }));

    const totalCount = daysList.reduce((acc, curr) => acc + curr.events.length, 0);

    result.push({
      month: m,
      eventsCount: totalCount,
      days: daysList,
    });
  }

  return result;
}

export interface TodayHistoryViewData {
  isExactDate: boolean;
  events: HistoryEvent[];
  mode: 'exact' | 'month-highlight' | 'featured';
  headlineText: string;
  badgeLabel: string;
  note?: string;
}

export function getTodayHistoryData(now = new Date()): TodayHistoryViewData {
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const todayKey = `${mm}-${dd}`;
  const m = now.getMonth() + 1;
  const d = now.getDate();

  const exactEvents = allHistoryEvents.filter((e) => e.monthDay === todayKey);
  if (exactEvents.length > 0) {
    return {
      isExactDate: true,
      events: exactEvents,
      mode: 'exact',
      headlineText: `歷史上的今天 (${m}月${d}日)`,
      badgeLabel: '🎯 今日當天專屬事件',
    };
  }

  // Fallback: If today has no exact events, return current month's events or featured events so it's NEVER empty
  const currentMonthEvents = allHistoryEvents.filter((e) => e.month === m);
  if (currentMonthEvents.length > 0) {
    return {
      isExactDate: false,
      events: currentMonthEvents.slice(0, 4),
      mode: 'month-highlight',
      headlineText: `歷史上的今天 (${m}月${d}日)`,
      badgeLabel: `📅 ${m}月份市政重大歷史精選`,
      note: `💡 今日（${m}月${d}日）無特定登錄事件，為您呈現【${m}月份重大市政歷史精選回顧】`,
    };
  }

  return {
    isExactDate: false,
    events: allHistoryEvents.slice(0, 4),
    mode: 'featured',
    headlineText: `歷史上的今天 (${m}月${d}日)`,
    badgeLabel: '🌟 百科重大歷史精選',
    note: `💡 為您精選全站重大市政歷史檔案`,
  };
}

export function getTodayEvents(now = new Date()): HistoryEvent[] {
  return getTodayHistoryData(now).events;
}

