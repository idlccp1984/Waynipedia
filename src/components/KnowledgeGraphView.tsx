import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  ArrowRight,
  Info,
  Sparkles,
  Layers,
  Filter,
  Flame,
  ArrowLeft,
  X,
} from 'lucide-react';
import { articles } from '../data/articles';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  category: 'core' | 'hub' | 'infrastructure' | 'policy' | 'meme' | 'controversy' | 'foreign';
  categoryLabel: string;
  icon: string;
  val: number;
  articleId?: string;
  description: string;
  decisionNote?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  label: string;
  type: 'decision' | 'delegate' | 'rhetoric' | 'consequence' | 'meme';
}

const GRAPH_NODES: GraphNode[] = [
  // 1. Central Core Node
  {
    id: 'chiang-core',
    name: '蔣萬安市長 決策核心',
    category: 'core',
    categoryLabel: '首都決策中樞',
    icon: '🏛️',
    val: 46,
    articleId: 'chiang',
    description:
      '第8屆台北市市長，掌舵全台北市重大公共工程、危機應變、涉外交流與社群論述，由李四川、殷瑋與林奕華組成核心施政鐵三角。',
    decisionNote: '核心施政口號：「開創未來，為台北打拚！」',
  },

  // 2. Category Hub Nodes
  {
    id: 'hub-infra',
    name: '重大工程與工務督考',
    category: 'hub',
    categoryLabel: '工程骨幹',
    icon: '🏗️',
    val: 32,
    description: '涵蓋大巨蛋營運、捷運信義線東延段、環狀線第二階段、市場改建與重大BOT標案。',
    decisionNote: '決策模式：由工程老將李四川副市長戴安全帽親臨第一線督軍。',
  },
  {
    id: 'hub-policy',
    name: '民生施政與社福教育',
    category: 'hub',
    categoryLabel: '民生福祉',
    icon: '🏙️',
    val: 32,
    description: 'YouBike前30分鐘免費重啟、班班喝鮮乳自籌款、捷運冷氣調降、育兒津貼與幼教安全。',
    decisionNote: '決策模式：以「三寶爸」暖男慈父形象為出發點，主打市民有感。',
  },
  {
    id: 'hub-meme',
    name: '社群迷因與金句修辭',
    category: 'hub',
    categoryLabel: '當代迷因',
    icon: '🎭',
    val: 32,
    description: 'Trash Time、安鼠之亂、丟甘蔗、明天放、問A答B、時裝週飛行夾克、深蹲換公車。',
    decisionNote: '決策模式：以帥氣顏值、晶晶體英語與溫柔眼神化解所有尖銳質詢。',
  },
  {
    id: 'hub-controversy',
    name: '司法弊案與前朝攻防',
    category: 'hub',
    categoryLabel: '爭議檢驗',
    icon: '⚡',
    val: 32,
    description: '台智光警用監視器子約終止、京華城840%容積率司法風暴、北士科地上權專案調查。',
    decisionNote: '決策模式：定調為「前朝柯市府留下來的歷史爭議」，光速甩鍋安全下莊。',
  },
  {
    id: 'hub-foreign',
    name: '涉外交流與國際外交',
    category: 'hub',
    categoryLabel: '國際涉外',
    icon: '🌐',
    val: 30,
    description: '哈佛大學專題演講、雙城論壇上海行、加州執業律師光環與國際姊妹市接待。',
    decisionNote: '決策模式：大量使用「Taipei is like a hotpot」等多元火鍋修辭學。',
  },

  // 3. Specific Issue Nodes
  // Infrastructure
  {
    id: 'issue-dome',
    name: '台北大巨蛋營運與接水神器',
    category: 'infrastructure',
    categoryLabel: '重大工程',
    icon: '🏟️',
    val: 24,
    articleId: 'dome',
    description: '2023年完工啟用舉辦周杰倫演唱會，但逢暴雨看台持續漏水，研議專利截水引流管。',
    decisionNote: '蔣萬安決策：加速審查核發使照，限期遠雄改善漏水，違者按日開罰。',
  },
  {
    id: 'issue-xinyieast',
    name: '捷運信義線東延段超硬岩盤',
    category: 'infrastructure',
    categoryLabel: '重大工程',
    icon: '🚇',
    val: 22,
    articleId: 'xinyieast',
    description: '挑戰台北捷運30年最硬岩盤與斷層帶，深入地下28米，力拚2025完工、2026通車。',
    decisionNote: '蔣萬安決策：偕同李四川親自下坑道視察潛盾破岩，追加預算力保工期。',
  },
  {
    id: 'issue-mrtring',
    name: '捷運環狀線南北環與東環段',
    category: 'infrastructure',
    categoryLabel: '重大工程',
    icon: '🚊',
    val: 24,
    articleId: 'mrtring',
    description: '歷經營造成本飆漲與數十次流標危機，調增單價後陸續決標，作為內科交通解藥。',
    decisionNote: '蔣萬安決策：邀集營造廠檢討風險分攤，向行政院爭取追加數百億預算。',
  },
  {
    id: 'issue-umb',
    name: '清潔隊700萬金屬遮陽傘',
    category: 'infrastructure',
    categoryLabel: '重大工程',
    icon: '⛱️',
    val: 22,
    articleId: 'umb',
    description: '環保局斥資近700萬採購金色金屬遮陽傘，被封為信義街頭奢華精品地標。',
    decisionNote: '蔣萬安決策：市府力挺工法，強調具抗強風與市容長效美化耐候價值。',
  },
  {
    id: 'issue-nangangbot',
    name: '南港轉運站BOT案嚴重延宕',
    category: 'infrastructure',
    categoryLabel: '重大工程',
    icon: '🏢',
    val: 20,
    articleId: 'nangangbot',
    description: '新光人壽BOT工程嚴重落後逾20%，工地荒廢長草，市府發函最後通牒研議解約接管。',
    decisionNote: '蔣萬安決策：每日連續開罰，做好最壞打算，捍衛市民交通權益。',
  },

  // Policy
  {
    id: 'issue-youbike',
    name: 'YouBike 前30分鐘免費重啟',
    category: 'policy',
    categoryLabel: '市政政策',
    icon: '🚲',
    val: 22,
    articleId: 'youbike',
    description: '兌現競選政見恢復前30分鐘免費，帶動騎乘次數暴增，同步擴充車輛規模。',
    decisionNote: '蔣萬安決策：每年編列約4億元市庫預算補貼，推動綠運輸減碳。',
  },
  {
    id: 'issue-milk',
    name: '生生喝鮮乳市府自籌1.84億',
    category: 'policy',
    categoryLabel: '市政政策',
    icon: '🥛',
    val: 22,
    articleId: 'milk',
    description: '中央「班班有鮮乳」受阻後，台北市自籌預算推動國小學童每週免費鮮乳。',
    decisionNote: '蔣萬安決策：「中央做不到的，台北市來守護！」舉鮮乳對鏡頭燦笑乾杯。',
  },
  {
    id: 'issue-ac',
    name: '捷運小巨蛋冷氣調降2度案',
    category: 'policy',
    categoryLabel: '市政政策',
    icon: '❄️',
    val: 22,
    articleId: 'ac',
    description: '炎炎夏日接獲乘客抱怨車廂悶熱，市長親自拍板將尖峰冷氣降至23度抗高溫。',
    decisionNote: '蔣萬安決策：以有感市民體驗優先於能源法規限制，每年增加數百萬電費。',
  },
  {
    id: 'issue-mrtseats',
    name: '北捷拆立柱撤椅（三顆大藍莓）',
    category: 'policy',
    categoryLabel: '市政政策',
    icon: '🫐',
    val: 20,
    articleId: 'mrtseats',
    description: '為緩解文湖線尖峰擠迫，拆除車廂中央立柱與部分座椅，引發民眾與孕婦不同評價。',
    decisionNote: '蔣萬安決策：捷運局試辦改裝，地板繪製三顆大藍莓標記最大化站立容量。',
  },
  {
    id: 'issue-squat',
    name: '深蹲20次換公車搭乘倡議',
    category: 'policy',
    categoryLabel: '市政政策',
    icon: '🚌',
    val: 20,
    articleId: 'squat',
    description: '提出在公車站牌深蹲20次即可免費搭乘之構想，宣揚全民強健核心肌群減碳。',
    decisionNote: '蔣萬安決策：引發網路爆笑熱議，成為各大站牌前的精神健身圖騰。',
  },

  // Memes
  {
    id: 'issue-rat',
    name: '安鼠之亂（天降活老鼠）',
    category: 'meme',
    categoryLabel: '網路迷因',
    icon: '🐀',
    val: 24,
    articleId: 'rat',
    description: '議會質詢期間天花板突然掉出碩大野生老鼠引發驚呼，隨後市府出動「鼠類偵防師」。',
    decisionNote: '蔣萬安決策：嚴令環保局啟動全市大滅鼠，把老鼠空投昇華為都會刺激冒險。',
  },
  {
    id: 'issue-cane',
    name: '廟會祈福甘蔗回歸花圃',
    category: 'meme',
    categoryLabel: '網路迷因',
    icon: '🎋',
    val: 22,
    articleId: 'cane',
    description: '出席廟會受贈祈福甘蔗，結束後隨手插在路旁花圃土壤中，被讚「落蔗歸根」。',
    decisionNote: '蔣萬安決策：隨行人員隨興處置引發熱議，被解讀為崇尚大自然的質樸心靈。',
  },
  {
    id: 'issue-trashtime',
    name: '接待外賓脫口「Trash Time」',
    category: 'meme',
    categoryLabel: '網路迷因',
    icon: '🗑️',
    val: 24,
    articleId: 'trashtime',
    description: '介紹台灣特有的音樂垃圾車文化時脫口加州晶晶體名詞，外賓困惑表情包瘋傳。',
    decisionNote: '蔣萬安決策：市府回應此為生動親民交流，掀起全台倒垃圾英文大教學。',
  },
  {
    id: 'issue-ab',
    name: '受訪風格神功「問A答B」',
    category: 'meme',
    categoryLabel: '網路迷因',
    icon: '🗣️',
    val: 24,
    articleId: 'ab',
    description: '面對記者刁鑽質詢時，眼神深情凝視鏡頭並回答預設宏觀願景「開創未來」。',
    decisionNote: '蔣萬安決策：催生出「蔣萬安回應產生器」開源網站與反向測驗迷因。',
  },
  {
    id: 'issue-tmr',
    name: 'Threads 霸氣四字「明天放」',
    category: 'meme',
    categoryLabel: '網路迷因',
    icon: '🌪️',
    val: 22,
    articleId: 'tmr',
    description: '颱風天宣布停班停課，在Threads社群平台簡短發布「明天放」，狂吸數萬讚。',
    decisionNote: '蔣萬安決策：打破官僚冗長公告體例文法，獲封「地表最帥市長」。',
  },
  {
    id: 'issue-trendy',
    name: '時裝週飛行夾克與潮台北',
    category: 'meme',
    categoryLabel: '網路迷因',
    icon: '🧥',
    val: 22,
    articleId: 'trendy',
    description: '穿上招牌深藍飛行夾克登上伸展台走台步，顏值迷倒萬千市民，化解預算質疑。',
    decisionNote: '蔣萬安決策：親自代言時尚與音樂新創，鞏固都會潮流貴公子政壇人設。',
  },
  {
    id: 'issue-birdnest',
    name: '排水側溝長茂密山蘇',
    category: 'meme',
    categoryLabel: '網路迷因',
    icon: '🌿',
    val: 18,
    articleId: 'birdnest',
    description: '市區水溝蓋孔隙長出野生鳥巢蕨長勢喜人，引發清淤質疑與綠美化盆景奇觀。',
    decisionNote: '蔣萬安決策：環保局巡檢清除，被網友戲稱「台北水溝都能炒出一盤山蘇」。',
  },

  // Controversy
  {
    id: 'issue-taizhiguang',
    name: '台智光監視器弊案終止子約',
    category: 'controversy',
    categoryLabel: '司法風暴',
    icon: '📹',
    val: 24,
    articleId: 'taizhiguang',
    description: '陳重文議員涉貪引爆台智光案，蔣市府宣布終止警察局3M監視器專案子約。',
    decisionNote: '蔣萬安決策：嚴查合約漏洞並降低每月費率，反擊柯文哲簽訂之母約限制。',
  },
  {
    id: 'issue-corepacific',
    name: '京華城840%容積率司法風暴',
    category: 'controversy',
    categoryLabel: '司法風暴',
    icon: '🏢',
    val: 24,
    articleId: 'corepacific',
    description: '北檢聲請扣押京華城土地，市府面臨是否立即勒令停工之行政法律攻防。',
    decisionNote: '蔣萬安決策：不予施工勘驗實質卡關，依法行政避免國賠風險。',
  },
  {
    id: 'issue-beishike',
    name: '北士科T17/T18地上權爭議',
    category: 'controversy',
    categoryLabel: '司法風暴',
    icon: '🔬',
    val: 22,
    articleId: 'beishike',
    description: '前朝免附投資營運計畫書標給新光人壽引發爭端，市府政風處移送檢調。',
    decisionNote: '蔣萬安決策：成立議會專案調查小組，全面清查會議紀錄與招標SOP。',
  },
  {
    id: 'issue-dazhi',
    name: '基泰大直民宅下陷工安危機',
    category: 'controversy',
    categoryLabel: '司法風暴',
    icon: '🏚️',
    val: 22,
    articleId: 'dazhi',
    description: '建案連續壁破裂導致鄰近公寓陷落一樓，建管處曾回覆無公安之虞遭抨擊。',
    decisionNote: '蔣萬安決策：假扣押基泰資產，成立安置補助專案，修訂第三方監測法規。',
  },

  // Foreign
  {
    id: 'issue-hotpot',
    name: '火鍋修辭學（一稿六用）',
    category: 'foreign',
    categoryLabel: '國際涉外',
    icon: '🍲',
    val: 22,
    articleId: 'hotpot',
    description: '在哈佛演講與接待多國使節時，反覆形容「Taipei is like a big hotpot!」。',
    decisionNote: '蔣萬安決策：以火鍋包容百料為喻，成為市府外交致詞公版萬用範本。',
  },
  {
    id: 'issue-english',
    name: '矽谷律師英語與晶晶體風格',
    category: 'foreign',
    categoryLabel: '國際涉外',
    icon: '🇺🇸',
    val: 22,
    articleId: 'english',
    description: '具備加州律師執照與賓大法學博士光環，演講時偶爾夾雜晶晶體成為標誌。',
    decisionNote: '蔣萬安決策：自信開口與外賓互動，強調首長涉外溝通無障礙。',
  },
];

