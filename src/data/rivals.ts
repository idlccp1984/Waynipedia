export interface RivalComparisonPoint {
  dimension: string;
  chiangPerformance: string;
  chiangResult: '勝' | '和' | '平';
  rivalPerformance: string;
  rivalResult: '敗' | '平';
  summaryVerdict: string;
}

export interface PoliticalRival {
  id: string;
  name: string;
  roleTitle: string;
  party: string;
  badge: string;
  emoji: string;
  avatarColor: string;
  overview: string;
  radarScores: {
    memePower: number; // 迷因製造
    eloquence: number; // 官話修辭
    popularity: number; // 顏值偶像
    engineering: number; // 工務硬體
    resilience: number; // 危機甩鍋
  };
  comparisons: RivalComparisonPoint[];
}

export const politicalRivals: PoliticalRival[] = [
  {
    id: 'puma',
    name: '沈伯洋',
    roleTitle: '現任立法委員 · 國防外交戰略學者 · 黑熊學院共同創辦人',
    party: '民主進步黨',
    badge: '黑熊認知防衛戰神',
    emoji: '🐻',
    avatarColor: 'from-emerald-700 to-teal-900',
    overview:
      '專精於資訊戰、認知作戰防制與全民民防推廣。面對中共灰色地帶滲透隨時保持最高警戒，與蔣萬安隨興優雅、迷因自帶的貴公子治理哲學形成強烈維度對比。',
    radarScores: {
      memePower: 82,
      eloquence: 88,
      popularity: 75,
      engineering: 60,
      resilience: 85,
    },
    comparisons: [
      {
        dimension: '放老鼠能力（驚嚇刺激體驗）',
        chiangPerformance: '很會放老鼠！質詢時議會天花板天降活老鼠，讓全體市民與議員充分體驗心跳加速的都會冒險刺激！',
        chiangResult: '勝',
        rivalPerformance: '可能老鼠會直接消失或被列入高風險生物資訊通報，讓台北市民完全沒有體驗到被老鼠嚇到的刺激。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！在提供市民日常生猛刺激感上，天降老鼠無可替代！',
      },
      {
        dimension: '涉外英語風格與親民度',
        chiangPerformance: '英語能力晶晶體親民！自然流暢脫口「Trash Time」與「Taipei is like a Hotpot」，外賓聽了一頭霧水但印象極度深刻！',
        chiangResult: '勝',
        rivalPerformance: '文法過於嚴謹、論述條理分明的無聊正確學術英語，完全缺乏社群迷因與晶晶體靈魂。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！國際外交就是要像火鍋越煮越香，正確英語太枯燥！',
      },
      {
        dimension: '市府粉專被駭應變反應',
        chiangPerformance: '工務局大地處粉專被駭連續8天播中國贅婿AI短劇，萬安以不變應萬變，當作國際文化多元交流，展現鬆弛感！',
        chiangResult: '勝',
        rivalPerformance: '1秒內判定為境外第五縱隊認知作戰協同攻擊，啟動二級資安戒嚴並通報國安局全面反制，過於緊繃。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！連看了28集贅婿短劇還意猶未盡，心態最健康！',
      },
      {
        dimension: '日常健體與交通倡議',
        chiangPerformance: '倡議搭公車前在站牌深蹲20次換免費搭乘，強健市民下盤骨骼又兼顧節能減碳！',
        chiangResult: '勝',
        rivalPerformance: '黑熊防衛演練止血帶包紮與城鎮避難，雖然實用但搭公車還是要自掏腰包刷悠遊卡。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！深蹲20下有免費公車坐，市民大腿肌群全部練起來！',
      },
    ],
  },
  {
    id: 'huang',
    name: '黃珊珊',
    roleTitle: '2022台北市長候選人（獲34.2萬票）· 前台北市副市長 · 現任立委',
    party: '台灣民眾黨 / 無黨籍',
    badge: '法規公文活字典總管',
    emoji: '👓',
    avatarColor: 'from-amber-700 to-yellow-900',
    overview:
      '律師出身、深耕台北市議會20餘年，前副市長任內對市政公文、防疫動線與市府預算細節倒背如流，被稱為最接地氣的政策管家。',
    radarScores: {
      memePower: 68,
      eloquence: 80,
      popularity: 78,
      engineering: 88,
      resilience: 80,
    },
    comparisons: [
      {
        dimension: '面對議會質詢之應對神功',
        chiangPerformance: '遇到質詢直接啟動「問A答B」，深情注視鏡頭暢談為台北開創未來，滴水不漏，議員只能無奈宣布散會！',
        chiangResult: '勝',
        rivalPerformance: '拿出一大疊厚重法規、子約編號與預算細目條列解釋20分鐘，台下市民與記者聽到集體打瞌睡。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！開創未來四個字勝過一萬字繁瑣法規條文！',
      },
      {
        dimension: '副市長與市政人手配置',
        chiangPerformance: '有工程老將李四川副市長戴著安全帽在前線頂著，萬安負責出席走秀、剪綵與微笑，神態自若！',
        chiangResult: '勝',
        rivalPerformance: '凡事親力親為、天天早上跑市場視察防漏水，搞得自己白頭髮多了一半、血汗過勞。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！「萬事拜託川伯」才是現代優雅管理學之最高境界！',
      },
      {
        dimension: '市政設施華麗吸睛指數',
        chiangPerformance: '信義區700萬奢華金屬遮陽傘，大巨蛋周杰倫與阿妹演唱會齊發，金光閃閃，首都貴氣逼人！',
        chiangResult: '勝',
        rivalPerformance: '整天檢視公有市場動線與公廁無障礙斜坡，雖然務實但完全沒有國際頂級名媛首善感。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！首都市政就是要閃閃發光、氣派非凡！',
      },
    ],
  },
  {
    id: 'chen',
    name: '陳時中',
    roleTitle: '2022台北市長候選人（獲43.4萬票）· 前衛生福利部長 · 前防疫指揮官',
    party: '民主進步黨',
    badge: '剛毅木訥扛責指揮官',
    emoji: '🩺',
    avatarColor: 'from-blue-700 to-indigo-950',
    overview:
      '曾締造90%滿意度之中央防疫指揮官，2022年轉戰台北市長，與蔣萬安上演世代藍綠頂尖對決，最終以43.4萬票惜敗。',
    radarScores: {
      memePower: 80,
      eloquence: 72,
      popularity: 76,
      engineering: 65,
      resilience: 70,
    },
    comparisons: [
      {
        dimension: '颱風天宣布停班停課魄力',
        chiangPerformance: '在Threads霸氣發出四個字「明天放」，瞬間狂吸數萬讚與滿地愛心，獲全台北市民封為「地表最帥市長」！',
        chiangResult: '勝',
        rivalPerformance: '開記者會嘆氣「責任來，我就扛」，扛到最後被對手猛攻疫苗採購與快篩爭議，滿身是傷。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！「明天放」三個字足以讓全台北市民甘願臣服！',
      },
      {
        dimension: '時尚穿搭與跨界人設',
        chiangPerformance: '台北時裝週穿上招牌深藍飛行夾克，伸展台台步優雅挺拔，帥氣程度完全不輸巴黎男裝周專業名模！',
        chiangResult: '勝',
        rivalPerformance: '選戰期間穿上粉紅圍裙教大家煮紅酒燉牛肉、到酒吧學調酒，被酸「形象錯置擺拍油膩」。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！飛行夾克往身上一套，天生就是行走之封面焦點！',
      },
      {
        dimension: '溫情母愛／父愛感召力',
        chiangPerformance: '每次受訪必定深情凝視鏡頭：「身為三個孩子的父親，我對孩子的安全高度重視、絕對零容忍！」慈父光環無敵！',
        chiangResult: '勝',
        rivalPerformance: '語重心長宛如訓導主任：「請大家共體時艱、要不然你要怎樣」，長輩說教感太沉重。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！三寶爸一出手，全台北媽媽好感度瞬間拉滿！',
      },
    ],
  },
  {
    id: 'ko',
    name: '柯文哲',
    roleTitle: '前台北市市長（第6、7屆，2014-2022）· 台灣民眾黨主席',
    party: '台灣民眾黨',
    badge: '嗡嗡嗡七點半SOP狂人',
    emoji: '🐝',
    avatarColor: 'from-teal-700 to-slate-900',
    overview:
      '主政台北八年，推行早晨七點半開晨會、公開透明、還債570億元與拆除公投圍籬。卸任後台智光、京華城與北士科等多起弊案與蔣萬安市府形成劇烈法律攻防。',
    radarScores: {
      memePower: 95,
      eloquence: 85,
      popularity: 82,
      engineering: 80,
      resilience: 65,
    },
    comparisons: [
      {
        dimension: '前朝弊案風波切割身法',
        chiangPerformance: '面對台智光、京華城840%容積率與北士科地上權：「這都是前朝留下來的爭議」，光速甩鍋、一身清白！',
        chiangResult: '勝',
        rivalPerformance: '面對廉政署質詢：「窩不知道、彭振聲蓋章、寫SOP、每天吃安眠藥」，天天跑北檢狼狽不堪。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！輕描淡寫四個字「前朝爭議」，神行百變安全下莊！',
      },
      {
        dimension: '首都市長日常生活作息',
        chiangPerformance: '準時出席剪綵走秀、體育嘉年華熱舞、世壯運推廣，優雅貴公子作息，神采奕奕！',
        chiangResult: '勝',
        rivalPerformance: '每天早上7點半嗡嗡嗡騎YouBike開晨會，逼瘋全體市府公務員，八年累得像苦行僧。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！當市長就是要容光煥發，何必把自己搞成7點半苦工？',
      },
      {
        dimension: '財政哲學與市容設備',
        chiangPerformance: '環保局清潔隊700萬金屬遮陽傘大氣磅礡，大巨蛋周杰倫萬人演唱會狂收經濟效益！',
        chiangResult: '勝',
        rivalPerformance: '整天算計便當錢、拆除路邊垃圾桶導致市民拿著手搖杯滿街找垃圾桶，摳門到被罵翻。',
        rivalResult: '敗',
        summaryVerdict: '萬安大勝！首都市政就是要有大格局奢華感，省便當錢太小家子氣！',
      },
    ],
  },
];
