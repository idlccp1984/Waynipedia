import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { articles } from '../data/articles';
import { MarkdownRenderer, extractTocHeadings } from '../utils/markdownParser';
import {
  ExternalLink,
  ChevronRight,
  Share2,
  Check,
  List,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  MapPin,
  Palette,
  Swords,
  Award,
  TrendingUp,
  Flame,
} from 'lucide-react';
import { getGoogleAiSummaryUrl, buildAiPrompt } from '../utils/aiSummary';
import { pilgrimageSpots } from '../data/pilgrimageSpots';
import { ArticleCardModal } from './ArticleCardModal';
import { politicalRivals } from '../data/rivals';

interface ArticleViewProps {
  article: Article;
  onSelectArticle: (articleId: string) => void;
}

export function ArticleView({ article, onSelectArticle }: ArticleViewProps) {
  const [copied, setCopied] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeRivalTab, setActiveRivalTab] = useState<string>('puma');

  const categoryIcons: Record<string, string> = {
    重大工程: '🏗️',
    市政政策: '🏛️',
    網路迷因: '🎭',
    選戰政治: '🗳️',
    資訊安全: '🛡️',
    個人爭議: '⚡',
    人物傳記: '👤',
  };

  const categoryArticlesMap = useMemo(() => {
    const map: Record<string, Article[]> = {};
    for (const a of articles) {
      if (!map[a.category]) {
        map[a.category] = [];
      }
      map[a.category].push(a);
    }
    return map;
  }, []);

  const allCategories = useMemo(() => {
    const desiredOrder = ['重大工程', '市政政策', '網路迷因', '選戰政治', '資訊安全', '個人爭議', '人物傳記'];
    const keys = Object.keys(categoryArticlesMap);
    const sortedKeys = desiredOrder
      .filter((k) => keys.includes(k))
      .concat(keys.filter((k) => !desiredOrder.includes(k)));
    return sortedKeys.map((name) => ({
      name,
      count: categoryArticlesMap[name]?.length || 0,
      icon: categoryIcons[name] || '📁',
    }));
  }, [categoryArticlesMap]);

  // Interactive generator state if article is 'gen'
  const [genQuery, setGenQuery] = useState('');
  const [genMode, setGenMode] = useState('官方正式');
  const [genOutput, setGenOutput] = useState('');

  const handleGenerate = () => {
    const q = genQuery.trim() || '這個問題';
    const outputs: Record<string, string> = {
      官方正式: `對於「${q}」一事，我非常重視，高度關切，市府各局處會持續追蹤，一定讓市民有感。`,
      陰謀論: `針對「${q}」，請問民進黨是否在選前進行認知作戰操作？呼籲回歸理性討論，其背後動機值得社會深思。`,
      荒謬口號: `面對「${q}」，台北市將開創未來、點亮首都，用智慧與願景引領全新黃金時代！`,
      成立單位: `針對「${q}」，市府即刻成立跨局處專案督導小組，由副市長統籌親自督導，落實跨局處橫向溝通。`,
      逃跑: `關於「${q}」……謝謝大家，我回答完了，我要趕下一個行程了，謝謝！`,
    };
    setGenOutput(outputs[genMode] || outputs['官方正式']);
  };

  const headings = useMemo(() => extractTocHeadings(article.markdown, true), [article.markdown]);

  const { leadText, bodyText } = useMemo(() => {
    const firstSectionIdx = article.markdown.indexOf('\n## ');
    if (firstSectionIdx !== -1) {
      return {
        leadText: article.markdown.substring(0, firstSectionIdx).trim(),
        bodyText: article.markdown.substring(firstSectionIdx).trim(),
      };
    }
    return {
      leadText: article.markdown.trim(),
      bodyText: '',
    };
  }, [article.markdown]);

  const relatedArticles = useMemo(() => {
    return article.relatedIds
      .map((id) => articles.find((a) => a.id === id))
      .filter((a): a is Article => Boolean(a));
  }, [article.relatedIds]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setSelectedCategory(null);
  }, [article.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setTimeout(() => {
      const el = document.getElementById('category-explorer-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Google AI 摘要查詢網址（指令：用百科口吻介紹 「{標題}」 符合維基百科規定及格式，支援 udm=50 AI 摘要模式）
  const googleAiSummaryUrl = getGoogleAiSummaryUrl(article.title);

  // Associated real-world Pilgrimage spot on Google Maps
  const pilgrimageSpot = useMemo(
    () => pilgrimageSpots.find((s) => s.articleId === article.id),
    [article.id]
  );

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-1.5 truncate">
          <a
            href="#/"
            className="hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors shrink-0"
          >
            首頁
          </a>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
          <button
            onClick={() => handleCategoryClick(article.category)}
            className="shrink-0 hover:text-blue-600 dark:hover:text-blue-400 hover:underline cursor-pointer font-medium"
            title={`點擊滾動至「${article.category}」分類條目清單`}
          >
            {article.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
          <span className="text-neutral-900 dark:text-neutral-100 font-medium truncate">
            {article.title}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Top Pilgrimage Spot Link if available */}
          {pilgrimageSpot && (
            <a
              href={`#/map?spot=${pilgrimageSpot.id}`}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors text-xs font-semibold text-emerald-700 dark:text-emerald-400 cursor-pointer"
              title={`查看實體朝聖地標：${pilgrimageSpot.name}`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden md:inline">朝聖地標</span>
            </a>
          )}

          {/* Top Google AI 摘要 Link */}
          <a
            href={googleAiSummaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors text-xs font-medium text-neutral-600 dark:text-neutral-300 cursor-pointer"
            title={`前往 Google AI 摘要：${buildAiPrompt(article.title)}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">如果你覺得內容不完整你可以查看AI摘要</span>
            <span className="sm:hidden">查看AI摘要</span>
          </a>

          <button
            onClick={handleCopyLink}
            className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors text-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-medium">已複製</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>分享</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Article Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl">{article.icon}</span>
          {article.isMainBiography && (
            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300">
              ★ 百科核心主條目
            </span>
          )}
        </div>

        {/* Title row with Google AI Summary Button and Pilgrimage Map Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
            {/* 條目專屬圖卡生成下載按鈕 */}
            <button
              onClick={() => setIsCardModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-2xs hover:shadow-md active:scale-95 transition-all cursor-pointer group"
              title="產生專屬風格圖卡，支援高清下載 PNG"
            >
              <Palette className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>條目圖卡 (可下載)</span>
            </button>

            {/* 條目對應之市政朝聖地標按鈕 */}
            {pilgrimageSpot && (
              <a
                href={`#/map?spot=${pilgrimageSpot.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs hover:shadow-md active:scale-95 transition-all cursor-pointer group"
                title={`前往「${pilgrimageSpot.name}」市政朝聖地圖實體定位`}
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>市政朝聖地標</span>
              </a>
            )}

            {/* 條目旁邊的 Google AI 摘要按鈕 */}
            <a
              href={googleAiSummaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xs hover:shadow-md active:scale-95 transition-all cursor-pointer group"
              title={`前往 Google AI 摘要頁：${buildAiPrompt(article.title)}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span className="hidden xs:inline">如果你覺得內容不完整你可以查看AI摘要</span>
              <span className="xs:hidden">查看AI摘要</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          </div>
        </div>
        <div className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          來自 Waynipedia，自由的百科全書
        </div>

        {/* Metadata line */}
        <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-mono text-neutral-700 dark:text-neutral-300">
            記錄日期：{article.date}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <span>分類：</span>
            <button
              onClick={() => handleCategoryClick(article.category)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
              title={`點擊滾動至「${article.category}」分類條目清單`}
            >
              <span>{categoryIcons[article.category] || '🏷️'}</span>
              <span className="font-semibold">{article.category}</span>
              <span className="text-[10px] opacity-80">({categoryArticlesMap[article.category]?.length || 0}篇)</span>
            </button>
          </span>
        </div>

        {/* Associated Google Maps Pilgrimage Link Badge */}
        {pilgrimageSpot && (
          <div className="mt-3.5 inline-flex flex-wrap items-center gap-2 p-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs">
            <span className="text-base">{pilgrimageSpot.icon}</span>
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              實體聖地巡禮：{pilgrimageSpot.name}（{pilgrimageSpot.district}）
            </span>
            <a
              href={`#/map?spot=${pilgrimageSpot.id}`}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1 ml-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>查看 Google 地圖朝聖定位 →</span>
            </a>
          </div>
        )}
      </div>

      {/* Preface */}
      <div className="prose-preface text-neutral-800 dark:text-neutral-200 leading-[1.9] text-[15px] sm:text-[16px] my-4">
        <MarkdownRenderer content={leadText} skipFirstH1={true} />
      </div>

      {/* Table of Contents */}
      {headings.length > 0 && (
        <div className="my-6 p-4 sm:p-5 bg-neutral-50 dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <List className="w-3.5 h-3.5 text-neutral-400" />
              <span>目錄導覽</span>
            </h2>
            <button
              onClick={() => setTocOpen((o) => !o)}
              className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-0.5 cursor-pointer"
            >
              <span>{tocOpen ? '隱藏' : '展開'}</span>
              {tocOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {tocOpen && (
            <ol className="mt-3 space-y-1.5 text-xs sm:text-sm pl-4 list-decimal text-neutral-700 dark:text-neutral-300">
              {headings.map((h) => (
                <li key={h.id}>
                  <button
                    onClick={() => scrollToHeading(h.id)}
                    className="text-left hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors cursor-pointer"
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Subsections Body */}
      {bodyText && (
        <div className="prose-body">
          <MarkdownRenderer content={bodyText} skipFirstH1={true} />
        </div>
      )}

      {/* ============================================================= */}
      {/* EXCLUSIVE FOR CHIANG WAN-AN: VISUAL DASHBOARD & RIVAL BATTLE  */}
      {/* ============================================================= */}
      {article.id === 'chiang' && (
        <div className="my-10 space-y-8 animate-in fade-in duration-300">
          {/* Part 1: Visual Radar & Stats Dashboard */}
          <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-50/70 via-neutral-50 to-amber-50/50 dark:from-blue-950/20 dark:via-[#14181d] dark:to-amber-950/20 border border-blue-200 dark:border-blue-900/50 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>VISUAL PROFILE · 蔣萬安人物傳記視覺化儀表板</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50 mt-1">
                  🏛️ 首都市長施政風格指數與戰力六維度
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white font-semibold self-start sm:self-auto shadow-2xs">
                綜合萬安指數：96 分
              </span>
            </div>

            {/* 6 Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { label: '迷因製造力', score: 98, icon: '🎭', desc: 'Trash Time、天降老鼠、丟甘蔗、明天放' },
                { label: '飛行夾克帥氣度', score: 99, icon: '🧥', desc: '台北時裝週行走男模，帥度征服全台' },
                { label: '問A答B閃避率', score: 96, icon: '🗣️', desc: '溫柔注視鏡頭，流暢暢談「開創未來」' },
                { label: '川伯工程依賴度', score: 95, icon: '👷', desc: '重大工務定海神針，萬事拜託李四川' },
                { label: '晶晶體外交親和力', score: 92, icon: '🇺🇸', desc: 'Hotpot一稿六用，流暢矽谷律師名媛腔' },
                { label: '議會老鼠驚喜值', score: 90, icon: '🐀', desc: '質詢天降活老鼠，出動鼠類偵防師' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#181c22] border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span>{stat.icon}</span>
                      <span>{stat.label}</span>
                    </span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {stat.score}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stat.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Political Career Timeline */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>政治生涯關鍵里程碑時間軸</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {[
                  { year: '1978', title: '台北出生', desc: '原名章萬安，求學於建中、政大' },
                  { year: '2005', title: '改姓蔣氏', desc: '隨父親章孝嚴完成改姓登記' },
                  { year: '2007', title: '取得J.D.法學博士', desc: '賓夕法尼亞大學法學院畢業' },
                  { year: '2008-2011', title: '矽谷WSGR執業律師', desc: '專辦新創企業融資與IPO' },
                  { year: '2016', title: '當選第9屆立委', desc: '一例一休站立發言獲封立院站神' },
                  { year: '2020', title: '連任第10屆立委', desc: '擊敗吳怡農確立藍營少主地位' },
                  { year: '2022', title: '當選台北市市長', desc: '以57.5萬票勝選入主市府' },
                  { year: '2023', title: '大巨蛋啟用開打', desc: '啟用國際棒球場與演唱會' },
                  { year: '2024', title: '全台社群熱搜狂歡', desc: '明天放、Trash Time、天降老鼠' },
                ].map((item) => (
                  <div
                    key={item.year}
                    className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#161a20]"
                  >
                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.year}
                    </div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Part 2: Rival Battle Showcase (沈伯洋、黃珊珊、陳時中、柯文哲) */}
          <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#14181d] border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  <Swords className="w-4 h-4" />
                  <span>POLITICAL RIVALS SHOWCASE · 主要政治對手深度戰力大PK</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50 mt-1">
                  ⚔️ 蔣萬安 vs 核心對手（黃珊珊、沈伯洋、陳時中、柯文哲）
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  不列入票數極微之邊緣小黨，精選歷次市長選舉與當前政壇最核心之 4 大主要對手進行生動幽默對比！
                </p>
              </div>
            </div>

            {/* Rival Tab Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {politicalRivals.map((rival) => {
                const isActive = activeRivalTab === rival.id;
                return (
                  <button
                    key={rival.id}
                    onClick={() => setActiveRivalTab(rival.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 dark:border-rose-500 ring-2 ring-rose-500/30 shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{rival.emoji}</span>
                    <div className="min-w-0">
                      <div className="font-serif font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 truncate">
                        {rival.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                        {rival.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Rival Card Details */}
            {(() => {
              const currentRival = politicalRivals.find((r) => r.id === activeRivalTab) || politicalRivals[0];
              return (
                <div className="p-5 rounded-xl bg-neutral-50/80 dark:bg-[#161a20] border border-neutral-200 dark:border-neutral-800 space-y-5 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{currentRival.emoji}</span>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
                          {currentRival.name} · {currentRival.badge}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">
                          {currentRival.party}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        {currentRival.roleTitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic bg-white dark:bg-[#12151a] p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    💡 對手綜述：{currentRival.overview}
                  </p>

                  {/* Comparisons Grid */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 uppercase">
                      <Flame className="w-3.5 h-3.5" />
                      <span>生動對照 PK 表格：</span>
                    </div>

                    <div className="space-y-3">
                      {currentRival.comparisons.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14181d] shadow-2xs space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-neutral-100 dark:border-neutral-800/80">
                            <span className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                              <span>🎯 對比維度：</span>
                              <strong className="text-blue-600 dark:text-blue-400 font-bold">
                                {item.dimension}
                              </strong>
                            </span>
                            <span className="px-2 py-0.2 rounded text-[10px] bg-rose-500/15 text-rose-600 dark:text-rose-300 font-bold">
                              蔣萬安 {item.chiangResult}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
                              <div className="font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1">
                                <span>🏛️ 蔣萬安表現：</span>
                                <span className="text-[10px] bg-blue-600 text-white px-1.5 rounded">
                                  {item.chiangResult}
                                </span>
                              </div>
                              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                {item.chiangPerformance}
                              </p>
                            </div>

                            <div className="p-2.5 rounded-lg bg-neutral-100/70 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700">
                              <div className="font-bold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
                                <span>{currentRival.emoji} {currentRival.name}表現：</span>
                                <span className="text-[10px] bg-neutral-400 text-white px-1.5 rounded">
                                  {item.rivalResult}
                                </span>
                              </div>
                              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {item.rivalPerformance}
                              </p>
                            </div>
                          </div>

                          <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded border border-amber-200 dark:border-amber-800/60">
                            👉 犀利總評：{item.summaryVerdict}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Interactive Generator Module (If article is 'gen') */}
      {article.id === 'gen' && (
        <div className="my-8 p-4 sm:p-5 bg-neutral-50 dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h2 className="text-base sm:text-lg font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
            🤖 蔣萬安回應產生器（模擬試玩）
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
            輸入任意問題，體驗官方正式、陰謀論或逃跑模式。
          </p>
          <div className="space-y-2.5">
            <input
              type="text"
              value={genQuery}
              onChange={(e) => setGenQuery(e.target.value)}
              placeholder="輸入任何提問（例如：大巨蛋漏水、甘蔗去哪了、颱風假）"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-[#181c21] border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={genMode}
                onChange={(e) => setGenMode(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-white dark:bg-[#181c21] border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-neutral-100"
              >
                <option value="官方正式">官方正式模式</option>
                <option value="陰謀論">陰謀論模式</option>
                <option value="荒謬口號">荒謬口號模式</option>
                <option value="成立單位">成立專責單位模式</option>
                <option value="逃跑">逃跑快閃模式</option>
              </select>
              <button
                onClick={handleGenerate}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                產生回應
              </button>
            </div>
            {genOutput && (
              <div className="mt-2.5 p-3 text-xs sm:text-sm bg-white dark:bg-[#181c21] border border-dashed border-neutral-300 dark:border-neutral-700 rounded text-neutral-800 dark:text-neutral-200">
                <span className="font-semibold text-xs text-neutral-400 block mb-0.5">
                  模擬回應：
                </span>
                {genOutput}
              </div>
            )}
          </div>
        </div>
      )}

      {/* External Original Sites */}
      {article.externalLinks && article.externalLinks.length > 0 && (
        <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-2.5">
            外部連結
          </h2>
          <ul className="space-y-1.5 text-xs sm:text-sm">
            {article.externalLinks.map((link, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 hover:underline"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Articles Navigation */}
      {relatedArticles.length > 0 && (
        <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            相關條目
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {relatedArticles.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onSelectArticle(rel.id)}
                className="text-left p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#14181d] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base">{rel.icon}</span>
                  <span className="font-serif font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {rel.title}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                  {rel.excerpt}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 條目分類探索 (放置於條目最下方，點擊麵包屑或分類標籤可直接滑動定位展開) */}
      {/* ============================================================= */}
      <div id="category-explorer-section" className="mt-12 pt-6 border-t-2 border-dashed border-neutral-200 dark:border-neutral-800 space-y-4 scroll-mt-20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏷️</span>
            <div>
              <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                條目分類探索
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                點擊分類按鈕即可即時展開該分類下所有收錄條目清單
              </p>
            </div>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              收起分類清單 ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {allCategories.map((cat) => {
            const isCurrentArticleCat = article.category === cat.name;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory((prev) => (prev === cat.name ? null : cat.name))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-semibold ring-2 ring-blue-400/40'
                    : isCurrentArticleCat
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/60'
                    : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                }`}
                title={`瀏覽「${cat.name}」分類所有 ${cat.count} 篇條目`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75">({cat.count})</span>
              </button>
            );
          })}
        </div>

        {/* 分類條目展開清單抽屜 */}
        {selectedCategory && (
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-[#14181d] border border-blue-200 dark:border-blue-900/50 shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{categoryIcons[selectedCategory] || '📁'}</span>
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                    「{selectedCategory}」分類條目一覽
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    本分類共收錄 {categoryArticlesMap[selectedCategory]?.length || 0} 篇百科條目，點擊可直接切換閱讀
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                ✕ 關閉
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {(categoryArticlesMap[selectedCategory] || []).map((catArt) => {
                const isCurrent = catArt.id === article.id;
                return (
                  <button
                    key={catArt.id}
                    onClick={() => {
                      if (!isCurrent) {
                        onSelectArticle(catArt.id);
                        setSelectedCategory(null);
                      }
                    }}
                    className={`text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-500/10 border-blue-400 dark:border-blue-600 text-blue-950 dark:text-blue-100 ring-1 ring-blue-500/30'
                        : 'bg-white dark:bg-[#181c21] border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    <span className="text-base shrink-0 mt-0.5">{catArt.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold truncate flex items-center justify-between">
                        <span>{catArt.title}</span>
                        {isCurrent && (
                          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold shrink-0 ml-1">
                            當前條目
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                        {catArt.excerpt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Article Card Generator Modal */}
      <ArticleCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        article={article}
      />
    </article>
  );
}
