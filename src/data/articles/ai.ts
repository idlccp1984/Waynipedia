import { Article } from '../../types';

export const aiArticle: Article = {
  id: 'ai',
  title: '市府二級機關粉專遭中國AI影片入侵爭議',
  category: '資訊安全',
  date: '2024-09-24',
  icon: '🎬',
  excerpt:
    '大地工程處粉專遭駭連播28則中國AI生成短劇，官方權限耗時8天取回引發資安檢討。',
  markdown: `2024年9月24日，台北市政府工務局大地工程處所屬官方粉絲專頁「臺北大地誌」發生重大資安異常，遭不明人士盜用管理權限。

## 遭駭情況

在被盜期間，該官方粉專連續 6 天內發布了 **28則** 中國風格的 AI 狗血連續劇短片（包含霸道總裁、贅婿打臉等內容），官方大頭貼與橫幅亦遭竄改。

## 應變處置

* **數位發展部通報**：大地處雖於第一時間向警方報案並向 Meta 官方提出申訴，但直至 10月2日 才成功收回管理權限，前後長達 8 天。
* **議員批評**：台灣基進吳欣岱等議員指出，台北市政府各局處社群帳號在過去兩年間已發生數起帳號失竊事件，顯示二級機關資安素養與雙重驗證落實極度不足。`,
  sources: [
    {
      title: '中央社：大地處歷經8天取回「臺北大地誌」粉專管理權',
      url: 'https://cna.com.tw/news/aloc/202410020241.aspx',
    },
    {
      title: '自由時報：大地處說明被盜始末與Meta申訴流程',
      url: 'https://news.ltn.com.tw/news/Taipei/breakingnews/5593357',
    },
    {
      title: '自由時報：吳欣岱質疑北市府社群資安漏洞百出',
      url: 'https://news.ltn.com.tw/news/politics/breakingnews/5593459',
    },
  ],
  relatedIds: ['geohack', 'dog', 'trees', 'data'],
};