const GRAPH_LINKS: GraphLink[] = [
  // Core to Hubs
  { source: 'chiang-core', target: 'hub-infra', label: '川伯戴安全帽督工', type: 'delegate' },
  { source: 'chiang-core', target: 'hub-policy', label: '三寶爸親民施政', type: 'decision' },
  { source: 'chiang-core', target: 'hub-meme', label: '顏值自帶迷因光環', type: 'meme' },
  { source: 'chiang-core', target: 'hub-controversy', label: '定調前朝歷史包袱', type: 'rhetoric' },
  { source: 'chiang-core', target: 'hub-foreign', label: '加州律師涉外接待', type: 'rhetoric' },

  // Hubs to Infrastructure
  { source: 'hub-infra', target: 'issue-dome', label: '加速使照與漏水管改善', type: 'decision' },
  { source: 'hub-infra', target: 'issue-xinyieast', label: '親赴地底28米督破岩', type: 'delegate' },
  { source: 'hub-infra', target: 'issue-mrtring', label: '調增預算突破流標', type: 'decision' },
  { source: 'hub-infra', target: 'issue-umb', label: '斥資700萬金屬遮陽傘', type: 'consequence' },
  { source: 'hub-infra', target: 'issue-nangangbot', label: '發函通牒研議接管', type: 'decision' },

  // Hubs to Policy
  { source: 'hub-policy', target: 'issue-youbike', label: '重啟前30分鐘免費', type: 'decision' },
  { source: 'hub-policy', target: 'issue-milk', label: '市府自籌1.84億鮮乳', type: 'decision' },
  { source: 'hub-policy', target: 'issue-ac', label: '市長拍板降溫調降2度', type: 'decision' },
  { source: 'hub-policy', target: 'issue-mrtseats', label: '車廂立柱座椅拆除', type: 'consequence' },
  { source: 'hub-policy', target: 'issue-squat', label: '深蹲20次換公車搭乘', type: 'meme' },

  // Hubs to Memes
  { source: 'hub-meme', target: 'issue-rat', label: '天花板迫降活老鼠', type: 'consequence' },
  { source: 'hub-meme', target: 'issue-cane', label: '祈福甘蔗回歸花圃大地', type: 'meme' },
  { source: 'hub-meme', target: 'issue-trashtime', label: '脫口加州晶晶體英語', type: 'rhetoric' },
  { source: 'hub-meme', target: 'issue-ab', label: '問A答B暢談開創未來', type: 'rhetoric' },
  { source: 'hub-meme', target: 'issue-tmr', label: 'Threads霸氣明天放', type: 'meme' },
  { source: 'hub-meme', target: 'issue-trendy', label: '時裝週帥氣台步走秀', type: 'meme' },
  { source: 'hub-meme', target: 'issue-birdnest', label: '水溝隙縫長茂密山蘇', type: 'meme' },

  // Hubs to Controversies
  { source: 'hub-controversy', target: 'issue-taizhiguang', label: '終止警用監視器專案子約', type: 'decision' },
  { source: 'hub-controversy', target: 'issue-corepacific', label: '不予勘驗避免國賠', type: 'decision' },
  { source: 'hub-controversy', target: 'issue-beishike', label: '議會專案小組移送檢調', type: 'delegate' },
  { source: 'hub-controversy', target: 'issue-dazhi', label: '假扣押基泰資產安置', type: 'consequence' },

  // Hubs to Foreign
  { source: 'hub-foreign', target: 'issue-hotpot', label: '哈佛演講一稿六用火鍋', type: 'rhetoric' },
  { source: 'hub-foreign', target: 'issue-english', label: '加州矽谷律師資歷展示', type: 'rhetoric' },

  // Cross-link synergy
  { source: 'issue-trashtime', target: 'issue-english', label: '晶晶體代表作', type: 'meme' },
  { source: 'issue-hotpot', target: 'issue-ab', label: '萬用公版修辭演算法', type: 'rhetoric' },
  { source: 'issue-dome', target: 'issue-umb', label: '公共設施奢華地標', type: 'consequence' },
  { source: 'issue-rat', target: 'issue-ab', label: '以開創未來化解滅鼠', type: 'decision' },
];

