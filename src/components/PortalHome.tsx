import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { articles } from '../data/articles';
import { getTodayHistoryData, formatEventDate, allHistoryEvents } from '../data/historyEvents';
import { statsData, didYouKnowData } from '../data/stats';
import { topicColumns } from '../data/columns';
import { quizQuestions } from '../data/quiz';
import { fudokiItems } from '../data/fudoki';
import {
  ArrowRight,
  RefreshCw,
  Calendar,
  Sparkles,
  TrendingUp,
  HelpCircle,
  Layers,
  CheckCircle2,
  BookOpen,
  RotateCw,
  BookMarked,
  User,
  Share2,
  ExternalLink,
  Search,
  X,
  MapPin,
  Compass,
  Info,
  Network,
} from 'lucide-react';

interface PortalHomeProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHistory: () => void;
  onNavigateNumbers: () => void;
  onNavigateQuiz: () => void;
  onNavigateDyk: () => void;
  onNavigateBooks: () => void;
  onNavigateCards: () => void;
  onNavigateColumns: (columnId?: string) => void;
  onNavigateLinks?: () => void;
  onNavigateOddities?: () => void;
  onNavigateMap?: () => void;
  onNavigateGraph?: () => void;
  onNavigateAbout?: () => void;
  onRandomArticle: () => void;
  onOpenShare?: () => void;
  onSearch?: (query: string) => void;
}

