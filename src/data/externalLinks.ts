export interface ExternalSiteResource {
  id: string;
  title: string;
  url: string;
  category: '時事互動' | '迷因工具' | '遊戲闖關' | '身世考證' | '社群彈幕' | '公民監督';
  tagline: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
  highlights: string[];
  buttonText: string;
  isFeatured?: boolean;
}

export const externalLinksData: ExternalSiteResource[] = [
  {
    id: 'reporter-quiz',
    title: '「你知道記者剛剛問蔣萬安什麼嗎？」',
    url: 'https://tight-sunset-9f4c.dmj890145.workers.dev',
    category: '時事互動',
    tagline: '記者現場聯訪快問快答辨識模擬互動',
    description:
      '專門實測「你聽得懂記者的提問與蔣萬安的應答嗎？」的時事互動測驗站。收錄蔣萬安歷次記者堵訪與時事聯訪中，面對各類尖銳政壇問題時的經典應對反應，讓使用者挑戰是否真能聽懂記者剛剛問的關鍵提問。',
    icon: '🎙️',
    badge: '時事快問',
    badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30',
    highlights: [
      '還原各大新聞台現場堵訪實境問答',
      '四選一隨堂快問，測試時事即時敏銳度',
      '考驗大眾對官式回答與記者提問的精準對接',
    ],
    buttonText: '立即造訪快問站 ↗',
    isFeatured: true,
  },
  {
    id: 'response-generator',
    title: '🤖「蔣萬安回應產生器」',
    url: 'https://jiangwanan-generator.pages.dev',
    category: '迷因工具',
    tagline: '滴水不漏！一鍵生成四平八穩的標準市府官式金句',
    description:
      '精確模擬蔣萬安發言核心公式的風格產生器。整合「我們高度重視、密切掌握、依照SOP落實、嚴正關切、全力以赴」等經典文官應對詞庫模組，面對任何市政難題都能立即產出四平八穩、絕對不出錯的標準發言範本。',
    icon: '🤖',
    badge: 'AI 語錄工具',
    badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/30',
    highlights: [
      '內建萬用市府官式辭彙與文法組合模組',
      '一鍵隨機生成四平八穩的典範新聞回應稿',
      '支援一鍵複製、快速轉發至各大社群平台',
    ],
    buttonText: '進入回應產生器 ↗',
    isFeatured: true,
  },
  {
    id: 'who-is-grandpa-game',
    title: '🎮「蔣出來」互動闖關遊戲',
    url: 'https://whoismygrandpa.win/game',
    category: '遊戲闖關',
    tagline: '身世疑雲與政壇話題趣味互動闖關小遊戲',
    description:
      '由民間社群開發的網頁互動小遊戲（whoismygrandpa.win/game）。以趣味的像素卡通視覺、問答闖關與政壇熱門時事迷因，帶領玩家在闖關解謎的遊戲節奏中探索家族身世歷程與各方話題。',
    icon: '🎮',
    badge: '互動小遊戲',
    badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30',
    highlights: [
      '免安裝免下載，跨平台流暢運行的網頁輕量小遊戲',
      '生動逗趣的關卡設計與政壇名場面彩蛋',
      '結合答題挑戰與趣味計分成就系統',
    ],
    buttonText: '開始遊戲闖關 ↗',
    isFeatured: true,
  },
  {
    id: 'who-is-grandpa-main',
    title: '📜「蔣出來」身世考證資訊主站',
    url: 'https://whoismygrandpa.win',
    category: '身世考證',
    tagline: '家族血緣考證、歷史檔案文獻與爭議時間軸',
    description:
      '「蔣出來」（Who is my grandpa?）專題研究資訊主站。深度彙整蔣萬安（原名章萬安）家族身世脈絡、蔣經國日記紀載、郭禮伯將軍回憶錄《我的回憶》比對、章亞若歷史紀錄及章孝嚴改姓法令程序等第一手歷史史料，提供客觀嚴謹的文獻檔案庫。',
    icon: '📜',
    badge: '歷史考證專站',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
    highlights: [
      '兩蔣日記與郭禮伯回憶錄文獻考證對照',
      '從「章萬安」到「蔣萬安」的戶籍謄本與改姓程序紀律',
      '條理分明的歷史文獻年表與第三方學者考證分析',
    ],
    buttonText: '造訪考證資訊主站 ↗',
    isFeatured: true,
  },
  {
    id: 'taipei-puma-barrage',
    title: '💬 台北心動彈幕',
    url: 'https://kookisky.github.io/puma/',
    category: '社群彈幕',
    tagline: '即時社群彈幕牆 · 市民吐槽與心動共鳴',
    description:
      '滿版流動的「台北心動彈幕」互動視覺網站（kookisky.github.io/puma/）。即時滾動各大社群平台對台北市政決策、焦點事件與政治金句的即時留言，讓網友的心聲如流星般穿梭螢幕，生動反映網路民意熱度。',
    icon: '💬',
    badge: '即時彈幕牆',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    highlights: [
      '滿版沉浸式動態彈幕視覺渲染流動',
      '匯流網路鄉民即時時事金句與幽默吐槽',
      '流暢動畫效果，生動呈現社群民意脈動',
    ],
    buttonText: '開啟心動彈幕牆 ↗',
    isFeatured: true,
  },
  {
    id: 'taipei-council-records',
    title: '🏛️ 台北市議會公報暨隨選影音系統',
    url: 'https://www.tcc.gov.tw',
    category: '公民監督',
    tagline: '市議員質詢影音紀錄、議會公報全紀錄檢索',
    description:
      '台北市議會官方公開資料庫。包含全體議員歷次大會質詢影片、市政總質詢逐字紀錄、法規審查紀錄與預算審查公報，是檢驗台北市政推動與首長答詢表現之官方權威來源。',
    icon: '🏛️',
    badge: '官方議會紀錄',
    badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
    highlights: [
      '提供完整大會及各委員會質詢影音隨選回放',
      '市政總質詢與施政報告官方會議紀錄',
      '台北市法規案與市府提案審查進度追蹤',
    ],
    buttonText: '前往台北市議會 ↗',
  },
  {
    id: 'sunshine-political-donations',
    title: '☀️ 監察院陽光法令政治獻金公開專區',
    url: 'https://ardata.cy.gov.tw',
    category: '公民監督',
    tagline: '台北市長歷任選舉政治獻金收支公開查閱平台',
    description:
      '中華民國監察院陽光法令公開查詢系統。提供歷次公職人員選舉候選人政治獻金專戶收支明細、個人與營利事業捐贈統計，落實陽光政治與公民財務監督。',
    icon: '☀️',
    badge: '陽光公帑監督',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
    highlights: [
      '候選人選舉政治獻金收入與支出明細公開查閱',
      '營利事業與個人捐助來源依法申報紀錄',
      '落實公民知情權與政治透明度監督',
    ],
    buttonText: '查詢政治獻金紀錄 ↗',
  },
  {
    id: 'tfc-taiwan',
    title: '🔍 台灣事實查核中心 (TFC)',
    url: 'https://tfc-taiwan.org.tw',
    category: '公民監督',
    tagline: '獨立公正的第三方公共時事查核報告',
    description:
      '通過國際事實查核聯盟（IFCN）認證的台灣獨立查核機構。針對重大市政時事傳聞、社群爭議圖卡與選舉訊息進行嚴格溯源求證與查證報告發布。',
    icon: '🔍',
    badge: '事實查核認證',
    badgeColor: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/30',
    highlights: [
      '符合國際事實查核標準準則的獨立求證',
      '還原新聞原始脈絡與闢謠報告',
      '提升公民媒體素養與資訊識讀能力',
    ],
    buttonText: '瀏覽查核報告 ↗',
  },
];