const CATEGORY_COLORS: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  core: { bg: '#d97706', border: '#fef08a', glow: 'rgba(245, 158, 11, 0.4)', text: '#ffffff' },
  hub: { bg: '#2563eb', border: '#93c5fd', glow: 'rgba(37, 99, 235, 0.3)', text: '#ffffff' },
  infrastructure: { bg: '#ea580c', border: '#fdba74', glow: 'rgba(234, 88, 12, 0.3)', text: '#ffffff' },
  policy: { bg: '#059669', border: '#86efac', glow: 'rgba(5, 150, 105, 0.3)', text: '#ffffff' },
  meme: { bg: '#e11d48', border: '#fca5a5', glow: 'rgba(225, 29, 72, 0.3)', text: '#ffffff' },
  controversy: { bg: '#7c3aed', border: '#d8b4fe', glow: 'rgba(124, 58, 237, 0.3)', text: '#ffffff' },
  foreign: { bg: '#0284c7', border: '#7dd3fc', glow: 'rgba(2, 132, 199, 0.3)', text: '#ffffff' },
};

interface KnowledgeGraphViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
}

export function KnowledgeGraphView({ onSelectArticle, onNavigateHome }: KnowledgeGraphViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(GRAPH_NODES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Filter nodes based on category filter & search query
  const filteredNodes = useMemo(() => {
    return GRAPH_NODES.filter((node) => {
      const matchesCat =
        activeCategoryFilter === 'all' ||
        node.category === 'core' ||
        node.category === 'hub' ||
        node.category === activeCategoryFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategoryFilter, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredLinks = useMemo(() => {
    return GRAPH_LINKS.filter((l) => {
      const srcId = typeof l.source === 'string' ? l.source : l.source.id;
      const tgtId = typeof l.target === 'string' ? l.target : l.target.id;
      return filteredNodeIds.has(srcId) && filteredNodeIds.has(tgtId);
    });
  }, [filteredNodeIds]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth || 900;
    const height = 650;

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', height);

    // Defs for arrow markers & drop shadows
    const defs = svg.append('defs');

    // Marker for link arrows
    defs
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#94a3b8');

    // Glow filters
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Container for zoom
    const container = svg.append('g').attr('class', 'graph-container');

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Clone data for simulation
    const simulationNodes: GraphNode[] = filteredNodes.map((d) => ({ ...d }));
    const simulationLinks: GraphLink[] = filteredLinks.map((d) => ({ ...d }));

    // Force simulation
    const simulation = d3
      .forceSimulation<GraphNode>(simulationNodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(simulationLinks)
          .id((d) => d.id)
          .distance((d) => {
            const src = typeof d.source === 'object' ? d.source.id : d.source;
            if (src === 'chiang-core') return 160;
            return 110;
          })
      )
      .force('charge', d3.forceManyBody().strength(-380))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d) => (d as GraphNode).val + 16));

    // Links render
    const linkGroup = container.append('g').attr('class', 'links');
    const link = linkGroup
      .selectAll('line')
      .data(simulationLinks)
      .enter()
      .append('line')
      .attr('stroke', '#64748b')
      .attr('stroke-opacity', 0.45)
      .attr('stroke-width', (d) => (d.type === 'decision' ? 2 : 1.2))
      .attr('stroke-dasharray', (d) => (d.type === 'meme' ? '4,4' : 'none'))
      .attr('marker-end', 'url(#arrow)');

    // Link label texts
    const linkLabels = container
      .append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(simulationLinks)
      .enter()
      .append('text')
      .attr('font-size', 9)
      .attr('font-family', 'sans-serif')
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('dy', -3)
      .text((d) => d.label);

    // Nodes render
    const nodeGroup = container.append('g').attr('class', 'nodes');
    const node = nodeGroup
      .selectAll<SVGGElement, GraphNode>('g')
      .data(simulationNodes)
      .enter()
      .append('g')
      .attr('class', 'node-item')
      .attr('cursor', 'pointer')
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on('click', (_, d) => {
        setSelectedNode(d);
      })
      .on('mouseenter', (_, d) => {
        setHoveredNode(d);
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
      });

    // Outer glow circle
    node
      .append('circle')
      .attr('r', (d) => d.val + 4)
      .attr('fill', (d) => CATEGORY_COLORS[d.category]?.glow || 'rgba(255,255,255,0.1)')
      .attr('opacity', (d) => (d.category === 'core' ? 0.9 : 0.4));

    // Core circle
    node
      .append('circle')
      .attr('r', (d) => d.val)
      .attr('fill', (d) => CATEGORY_COLORS[d.category]?.bg || '#334155')
      .attr('stroke', (d) => CATEGORY_COLORS[d.category]?.border || '#ffffff')
      .attr('stroke-width', (d) => (d.category === 'core' ? 3.5 : 2))
      .attr('filter', (d) => (d.category === 'core' ? 'url(#glow)' : 'none'));

    // Emoji icon in node center
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => (d.category === 'core' ? 10 : 6))
      .attr('font-size', (d) => (d.category === 'core' ? 24 : d.val > 24 ? 18 : 14))
      .text((d) => d.icon);

    // Node label below
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.val + 14)
      .attr('font-size', (d) => (d.category === 'core' ? 13 : d.category === 'hub' ? 11 : 10))
      .attr('font-weight', (d) => (d.category === 'core' || d.category === 'hub' ? 'bold' : '500'))
      .attr('fill', 'currentColor')
      .attr('class', 'text-neutral-800 dark:text-neutral-100 drop-shadow-sm select-none')
      .text((d) => d.name);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as GraphNode).x || 0)
        .attr('y1', (d) => (d.source as GraphNode).y || 0)
        .attr('x2', (d) => (d.target as GraphNode).x || 0)
        .attr('y2', (d) => (d.target as GraphNode).y || 0);

      linkLabels
        .attr('x', (d) => (((d.source as GraphNode).x || 0) + ((d.target as GraphNode).x || 0)) / 2)
        .attr('y', (d) => (((d.source as GraphNode).y || 0) + ((d.target as GraphNode).y || 0)) / 2);

      node.attr('transform', (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [filteredNodes, filteredLinks]);

  // Zoom control helpers
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.7);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <button
            onClick={onNavigateHome}
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 mb-2 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回百科首頁</span>
          </button>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-2.5">
            <Network className="w-7 h-7 text-blue-600" />
            <span>市政議題與蔣萬安決策知識圖譜</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            基於 d3 力導向物理引擎，可視化呈現台北市重大工程、民生政策、司法爭議與網路金句迷因之間的決策連動網絡。
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-[11px]">
          <span className="text-neutral-400 mr-1">圖例：</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/30">
            🏛️ 決策中樞
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/30">
            🏗️ 樞紐分類
          </span>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/30">
            🎭 網路迷因
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30">
            🏙️ 民生政策
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/30">
            ⚡ 爭議風暴
          </span>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>分類過濾：</span>
          </span>
          {[
            { id: 'all', label: '全部議題節點' },
            { id: 'infrastructure', label: '🏗️ 重大工程' },
            { id: 'policy', label: '🏙️ 市政政策' },
            { id: 'meme', label: '🎭 網路迷因' },
            { id: 'controversy', label: '⚡ 爭議危機' },
            { id: 'foreign', label: '🌐 國際涉外' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeCategoryFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px] flex-1 sm:flex-initial">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋圖譜節點（如：大巨蛋、老鼠、鮮乳）..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Main Graph Canvas & Sidebar Split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* SVG Graph Viewport (3 Cols) */}
        <div className="lg:col-span-3 bg-white dark:bg-[#111419] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs relative">
          {/* Zoom controls floating bar */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 p-1 rounded-lg bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xs border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="放大圖譜"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="縮小圖譜"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="重設視角"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Hint */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none text-[11px] text-neutral-400 bg-white/80 dark:bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs border border-neutral-200/50 dark:border-neutral-800/50 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>支援滾輪縮放、畫布拖曳、物理節點拖拉與點擊探索</span>
          </div>

          {/* SVG Element */}
          <svg
            ref={svgRef}
            className="w-full h-[620px] select-none cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* Selected Node Inspector Drawer (1 Col) */}
        <div className="lg:col-span-1 bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-5 sticky top-20">
          {selectedNode ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase">
                  {selectedNode.categoryLabel}
                </span>
                <span className="text-2xl">{selectedNode.icon}</span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100 leading-snug">
                  {selectedNode.name}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {selectedNode.decisionNote && (
                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>決策模式與風格定調：</span>
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 italic">
                    {selectedNode.decisionNote}
                  </p>
                </div>
              )}

              {/* Action: Open article if mapped */}
              {selectedNode.articleId && (
                <div className="pt-2">
                  <button
                    onClick={() => onSelectArticle(selectedNode.articleId!)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <span>閱讀完整百科條目</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-400 space-y-2">
              <Info className="w-6 h-6 mx-auto opacity-50" />
              <p className="text-xs">點擊左側任一圖譜節點，查看市政議題與決策連動脈絡</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
