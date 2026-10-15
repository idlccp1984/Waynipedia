import { Article } from '../../types';

export const encoreArticle: Article = {
  id: 'encore',
  title: '《台北安可》侵權事件',
  category: '選戰政治',
  date: '2024-10-09',
  icon: '🎵',
  excerpt:
    '蔣萬安競選主題曲MV擅用經典賽國手張育成畫面致歉，旋律與市府公帑素材再引議論。',
  markdown: `2024年10月9日，蔣萬安競選辦公室隆重發表連任競選主題曲《台北安可》。然而歌曲 MV 一經發布，隨即引發版權與素材公私不分之爭議。

## 爭端焦點

1. **體育賽事未授權**：MV 中剪入了世界棒球經典賽（WBC）資格賽以及旅美球星張育成的打擊特寫鏡頭，遭棒協與球迷質疑未取得著作授權。蔣萬安於10月10日公開鞠躬致歉。
2. **市政公帑素材**：MV 中多處城市建設畫面被指直接調用觀傳局與工務局之公費廣告素材。
3. **旋律抄襲疑雲**：副歌旋律被部分音樂人指與孫燕姿經典歌曲〈第一天〉相似度極高。

競選辦公室於10月11日緊急修正影片，撤換所有爭議畫面後重新上架。`,
  sources: [
    {
      title: '新頭殼：蔣萬安親自致歉：主題曲MV畫面未經授權即刻下架',
      url: 'https://newtalk.tw/news/view/2024-10-10/1064722',
    },
    {
      title: '自由時報：音樂旋律與市政公帑畫面爭議多方回應',
      url: 'https://news.ltn.com.tw/news/politics/breakingnews/5602099',
    },
    {
      title: 'TVBS：重新剪輯修正版本於10月11日重新上架',
      url: 'https://news.tvbs.com.tw/politics/4034512',
    },
  ],
  relatedIds: ['airport', 'cat', 'trendy'],
};