export function PortalHome({
  onSelectArticle,
  onNavigateHistory,
  onNavigateNumbers,
  onNavigateQuiz,
  onNavigateDyk,
  onNavigateBooks,
  onNavigateCards,
  onNavigateColumns,
  onNavigateLinks,
  onNavigateOddities,
  onNavigateMap,
  onNavigateGraph,
  onNavigateAbout,
  onRandomArticle,
  onOpenShare,
  onSearch,
}: PortalHomeProps) {
  const [activeFudokiId, setActiveFudokiId] = useState<string>(fudokiItems[0]?.id || 'rat');
  const [heroQuery, setHeroQuery] = useState('');
  const [isHeroFocused, setIsHeroFocused] = useState(false);

  const heroLiveResults = useMemo(() => {
    const q = heroQuery.trim().toLowerCase();
    if (!q) return [];
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [heroQuery]);

  const [featuredIndex, setFeaturedIndex] = useState<number>(() =>
    Math.floor(Math.random() * articles.length)
  );
  const featuredArticle = articles[featuredIndex] || articles[0];

  // Explicit face state: 'front' (前面) or 'back' (後面)
  const [bookFace, setBookFace] = useState<'front' | 'back'>('front');

  const handleShuffleFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1 + Math.floor(Math.random() * (articles.length - 1))) % articles.length);
    setBookFace('front');
  };

  const [historySeed, setHistorySeed] = useState(0);
  const todayHistory = useMemo(() => getTodayHistoryData(), [historySeed]);
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const [dykSeed, setDykSeed] = useState(0);
  const displayedDyk = useMemo(() => {
    const shuffled = [...didYouKnowData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [dykSeed]);

  const [numSeed, setNumSeed] = useState(0);
  const displayedStats = useMemo(() => {
    const shuffled = [...statsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [numSeed]);

  const categories = useMemo(() => {
    const map = new Map<string, Article[]>();
    for (const art of articles) {
      if (!map.has(art.category)) {
        map.set(art.category, []);
      }
      map.get(art.category)!.push(art);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-8 sm:space-y-10">
      {/* Editorial Welcome Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 sm:pb-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                自由開放的市政百科
              </span>
              <span className="text-[11px] text-neutral-400">
                收錄 {articles.length} 篇核心條目 · {allHistoryEvents.length} 則歷史檔案
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              歡迎來到 Waynipedia 蔣萬安百科
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
              以嚴謹客觀的百科全書體例，完整彙整台北市長蔣萬安任內重大施政政策、選舉攻防、時事風波與網路文化。條目均附具體新聞文獻引證，拒絕主觀渲染。
            </p>
          </div>

          {/* Quick Access Badges: Structured 2-row x 3-column control console on desktop (prevents single-row cramming) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 w-full xl:w-auto xl:min-w-[480px] shrink-0 self-start xl:self-auto">
            {/* 1. 蔣萬安 主條目 */}
            <button
              onClick={() => onSelectArticle('chiang')}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700/60 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer text-center"
              title="閱讀蔣萬安完整主條目傳記"
            >
              <span>🏛️</span>
              <span className="truncate">蔣萬安 主條目</span>
            </button>

            {/* 2. 議題專欄 (特刊) */}
            <button
              onClick={() => onNavigateColumns()}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/60 hover:bg-indigo-100 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer text-center"
              title="瀏覽 6 大議題專欄特刊"
            >
              <BookMarked className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="truncate">議題專欄 (特刊)</span>
            </button>

            {/* 3. 3D 典藏書庫 */}
            <button
              onClick={onNavigateBooks}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer text-center"
              title="進入 3D 書本專頁瀏覽全站所有書本"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">3D 典藏書庫 ({articles.length}卷)</span>
            </button>

            {/* 4. 朝聖地圖 🗺️ */}
            {onNavigateMap && (
              <button
                onClick={onNavigateMap}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 text-center"
                title="以 Google 地圖實景巡禮各大市政爭議聖地"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">朝聖地圖 🗺️</span>
              </button>
            )}

            {/* 5. 外部連結 🔗 */}
            {onNavigateLinks && (
              <button
                onClick={onNavigateLinks}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-500/30 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 text-center"
                title="瀏覽外部精選站點（回應產生器、蔣出來遊戲、心動彈幕）"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="truncate">外部連結 🔗</span>
              </button>
            )}

            {/* 5. 隨機條目 */}
            <button
              onClick={onRandomArticle}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/40 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 text-center"
              title="隨機漫遊抽取一篇百科條目深入閱讀"
            >
              <span className="shrink-0 text-sm">🎲</span>
              <span className="truncate">隨機條目</span>
            </button>

            {/* 6. 社群分享預覽 */}
            {onOpenShare && (
              <button
                onClick={onOpenShare}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 text-center"
                title="預覽社群分享預覽圖 (OpenGraph Card)"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="truncate">社群分享預覽</span>
              </button>
            )}

            {/* 7. 關於本站 */}
            {onNavigateAbout && (
              <button
                onClick={onNavigateAbout}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 text-center"
                title="認識 Waynipedia 萬安百科之創立緣起與編輯原則"
              >
                <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="truncate">關於本站</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 類搜尋引擎的搜尋框 (Search Engine Style Hero Search Bar) */}
      <div className="relative rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-white via-neutral-50/80 to-blue-50/20 dark:from-[#141920] dark:via-[#11151a] dark:to-[#0d1014] border-2 border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-xs font-medium">
            <Search className="w-3.5 h-3.5" />
            <span>全站搜尋引擎 · 支援 {articles.length} 卷即時全文檢索</span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-50">
            檢索台北市政檔案、重大工程、爭議風波與迷因金句
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearch) onSearch(heroQuery.trim());
            }}
            className="relative flex items-center max-w-2xl mx-auto mt-2"
          >
            <div className="relative w-full flex items-center">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                onFocus={() => setIsHeroFocused(true)}
                onBlur={() => setTimeout(() => setIsHeroFocused(false), 200)}
                placeholder="輸入關鍵字（例如：大巨蛋、台智光、京華城、深蹲、火鍋、和平天橋）..."
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-xl bg-white dark:bg-[#1a2029] border-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-600 focus:outline-none text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 shadow-sm transition-all"
              />
              {heroQuery && (
                <button
                  type="button"
                  onClick={() => setHeroQuery('')}
                  className="absolute right-24 p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-md cursor-pointer"
                  title="清除"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 sm:py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>搜尋</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Live Dropdown Preview */}
              {isHeroFocused && heroQuery.trim() && heroLiveResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#181c22] border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl z-40 overflow-hidden text-left divide-y divide-neutral-100 dark:divide-neutral-800">
                  <div className="p-2 space-y-1">
                    {heroLiveResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onMouseDown={() => onSelectArticle(item.id)}
                        className="w-full text-left p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg flex items-start gap-3 transition-colors cursor-pointer group"
                      >
                        <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate flex items-center gap-1.5">
                            <span>{item.title}</span>
                            {item.isMainBiography && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1.5 py-0.2 rounded font-mono">
                                主條目
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                            {item.excerpt}
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-400 shrink-0 mt-0.5">
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="p-2.5 bg-neutral-50 dark:bg-[#12151a] flex items-center justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      快速選取條目或直接檢索全文
                    </span>
                    <button
                      type="button"
                      onMouseDown={() => {
                        if (onSearch) onSearch(heroQuery.trim());
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>開啟搜尋結果頁</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Quick Trending Searches */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
              <span>🔥 熱門檢索：</span>
            </span>
            {[
              '大巨蛋漏水',
              '台智光弊案',
              '京華城停工',
              '坐公車深蹲',
              '火鍋市長',
              '和平新生天橋',
              '寶林茶室',
              '明天放',
              '北士科地上權',
              '生生喝鮮乳',
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setHeroQuery(tag);
                  if (onSearch) onSearch(tag);
                }}
                className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors cursor-pointer text-xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article Section (3D Book with Front and Back) + Today in History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* 典範條目推薦（含 3D 書本前面後面完整展示） (7 Cols) */}
        <section className="lg:col-span-7 bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-7 items-center sm:items-start">
              {/* 3D Book Volume Container (前面有書名、後面有封底、180度翻轉) */}
              <div className="group shrink-0 relative select-none perspective-container py-2 flex flex-col items-center">
                <div
                  onClick={() => setBookFace((prev) => (prev === 'front' ? 'back' : 'front'))}
                  className="w-[140px] sm:w-[160px] h-[200px] sm:h-[230px] relative transform-style-3d transition-transform duration-700 cursor-pointer hover:scale-105"
                  style={{
                    transform: bookFace === 'back' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                  title="點擊翻轉 180° 查看前面與後面"
                >
                  {/* ===== FRONT COVER (前面：封面) ===== */}
                  <div
                    className="absolute inset-0 rounded-r-lg rounded-l-xs bg-gradient-to-br from-[#1a2636] via-[#101924] to-[#070c12] border-2 border-amber-500/70 shadow-[14px_16px_32px_rgba(0,0,0,0.7)] flex flex-col justify-between p-2.5 pl-6 backface-hidden overflow-hidden"
                    style={{ transform: 'translateZ(8px)' }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none border-r border-black/50 z-20" />
                    <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                    <div className="text-center pt-1 z-10">
                      <span className="text-[9px] font-mono text-amber-300/80 tracking-widest uppercase">
                        VOL. {String(featuredIndex + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="my-auto text-center z-10 py-0.5">
                      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-b from-amber-400/25 via-amber-950/40 to-black/70 border-2 border-amber-400/60 flex items-center justify-center shadow-md">
                        <span className="text-2xl">{featuredArticle.icon}</span>
                      </div>

                      {/* 前面書名 */}
                      <div className="mt-2 px-1.5 py-1 bg-black/75 border-y border-amber-400/60">
                        <span className="font-serif font-bold text-amber-200 text-[10px] sm:text-[11px] tracking-wider line-clamp-2 leading-tight">
                          {featuredArticle.title}
                        </span>
                      </div>
                    </div>

                    <div className="pb-1 text-center z-10">
                      <div className="w-12 h-[1px] bg-amber-400/40 mx-auto" />
                    </div>
                  </div>

                  {/* ===== BACK COVER (後面：封底) ===== */}
                  <div
                    className="absolute inset-0 rounded-l-lg rounded-r-xs bg-gradient-to-bl from-[#080d14] via-[#101824] to-[#182332] border-2 border-amber-400/70 shadow-[14px_16px_32px_rgba(0,0,0,0.7)] flex flex-col justify-between p-2.5 pr-5 pl-4 backface-hidden overflow-hidden"
                    style={{ transform: 'rotateY(180deg) translateZ(8px)' }}
                  >
                    <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                    <div className="text-center pt-1 z-10">
                      <div className="text-[9px] font-serif font-bold text-amber-300 tracking-wider">
                        萬安典藏文庫
                      </div>
                      <div className="text-[8px] text-amber-400/70 font-serif">
                        第 {featuredIndex + 1} 卷 · 封底檔案
                      </div>
                    </div>

                    <div className="my-auto text-center z-10 px-1">
                      <div className="text-[9px] text-neutral-200 line-clamp-4 leading-tight font-serif italic">
                        「{featuredArticle.excerpt}」
                      </div>
                    </div>

                    <div className="z-10 bg-white/95 p-1 rounded-xs border border-amber-900/60 text-center mx-1 mb-1">
                      <div className="font-mono text-[7px] text-neutral-900 tracking-wider">
                        ||| | |||| | ||| |||| |
                      </div>
                      <div className="font-mono text-[6px] text-neutral-800">
                        ISBN 978-986-{featuredArticle.id.toUpperCase().slice(0, 4)}
                      </div>
                    </div>
                  </div>

                  {/* Red Bookmark Ribbon */}
                  <div className="absolute bottom-[-10px] right-4 w-3 h-7 bg-red-700 shadow-md rounded-b-xs border-r border-red-900 z-30" />
                </div>

                <div className="h-2 w-24 mx-auto bg-black/60 blur-xs rounded-full mt-2" />

                {/* 切換按鈕 */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookFace('front');
                    }}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded transition-all cursor-pointer border ${
                      bookFace === 'front'
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                    }`}
                  >
                    前面 (封面)
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookFace('back');
                    }}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded transition-all cursor-pointer border ${
                      bookFace === 'back'
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                    }`}
                  >
                    後面 (封底)
                  </button>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>典範條目推薦</span>
                    </span>

                    <button
                      onClick={handleShuffleFeatured}
                      className="text-xs text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                      title="隨機換一篇典範條目"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>換一篇</span>
                    </button>
                  </div>

                  <span className="font-mono text-[11px]">{featuredArticle.date}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <button onClick={() => onSelectArticle(featuredArticle.id)} className="text-left cursor-pointer">
                    {featuredArticle.title}
                  </button>
                </h2>

                <p className="mt-2.5 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                  分類：<span className="font-medium text-neutral-700 dark:text-neutral-300">{featuredArticle.category}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={() => onSelectArticle(featuredArticle.id)}
              className="font-medium text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1.5 py-1 px-2 rounded hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
            >
              <span>閱讀本條目全文</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onNavigateBooks}
              className="font-medium text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>進入書籍專頁（所有 {articles.length} 卷書本完整雙面）→</span>
            </button>
          </div>
        </section>

        {/* 你知道嗎？ (5 Cols - 對調至今日特色條目旁) */}
        <section className="lg:col-span-5 bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3.5">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>你知道嗎？</span>
                </h2>
                <button
                  onClick={onNavigateDyk}
                  className="text-xs text-blue-700 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                >
                  全部 {didYouKnowData.length} 則 →
                </button>
              </div>
              <button
                onClick={() => setDykSeed((s) => s + 1)}
                className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1 transition-colors cursor-pointer"
                title="隨機換一批冷知識"
              >
                <RefreshCw className="w-3 h-3" />
                <span>換一批</span>
              </button>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {displayedDyk.map((item, idx) => {
                const art = articles.find((a) => a.id === item.articleId);
                return (
                  <li key={idx} className="leading-relaxed flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold shrink-0">·</span>
                    <span>
                      ……{item.fact}
                      {art && (
                        <button
                          onClick={() => onSelectArticle(item.articleId)}
                          className="ml-1 text-blue-700 dark:text-blue-400 hover:underline font-medium inline cursor-pointer"
                        >
                          （{art.title}）
                        </button>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-5 pt-3.5 border-t border-neutral-200/80 dark:border-neutral-800">
            <button
              onClick={onNavigateDyk}
              className="w-full py-2 px-3 text-xs sm:text-sm font-medium text-center text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>瀏覽「你知道嗎？」專頁 ({didYouKnowData.length}則趣味冷知識) →</span>
            </button>
          </div>
        </section>
      </div>

      {/* 議題專欄特刊模式彙整區 (Curated Topic Columns Showcase) */}
      <section className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase">
                FEATURED DOSSIERS
              </span>
              <span className="text-xs text-neutral-400">· 梳理脈絡動線</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2 mt-0.5">
              <BookMarked className="w-5 h-5 text-blue-600" />
              <span>議題專欄彙整特刊</span>
            </h2>
          </div>

          <button
            onClick={() => onNavigateColumns()}
            className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>瀏覽全部 6 大主題專欄特刊 →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {topicColumns.map((col) => (
            <div
              key={col.id}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 bg-neutral-50/60 dark:bg-[#161a20] hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="text-2xl">{col.icon}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    {col.articleIds.length} 篇條目
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal font-medium">
                  {col.subtitle}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2.5 leading-relaxed">
                  {col.lead}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => onNavigateColumns(col.id)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>開啟專欄深入閱讀</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 市政風物詩 · 萬安都會關鍵字圖譜 (Urban Keywords & Haiku Tokens)  */}
      {/* ============================================================== */}
      <section className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                MUNICIPAL FUDOKI · URBAN TOKENS
              </span>
              <span className="text-xs text-neutral-400">· 台北都會當代風物誌</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2 mt-0.5">
              <span>🍃</span>
              <span>市政風物詩 · 萬安都會關鍵字</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              精選台北市民最有感之名詞風物（老鼠、三顆大藍莓、天價遮陽傘、水溝長山蘇、美沙冬、丟甘蔗、Trash Time、火鍋修辭學等），點擊關鍵字即可即時解讀都會典故並深入條目！
            </p>
          </div>

          {onNavigateGraph && (
            <button
              onClick={onNavigateGraph}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/60 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs active:scale-95"
              title="在 D3 知識圖譜中檢視市政連動網絡"
            >
              <Network className="w-3.5 h-3.5 text-violet-500" />
              <span>查看決策知識圖譜 🕸️ →</span>
            </button>
          )}
        </div>

        {/* Keyword Pills Carousel / Grid */}
        <div className="flex flex-wrap items-center gap-2">
          {fudokiItems.map((item) => {
            const isSelected = activeFudokiId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveFudokiId(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 active:scale-95 ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold shadow-xs ring-2 ring-emerald-500/40'
                    : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                }`}
                title={`查看「${item.keyword}」風物詩典故`}
              >
                <span className="text-base shrink-0">{item.emoji}</span>
                <span>{item.keyword}</span>
              </button>
            );
          })}
        </div>

        {/* Active Selected Fudoki Showcase Card */}
        {(() => {
          const selectedFudoki = fudokiItems.find((f) => f.id === activeFudokiId) || fudokiItems[0];
          if (!selectedFudoki) return null;
          return (
            <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 dark:from-emerald-950/20 dark:via-[#161a20] dark:to-amber-950/10 border border-emerald-200 dark:border-emerald-900/40 shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                    {selectedFudoki.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50">
                        {selectedFudoki.keyword}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                        {selectedFudoki.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                      {selectedFudoki.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => onSelectArticle(selectedFudoki.articleId)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <span>閱讀「{selectedFudoki.articleTitle}」條目全文</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5 p-3.5 rounded-lg bg-white dark:bg-[#12151a] border border-amber-200 dark:border-amber-900/40 text-amber-950 dark:text-amber-200 font-serif italic text-xs sm:text-sm leading-relaxed shadow-2xs">
                  <span className="text-amber-500 font-bold mr-1">“</span>
                  {selectedFudoki.quote}
                  <span className="text-amber-500 font-bold ml-1">”</span>
                </div>

                <div className="md:col-span-7 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  {selectedFudoki.humorNote}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* History & Numbers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* 歷史上的今天 (5 Cols - 對調至數字會說話旁) */}
        <section className="lg:col-span-5 bg-neutral-50 dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3.5">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>歷史上的今天 ({todayMonth}月{todayDay}日)</span>
                </h2>
                <button
                  onClick={onNavigateHistory}
                  className="text-xs text-blue-700 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                >
                  全日期時間軸 →
                </button>
              </div>
              <button
                onClick={() => setHistorySeed((s) => s + 1)}
                className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1 transition-colors cursor-pointer"
                title="換一批歷史檔案"
              >
                <RefreshCw className="w-3 h-3" />
                <span>換一批</span>
              </button>
            </div>

            {/* Note & Fallback handling: if today's exact date is empty */}
            {todayHistory.note && (
              <div className="mb-3 px-2.5 py-1.5 rounded bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[11px] text-emerald-800 dark:text-emerald-300">
                {todayHistory.note}
              </div>
            )}

            <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {todayHistory.events.map((ev, i) => (
                <li key={i} className="leading-relaxed flex items-start gap-1.5">
                  <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400 shrink-0">
                    {formatEventDate(ev.date)}
                  </span>
                  <span className="flex-1">
                    {ev.title}
                    <button
                      onClick={() => onSelectArticle(ev.articleId)}
                      className="ml-1 text-xs text-blue-700 dark:text-blue-400 hover:underline font-medium inline cursor-pointer"
                    >
                      （{ev.articleTitle}）
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3.5 border-t border-neutral-200/80 dark:border-neutral-800">
            <button
              onClick={onNavigateHistory}
              className="w-full py-2 px-3 text-xs sm:text-sm font-medium text-center text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>進入「歷史上的今天」全年 365 天時間軸 ({allHistoryEvents.length}則) →</span>
            </button>
          </div>
        </section>

        {/* Numbers Section (7 Cols) */}
        <section className="lg:col-span-7 bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 sm:p-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                <span>數字會說話</span>
              </h2>
              <button
                onClick={onNavigateNumbers}
                className="text-xs text-blue-700 dark:text-blue-400 hover:underline font-medium cursor-pointer"
              >
                全部 {statsData.length} 筆 →
              </button>
            </div>
            <button
              onClick={() => setNumSeed((s) => s + 1)}
              className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>換一批</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {displayedStats.map((stat, idx) => (
              <button
                key={idx}
                onClick={() => onSelectArticle(stat.articleId)}
                className="text-left p-2.5 sm:p-3 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors group cursor-pointer"
              >
                <div className="text-base sm:text-lg font-serif font-bold text-blue-700 dark:text-blue-400 font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-200 mt-1.5 leading-relaxed font-normal">
                  {stat.label}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Quiz Banner Feature: Dual Interactive Arenas */}
      <div className="bg-gradient-to-br from-rose-50/60 via-white to-blue-50/40 dark:from-rose-950/20 dark:via-[#14181d] dark:to-blue-950/20 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                🔥 2026 社群爆紅新玩法
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                · 雙重互動模式上線
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              盲測大考驗：不看姓名，你會不會選蔣萬安？
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              拋開藍綠政黨濾鏡，純憑直覺作答！「你會不會丟甘蔗？」、「你喜歡天花板掉下來的老鼠嗎？」、「倒垃圾對外賓脫口 Trash Time 嗎？」測測看你骨子裡與萬安市長的靈魂契合度！另有考證嚴謹的 35 題時事百科記憶題庫。
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded">
                🌱 你會不會丟甘蔗？
              </span>
              <span className="text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded">
                🐭 你喜歡議會老鼠嗎？
              </span>
              <span className="text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded">
                🗑️ 外交 Trash Time
              </span>
              <span className="text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded">
                🏋️ 深蹲換搭公車
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href="#blind-quiz"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#blind-quiz';
                onNavigateQuiz();
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <span>🎭</span>
              <span>開始盲測（你會選蔣萬安嗎？）</span>
            </a>

            <a
              href="#fact-quiz"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#fact-quiz';
                onNavigateQuiz();
              }}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              <span>挑戰時事百科知識題庫 ({quizQuestions.length}題)</span>
            </a>
          </div>
        </div>
      </div>


      {/* 萬安志異 · 維基誌異特刊 Banner Feature */}
      <section className="relative overflow-hidden rounded-xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/70 via-[#1c1815] to-neutral-950 p-5 sm:p-7 text-neutral-100 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-medium border border-amber-500/40">
              <span>🏮 維基誌異特刊</span>
              <span>·</span>
              <span>WIKIPEDIA UNUSUAL ARTICLES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <span>萬安志異 · 迷因語錄與市政奇觀</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif">
              參考中文維基百科《維基誌異/辱包文化》體例，全面收錄「火鍋市長一稿五用」、「水溝30公分長山蘇」、「700萬冬天才開遮陽傘」、「印尼水軍按讚大隊」、「世壯運TAIIPEI」與民間開源二次創作工具。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {onNavigateOddities && (
              <button
                onClick={onNavigateOddities}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>探索萬安志異專頁 🏮</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 萬安市政朝聖地圖 · Google 地圖實景巡禮 Banner Feature */}
      <section className="relative overflow-hidden rounded-xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950/70 via-[#131d18] to-neutral-950 p-5 sm:p-7 text-neutral-100 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-medium border border-emerald-500/40">
              <Compass className="w-3.5 h-3.5" />
              <span>GOOGLE 地圖實景朝聖</span>
              <span>·</span>
              <span>TAIPEI PILGRIMAGE SPOT DIRECTORY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>萬安市政朝聖地圖 · 實體爭議聖地巡禮 🗺️</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif">
              以 Google 地圖即時定位與衛星實景，實地收錄台北大巨蛋漏水點、和平新生天橋拆除路口、基泰大直塌陷工區、龍山寺前丟甘蔗廣場、公館水泥柵欄吸菸區與北藝貢丸建築，提供詳細實體地址、導航路線與朝聖合影攻略。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {onNavigateMap && (
              <button
                onClick={onNavigateMap}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>進入朝聖地圖專頁 🗺️</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* External Civics & Viral Tools Highlight Section */}
      <section className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                社群熱門創作推薦
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                外部獨立站點
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-1 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-sky-500" />
              <span>外部精選連結與互動專案</span>
            </h2>
          </div>

          {onNavigateLinks && (
            <button
              onClick={onNavigateLinks}
              className="text-xs sm:text-sm text-sky-600 dark:text-sky-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>瀏覽完整專頁 (含考證與查核站點)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* 1. 記者提問快問 */}
          <a
            href="https://tight-sunset-9f4c.dmj890145.workers.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xl">🎙️</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  時事快問
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                「你知道記者剛剛問蔣萬安什麼嗎？」
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                實測模擬記者現場堵訪提問與經典應答，考驗對時事問題與官式回答的辨識度。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-medium">
              <span>造訪互動網站</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          {/* 2. 回應產生器 */}
          <a
            href="https://jiangwanan-generator.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xl">🤖</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  語錄工具
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                🤖「蔣萬安回應產生器」
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                精準模擬「全面掌握、依照SOP落實、全力以赴」等經典四平八穩官式金句範本。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-medium">
              <span>進入產生器</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          {/* 3. 蔣出來小遊戲 */}
          <a
            href="https://whoismygrandpa.win/game"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xl">🎮</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  闖關小遊戲
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                🎮「蔣出來」互動小遊戲
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                身世疑雲與政壇話題趣味互動闖關，輕鬆體驗時事話題與趣味通關彩蛋。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-medium">
              <span>開始遊戲</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          {/* 4. 蔣出來考證主站 */}
          <a
            href="https://whoismygrandpa.win"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xl">📜</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  身世考證
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                📜「蔣出來」歷史考證主站
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                彙整蔣經國日記、郭禮伯回憶錄考證、章孝嚴改姓法令程序之客觀史料資料庫。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-medium">
              <span>瀏覽考證主站</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          {/* 5. 台北心動彈幕 */}
          <a
            href="https://kookisky.github.io/puma/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all group flex flex-col justify-between sm:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xl">💬</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  即時動態牆
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                💬 台北心動彈幕
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                滿版滾動的即時心動彈幕牆（kookisky.github.io/puma/），視覺化呈現網路社群針對台北市政焦點與時事的生動留言與心聲。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-medium">
              <span>開啟心動彈幕牆</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        </div>
      </section>

      {/* Categorized Directory */}
      <section className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 sm:p-7">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-4 pb-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
          <Layers className="w-4 h-4 text-neutral-400" />
          <span>分類條目導覽 ({articles.length} 篇)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map(([cat, arts]) => (
            <div key={cat} className="space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-50 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700/80 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{cat}</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 font-normal">{arts.length} 篇</span>
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                {arts.map((art) => (
                  <li key={art.id}>
                    <button
                      onClick={() => onSelectArticle(art.id)}
                      className="text-left text-neutral-700 dark:text-neutral-300 hover:text-blue-700 dark:hover:text-blue-400 hover:underline flex items-center gap-1.5 py-0.5 cursor-pointer"
                    >
                      <span>{art.icon}</span>
                      <span className="truncate">{art.title}</span>
                      {art.isMainBiography && (
                        <span className="text-[9px] font-mono text-amber-500">★</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
