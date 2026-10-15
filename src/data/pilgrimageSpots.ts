export interface PilgrimageSpot {
  id: string;
  articleId: string;
  name: string;
  district: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: '重大工程' | '政治交鋒' | '司法風暴' | '市井奇觀' | '兒少民生' | '社群迷因';
  categoryColor: string;
  icon: string;
  headline: string;
  description: string;
  pilgrimageTip: string;
  incidentDate: string;
  googleMapsUrl: string;
  googleMapsDirectionsUrl: string;
  googleEmbedUrl: string;
}

export const pilgrimageSpots: PilgrimageSpot[] = [
  {
    id: 'spot-dome',
    articleId: 'dome',
    name: '台北大巨蛋（文化體育園區）',
    district: '信義區',
    address: '台北市信義區忠孝東路四段515號',
    coordinates: { lat: 25.0425, lng: 121.5598 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🏟️',
    headline: '漏水水濂洞、消安審查演練與周杰倫張惠妹演唱會解鎖現場',
    description:
      '自蔣市府接任後力拚完工啟用，歷經亞錦賽、中職賽事多次屋頂漏水「接水盤水濂洞」爭議、消防安全中心基金會審查與演唱會使照註記鬆綁，成為全台最受矚目的公共建築地標。',
    pilgrimageTip:
      '搭乘板南線至國父紀念館站5號出口直達地下連通道。朝聖時可抬頭觀察頂部穹頂鋼構接縫處，並於忠孝東路大門口遠眺銀白飛碟造型拍照留念。',
    incidentDate: '2023年12月至2024年底',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北大巨蛋 台北市信義區忠孝東路四段515號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0425,121.5598',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0425,121.5598&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-bridge',
    articleId: 'bridge',
    name: '和平新生天橋（強制拆除爭議現場）',
    district: '大安區',
    address: '台北市大安區新生南路二段與和平東路一段交叉路口',
    coordinates: { lat: 25.0267, lng: 121.535 },
    category: '政治交鋒',
    categoryColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    icon: '🌉',
    headline: '文資保存抗爭、白布條標語與深夜強制動工拆除爭議',
    description:
      '承載數十年大安森林公園與龍安國小記憶的指標性天橋。市府以人本交通、視線無遮蔽與橋齡已達為由拍板拆除，引發民間團體掛黃白布條留橋抗爭，最終於夜間全面動工拆除。',
    pilgrimageTip:
      '搭乘捷運至大安森林公園站或東門站，沿新生南路步行至和平東路口。現址路面視野開闊，可站在大安森林公園入口轉角處比對昔日電影取景視角。',
    incidentDate: '2024年11月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('和平新生天橋 台北市大安區新生南路二段與和平東路一段交叉路口'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0267,121.5350',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0267,121.5350&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-dazhi',
    articleId: 'dazhi',
    name: '基泰大直民宅下陷工區現場',
    district: '中山區',
    address: '台北市中山區大直街94巷1弄',
    coordinates: { lat: 25.0828, lng: 121.5492 },
    category: '重大工程',
    categoryColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: '🏗️',
    headline: '開挖未做底層改良導致一樓直接沉入地下「電梯式下陷」震驚全國',
    description:
      '基泰建設大直建案連續壁破裂導致鄰近公寓劇烈傾斜並瞬間沉陷下陷一整層樓。市府都發局事前「非屬施工造成」公文遭外界嚴格檢驗，成為蔣市府工安與建管監管機制之關鍵分水嶺。',
    pilgrimageTip:
      '搭乘文湖線至大直站1號出口，往實踐大學方向步行約5分鐘進大直街94巷。目前下陷主棟已拆除整地，周邊巷道可見嚴密工程監測點位。',
    incidentDate: '2023年9月7日',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('基泰大直 台北市中山區大直街94巷1弄'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0828,121.5492',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0828,121.5492&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-baolin',
    articleId: 'baolin',
    name: '寶林茶室食安風暴現場（遠百信義A13）',
    district: '信義區',
    address: '台北市信義區松仁路58號（遠東百貨信義A13地下3樓）',
    coordinates: { lat: 25.0358, lng: 121.567 },
    category: '兒少民生',
    categoryColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    icon: '🍲',
    headline: '全台首見罕見毒素邦克列酸事件、溯源追查廚師手部關鍵跡證',
    description:
      '信義計畫區知名素食餐廳爆發嚴重邦克列酸（Bongkrekic acid）米酵菌酸食物中毒，釀成多起重症與傷亡。市府衛生局、中央疾管署與法醫所展開全台首見環境與食材微生物極限追蹤。',
    pilgrimageTip:
      '搭乘板南線至市政府站3號出口，或淡水信義線至台北101/世貿站4號出口，步行至松仁路遠百A13。原美食街櫃位已重新調整，為台灣公衛史上極具震撼力的食安警鐘。',
    incidentDate: '2024年3月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('遠東百貨信義A13 台北市信義區松仁路58號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0358,121.5670',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0358,121.5670&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-cane',
    articleId: 'cane',
    name: '艋舺龍山寺前廣場（丟甘蔗事件）',
    district: '萬華區',
    address: '台北市萬華區廣州街211號',
    coordinates: { lat: 25.0368, lng: 121.4999 },
    category: '社群迷因',
    categoryColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    icon: '🎋',
    headline: '萬華拜票遇綠營支持者激動丟甘蔗抗議，成選戰社群熱搜詞彙',
    description:
      '蔣萬安在台北市長選舉期間走訪萬華傳統綠營票倉龍山寺參香祈福時，遭遇民眾攜帶一整根甘蔗抗議丟擲。該事件在網路社群迅速演變為經典時事梗與諷刺地標。',
    pilgrimageTip:
      '搭乘板南線至龍山寺站1號出口出站即抵達。龍山寺香火鼎盛，周邊艋舺夜市與廣州街攤商亦有販售現榨甘蔗汁，許多網友特地買杯甘蔗汁到廟埕前合影朝聖。',
    incidentDate: '2022年10月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('艋舺龍山寺 台北市萬華區廣州街211號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0368,121.4999',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0368,121.4999&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-cityhall',
    articleId: 'chiang',
    name: '台北市政大樓與聯訪北區門廳（萬安受訪名場面）',
    district: '信義區',
    address: '台北市信義區市府路1號',
    coordinates: { lat: 25.0375, lng: 121.5637 },
    category: '政治交鋒',
    categoryColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    icon: '🏛️',
    headline: '每天晨會步出大廳面對鯊魚夾聯訪、「你知道記者剛剛問蔣萬安什麼」誕生地',
    description:
      '台北市政府市政大樓1樓中庭與北區大門是媒體每日早晨「鯊魚式堵麥」聯訪的核心戰場。各項熱門議題在此誕生「問A答B」、「謝謝指教」、「持續聆聽市民心聲」等經典回應語錄。',
    pilgrimageTip:
      '搭乘捷運板南線市政府站2號出口連通進市府大樓。大廳設有台北探索館可免費參觀，1樓門廳中央便是各大電視台記者平日聯訪麥克風架設所在地。',
    incidentDate: '2022年12月至今',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市政府市政大樓 台北市信義區市府路1號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0375,121.5637',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0375,121.5637&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-corepacific',
    articleId: 'corepacific',
    name: '京華廣場工地現場（京華城840%容積司法風暴）',
    district: '松山區',
    address: '台北市松山區八德路四段138號',
    coordinates: { lat: 25.0482, lng: 121.5622 },
    category: '司法風暴',
    categoryColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    icon: '⚖️',
    headline: '柯市府840%容積率司法收押風暴，蔣市府面臨是否勒令停工之行政法律攻防',
    description:
      '昔日京華城球體商場改建為四棟頂級商辦「京華廣場」，因創設韌性城市等獎勵項目獲額外20%容積率，引發檢廉大規模偵辦收押。蔣萬安市府面對各界要求勒令停工壓力，採取不予施工勘驗策略。',
    pilgrimageTip:
      '搭乘松山新店線至南京三民站2號出口，步行約5分鐘至八德路與東寧路口。可於路口外圍觀看四座巨型鋼骨塔樓興建規模，隔壁即為台北偶戲館。',
    incidentDate: '2024年下半年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('京華廣場 台北市松山區八德路四段138號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0482,121.5622',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0482,121.5622&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-tpa',
    articleId: 'tpa',
    name: '台北表演藝術中心（北藝貢丸皮蛋豆腐爭議款）',
    district: '士林區',
    address: '台北市士林區劍潭路1號',
    coordinates: { lat: 25.0847, lng: 121.5244 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🎭',
    headline: '庫哈斯設計巨型球體劇場、柯市府2.36億調解款遭議會刪除爭端',
    description:
      '由普立茲克建築獎得主雷姆·庫哈斯設計，外觀酷似貢丸嵌在皮蛋豆腐上。前市府拍板賠付承包商2.36億元調解款，蔣市府編列追加預算遭台北市議會藍綠議員聯手全數刪除至1,000元保留科目。',
    pilgrimageTip:
      '捷運淡水信義線劍潭站1號出口過馬路即達。建築物下方設有公共參觀迴路，球形球劇場「大劇院」外殼金屬銀色球體為極具代表性的建築拍照打卡地。',
    incidentDate: '2023年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北表演藝術中心 台北市士林區劍潭路1號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0847,121.5244',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0847,121.5244&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-tmc',
    articleId: 'tmc',
    name: '台北流行音樂中心（1.9億工程款爭端）',
    district: '南港區',
    address: '台北市南港區市民大道八段99號',
    coordinates: { lat: 25.0519, lng: 121.5976 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🎵',
    headline: '每月80萬利息狂燒、中央文化部與地方政府代辦款踢皮球交鋒',
    description:
      '由美國RUR建築師事務所設計的多面結晶體表演廳。因變更設計衍生1.9億元爭議款未結，導致每月產生約80萬元延遲利息。蔣萬安市府拍板以市府二備金墊付，並向文化部追討。',
    pilgrimageTip:
      '搭乘板南線至昆陽站4號出口，步行約8分鐘直達市民大道八段北基地。主廳館外形如幾何山脈，可漫步南基地文化館與產音中心天橋。',
    incidentDate: '2023年7月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北流行音樂中心 台北市南港區市民大道八段99號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0519,121.5976',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0519,121.5976&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-smoke',
    articleId: 'smoke',
    name: '公館商圈水泥花台鐵柵欄吸菸區',
    district: '中正區',
    address: '台北市中正區羅斯福路四段90巷口',
    coordinates: { lat: 25.0136, lng: 121.5342 },
    category: '市井奇觀',
    categoryColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: '🚬',
    headline: '公館行人徒步區設置鐵籠柵欄吸菸區引爆民眾熱議與視覺奇觀',
    description:
      '台北市政府環保局為改善公館商圈與水源市場周邊二手菸與煙蒂問題，以水泥花台加裝黑色鐵網柵欄圍出戶外定點吸菸區，被網友戲稱「動物園牢籠」、「放風區」，引發美學與防菸效能激辯。',
    pilgrimageTip:
      '捷運松山新店線公館站1號或4號出口，往水源市場及羅斯福路四段90巷方向步行2分鐘。周邊美食林立，可順道品嚐藍家割包與陳三鼎舊址附近小吃。',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('公館商圈 台北市中正區羅斯福路四段90巷'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0136,121.5342',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0136,121.5342&hl=zh-TW&z=18&output=embed',
  },
  {
    id: 'spot-beishike',
    articleId: 'beishike',
    name: '北投士林科技園區T17/T18地上權基地',
    district: '北投區',
    address: '台北市北投區福國路與文林北路口（北士科軟橋段）',
    coordinates: { lat: 25.1118, lng: 121.5165 },
    category: '司法風暴',
    categoryColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    icon: '💼',
    headline: '新光人壽免提投資企劃書得標、跨屆政風調查與議會專案聽證焦點',
    description:
      '台北市第三個科技園區北士科，柯市府任內將T17、T18標案分標招商且免附投資計畫書，由新壽以低於底價標得。蔣市府政風處移送檢調並由議會成立調查專案小組，成為藍綠白三方角力焦點。',
    pilgrimageTip:
      '搭乘淡水信義線至明德站或芝山站，沿福國路往西步行約10分鐘至北士科重劃區。目前沿路塔吊林立，可感受新興生醫科技廊道之開發進度。',
    incidentDate: '2024年上半年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('北投士林科技園區 福國路 文林北路'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.1118,121.5165',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.1118,121.5165&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-kindergarten',
    articleId: 'kindergarten',
    name: '培諾米達幼兒園原址（兒少保護重大事件）',
    district: '信義區',
    address: '台北市信義區福德街221巷',
    coordinates: { lat: 25.0392, lng: 121.5835 },
    category: '兒少民生',
    categoryColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    icon: '🏫',
    headline: '狼師毛畯珅重大性侵案促使幼照法與兒少法報導規範修法',
    description:
      '信義區知名私立幼兒園爆發園長之子對多名幼童重大性侵猥褻惡行。市府教育局與社會局跨屆行政通報空窗長達一年，引發社會公憤，蔣萬安市長兩度鞠躬致歉並全面徹查啟動國賠專案。',
    pilgrimageTip:
      '鄰近捷運信義線東延段廣慈/奉天宮站預定地。原幼兒園已被廢止設立許可並停業，該事件推動了全國幼兒園監視器雲端備份與狼師資訊公開之體制改革。',
    incidentDate: '2024年7月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市信義區福德街221巷'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0392,121.5835',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0392,121.5835&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-fishmarket',
    articleId: 'fishmarket',
    name: '第一果菜及萬大魚類批發市場改建現場',
    district: '萬華區',
    address: '台北市萬華區萬大路533號',
    coordinates: { lat: 25.0195, lng: 121.4988 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🐟',
    headline: '150億改建案減項發包「先標後追加近50億」引發議會與檢調攻防',
    description:
      '全台灣最大的農漁產集散樞紐。柯市府任內採取減項發包政策，後續由蔣市府編列近50億元預算辦理追加追加減工程，引發藍綠議員質疑量身打造涉圖利特定廠商，歷經數次激烈質詢。',
    pilgrimageTip:
      '位於華中橋台北端引道旁，新北捷運萬大線加蚋站興建中。清晨2點至5點是全台北批發拍賣最震撼的時刻，周邊新鮮漁獲與蔬果批發市集充滿熱鬧庶民生命力。',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('第一果菜批發市場 台北市萬華區萬大路533號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0195,121.4988',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0195,121.4988&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-ac',
    articleId: 'ac',
    name: '捷運台北小巨蛋站（冷氣調降2度政策現場）',
    district: '松山區',
    address: '台北市松山區南京東路四段2號（捷運台北小巨蛋站）',
    coordinates: { lat: 25.0518, lng: 121.5501 },
    category: '市井奇觀',
    categoryColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    icon: '❄️',
    headline: '旅客抱怨北捷車站悶熱異味，蔣萬安拍板全線車廂與站體冷氣調降2度',
    description:
      '2023年夏季許多通勤族在社群反映北捷車站熱如烤箱、汗味瀰漫。蔣萬安市長宣布全路網月台及列車冷氣溫度全面下調至尖峰23度、離峰24度，每月電費增幅約200-250萬元，被市民廣讚「有感政策」。',
    pilgrimageTip:
      '搭乘松山新店線至台北小巨蛋站下車，踏出車廂即可親身體驗清涼空調溫度。小巨蛋大廳連通微風南京與市立體育場，是夏日避暑朝聖最佳示範點。',
    incidentDate: '2023年8月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('捷運台北小巨蛋站 台北市松山區南京東路四段2號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0518,121.5501',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0518,121.5501&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-squat',
    articleId: 'squat',
    name: '市府轉運站候車亭（深蹲20次換免費公車倡議點）',
    district: '信義區',
    address: '台北市信義區忠孝東路五段6號（市府轉運站外公車專用道）',
    coordinates: { lat: 25.0408, lng: 121.5652 },
    category: '社群迷因',
    categoryColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    icon: '🏋️',
    headline: '蔣萬安於氣候變遷論壇拋出「市民深蹲20下換免費公車」引爆全民迷因',
    description:
      '市長候選人期間於台灣氣候行動博覽會拋出參考羅馬尼亞克盧日納波卡市案例，市民在公車站「深蹲20下換免費乘車」以推廣減碳與全民運動，引發各界爆笑、政治對手實測與社群迷因洗版。',
    pilgrimageTip:
      '位於信義區忠孝東路與基隆路交叉口的市府轉運站候車亭。可以在候車月台前自主深蹲20下自拍短影片，成為年輕族群到信義商圈必玩的時事迷因儀式感。',
    incidentDate: '2022年10月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('市府轉運站 台北市信義區忠孝東路五段6號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0408,121.5652',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0408,121.5652&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-nangangbot',
    articleId: 'nangangbot',
    name: '南港轉運站東側商業區BOT案基地',
    district: '南港區',
    address: '台北市南港區忠孝東路七段（南港車站東側）',
    coordinates: { lat: 25.0528, lng: 121.6068 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🚉',
    headline: '新光人壽得標工期進度嚴重落後、市府下達最後通牒解約風暴',
    description:
      '由新光人壽得標興建的南港轉運站東側BOT案，預定作為東區門戶計畫重要交通轉運樞紐。但得標後施工進度大幅落後原定目標，蔣市府公運處數度重罰並祭出限期改善無效即行使解約權通牒。',
    pilgrimageTip:
      '搭乘三鐵共構至南港車站出站往東區連通道出口步行3分鐘。周邊緊鄰台北流行音樂中心與南港軟體園區，可親臨現場見證東區門戶計畫交通核心的建設拉鋸。',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('南港轉運站 台北市南港區忠孝東路七段'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0528,121.6068',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0528,121.6068&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-airport',
    articleId: 'airport',
    name: '台北松山機場（保留松機 vs 遷建之爭）',
    district: '松山區',
    address: '台北市松山區敦化北路340-9號',
    coordinates: { lat: 25.0697, lng: 121.5525 },
    category: '政治交鋒',
    categoryColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    icon: '✈️',
    headline: '選戰對手提出遷移松機改建超大公園，蔣萬安力倡堅決保留首都商務軸心',
    description:
      '松山機場遷移長年為台北市長選戰藍綠爭辯熱點。蔣萬安在選戰中堅定主張「必須保留松山機場」，強調其兼具東北亞首都商務快線、戰備國防演訓與離島航線不可替代之樞紐戰略地位。',
    pilgrimageTip:
      '搭乘捷運文湖線直達松山機場站。航廈3樓設有戶外觀景台可近距離欣賞飛機起降，遠眺大直水岸與圓山大飯店，是台北市區最受歡迎的航空打卡點。',
    incidentDate: '2022年至2023年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北松山機場 台北市松山區敦化北路340-9號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0697,121.5525',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0697,121.5525&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-umb',
    articleId: 'umb',
    name: '台北市政府環保局清潔作業處（700萬天價遮陽傘爭議）',
    district: '信義區',
    address: '台北市信義區市府路1號6樓（環保局環境清潔管理科）',
    coordinates: { lat: 25.0375, lng: 121.5642 },
    category: '市井奇觀',
    categoryColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: '⛱️',
    headline: '市府斥資700萬元添購清潔隊抗熱遮陽傘配備，遭民代質疑價格昂貴',
    description:
      '為因應極端酷暑保護第一線清潔隊員免於熱中暑，台北市環保局動支預算採購大批遮陽傘與降溫裝備，遭市議員質疑單價高昂、預算執行效益爭議，引發勞工防熱安全與公帑監督的廣泛討論。',
    pilgrimageTip:
      '位於台北市政府大樓6樓北區。到市府周邊散步時，常能看見辛苦的清潔隊員推著配有新型遮陽裝備的清潔手推車維持市容整潔，值得向辛勞隊員點頭致意。',
    incidentDate: '2024年夏天',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市政府環境保護局 台北市信義區市府路1號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0375,121.5642',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0375,121.5642&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-quiz',
    articleId: 'quiz',
    name: '台北市政府新聞發布室（你知道記者剛剛問蔣萬安什麼嗎？ 名場面現場）',
    district: '信義區',
    address: '台北市信義區市府路1號11樓',
    coordinates: { lat: 25.0374, lng: 121.5644 },
    category: '社群迷因',
    categoryColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    icon: '❓',
    headline: '「你知道記者剛剛問蔣萬安什麼嗎？」社群瘋傳快問快答與跳針回應經典發源地',
    description:
      '市政行程聯訪與媒體堵訪日常中，面對各類突擊時事提問，蔣萬安多次以字斟句酌、沉著複誦或微妙停頓引發網路社群二創迷因風潮，成為當代網路政治梗圖的常客。',
    pilgrimageTip:
      '位於台北市政府市政大樓高樓層新聞發布室。一般市民可在市府大樓一樓中庭感受市府氛圍，也可在台北探索館參觀歷任市長市政影音檔案展區。',
    incidentDate: '2023年至2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市政府新聞發布室 台北市信義區市府路1號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0374,121.5644',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0374,121.5644&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-meth',
    articleId: 'meth',
    name: '台北市聯合醫院昆明防治中心（美沙冬替代療法爭議現場）',
    district: '萬華區',
    address: '台北市萬華區昆明街100號',
    coordinates: { lat: 25.0438, lng: 121.5052 },
    category: '兒少民生',
    categoryColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
    icon: '🧪',
    headline: '毒品防制替代療法服藥處所規劃與社區溝通風波',
    description:
      '台北市立聯合醫院昆明防治中心長年承辦藥癮戒治與美沙冬替代療法。蔣市府時期針對基層醫療資源配置、藥癮減害政策與周邊住戶衛教溝通多次成為公衛體系質詢重點。',
    pilgrimageTip:
      '搭乘板南線至西門站6號出口，沿成都路步行轉昆明街約5分鐘。鄰近西門町商圈與萬華傳統街區，可深刻體驗台北市公共衛生防護第一線之辛勤。',
    incidentDate: '2023年至2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市立聯合醫院昆明防治中心 台北市萬華區昆明街100號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0438,121.5052',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0438,121.5052&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-wanfang',
    articleId: 'wanfang',
    name: '文山萬芳醫院前興隆路地基掏空凹陷現場',
    district: '文山區',
    address: '台北市文山區興隆路三段111號前方道路',
    coordinates: { lat: 25.0001, lng: 121.5583 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🕳️',
    headline: '急診室前大馬路突現掏空天坑，自來水管破裂回填搶修考驗工務應變',
    description:
      '興隆路三段萬芳醫院正前方幹道路面突發下陷掏空大洞，地下老舊自來水管線滲漏造成地基流失，市府新工處與水利處連夜封路灌漿回填，成為文山區交通與管線體檢代表性事件。',
    pilgrimageTip:
      '搭乘文湖線至萬芳醫院站出站即達。醫院前方路口人潮與車流極大，觀察路面重新鋪設之平整度與道路兩側地下管線排氣閥巡檢標記。',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('萬芳醫院 台北市文山區興隆路三段111號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0001,121.5583',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0001,121.5583&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-youbike',
    articleId: 'youbike',
    name: '公館捷運站2號出口 YouBike 2.0 前30分鐘免費無車可借大潮現場',
    district: '大安區',
    address: '台北市大安區羅斯福路四段68號（捷運公館站2號出口外廣場）',
    coordinates: { lat: 25.0136, lng: 121.5342 },
    category: '兒少民生',
    categoryColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    icon: '🚲',
    headline: '恢復前30分鐘免費政策上路後，台大與公館熱門站點大排長龍「無車可借、無柱可還」',
    description:
      '蔣萬安兌現競選政見恢復YouBike前30分鐘免費，帶動全市騎乘量爆發式增長，但也導致台大周邊及各捷運樞紐在上下班尖峰時刻頻繁見底「無車可借」，考驗微笑單車調度車隊極限運能。',
    pilgrimageTip:
      '搭乘松山新店線至公館站2號出口。站外設有長排YouBike 2.0車柱，上下課時段常可見學生與通勤族緊盯微笑單車App搶車的生動城市景象。',
    incidentDate: '2024年2月起',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('捷運公館站2號出口 台北市大安區羅斯福路四段'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0136,121.5342',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0136,121.5342&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-mrtattack',
    articleId: 'mrtattack',
    name: '台北車站地下街與板南線轉乘核心（捷運維安戒備升級現場）',
    district: '中正區',
    address: '台北市中正區忠孝西路一段49號地下捷運大廳',
    coordinates: { lat: 25.0463, lng: 121.5175 },
    category: '兒少民生',
    categoryColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    icon: '🛡️',
    headline: '北捷持刀騷動與旅客恐慌防範事件，市警局與捷運警察隊全面增設防暴叉與巡邏密度',
    description:
      '雙北捷運歷經數起乘客持刀或隨機恐嚇突發事件，蔣市府下令捷運警察隊全面加強全線巡檢、站務員配備防暴鋼叉與臂盾，並在月台增設警報連線系統，保障每日數百萬通勤族安全。',
    pilgrimageTip:
      '抵達台北車站後步行至板南線與淡水信義線轉乘大廳，可觀察站務詢問處旁配置之長柄防暴叉、月台緊急停車按鈕與捷運警察巡守崗位。',
    incidentDate: '2024年下半年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北車站捷運站 台北市中正區忠孝西路一段49號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0463,121.5175',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0463,121.5175&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-neihuflood',
    articleId: 'neihuflood',
    name: '內湖大湖山莊街內澇防汛現場',
    district: '內湖區',
    address: '台北市內湖區大湖山莊街219巷大湖公園旁',
    coordinates: { lat: 25.0835, lng: 121.6025 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🌊',
    headline: '瞬間強降雨排水不及造成積淹水，水利處滯洪沉砂池防洪效能受檢驗',
    description:
      '夏季午後強烈對流暴雨席捲內湖，大湖山莊街一帶因時雨量破百毫米產生積水，市府水利處連夜出動移動式抽水機並檢討大湖調洪池啟閉閘門時機，為極端氣候下台北盆地都市防洪熱區。',
    pilgrimageTip:
      '搭乘文湖線至大湖公園站1號出口，出站即為大湖公園與大湖山莊街入口。此處山水相連、錦帶橋風景秀麗，兼具治水滯洪工程實體考察價值。',
    incidentDate: '2024年夏季',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('大湖山莊街 台北市內湖區大湖山莊街219巷'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0835,121.6025',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0835,121.6025&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-mrtseats',
    articleId: 'mrtseats',
    name: '捷運忠孝復興站（博愛座逼讓讓座爭議與改名優先座研議現場）',
    district: '大安區',
    address: '台北市大安區忠孝東路四段47號（捷運忠孝復興站車廂月台）',
    coordinates: { lat: 25.0415, lng: 121.5435 },
    category: '社群迷因',
    categoryColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    icon: '💺',
    headline: '北捷車廂爆發多次長者逼年輕乘客讓座動手爭執，引發全國存廢「博愛座」論戰',
    description:
      '文湖線與板南線交匯的忠孝復興站車廂內，屢次發生因博愛座使用認知歧異引起的口角甚至肢體衝突。台北捷運與衛福部啟動標語改版，廣播加強宣導「優先座讓給有需要的人」，引爆跨世代共鳴。',
    pilgrimageTip:
      '搭乘板南線或文湖線至忠孝復興站，體驗全台最長室內電扶梯；走進車廂觀察深藍色博愛座最新警示宣導標語與乘客禮讓生態。',
    incidentDate: '2024年6月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('捷運忠孝復興站 台北市大安區忠孝東路四段47號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0415,121.5435',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0415,121.5435&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-hotpot',
    articleId: 'hotpot',
    name: '中山區長春路知名麻辣鍋店（桌面抽屜整窩蟑螂食安稽查現場）',
    district: '中山區',
    address: '台北市中山區長春路218號',
    coordinates: { lat: 25.0552, lng: 121.5361 },
    category: '兒少民生',
    categoryColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: '🍲',
    headline: '顧客拉開餐桌餐具抽屜驚見整群活蟑螂，衛生局火速稽查勒令限期改善停業',
    description:
      '台北市中山區知名麻辣火鍋名店遭顧客爆料餐桌抽屜藏匿整窩蟑螂幼蟲，影片上傳社群引爆全國食安震撼。衛生局稽查人員突擊檢查開立限期改善單，成為市府緊盯餐飲內場環境衛生的標誌性案例。',
    pilgrimageTip:
      '搭乘中和新蘆線至松江南京站7號出口，沿長春路步行約3分鐘。周邊為上班族密集之餐飲熱區，可觀察店家門口懸掛之餐飲衛生評鑑分級標章。',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市中山區長春路 知名麻辣火鍋店'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0552,121.5361',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0552,121.5361&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-wanhua',
    articleId: 'wanhua',
    name: '萬華西昌街地藏王廟與廣州街夜市（茶室治安整頓與公廁環境熱點）',
    district: '萬華區',
    address: '台北市萬華區西昌街270號（地藏王廟口周邊）',
    coordinates: { lat: 25.0355, lng: 121.4985 },
    category: '市井奇觀',
    categoryColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: '🏮',
    headline: '艋舺傳統老街茶室違規攬客爭議，市警局加強「靖城專案」臨檢掃蕩街頭暴力',
    description:
      '萬華西昌街與和平西路周邊多次傳出持刀衝突與治安紛擾。蔣市府多次指示萬華分局與環保局聯合稽查，整頓騎樓占道、加強夜間常態巡邏與艋舺公園公廁環境升級改造，平衡庶民生活與治安秩序。',
    pilgrimageTip:
      '搭乘板南線至龍山寺站1號出口，沿廣州街步行進入西昌街。鄰近三級古蹟艋舺地藏王廟與青草巷，白天可感受深厚民俗文化與濃厚草藥香氣。',
    incidentDate: '2023年至2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('萬華地藏王廟 台北市萬華區西昌街270號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0355,121.4985',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0355,121.4985&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-gongguan',
    articleId: 'gongguan',
    name: '公館水源市場與汀州路路口（公館圓環交通人本改造現勘）',
    district: '中正區',
    address: '台北市中正區羅斯福路四段92號（水源市場前方）',
    coordinates: { lat: 25.0142, lng: 121.5332 },
    category: '重大工程',
    categoryColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🛒',
    headline: '行人安全庇護島增設、水源市場外觀彩色幾何彩繪地標與汀州路路型調整',
    description:
      '中正大安交界的公館商圈人潮鼎沸，市府交通局與交工處為改善車輛未禮讓行人及羅斯福路多向路口動線，實施早開時相綠燈與行人庇護島工程，水源市場立面的以色列藝術家亞剛幾何光學彩繪更是公館著名市景。',
    pilgrimageTip:
      '搭乘松山新店線至公館站1號出口出站即至水源市場。可於對街欣賞建築大師巨幅色彩光影幻化外牆，並走入市場品嚐特色小吃。',
    incidentDate: '2023年至2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('公館水源市場 台北市中正區羅斯福路四段92號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0142,121.5332',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0142,121.5332&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-taizhiguang',
    articleId: 'taizhiguang',
    name: '台北市政府警察局（台智光CCTV監視器頻寬傳輸費風暴現場）',
    district: '中正區',
    address: '台北市中正區延平南路96號（台北市政府警察局大樓）',
    coordinates: { lat: 25.0428, lng: 121.5098 },
    category: '司法風暴',
    categoryColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    icon: '📹',
    headline: '前議員涉賄遭起訴收押，蔣市府宣布終止柯市府時期簽訂之警用CCTV子約',
    description:
      '國民黨台北市議員陳重文涉嫌收受台智光賄賂護航警用監視器3M傳輸費預算遭檢調搜索羈押。蔣萬安市府召開記者會宣布依約終止民國106年柯文哲任內簽署之警用監視器費率子約，演變成前後任市府隔空互槓之政壇風暴。',
    pilgrimageTip:
      '搭乘板南線至西門站5號出口，沿延平南路步行約2分鐘。此處為首都最高治安指揮樞紐，建築風格莊嚴肅穆，路口監視鏡頭林立。',
    incidentDate: '2024年3月',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市政府警察局 台北市中正區延平南路96號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0428,121.5098',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0428,121.5098&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-wmg',
    articleId: 'wmg',
    name: '台北和平籃球館（2025雙北世界壯年運動會核心賽場）',
    district: '大安區',
    address: '台北市大安區辛亥路三段188號',
    coordinates: { lat: 25.0212, lng: 121.5475 },
    category: '政治交鋒',
    categoryColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    icon: '🏀',
    headline: '雙北合辦大型綜合運動會，預算編列、宣傳吉祥物「壯寶」引發熱烈關注',
    description:
      '蔣萬安與侯友宜聯手推動2025雙北世界壯年運動會，和平籃球館作為主要決賽賽場與測試場地。議員針對宣傳預算執行率、報名資格及國際行銷策略提出多項質詢與督促。',
    pilgrimageTip:
      '搭乘文湖線至科技大樓站，沿復興南路二段轉辛亥路步行約8分鐘。館體外觀現代宏偉，周邊常有體育迷與晨跑市民出入。',
    incidentDate: '2024年至2025年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北和平籃球館 台北市大安區辛亥路三段188號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0212,121.5475',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0212,121.5475&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-typhoonvac',
    articleId: 'typhoonvac',
    name: '台北市災害應變中心（EOC · 颱風假停班停課決策中樞）',
    district: '信義區',
    address: '台北市信義區莊敬路391巷11弄2號（台北市政府災害應變中心）',
    coordinates: { lat: 25.0289, lng: 121.5621 },
    category: '政治交鋒',
    categoryColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    icon: '🌀',
    headline: '「基北北桃一日生活圈」同步決策風波，蔣市長臉書留言湧入數萬「地表最帥市長」許願潮',
    description:
      '颱風襲台之際每晚8點宣布「是否放颱風假」牽動數百萬北北基桃上班族心弦。蔣市府主導四縣市平台共同研判氣象風雨預報，宣布放假時臉書瞬吸十萬讚被封「最帥市長」，未放假時則遭灌爆質疑「帥度減半」，成社群奇景。',
    pilgrimageTip:
      '搭乘淡水信義線至台北101/世貿站3號出口，沿莊敬路步行至防救災指揮園區。平時門禁嚴謹，颱風天電視新聞必在此連線市府災害防救會議。',
    incidentDate: '2023年至2024年颱風季',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市災害應變中心 台北市信義區莊敬路391巷11弄2號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0289,121.5621',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0289,121.5621&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-blood',
    articleId: 'blood',
    name: '台北捐血中心南海捐血室（役男捐血榮譽假爭議現場）',
    district: '中正區',
    address: '台北市中正區南海路1號3樓（南門市場對面）',
    coordinates: { lat: 25.0322, lng: 121.5186 },
    category: '市井奇觀',
    categoryColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    icon: '🩸',
    headline: '市府兵役局役男捐血換榮譽假制度遭質疑強制衝業績，兵役局澄清屬自願愛心鼓勵',
    description:
      '為紓解北部血庫存量拉警報困境，市府兵役局推出替代役男挽袖捐血得折抵給予榮譽假措施，引發部分役男在Dcard與PTT反映有內部點名壓力，引發兵役福利與熱血公益界線的輿論激辯。',
    pilgrimageTip:
      '搭乘淡水信義線至中正紀念堂站1號或2號出口，出站即為新南門市場大樓與南海捐血室。朝聖時可順道捐出一袋熱血做公益助人！',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('南海捐血室 台北市中正區南海路1號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0322,121.5186',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0322,121.5186&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-birdnest',
    articleId: 'birdnest',
    name: '松山文創園區與大巨蛋交界生態池（大巨蛋鴿子築巢與鳥糞爭議現勘）',
    district: '信義區',
    address: '台北市信義區光復南路133號生態池畔（大巨蛋西南側交界處）',
    coordinates: { lat: 25.0442, lng: 121.5605 },
    category: '市井奇觀',
    categoryColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    icon: '🕊️',
    headline: '大巨蛋屋頂鋼構縫隙引來鴿子築巢，看台區球迷驚喜「收穫天降鳥糞禮物」',
    description:
      '大巨蛋開放中職與國際棒球賽後，不僅迎來數萬球迷，宏偉的挑高鋼骨架構更意外吸引市區野鴿入駐築巢。外野看台偶有球迷被鳥糞擊中，遠雄與體育局火速增設防鳥刺與防鳥網，成為巨蛋另類生態插曲。',
    pilgrimageTip:
      '從大巨蛋沿光復南路步行至松菸生態景觀池。此處綠樹成蔭、鴨鵝悠游，仰望即可看到大巨蛋巨大的圓頂金屬外殼，感受城市與自然之趣味反差。',
    incidentDate: '2024年中職賽季',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('松山文創園區生態池 台北市信義區光復南路133號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0442,121.5605',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0442,121.5605&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-rustbus',
    articleId: 'rustbus',
    name: '公館公車調度站與台北客運場站（公車底盤鏽蝕與車輛全面大體檢現場）',
    district: '中正區',
    address: '台北市中正區汀州路三段58號公車調度場',
    coordinates: { lat: 25.0165, lng: 121.5305 },
    category: '重大工程',
    categoryColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: '🚌',
    headline: '市區老舊公車底盤骨架嚴重鏽蝕遭民代揭露，公運處下令抽驗全市千輛公車',
    description:
      '市議員踢爆雙北多輛營運公車因長期潮濕造成底盤鋼樑鏽穿「千瘡百孔」，恐有行車安全斷裂疑慮。公共運輸處與監理所火速要求客運公會全面實施底盤除鏽與結構超音波探傷檢驗，嚴格保障乘客安全。',
    pilgrimageTip:
      '位於水源快速道路與汀州路交界。此處常有公車進出整備洗車，可遠觀客運技師進行例行五油三水與車輛安全檢查之日常。',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('公館公車調度站 台北市中正區汀州路三段'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0165,121.5305',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0165,121.5305&hl=zh-TW&z=16&output=embed',
  },
  {
    id: 'spot-bonus20k',
    articleId: 'bonus20k',
    name: '台北捷運公司行政大樓總部（常客優惠方案與員工年終獎金風雲）',
    district: '中山區',
    address: '台北市中山區民生東路一段51號（捷運行政大樓）',
    coordinates: { lat: 25.0578, lng: 121.5235 },
    category: '兒少民生',
    categoryColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    icon: '🚇',
    headline: '本業虧損卻發滿額績效年終獎金掀議，蔣萬安力挺肯定捷運第一線高水準準點率付出',
    description:
      '台北捷運客運本業虧損但靠附屬商業大樓與廣告獲利補貼，年終發放最高達4.4個月引發議會藍綠攻防。蔣市長多次公開肯定北捷全球頂尖99.9%準點率與乾淨安全的維運表現，支持依考核制度獎勵辛勤基層。',
    pilgrimageTip:
      '搭乘淡水信義線至雙連站2號出口，沿民生西路步行至民生東路一段捷運行政大樓。一樓大廳設有台北捷運商品館，可選購限量捷運模型與紀念文創。',
    incidentDate: '2023年至2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北大眾捷運股份有限公司 台北市中山區民生東路一段51號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0578,121.5235',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0578,121.5235&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-escapekill',
    articleId: 'escapekill',
    name: '台北市議會議事廳（「問A答B」與「逃跑市長」激辯質詢現場）',
    district: '信義區',
    address: '台北市信義區仁愛路四段507號（台北市議會大樓議事廳）',
    coordinates: { lat: 25.0382, lng: 121.5622 },
    category: '政治交鋒',
    categoryColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    icon: '🏛️',
    headline: '面對議員犀利質詢時祭出「官員代答轉移法」或「市政行程時間到轉身離席」攻防名場面',
    description:
      '市議會市政總質詢期間，在野黨議員針對台智光、京華城、兒少幼兒園等案發動車輪戰猛攻，蔣萬安多次以字斟句酌的官式辭令交給局處首長接招，或以法定答詢時間已到為由從容離場，被議員封為質詢攻防防禦大師。',
    pilgrimageTip:
      '搭乘板南線至國父紀念館站或市政府站，步行至台北市議會。平日會期開放市民登記旁聽議事，近距離直擊台北首善之區最高民意殿堂的熱烈交鋒。',
    incidentDate: '2023年至2024年總質詢會期',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市議會 台北市信義區仁愛路四段507號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0382,121.5622',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0382,121.5622&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-trashtime',
    articleId: 'trashtime',
    name: '信義路五段市府前垃圾車清運點（「trash time」與給愛麗絲響起現場）',
    district: '信義區',
    address: '台北市信義區信義路五段與市府路交會處清潔車停靠點',
    coordinates: { lat: 25.0342, lng: 121.5641 },
    category: '社群迷因',
    categoryColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    icon: '🗑️',
    headline: '向外賓介紹台北垃圾不落地時脫口「trash time」，引發外賓錯愕與全網二創名場面',
    description:
      '蔣市長向外籍訪問貴賓介紹台北特有的垃圾車清運文化時，以英語表示市民聽到《給愛麗絲》音樂就知道是「trash time」，因英美語意誤解導致外賓露出困惑神情，成為社群網路熱門討論梗。',
    pilgrimageTip:
      '傍晚行經市府周邊時，可親身感受台北市民提著專用垃圾袋依序等候清潔車的獨特城市風景。',
    incidentDate: '2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市信義區信義路五段與市府路交會處'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0342,121.5641',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0342,121.5641&hl=zh-TW&z=17&output=embed',
  },
  {
    id: 'spot-english',
    articleId: 'english',
    name: '台北市政府大樓國際貴賓接待廳（留美矽谷律師涉外交流與英語對談現場）',
    district: '信義區',
    address: '台北市信義區市府路1號11樓（市政大樓貴賓室）',
    coordinates: { lat: 25.0378, lng: 121.5638 },
    category: '政治交鋒',
    categoryColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    icon: '🗣️',
    headline: '常春藤賓州大學法學博士與加州執業律師之涉外重鎮，國際使節接待與外語表現考核地',
    description:
      '蔣市府接見各國訪台使節與姐妹市市長之最高外交接待廳。其留美矽谷律師背景曾被視為涉外優勢，在各類正式英語演說與即席外語對話中持續受到各界檢驗。',
    pilgrimageTip:
      '位於市府大樓11樓高層接待廳，一般市民可於一樓市政大廳參觀台北國際姐妹市交流禮品特展。',
    incidentDate: '2023年至2024年',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('台北市政府 台北市信義區市府路1號'),
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=25.0378,121.5638',
    googleEmbedUrl:
      'https://maps.google.com/maps?q=25.0378,121.5638&hl=zh-TW&z=17&output=embed',
  },
];

