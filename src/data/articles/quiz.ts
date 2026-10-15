import { Article } from '../../types';

export const quizArticle: Article = {
  id: 'quiz',
  title: '「你知道記者剛剛問蔣萬安什麼嗎？」',
  category: '網路迷因',
  date: '2024-09-14',
  icon: '❓',
  excerpt:
    '網友因應「問A答B」現象所設計之14題反向時事測驗，給出蔣萬安回答要求受試者倒推記者原提問，引發全網瘋傳與社群挑戰熱潮。',
  markdown: `「**你知道記者剛剛問蔣萬安什麼嗎？**」是一款於2024年9月中旬由台灣匿名獨立軟體工程師架設於 Cloudflare 平台之線上時事趣味測驗。該測驗以顛覆傳統問答測驗之反向邏輯為特色，迅速在 Facebook、Threads、PTT 及各大新聞論壇引爆熱烈討論與分享風潮。

## 開發動機與背景

此測驗之靈感源於反對陣營與社群輿論長年調侃台北市長蔣萬安受訪時之「**問A答B**」回答模式：
* **現象觀察**：批評者認為蔣萬安在面對具爭議性或尖銳之市政與政治提問時，經常不直接回答記者問題的核心，而是迅速切換至事先準備好的口號或反向質問對手。
* **反向設計概念**：一般時事測驗均為「給予記者提問，讓受測者選擇政治人物的回答」；而本測驗完全顛倒——**題目直接列出蔣萬安市長在某次聯訪時字字句句的真實回應全文，但隱去提問，要求玩家在四個記者題目選項中，猜出記者當初究竟問了什麼**。

## 測驗規則與題目特色

測驗共設計 **14道** 真實聯訪考題，涵蓋兩岸論述、市政工程、食安爭議與選戰攻防：
1. **反差題型**：例如題目為蔣萬安大談「中華民國憲法主權與全民福祉」，四個選項卻分別為「大巨蛋何時辦演唱會」、「中秋節送甘蔗風波」、「美沙冬替代療法爭議」及「營養午餐鮮味小卷」。
2. **高難度與低答對率**：因蔣萬安在不同議題受訪時使用的語彙高度標準化（如「高度重視」、「全力以赴」、「開創未來」），受測者即便平日高度關注政治時事，亦極難準確命中記者原本題目，全網平均分數僅落在 6 至 8 題之間。
3. **社群分享機制**：測驗完成後會依據答對題數生成評語，如「市長答詢鑑識官」、「被問A答B繞暈的市民」等標籤，引發數萬網民曬成績單挑戰。

## 各方評價與社會迴響

* **政論節目與媒體報導**：三立新聞、民視新聞與《自由時報》等媒體均以專題報導此一測驗，探討政治溝通風格如何轉化為青年次文化迷因。
* **執政陣營觀點**：國民黨民意代表指出，首都市長每日面對龐大媒體麥克風堵訪，發言必須字字謹慎、堅守市府基調，避免遭特定媒體斷章取義，將負責任的穩健發言簡化為「問A答B」是去脈絡化的政治嘲弄。
* **市長本人態度**：蔣萬安受訪時對相關網路創作均表示「謝謝指教、尊重網友的幽默與創意」，並強調市府各局處推動市政進度經得起考驗。`,
  sources: [
    {
      title: '三立新聞：反向測驗猜記者提問爆紅，玩家崩潰直呼太難猜中',
      url: 'https://www.setn.com/news/1906788',
    },
    {
      title: '自由時報：設計理念源自問A答B現象，14題題目逐一拆解深度專題',
      url: 'https://news.ltn.com.tw/news/politics/breakingnews/5574236',
    },
    {
      title: '民視新聞：政治時事測驗成為年輕選民另類關注焦點',
      url: 'https://www.ftvnews.com.tw/news/detail/2024914W0442',
    },
  ],
  externalLinks: [
    {
      title: '「你知道記者剛剛問蔣萬安什麼嗎？」原始測驗網站',
      url: 'https://tight-sunset-9f4c.dmj890145.workers.dev/',
    },
    {
      title: 'Google AI 摘要（如果你覺得內容不完整你可以查看AI摘要 · 專屬指令網址）',
      url: 'https://www.google.com/search?q=%E7%94%A8%E7%99%BE%E7%A7%91%E5%8F%A3%E5%90%BB%E4%BB%8B%E7%B4%B9+%E3%80%8C%E4%BD%A0%E7%9F%A5%E9%81%93%E8%A8%98%E8%80%85%E5%89%9B%E5%89%9B%E5%95%8F%E8%94%A3%E8%90%AC%E5%AE%89%E4%BB%80%E9%BA%BC%E5%97%8E%EF%BC%9F%E3%80%8D+%E7%AC%A6%E5%90%88%E7%B6%AD%E5%9F%BA%E7%99%BE%E7%A7%91%E8%A6%8F%E5%AE%9A%E5%8F%8A%E6%A0%BC%E5%BC%8F&sca_esv=95a3924c91beb42b&sxsrf=APpeQnvXB3sfEq9rQ7vq08pLHHCqcePvFQ%3A1791882082329&udm=50&fbs=ABfTbFUhNGvvPEUFOvrsPMHwBXgOYHJZj29gqXMhi2lMTv7-fBMA_cGFs8sakPw1LXgYR_qJeKVLgIFR09XE-QIsQQ6zI6ibWH2wn-1SSbgHcMkS9GZ3kdVCuVu5afXA8w1h4crKTzImLq47uRk4XV5klIdgRhxBSYZNBUQl3rPKKEOOR_3pTLVIh9ZyayQU6cBkvdPx4Hbu&vsint=&aep=1&ntc=1&cs=1&sa=X&ved=2ahUKEwjSifz30LaXAxWkg68BHWEVMMEQ2J8OegQIExAD&biw=1180&bih=688&dpr=2&mstk=AUtExfBzFmfhnAt960itXv8CXKdvaDPiN4qJqyaKDxbf4647l_LEUyFmop6X3bDNu10nY9k2LPfTDT9UhQgu4ihnENVYcjuhc-88JL3_lOKHzyWAGHPw-slz87ERT90DwTtZrjJQ5paLwQEjp5CjQR00Ynn0JnV77EuwmCo3kQ9sysMAcm_VDoZtOud2yGaCkSUG3jtA3oNIQUA0386TJSmtJ_B9mTmlP-sXWN3EdEje4D2sdD_vStpHpLS_jQ&csuir=1',
    },
  ],
  relatedIds: ['ab', 'gen', 'out', 'future', 'yin'],
};
