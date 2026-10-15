import { Article } from '../../types';

export const abArticle: Article = {
  id: 'ab',
  title: '問A答B',
  category: '網路迷因',
  date: '2024-09-14',
  icon: '🎤',
  excerpt:
    '批評者形容蔣萬安受訪回應與記者提問無關的受訪風格，催生出拉霸機與測驗遊戲。',
  markdown: `「問A答B」是政壇反對黨與網路社群用來調侃台北市長蔣萬安受訪回應時「巧妙避開記者提問、自顧自切換至預設議題」的典型溝通風格。

## 典型範例

例如記者詢問其對對手「台灣獨立是目前客觀現狀」之看法時，蔣萬安的標準回應通常先高聲陳述「中華民國是主權獨立的國家」，緊接著反守為攻反問「民進黨願不願意廢除台獨黨綱」，被評為避重就輕。

## 網路迷因周邊爆紅

此一社會現象引發大量網民的創意改編熱潮：
1. **14題測驗遊戲**：開發出「你知道記者剛剛問蔣萬安什麼嗎？」測驗，讓讀者看答案倒推題目。
2. **蔣式回答拉霸機**：隨機排列「高度重視」、「正面看待」、「反問民進黨」的拉霸抽籤小工具。
3. **回應產生器**：風靡社群的模擬問答網站。`,
  sources: [
    {
      title: '自由時報：「問A答B」14題測驗遊戲爆紅完整題目一覽',
      url: 'https://news.ltn.com.tw/news/politics/breakingnews/5574236',
    },
    {
      title: '三立新聞：網友自製蔣式回應拉霸機引發社群分享熱潮',
      url: 'https://www.setn.com/news/1906788',
    },
    {
      title: '年代新聞：蔣萬安受訪風格引發網路二次創作討論報導',
      url: 'https://www.eracom.com.tw/EraNews/Home/political/2024-09-16/2469028.html',
    },
    {
      title: '鏡傳媒：舊稿重念與講稿機器人標籤分析',
      url: 'https://mirrormedia.mg/external/mirrordaily_90567',
    },
  ],
  relatedIds: ['quiz', 'gen', 'yin', 'out', 'future'],
};
