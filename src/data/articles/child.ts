import { Article } from '../../types';

export const childArticle: Article = {
  id: 'child',
  title: '兒少保護爭議',
  category: '市政政策',
  date: '2024-08-28',
  icon: '🛡️',
  excerpt:
    '北市多所幼兒園性侵虐童事件後續家長陳情，10歲女童安置時效引發社會局與議員激辯。',
  markdown: `蔣萬安市長任期內，台北市發生多起震驚全國之幼兒托育與兒少侵害事件（包含培諾米達、夏莉絲、幼佳等幼兒園案）。2024年9月22日，數十位受害家長前往市府陳情，控訴市府常以「保護兒童隱私」為由拒絕公開完整行政調查調查紀錄。

## 議會質詢

2024年8月，市議員許淑華在議會揭露，一名10歲弱勢女童疑似遭受長期不當猥褻，通報社會局長達 **240天** 卻遲遲未獲得緊急安置庇護。

社會局反駁稱該案女童不願進入機構安置，社工人員已擬定社區守護計畫。蔣萬安則強調市府同仁累計跨局處訪視高達 **714次**，絕無任何延誤怠慢，並承諾爭取調高第一線兒保社工津貼。`,
  sources: [
    {
      title: '鏡週刊：議員質詢10歲女童案市府行政處理延宕始末',
      url: 'https://www.mirrormedia.mg/external/setn_1897715',
    },
    {
      title: '中央社：蔣萬安親上火線說明：訪視高達714次絕無怠慢',
      url: 'https://cna.com.tw/news/aloc/202408290165.aspx',
    },
    {
      title: '三立新聞：多起幼兒園性侵案家長赴北市府高舉白布條陳情',
      url: 'https://www.setn.com/ampnews/1911117',
    },
  ],
  relatedIds: ['food', 'milk', 'yin', 'kindergarten'],
};
