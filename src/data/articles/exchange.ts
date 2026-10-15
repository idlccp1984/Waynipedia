import { Article } from '../../types';

export const exchangeArticle: Article = {
  id: 'exchange',
  title: '交換生爭議',
  category: '個人爭議',
  date: '2024-09-02',
  icon: '🎒',
  excerpt:
    '蔣萬安長子獲選北市公費國際交換生名額，雙重國籍與利益衝突迴避規範受監督。',
  markdown: `2024年9月，媒體揭露台北市教育局全年度僅有 **25名** 的國際交換學生公費補助名額中，台北市長蔣萬安之長子亦錄取其中，引發政壇關於利益衝突迴避之討論。

## 資格審查

* **美國國籍確認**：蔣萬安證實長子因在美出生持有美國國籍。
* **宣布放棄公費**：2024年9月2日，蔣萬安召開記者會宣布，為避免社會疑慮，其家庭決定放棄全額補助款，全數自費負擔交換生費用。
* **法務部與監察院介入**：廉政署與監察院依法展開行政釐清，調查選拔審查委員名單是否存在市長公職影響力；國民黨中央則召開記者會抨擊對手將未成年學童捲入政治獵巫。`,
  sources: [
    {
      title: 'ETtoday：蔣萬安長子錄取公費交換生，宣布放棄全額補助款',
      url: 'https://www.ettoday.net/news/20240903/3230601.htm',
    },
    {
      title: '聯合報：政院法務部與蔣萬安說法彙整',
      url: 'https://udn.com/news/story/6656/9747589',
    },
    {
      title: 'NOWnews：交換生事件輿情聲量分析',
      url: 'https://www.nownews.com/news/6871566',
    },
  ],
  relatedIds: ['blood', 'harvard', 'resume'],
};
