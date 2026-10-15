import { Article } from '../../types';

export const youbikeArticle: Article = {
  id: 'youbike',
  title: 'YouBike前30分鐘免費重啟',
  category: '市政政策',
  date: '2024-02-28',
  icon: '🚲',
  excerpt:
    '蔣萬安推翻前朝收費政策重啟YouBike前30分鐘免費，無車可借與排擠效應引發交通政策大論辯。',
  markdown: `2024年2月28日，台北市政府正式恢復「YouBike前30分鐘免費」政策，兌現蔣萬安競選台北市長時的重要交通承諾，推翻柯文哲任內實施的收取5元政策。

## 政策目標

市府編列每年約3.7億元公帑補助公共自行車前30分鐘騎乘，旨在提升綠運輸使用比例、達成2030年減碳目標，並串聯捷運公車最後一哩路。

## 調度考驗

政策上路初期，部分熱門捷運站周邊出現嚴重「無車可借」或「無位可還」的調度困境，遭前市長柯文哲與在野議員質疑是撒幣討好選民、未顧及調度量能。市府隨後緊急加速增購採購逾萬輛新一代微笑單車並優化AI智慧調度系統以緩解供需失衡。`,
  sources: [
    {
      title: '中央社：北市YouBike前30分鐘免費228上路，估年增4000萬人次',
      url: 'https://www.cna.com.tw/news/aloc/202402270145.aspx',
    },
    {
      title: '公視新聞：恢復YouBike免費首週民眾反映尖峰時段無車可借',
      url: 'https://news.pts.org.tw/article/683100',
    },
    {
      title: '聯合報：蔣萬安受訪說明YouBike政策：綠運輸與節能減碳雙贏',
      url: 'https://udn.com/news/story/7323/7798124',
    },
  ],
  relatedIds: ['milk', 'airport', 'trees', 'dome', 'chiang'],
};
