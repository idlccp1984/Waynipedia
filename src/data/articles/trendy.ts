import { Article } from '../../types';

export const trendyArticle: Article = {
  id: 'trendy',
  title: '潮台北 TRENDY TAIPEI 爭議',
  category: '市政政策',
  date: '2024-09-02',
  icon: '🎸',
  excerpt:
    '文化局動支數千萬預算舉辦首屆潮台北國際都會音樂節，售票率與宣傳效益在議會備受檢視。',
  markdown: `2024年9月2日至8日，台北市政府文化局首度推動大型跨界國際音樂流行文化節慶「潮台北（TRENDY TAIPEI - Music X Tech）」，仿效美國奧斯汀SXSW模式結合流行音樂、科技論壇與城市生活。

## 預算質疑

該專案市府編列動支逾 3,000 萬元公帑預算。活動期間在台北流行音樂中心及各Livehouse舉辦，在野黨議員在議會質詢指出，部分主場館演出實際售票率偏低，場地空位明顯，批評市府宣傳期過短、效益不如預期。

## 文化局回應

文化局與蔣萬安市長回應表示，首屆「潮台北」重在媒合國際獨立音樂人與台灣原創科技音樂產業鏈，國際買家及國內外論壇參與人次達標，不能單純以一般流行商業演唱會的單場票房論斷其長期城市品牌價值。`,
  sources: [
    {
      title: '中央社：首屆潮台北音樂科技節登場，蔣萬安盼打造台北SXSW',
      url: 'https://www.cna.com.tw/news/aloc/202409020188.aspx',
    },
    {
      title: '自由時報：議員質疑潮台北千萬公帑效益，部分場次票房未如預期',
      url: 'https://news.ltn.com.tw/news/politics/breakingnews/4791024',
    },
    {
      title: '聯合報：文化局說明潮台北成效：累積國際展演產業對接能量',
      url: 'https://udn.com/news/story/7323/8204125',
    },
  ],
  relatedIds: ['encore', 'umb', 'dome'],
};
