export interface NewsSource {
  title: string;
  url: string;
}

export interface ExternalLink {
  title: string;
  url: string;
}

export type ArticleCategory =
  | '人物傳記'
  | '市政政策'
  | '重大工程'
  | '選戰政治'
  | '網路迷因'
  | '個人爭議'
  | '資訊安全';

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  date: string; // YYYY-MM-DD
  markdown: string;
  excerpt: string;
  sources: NewsSource[];
  externalLinks?: ExternalLink[];
  relatedIds: string[];
  icon: string;
  columnId?: string;
  isMainBiography?: boolean;
}

export interface HistoryEvent {
  date: string; // YYYY-MM-DD
  monthDay: string; // MM-DD
  year: number;
  month: number;
  day: number;
  title: string;
  articleId: string;
  articleTitle: string;
  category: string;
}

export interface StatItem {
  value: string;
  label: string;
  articleId: string;
  category?: string;
  detail?: string;
}

export interface DidYouKnowItem {
  articleId: string;
  fact: string;
  category?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  articleId: string;
  explanation?: string;
}

export interface BlindVoteOption {
  text: string;
  wanAnScore: number; // 0 ~ 100
  vibe: string; // e.g. '萬安本色', '理性嚴謹', '迷因狂野', '深情妥協'
  feedback: string;
  relatedArticleId?: string;
}

export interface BlindVoteQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: BlindVoteOption[];
  contextRealEvent: string;
  articleId: string;
}

export interface BlindVoteResultPersona {
  range: [number, number];
  title: string;
  badge: string;
  emoji: string;
  summary: string;
  description: string;
  advice: string;
}

export interface TopicColumn {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badge: string;
  lead: string;
  coreQuestions: string[];
  articleIds: string[];
}

