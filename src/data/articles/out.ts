import { Article } from '../../types';

export const outArticle: Article = {
  id: 'out',
  title: '「蔣出來」',
  category: '網路迷因',
  date: '2024-10-10',
  icon: '🎮',
  excerpt:
    '像素風網頁RPG遊戲操控市長在台北街頭砍樹打老鼠，累計遊玩人次近3萬。',
  markdown: `由獨立開發者「whoismygrandpa」於2024年10月上線發表的復古像素風網頁動作角色扮演遊戲（RPG）。

## 遊戲特色

玩家在遊戲中操控像素化市長角色在台北各大街頭場景穿梭，主要戰鬥任務包括揮斧砍伐行道樹、拿起消毒噴霧消滅鼠患，最終關卡則是勇闖萬華區擊敗「萬華鼠王」。

遊戲內部埋藏了無數真實新聞彩蛋：
* **武器道具**：可拾取「祈福甘蔗」作為強棒武器。
* **體力補充**：飲用「生生鮮乳」可瞬間補滿血量。
* **場景彩蛋**：藏身於信義區天價遮陽傘下可獲得短暫無敵狀態，亦有金華國中「鮮味小卷」等隱藏陷阱。

媒體於10月10日報導該遊戲累計遊玩人次已逼近 3 萬人次大關。`,
  sources: [
    {
      title: '自由時報：像素RPG《蔣出來》引爆年輕世代熱烈轉傳',
      url: 'https://news.ltn.com.tw/news/politics/breakingnews/5601529',
    },
    {
      title: '台視新聞：政治諷刺小遊戲席捲網路生態報導',
      url: 'https://news.ttv.com.tw/news/11505100024700N/amp',
    },
  ],
  externalLinks: [
    {
      title: '「蔣出來」遊戲網站',
      url: 'https://whoismygrandpa.win/game',
    },
    {
      title: '「蔣出來」身世考證資訊主站（非遊戲）',
      url: 'https://whoismygrandpa.win',
    },
  ],
  relatedIds: ['quiz', 'gen', 'cane', 'rat'],
};
