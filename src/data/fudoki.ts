export interface FudokiItem {
  id: string;
  keyword: string;
  emoji: string;
  subtitle: string;
  articleId: string;
  articleTitle: string;
  category: string;
  quote: string;
  humorNote: string;
}

export const fudokiItems: FudokiItem[] = [
  {
    id: 'rat',
    keyword: '老鼠（安鼠之亂）',
    emoji: '🐀',
    subtitle: '議會天花板迫降之活老鼠',
    articleId: 'rat',
    articleTitle: '台北市議會質詢天花板掉落活老鼠事件',
    category: '市政政策',
    quote: '「市長在質詢，天上掉老鼠！」',
    humorNote:
      '天花板突然掉出碩大野生老鼠引發議員尖叫，市府隨後緊急宣布調派「鼠類偵防師」展開跨局處全市大滅鼠，讓台北市民充分體驗隨時可能被老鼠空投嚇到的都會刺激感。',
  },
  {
    id: 'mrtseats',
    keyword: '三顆大藍莓',
    emoji: '🫐',
    subtitle: '北捷手扶梯與拆座椅改裝意象',
    articleId: 'mrtseats',
    articleTitle: '台北捷運文湖線改裝拆除部分立柱與座椅爭議',
    category: '市政政策',
    quote: '「藍莓一顆、兩顆、三顆，乘客站立空間最大化！」',
    humorNote:
      '為紓解文湖線尖峰擁擠，捷運局大刀闊斧拆除車廂中間立柱與部分座椅，月台地貼與手扶梯告示出現三顆深藍圓形標記，被網友戲稱為台北市區最值錢的「三顆大藍莓」。',
  },
  {
    id: 'umb',
    keyword: '天價遮陽傘',
    emoji: '⛱️',
    subtitle: '清潔隊700萬奢華金色金屬傘',
    articleId: 'umb',
    articleTitle: '台北市政府環保局清潔隊700萬遮陽傘爭議',
    category: '重大工程',
    quote: '「清潔隊的遮陽傘，比信義區精品店還要閃亮！」',
    humorNote:
      '環保局斥資近700萬元採購信義區與市府周邊金屬遮陽傘，遭民代質疑價格昂貴堪比精品，市府強調具備抗十級強風與美化市容之長效耐候功能。',
  },
  {
    id: 'birdnest',
    keyword: '水溝長山蘇',
    emoji: '🌿',
    subtitle: '市區側溝水泥隙縫之野生蕨類',
    articleId: 'birdnest',
    articleTitle: '台北市區排水側溝長出茂密山蘇爭議',
    category: '市政政策',
    quote: '「連水溝蓋都能炒一盤山蘇，台北生態太強大了！」',
    humorNote:
      '市民在熱鬧市區人行道側溝孔隙發現野生鳥巢蕨（山蘇）長勢極為茂盛，拍照上傳社群引爆熱議，意外成為檢驗市府清淤效率與盆地自然共生的迷因風物。',
  },
  {
    id: 'meth',
    keyword: '美沙冬替代法',
    emoji: '💊',
    subtitle: '辯論會神級避重就輕修辭學',
    articleId: 'meth',
    articleTitle: '2022台北市長電視辯論會美沙冬發言爭議',
    category: '選戰政治',
    quote: '「面對質詢別慌張，開口就談美沙冬！」',
    humorNote:
      '在2022市長辯論會上，面對對手尖銳追問深水區政策，蔣萬安冷靜從容轉而大篇幅暢談美沙冬戒癮替代療法，展示「問東答西、滴水不漏」的辯論傳奇走位。',
  },
  {
    id: 'cane',
    keyword: '丟甘蔗（回歸花圃）',
    emoji: '🎋',
    subtitle: '祈福甘蔗直接插進花圃土壤',
    articleId: 'cane',
    articleTitle: '廟會祈福甘蔗隨手丟棄花圃風波',
    category: '個人爭議',
    quote: '「甘蔗本來就是植物，回歸花圃大地剛剛好！」',
    humorNote:
      '出席地方廟會受贈祈福甘蔗，活動結束後隨行人員順手將整根甘蔗插在路邊花圃土壤中被民眾拍照發網，引爆「落蔗歸根」、「隨興綠美化」之熱烈討論。',
  },
  {
    id: 'trashtime',
    keyword: 'Trash Time',
    emoji: '🗑️',
    subtitle: '向外賓介紹垃圾車的加州晶晶體名詞',
    articleId: 'trashtime',
    articleTitle: '蔣萬安向外賓介紹垃圾車脫口「trash time」事件',
    category: '網路迷因',
    quote: '「When you hear the music, you know it is Trash Time!」',
    humorNote:
      '接待國際外賓被問及台灣特有的古典音樂垃圾車文化時，脫口而出加州律師風格之「Trash Time」，外賓當場露出困惑微笑，瞬間席捲各大社群迷因版面。',
  },
  {
    id: 'hotpot',
    keyword: '火鍋修辭學',
    emoji: '🍲',
    subtitle: '一稿六用的國際外交 Hotpot 比喻',
    articleId: 'hotpot',
    articleTitle: '蔣萬安「台北就像一鍋火鍋」多次致詞比喻風波',
    category: '個人爭議',
    quote: '「Taipei is like a big, boiling hotpot!」',
    humorNote:
      '從哈佛大學專題演講到接待各國姊妹市訪問團，屢次將台北多元包容比喻為「就像一鍋熱氣騰騰的火鍋」，被戲稱為市府外交演講公版萬用範本。',
  },
  {
    id: 'trendy',
    keyword: '時裝週飛行夾克',
    emoji: '🧥',
    subtitle: '台北時裝週行走之男模政客戰袍',
    articleId: 'trendy',
    articleTitle: '台北時裝週市長走秀與「潮台北 TRENDY TAIPEI」爭議',
    category: '網路迷因',
    quote: '「市長拉鍊拉上一半，全台北市民都被帥暈了！」',
    humorNote:
      '身著俐落飛行夾克親自登上時裝週伸展台走台步，被盛讚顏值撐起首都門面，即便遭遇預算質詢，飛行夾克依然能安定廣大顏值支持者的心靈。',
  },
  {
    id: 'squat',
    keyword: '深蹲換公車',
    emoji: '🚌',
    subtitle: '核心肌群救地球的淨零減碳倡議',
    articleId: 'squat',
    articleTitle: '坐公車前深蹲20次換免費搭乘爭議',
    category: '市政政策',
    quote: '「上車前先深蹲20下，大腿結實又省公車錢！」',
    humorNote:
      '立委時期參加論壇提出「搭公車前在站牌深蹲20次換免費搭乘」以促進全民運動，就任市長後持續被網友翻出，成為各大捷運站與公車站牌前的精神健身圖騰。',
  },
  {
    id: 'dome',
    keyword: '大巨蛋接水管',
    emoji: '🌧️',
    subtitle: '遠雄大巨蛋漏水專利集水天溝工法',
    articleId: 'dome',
    articleTitle: '台北大巨蛋啟用後持續漏水與市府督考改善爭議',
    category: '重大工程',
    quote: '「外頭下大雨，裡頭下小雨，水管接得比捷運還密！」',
    humorNote:
      '大巨蛋啟用後逢暴雨屢傳看台漏水，市府限期遠雄改善之際，看台下方出現長達數十公尺的水管接水神器，成為全台灣棒球迷看球時最特殊的室內景觀。',
  },
  {
    id: 'ab',
    keyword: '問A答B（開創未來）',
    emoji: '🗣️',
    subtitle: '深情注視鏡頭的終極閃避神功',
    articleId: 'ab',
    articleTitle: '蔣萬安答詢「問A答B」受訪風格爭議',
    category: '網路迷因',
    quote: '「記者問你幾點鐘，你回答我們正在開創未來！」',
    humorNote:
      '無論記者提出多麼刁鑽的弊案或市政缺失質詢，皆能以溫柔眼神凝視鏡頭，以「我們高度重視、各局處已成立專案小組、為台北開創未來」完美化解所有政治地雷。',
  },
];
