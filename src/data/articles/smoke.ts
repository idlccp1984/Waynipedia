import { Article } from '../../types';

export const smokeArticle: Article = {
  id: 'smoke',
  title: '公館柵欄吸菸區事件',
  category: '市政政策',
  date: '2024-08-26',
  icon: '🚬',
  excerpt:
    '推動原則禁止無菸城市，公館7座每座14.9萬元之柵欄吸菸區被諷像狗籠後拆除。',
  markdown: `台北市全面推動「無菸城市」願景，施政方針採「原則禁止、例外開放」，全市陸續劃設指定吸菸區共 267 處，並試辦裝設 400 萬元的 AI 自動人臉辨識勸導吸菸設備。

## 爭議設施

2024年8月，市府於熱門公館商圈設立 7 座高金屬圍籬的柵欄式吸菸區，造價每座約 **14.9萬元**。啟用數週即遭廣大市民與網友無情嘲諷其外觀「猶如收容所狗籠」，引發極大民怨。

市府衛生局在強烈輿論壓力下，於 **8月26日** 閃電下令全面拆除公館 7 座柵欄吸菸區，並表示未來將改採負壓抽風型吸菸室或綠籬美化樣式訂立統一規範。`,
  sources: [
    {
      title: '中央社：公館柵欄式吸菸區急喊卡全面拆除訂新標準',
      url: 'https://cna.com.tw/news/aloc/202408270313.aspx',
    },
    {
      title: 'ETtoday：無菸城市宣示與全市267處吸菸區規劃',
      url: 'https://www.ettoday.net/news/20240112/3099568.htm',
    },
    {
      title: '鏡週刊：每座14.9萬柵欄吸菸區不到一月拆除挨批浪費公帑',
      url: 'https://www.mirrormedia.mg/external/setn_1896465',
    },
  ],
  relatedIds: ['umb', 'rat', 'yin', 'trees'],
};
