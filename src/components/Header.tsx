import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Sparkles, Menu, BookOpen, Layers, BookMarked, Share2, ExternalLink, MapPin, Info, Network } from 'lucide-react';
import { articles } from '../data/articles';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSelectArticle: (articleId: string) => void;
  onOpenSidebar: () => void;
  onRandomArticle: () => void;
  onOpenShare: () => void;
  onSearch?: (query: string) => void;
}

export function Header({
  currentRoute,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  onSelectArticle,
  onOpenSidebar,
  onRandomArticle,
  onOpenShare,
  onSearch,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = searchQuery.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#101418]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Menu + Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSidebar}
            aria-label="開啟導覽側邊欄"
            title="開啟功能目錄側邊欄"
            className="p-1.5 sm:p-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-base sm:text-xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-50 hover:text-blue-700 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center text-xs sm:text-sm font-serif font-bold">
              W
            </span>
            <span>Waynipedia</span>
            <span className="text-xs font-sans font-normal text-neutral-500 dark:text-neutral-400 pl-1 border-l border-neutral-300 dark:border-neutral-700 hidden xs:inline">
              蔣萬安百科
            </span>
          </a>
        </div>

        {/* Clean Top Controls: Search Input + Dark Mode Toggle (Zero clutter on mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim() && onSearch) {
                setIsSearchOpen(false);
                onSearch(searchQuery.trim());
              }
            }}
            className="relative"
          >
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-2.5 sm:left-3 text-neutral-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="搜尋條目或事件..."
                className="w-36 sm:w-56 md:w-64 pl-8 sm:pl-9 pr-2.5 py-1.5 text-xs sm:text-sm bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white dark:focus:bg-neutral-800 transition-all"
                aria-label="搜尋百科條目"
              />
            </div>

            {/* Live Search Popup */}
            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-h-80 overflow-y-auto bg-white dark:bg-[#181c21] border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl z-50 p-2">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-neutral-400 px-2 py-1 uppercase">
                  <span>搜尋結果 ({searchResults.length})</span>
                  {onSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        onSearch(searchQuery.trim());
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer lowercase"
                    >
                      開啟搜尋頁 →
                    </button>
                  )}
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectArticle(item.id);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/70 rounded transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <span className="text-base leading-none mt-0.5">{item.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate flex items-center gap-1.5">
                          <span>{item.title}</span>
                          {item.isMainBiography && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1 py-0.2 rounded font-mono">
                              主條目
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          {item.category} · {item.date}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-xs text-center text-neutral-500 dark:text-neutral-400">
                    查無符合「{searchQuery}」的條目
                  </div>
                )}
                {onSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearch(searchQuery.trim());
                    }}
                    className="w-full mt-1 pt-2 pb-1 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    前往「{searchQuery.trim()}」完整搜尋結果頁 →
                  </button>
                )}
              </div>
            )}
          </form>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            aria-label="切換深色模式"
            title="切換深淺色"
            className="p-1.5 sm:p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Desktop Dedicated Multi-Functional Navigation Ribbon (電腦版專屬次導航列，避免與上方搜尋列擠在同一排導致排版混亂) */}
      <div className="hidden md:block border-t border-neutral-100 dark:border-neutral-800/70 bg-neutral-50/70 dark:bg-[#12161b]/80 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          {/* Left Group: Core Encyclopedia Knowledge & Library Archives */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. 蔣萬安 主條目 */}
            <button
              onClick={() => onSelectArticle('chiang')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-neutral-800/90 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
              title="閱讀台北市長蔣萬安核心主條目傳記"
            >
              <span>🏛️</span>
              <span className="font-semibold">蔣萬安 主條目</span>
            </button>

            {/* 2. 議題專欄 (特刊) */}
            <button
              onClick={() => onNavigate('columns')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'columns'
                  ? 'bg-blue-600 text-white font-semibold border-blue-600'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="瀏覽 6 大市政與選戰議題專欄特刊"
            >
              <BookMarked className="w-3.5 h-3.5 text-blue-500" />
              <span>議題專欄 (特刊)</span>
            </button>

            {/* 3. 3D 典藏書庫 (76卷) */}
            <button
              onClick={() => onNavigate('books')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'books'
                  ? 'bg-amber-600 text-white font-semibold border-amber-600'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="進入全站 3D 擬真書庫與精裝書卷翻閱"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>3D 典藏書庫 ({articles.length}卷)</span>
            </button>

            {/* 4. 萬安志異 (特刊) */}
            <button
              onClick={() => onNavigate('oddities')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'oddities'
                  ? 'bg-amber-600 text-white font-semibold border-amber-600'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="瀏覽萬安志異（維基誌異體例 · 迷因、空話金句與市政奇觀）"
            >
              <span>🏮</span>
              <span>萬安志異</span>
            </button>

            {/* 5. 外部連結 🔗 */}
            <button
              onClick={() => onNavigate('links')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'links'
                  ? 'bg-sky-600 text-white font-semibold border-sky-600'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="瀏覽外部精選站點（回應產生器、蔣出來遊戲、心動彈幕）"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-500" />
              <span>外部連結 🔗</span>
            </button>

            {/* 6. 朝聖地圖 🗺️ */}
            <button
              onClick={() => onNavigate('map')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'map'
                  ? 'bg-emerald-600 text-white font-semibold border-emerald-600'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="開啟萬安市政 Google 地圖朝聖專頁"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>朝聖地圖 🗺️</span>
            </button>

            {/* 7. 決策關係圖 🕸️ */}
            <button
              onClick={() => onNavigate('graph')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'graph'
                  ? 'bg-violet-600 text-white font-semibold border-violet-600'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="探索 D3 市政議題與蔣萬安決策連動關係圖譜"
            >
              <Network className="w-3.5 h-3.5 text-violet-500" />
              <span>決策關係圖 🕸️</span>
            </button>

            {/* 8. 關於本站 */}
            <button
              onClick={() => onNavigate('about')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'about'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold border-neutral-900'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="認識 Waynipedia 萬安百科之緣起與三大編輯守則"
            >
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>關於本站</span>
            </button>

            {/* 8. 盲測大考驗 🎭 */}
            <button
              onClick={() => onNavigate('quiz-arena')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all shadow-2xs cursor-pointer border active:scale-95 ${
                currentRoute === 'quiz-arena'
                  ? 'bg-rose-600 text-white font-semibold border-rose-600'
                  : 'bg-white dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border-neutral-200 dark:border-neutral-700'
              }`}
              title="挑戰盲測：不看姓名你會選蔣萬安嗎？與時事記憶題庫"
            >
              <span>🎭</span>
              <span>盲測大考驗</span>
            </button>
          </div>

          {/* Right Group: Interactive Features & Social Sharing */}
          <div className="flex items-center gap-2 shrink-0">
            {/* 6. 隨機條目 */}
            <button
              onClick={onRandomArticle}
              title="隨機漫遊抽閱一篇百科條目深入閱讀"
              className="px-2.5 py-1.5 text-xs text-amber-800 dark:text-amber-200 hover:text-amber-900 rounded-md bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition-all inline-flex items-center gap-1.5 cursor-pointer font-medium active:scale-95 shadow-2xs"
            >
              <span>🎲</span>
              <span>隨機條目</span>
            </button>

            {/* 7. 社群分享預覽 */}
            <button
              onClick={onOpenShare}
              title="開啟純排版非AI卡片社群分享預覽 (FB, LINE, Threads, X)"
              className="px-2.5 py-1.5 text-xs text-blue-800 dark:text-blue-200 hover:text-blue-900 rounded-md bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 transition-all inline-flex items-center gap-1.5 cursor-pointer font-medium active:scale-95 shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>社群分享預覽</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
