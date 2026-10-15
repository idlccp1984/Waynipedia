import { Article } from '../../types';

export const dogArticle: Article = {
  id: 'dog',
  title: '中國機器狗爭議',
  category: '資訊安全',
  date: '2025-08-27',
  icon: '🐕',
  excerpt:
    '市府引進巡檢人行道智慧機器狗，原產地疑雲由波士頓動力改口承認中國宇樹科技。',
  markdown: `2025年8月，台北市副市長李四川代表市府開箱展示「四足智慧巡檢機器狗」，宣傳未來將投入台北市人行道與下水道鋪面自動化巡檢。

## 採購風波

議員簡舒培隨後踢爆，該機器狗並非歐美尖端科技，而是中國知名廠商「宇樹科技（Unitree）」產品。市府初期第一時間對外回覆稱其核心原創設計來自美國「波士頓動力（Boston Dynamics）」，隨後在民代追查下承認機器本體確為中國製。

## 中止測試

市府補充說明該機器狗為委外廠商自購測試器材，無連網雲端回傳功能。但因關鍵基礎設施涉及敏感圖資傳輸，數位發展部介入調查並指出市府未依資安法規報准，測試計畫隨後全面暫緩。`,
  sources: [
    {
      title: '新頭殼：簡舒培爆料北市人行道機器狗竟為中國宇樹科技製造',
      url: 'https://newtalk.tw/news/view/2025-08-27/990223',
    },
    {
      title: 'Taiwan News：市府說明機器狗為委外試辦無聯網功能',
      url: 'https://www.taiwannews.com.tw/zh/news/6189244',
    },
  ],
  relatedIds: ['ai', 'umb', 'geohack'],
};
