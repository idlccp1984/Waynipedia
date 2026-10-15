import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Bookmark,
  Share2,
  Copy,
  Check,
  Shuffle,
  Volume2,
  HelpCircle,
  Layers,
  Quote,
  MessageSquare,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import {
  wanAnOdditiesList,
  odditiesCategories,
  OddityEntry,
} from '../data/oddities';

interface WanAnOdditiesViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  onNavigateBooks: () => void;
  onNavigateLinks: () => void;
}

export function WanAnOdditiesView({
  onSelectArticle,
  onNavigateHome,
  onNavigateBooks,
  onNavigateLinks,
}: WanAnOdditiesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quote generator interactive toy
  const [generatorTopic, setGeneratorTopic] = useState<string>('大巨蛋室內又漏水了');
  const [generatedSpeech, setGeneratedSpeech] = useState<string>(
    '面對大家關切的大巨蛋室內又漏水了問題，台北市政府從第一時間就高度重視、全面掌握。最重要的是回歸制度面，依循專業與既定SOP，該開罰就從嚴開罰，絕不寬貸，我們市府團隊一定全力以赴，為全體市民做好把關，謝謝大家！'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatorCopied, setGeneratorCopied] = useState<boolean>(false);

  // Quick preset topics for the generator
  const PRESET_TOPICS = [
    '大巨蛋室內又漏水了',
    '世壯運文宣拼錯成TAIIPEI',
    '信義路排水溝長出30公分山蘇',
    '造價700萬元的遮陽傘到冬天才開',
    '台北市氣候韌性排名全球倒數第十',
    '剴剴虐童案國民黨議員集體流會',
    '粉專突然湧入數萬印尼帳號按讚',
    '深蹲20次真的能免費搭公車嗎',
  ];

  const handleGenerateQuote = (topicToUse?: string) => {
    const topic = topicToUse || generatorTopic;
    setIsGenerating(true);
    setTimeout(() => {
      const openings = [
        `面對大家高度關切的「${topic}」議題，市府團隊從第一時間就全面掌握、嚴正以待。`,
        `關於各界熱烈討論的「${topic}」，我們台北市政府的立場非常清楚明確。`,
        `針對今天大家所聚焦的「${topic}」，我想最核心的關鍵在於建立長治久安的機制。`,
      ];
      const middles = [
        '我們面對任何市政挑戰，最重要的是回歸制度面，讓專業說話，絕對不容許任何模糊空間。',
        '台北市政府一切依循法規標準作業程序（SOP），落實局處橫向聯繫，該怎麼處置就依法處置。',
        '我們秉持公開透明、嚴謹審視的態度，全面盤點各項既有環節，絕不寬貸任何失職行為。',
      ];
      const closings = [
        '我們會持續密切追蹤後續進度，全力以赴守護台北市民的福祉與安全，謝謝大家！',
        '市府一定拿出最嚴格的標準要求廠商與相關單位，依法依規、全力以赴，謝謝指教！',
        '我們就像一鍋熱氣騰騰的火鍋，匯聚各界智慧與監督，市府團隊一定全力以赴！',
      ];

      const rOpen = openings[Math.floor(Math.random() * openings.length)];
      const rMid = middles[Math.floor(Math.random() * middles.length)];
      const rClose = closings[Math.floor(Math.random() * closings.length)];

      setGeneratedSpeech(`${rOpen} ${rMid} ${rClose}`);
      setIsGenerating(false);
      setGeneratorCopied(false);
    }, 250);
  };

  // Random drawer
  const [highlightedOddityId, setHighlightedOddityId] = useState<string | null>(null);
  const handleRandomDraw = () => {
    const randomItem =
      wanAnOdditiesList[Math.floor(Math.random() * wanAnOdditiesList.length)];
    setHighlightedOddityId(randomItem.id);
    setExpandedId(randomItem.id);
    const element = document.getElementById(`oddity-${randomItem.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const filteredOddities = useMemo(() => {
    return wanAnOdditiesList.filter((item) => {
      const matchCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.quotes && item.quotes.some((quote) => quote.toLowerCase().includes(q)));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <button
            onClick={onNavigateHome}
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            首頁
          </button>
          <span>/</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            維基誌異 · 萬安誌異專頁
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomDraw}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="隨機抽取一則萬安誌異"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>抽籤誌異冷知識</span>
          </button>

          <button
            onClick={onNavigateLinks}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="查看外部精選連結專頁（回應產生器、蔣出來、心動彈幕）"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>外部工具專頁 🔗</span>
          </button>

          <button
            onClick={onNavigateBooks}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>3D 書庫</span>
          </button>
        </div>
      </div>

      {/* Main Wikipedia Oddities Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950 via-[#1e1b18] to-neutral-950 border-2 border-amber-500/40 p-6 sm:p-8 text-neutral-100 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium">
            <span>🏮 WIKIPEDIA: UNUSUAL ARTICLES & MEME LORE</span>
            <span>·</span>
            <span>維基誌異體例</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white flex items-center gap-3">
            <span>萬安志異</span>
            <span className="text-base sm:text-xl font-sans font-normal text-amber-300/80">
              Waynipedia Oddities
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-serif">
            參考中文維基百科《維基誌異》與迷因文化收錄體例，全面收錄圍繞台北市長蔣萬安所衍生出之不尋常百科條目、政治修辭、空話名言、市政奇觀、花名戲稱、印尼網軍、700萬雨傘、水溝山蘇與民間開源二次創作工具。
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-amber-200/90 font-mono">
            <span className="px-2 py-0.5 rounded bg-black/40 border border-amber-500/30">
              收錄條目：{wanAnOdditiesList.length} 則
            </span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-amber-500/30">
              覆蓋領域：6 大誌異分類
            </span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-amber-500/30">
              二次創作：產生器、蔣出來、彈幕
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Feature 1: 人形官話產生器 / 金句模擬器 */}
      <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 via-white to-neutral-50 dark:from-[#131722] dark:via-[#10141b] dark:to-[#0d1015] p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              🤖
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span>萬安官話即時模擬器</span>
                <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                  互動體驗
                </span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                模擬蔣式修辭演算法：高度掌握 ➔ 回歸制度面 ➔ 依法依規SOP ➔ 全力以赴
              </p>
            </div>
          </div>

          <a
            href="https://jiangwanan-generator.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>造訪開源「蔣萬安回應產生器」完整版 ↗</span>
          </a>
        </div>

        {/* Preset Topic Buttons */}
        <div>
          <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block mb-2">
            點選熱門市政爭議試題，或直接輸入任何提問：
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_TOPICS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setGeneratorTopic(preset);
                  handleGenerateQuote(preset);
                }}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  generatorTopic === preset
                    ? 'bg-indigo-600 text-white font-medium shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-indigo-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Input & Generate */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={generatorTopic}
            onChange={(e) => setGeneratorTopic(e.target.value)}
            placeholder="請輸入記者提問或市政爭議焦點..."
            className="flex-1 px-3.5 py-2 text-sm bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleGenerateQuote()}
            disabled={isGenerating}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? '生成中...' : '一鍵生成官式回應'}</span>
          </button>
        </div>

        {/* Speech Output Box */}
        <div className="relative rounded-xl bg-white dark:bg-[#151921] border border-indigo-200/80 dark:border-neutral-700/80 p-4 sm:p-5 shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 mb-2 border-b border-neutral-100 dark:border-neutral-800">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
              <Quote className="w-3.5 h-3.5" />
              <span>台北市政府發言新聞稿模擬輸出：</span>
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedSpeech);
                setGeneratorCopied(true);
                setTimeout(() => setGeneratorCopied(false), 2000);
              }}
              className="hover:text-neutral-700 dark:hover:text-neutral-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {generatorCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">已複製發言稿</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>複製回應</span>
                </>
              )}
            </button>
          </div>
          <p className="text-sm sm:text-base font-serif text-neutral-900 dark:text-neutral-100 leading-relaxed italic">
            「{generatedSpeech}」
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {odditiesCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-sm font-semibold'
                    : 'bg-white dark:bg-[#171b22] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                {cat.id !== 'all' && (
                  <span className="text-[10px] opacity-70">
                    (
                    {
                      wanAnOdditiesList.filter((item) => item.category === cat.id)
                        .length
                    }
                    )
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋誌異、金句、迷因..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-[#181d24] border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Count banner */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-between px-1">
          <span>
            共顯示{' '}
            <strong className="text-neutral-900 dark:text-neutral-100">
              {filteredOddities.length}
            </strong>{' '}
            則萬安誌異記錄
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              清除搜尋條件
            </button>
          )}
        </div>
      </div>

      {/* Oddities List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOddities.map((item) => {
          const isExpanded = expandedId === item.id;
          const isHighlighted = highlightedOddityId === item.id;

          return (
            <div
              key={item.id}
              id={`oddity-${item.id}`}
              className={`rounded-xl border transition-all flex flex-col justify-between p-5 bg-white dark:bg-[#161a20] ${
                isHighlighted
                  ? 'border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs'
              }`}
            >
              <div>
                {/* Header: Icon + Category + Origin Date */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                          {item.category}
                        </span>
                        {item.originDate && (
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {item.originDate}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        item.id,
                        `【萬安志異 · ${item.title}】\n${item.summary}\n文化影響：${item.culturalImpact}`
                      )
                    }
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md transition-colors cursor-pointer"
                    title="複製此則誌異摘要"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-amber-800 dark:text-amber-400/90 font-medium font-serif mt-2.5">
                  {item.subtitle}
                </p>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mt-2">
                  {item.summary}
                </p>

                {/* Quotes callout if present */}
                {item.quotes && item.quotes.length > 0 && (
                  <div className="mt-3.5 p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border-l-2 border-amber-500 space-y-1">
                    {item.quotes.map((quote, qIdx) => (
                      <p
                        key={qIdx}
                        className="text-xs font-serif italic text-amber-900 dark:text-amber-200 leading-relaxed"
                      >
                        {quote}
                      </p>
                    ))}
                  </div>
                )}

                {/* Detailed Accordion / Read More */}
                {isExpanded && (
                  <div className="mt-4 pt-3.5 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed animate-in fade-in duration-200">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100 font-serif">
                      【歷史由來與事態爬梳】
                    </div>
                    {item.content.map((p, idx) => (
                      <p key={idx} className="pl-2 border-l border-neutral-300 dark:border-neutral-700">
                        {p}
                      </p>
                    ))}
                    <div className="mt-2 text-neutral-500 dark:text-neutral-400">
                      <strong className="text-neutral-700 dark:text-neutral-200 font-semibold">
                        文化符號意涵：
                      </strong>{' '}
                      {item.culturalImpact}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Tags + Toggle + Actions */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {isExpanded ? '收合詳情' : '展開詳情'}
                  </button>

                  {item.relatedArticleId && (
                    <button
                      onClick={() => onSelectArticle(item.relatedArticleId!)}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      title="閱讀對應之完整百科條目"
                    >
                      <span>條目全文</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {item.relatedExternalUrl && (
                    <a
                      href={item.relatedExternalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 transition-colors cursor-pointer"
                      title="造訪該迷因外部原創網站"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wikipedia Bibliography & Oddities Philosophy Box */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#13171c] p-6 space-y-3">
        <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>關於「萬安志異」之文獻編纂體例說明</span>
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          本頁面以維基媒體基金會《維基誌異（Wikipedia:Unusual articles）》精神為宗旨，嚴肅記錄當代數位社群與大眾傳播中，圍繞政治人物所衍生之次文化現象。所有條目均具備真實時事依據、新聞引證來源或開源社群作品，旨在呈現當代台灣政治幽默與公共思辨之多樣性。
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-neutral-500">相關專題推薦：</span>
          <button
            onClick={onNavigateLinks}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
          >
            外部精選互動工具專頁 ↗
          </button>
          <span>·</span>
          <button
            onClick={onNavigateBooks}
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium cursor-pointer"
          >
            3D 精裝文獻書庫 ↗
          </button>
        </div>
      </div>
    </div>
  );
}
