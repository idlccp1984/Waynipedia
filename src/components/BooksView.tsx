import React, { useState, useMemo } from 'react';
import { BookOpen, ArrowLeft, Layers, Sparkles, Search, RotateCw, Filter, Bookmark, Columns, ArrowRight, Eye } from 'lucide-react';
import { BookShelfSimulation } from './BookShelfSimulation';
import { articles } from '../data/articles';

interface BooksViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  onNavigateCards: () => void;
  onNavigateColumns: () => void;
}

const CARD_PALETTES = [
  {
    bg: 'from-[#1a2634] via-[#121c27] to-[#0b1219]',
    border: 'border-amber-400/80',
    backBg: 'from-[#0b1219] via-[#121c27] to-[#1a2634]',
    ribbon: 'bg-red-700',
  },
  {
    bg: 'from-[#2b1810] via-[#1e100a] to-[#120a06]',
    border: 'border-amber-300/80',
    backBg: 'from-[#120a06] via-[#1e100a] to-[#2b1810]',
    ribbon: 'bg-amber-600',
  },
  {
    bg: 'from-[#142920] via-[#0d1c16] to-[#07120e]',
    border: 'border-emerald-400/80',
    backBg: 'from-[#07120e] via-[#0d1c16] to-[#142920]',
    ribbon: 'bg-emerald-700',
  },
  {
    bg: 'from-[#2b1322] via-[#1d0d17] to-[#12070e]',
    border: 'border-rose-300/80',
    backBg: 'from-[#12070e] via-[#1d0d17] to-[#2b1322]',
    ribbon: 'bg-purple-800',
  },
  {
    bg: 'from-[#221c2c] via-[#17131e] to-[#0e0b13]',
    border: 'border-purple-300/80',
    backBg: 'from-[#0e0b13] via-[#17131e] to-[#221c2c]',
    ribbon: 'bg-blue-800',
  },
];

export function BooksView({
  onSelectArticle,
  onNavigateHome,
  onNavigateCards,
  onNavigateColumns,
}: BooksViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeBookId, setActiveBookId] = useState<string>('chiang');

  // Gallery Display Mode:
  // 'side-by-side' (雙面並排同展：每本書同時顯示前面與後面)
  // 'flip' (3D 翻轉互動：點擊翻轉正面與背面)
  // 'front-only' (全部顯示前面封面)
  // 'back-only' (全部顯示後面封底)
  const [galleryMode, setGalleryMode] = useState<'side-by-side' | 'flip' | 'front-only' | 'back-only'>('side-by-side');

  // Map of individually flipped book IDs (when in 'flip' mode)
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});

  const toggleBookFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredBooks = useMemo(() => {
    return articles.filter((art) => {
      const matchQuery =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
      return matchQuery && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 sm:pb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-2.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回百科首頁</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                3D 典藏書庫專頁
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                完整雙面精裝史冊 · 全站收錄 {articles.length} 卷實體擬真書籍 (前面封面與後面封底)
              </p>
            </div>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onNavigateColumns}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>📖 議題專欄特刊</span>
          </button>

          <button
            onClick={onNavigateCards}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>卡牌專頁</span>
          </button>
        </div>
      </div>

      {/* Feature Guide Banner */}
      <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-neutral-900 dark:text-neutral-100 font-semibold block mb-0.5">
            全站 {articles.length} 卷書籍完整前面與後面互動展示
          </strong>
          本專頁收錄全站共 {articles.length} 卷書籍，每本書均具備完整精裝雙面構造：
          <span className="text-amber-800 dark:text-amber-300 font-semibold"> 前面 (封面) 具備清晰書名名牌、卷號、燙金徽章與象徵圖標</span>；
          <span className="text-amber-800 dark:text-amber-300 font-semibold"> 後面 (封底) 具備完整文獻梗概、初版日期、權威引證數與 ISBN 條碼</span>。
          您可在下方任意切換「雙面並排同展」、「3D 翻轉互動」、「全覽封面」或「全覽封底」！
        </div>
      </div>

      {/* Main 3D Bookshelf Stage (Selected Book) */}
      <div className="bg-white dark:bg-[#12161b] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 sm:p-5 shadow-sm">
        <BookShelfSimulation
          onSelectArticle={onSelectArticle}
          initialArticleId={activeBookId}
          allBooksMode={true}
        />
      </div>

      {/* Full Library Collection: EVERY SINGLE BOOK WITH FRONT & BACK */}
      <div className="bg-neutral-50 dark:bg-[#14181e] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 sm:p-6 space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>全館 {articles.length} 卷實體書籍雙面大典</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              每本書籍均完整呈現前面（封面）與後面（封底）
            </p>
          </div>

          {/* Mode Switcher + Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Gallery Mode Switcher */}
            <div className="inline-flex rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#181d24] p-0.5">
              <button
                onClick={() => setGalleryMode('side-by-side')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  galleryMode === 'side-by-side'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="每本書同時展示前面封面與後面封底"
              >
                <Columns className="w-3 h-3" />
                <span>雙面同展</span>
              </button>

              <button
                onClick={() => setGalleryMode('flip')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  galleryMode === 'flip'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="點擊書籍可個別翻轉查看正面或背面"
              >
                <RotateCw className="w-3 h-3" />
                <span>3D翻轉</span>
              </button>

              <button
                onClick={() => setGalleryMode('front-only')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  galleryMode === 'front-only'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="全覽所有書籍之精裝封面"
              >
                <span>前面(封面)</span>
              </button>

              <button
                onClick={() => setGalleryMode('back-only')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  galleryMode === 'back-only'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="全覽所有書籍之典藏封底"
              >
                <span>後面(封底)</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋書名或內文..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-[#181d24] border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white dark:bg-[#181d24] border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
            >
              <option value="all">全部分類 ({articles.length})</option>
              {categories
                .filter((c) => c !== 'all')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: SIDE-BY-SIDE MODE (EVERY BOOK SHOWS BOTH FRONT & BACK) */}
        {/* ============================================================== */}
        {galleryMode === 'side-by-side' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.map((art) => {
              const globalIndex = articles.findIndex((a) => a.id === art.id);
              const p = CARD_PALETTES[globalIndex % CARD_PALETTES.length];

              return (
                <div
                  key={art.id}
                  className="bg-white dark:bg-[#171b22] border border-neutral-200 dark:border-neutral-700/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  {/* Book Card Header */}
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2.5 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        VOL. {String(globalIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                        {art.title}
                      </span>
                      {art.isMainBiography && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1.5 py-0.2 rounded font-mono">
                          主條目
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setActiveBookId(art.id);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      title="抽出此書至上方3D展台"
                    >
                      <Eye className="w-3 h-3" />
                      <span>3D展台</span>
                    </button>
                  </div>

                  {/* Side-by-Side Visuals: Left Front Cover, Right Back Cover */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 my-auto">
                    {/* ===== FRONT COVER (前面：封面) ===== */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold mb-1">
                        前面 (封面)
                      </span>
                      <div
                        onClick={() => onSelectArticle(art.id)}
                        className={`w-full max-w-[155px] h-[215px] rounded-r-lg rounded-l-xs bg-gradient-to-br ${p.bg} border-2 ${p.border} shadow-lg relative flex flex-col justify-between p-2.5 pl-6 cursor-pointer group hover:scale-[1.03] transition-transform`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none border-r border-black/40 z-20" />
                        <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                        <div className="text-center pt-0.5 z-10">
                          <span className="text-[8px] font-mono text-amber-300/80 tracking-widest uppercase">
                            VOL. {String(globalIndex + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <div className="text-center my-auto py-0.5 z-10">
                          <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-b from-amber-400/20 via-black/40 to-black/70 border border-amber-400/60 flex items-center justify-center shadow-xs">
                            <span className="text-xl">{art.icon}</span>
                          </div>
                          <div className="mt-1.5 px-1 py-1 bg-black/75 border-y border-amber-400/60">
                            <h4 className="font-serif font-bold text-amber-200 text-[10px] line-clamp-2 leading-tight">
                              {art.title}
                            </h4>
                          </div>
                        </div>

                        <div className="text-center pb-0.5 z-10">
                          <div className="w-10 h-[1px] bg-amber-400/40 mx-auto" />
                        </div>
                      </div>
                    </div>

                    {/* ===== BACK COVER (後面：封底) ===== */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold mb-1">
                        後面 (封底)
                      </span>
                      <div
                        onClick={() => onSelectArticle(art.id)}
                        className={`w-full max-w-[155px] h-[215px] rounded-l-lg rounded-r-xs bg-gradient-to-bl ${p.backBg} border-2 ${p.border} shadow-lg relative flex flex-col justify-between p-2.5 pr-6 pl-3 cursor-pointer group hover:scale-[1.03] transition-transform`}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/85 via-black/35 to-transparent pointer-events-none border-l border-black/40 z-20" />
                        <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                        <div className="text-center pt-0.5 z-10">
                          <div className="text-[9px] font-serif font-bold text-amber-300 tracking-wider">
                            台北市政檔案
                          </div>
                          <div className="text-[8px] text-amber-400/70 font-serif">
                            第 {globalIndex + 1} 卷封底
                          </div>
                        </div>

                        <div className="my-auto text-center z-10 px-0.5">
                          <div className="text-[9px] text-neutral-200 leading-tight font-serif italic line-clamp-4">
                            「{art.excerpt}」
                          </div>
                        </div>

                        <div className="z-10 bg-white/95 p-1 rounded-xs border border-amber-900/60 text-center mx-0.5 mb-0.5 shadow-inner">
                          <div className="font-mono text-[7px] text-neutral-900 tracking-wider">
                            ||| | |||| | ||| ||||
                          </div>
                          <div className="font-mono text-[6px] text-neutral-800">
                            ISBN 978-986-{art.id.toUpperCase().slice(0, 4)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Card Footer */}
                  <div className="mt-3.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {art.category} · {art.date}
                    </span>
                    <button
                      onClick={() => onSelectArticle(art.id)}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>閱讀條目全文</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: FLIP INTERACTIVE MODE (CLICK TO ROTATE BETWEEN FRONT & BACK) */}
        {/* ============================================================== */}
        {galleryMode === 'flip' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((art) => {
              const globalIndex = articles.findIndex((a) => a.id === art.id);
              const p = CARD_PALETTES[globalIndex % CARD_PALETTES.length];
              const isFlipped = !!flippedMap[art.id];

              return (
                <div
                  key={art.id}
                  className="bg-white dark:bg-[#171b22] border border-neutral-200 dark:border-neutral-700/80 rounded-xl p-3.5 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                      VOL. {String(globalIndex + 1).padStart(2, '0')}
                    </span>
                    <button
                      onClick={(e) => toggleBookFlip(art.id, e)}
                      className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>{isFlipped ? '翻回前面' : '翻看後面'}</span>
                    </button>
                  </div>

                  {/* Flippable Book Container */}
                  <div
                    onClick={() => toggleBookFlip(art.id)}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setActiveBookId(art.id);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="w-full h-[240px] flex items-center justify-center cursor-pointer my-1 select-none"
                    title="點擊翻轉書本 · 雙擊 (Double-Click) 至上方 3D 展台翻開內頁"
                  >
                    {!isFlipped ? (
                      /* FRONT FACE */
                      <div
                        className={`w-[170px] h-[230px] rounded-r-lg rounded-l-xs bg-gradient-to-br ${p.bg} border-2 ${p.border} shadow-lg relative flex flex-col justify-between p-3 pl-7 group hover:scale-[1.02] transition-transform`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none border-r border-black/40 z-20" />
                        <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                        <div className="text-center pt-1 z-10">
                          <span className="text-[9px] font-mono text-amber-300/80 tracking-widest uppercase">
                            VOL. {String(globalIndex + 1).padStart(2, '0')} · {art.category}
                          </span>
                        </div>

                        <div className="text-center my-auto py-1 z-10">
                          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-b from-amber-400/20 via-black/40 to-black/70 border border-amber-400/60 flex items-center justify-center shadow-xs">
                            <span className="text-2xl">{art.icon}</span>
                          </div>
                          <div className="mt-2 px-1.5 py-1 bg-black/75 border-y border-amber-400/60">
                            <h4 className="font-serif font-bold text-amber-200 text-xs line-clamp-2 leading-tight">
                              {art.title}
                            </h4>
                          </div>
                        </div>

                        <div className="text-center pb-1 z-10">
                          <div className="w-12 h-[1px] bg-amber-400/40 mx-auto" />
                        </div>
                      </div>
                    ) : (
                      /* BACK FACE */
                      <div
                        className={`w-[170px] h-[230px] rounded-l-lg rounded-r-xs bg-gradient-to-bl ${p.backBg} border-2 ${p.border} shadow-lg relative flex flex-col justify-between p-3 pr-7 pl-4 group hover:scale-[1.02] transition-transform`}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-black/85 via-black/35 to-transparent pointer-events-none border-l border-black/40 z-20" />
                        <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                        <div className="text-center pt-1 z-10">
                          <div className="text-[10px] font-serif font-bold text-amber-300 tracking-wider">
                            台北市政檔案
                          </div>
                          <div className="text-[8px] text-amber-400/70 font-serif">
                            第 {globalIndex + 1} 卷封底
                          </div>
                        </div>

                        <div className="my-auto text-center z-10 px-1">
                          <div className="text-[9px] text-neutral-200 leading-tight font-serif italic line-clamp-4">
                            「{art.excerpt}」
                          </div>
                        </div>

                        <div className="z-10 bg-white/95 p-1 rounded-xs border border-amber-900/60 text-center mx-1 mb-1 shadow-inner">
                          <div className="font-mono text-[7px] text-neutral-900 tracking-wider">
                            ||| | |||| | ||| ||||
                          </div>
                          <div className="font-mono text-[6px] text-neutral-800">
                            ISBN 978-986-{art.id.toUpperCase().slice(0, 4)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setActiveBookId(art.id);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                    >
                      3D展台
                    </button>
                    <button
                      onClick={() => onSelectArticle(art.id)}
                      className="text-[11px] text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>閱讀全文</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: FRONT COVERS ONLY (前面) */}
        {/* ============================================================== */}
        {galleryMode === 'front-only' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((art) => {
              const globalIndex = articles.findIndex((a) => a.id === art.id);
              const p = CARD_PALETTES[globalIndex % CARD_PALETTES.length];

              return (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art.id)}
                  className="bg-white dark:bg-[#171b22] border border-neutral-200 dark:border-neutral-700/80 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-between cursor-pointer group"
                >
                  <div className={`w-full max-w-[155px] h-[215px] rounded-r-lg rounded-l-xs bg-gradient-to-br ${p.bg} border-2 ${p.border} shadow-lg relative flex flex-col justify-between p-2.5 pl-6 group-hover:scale-[1.03] transition-transform`}>
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none border-r border-black/40 z-20" />
                    <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                    <div className="text-center pt-0.5 z-10">
                      <span className="text-[8px] font-mono text-amber-300/80 tracking-widest uppercase">
                        VOL. {String(globalIndex + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="text-center my-auto py-0.5 z-10">
                      <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-b from-amber-400/20 via-black/40 to-black/70 border border-amber-400/60 flex items-center justify-center shadow-xs">
                        <span className="text-xl">{art.icon}</span>
                      </div>
                      <div className="mt-1.5 px-1 py-1 bg-black/75 border-y border-amber-400/60">
                        <h4 className="font-serif font-bold text-amber-200 text-[10px] line-clamp-2 leading-tight">
                          {art.title}
                        </h4>
                      </div>
                    </div>

                    <div className="text-center pb-0.5 z-10">
                      <div className="w-10 h-[1px] bg-amber-400/40 mx-auto" />
                    </div>
                  </div>

                  <div className="w-full mt-2.5 pt-1.5 border-t border-neutral-100 dark:border-neutral-800 text-center">
                    <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate group-hover:text-blue-600 transition-colors">
                      {art.title}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                      {art.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: BACK COVERS ONLY (後面) */}
        {/* ============================================================== */}
        {galleryMode === 'back-only' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((art) => {
              const globalIndex = articles.findIndex((a) => a.id === art.id);
              const p = CARD_PALETTES[globalIndex % CARD_PALETTES.length];

              return (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art.id)}
                  className="bg-white dark:bg-[#171b22] border border-neutral-200 dark:border-neutral-700/80 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-between cursor-pointer group"
                >
                  <div className={`w-full max-w-[155px] h-[215px] rounded-l-lg rounded-r-xs bg-gradient-to-bl ${p.backBg} border-2 ${p.border} shadow-lg relative flex flex-col justify-between p-2.5 pr-6 pl-3 group-hover:scale-[1.03] transition-transform`}>
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/85 via-black/35 to-transparent pointer-events-none border-l border-black/40 z-20" />
                    <div className="absolute inset-2 border border-amber-400/40 rounded-xs pointer-events-none" />

                    <div className="text-center pt-0.5 z-10">
                      <div className="text-[9px] font-serif font-bold text-amber-300 tracking-wider">
                        台北市政檔案
                      </div>
                      <div className="text-[8px] text-amber-400/70 font-serif">
                        第 {globalIndex + 1} 卷封底
                      </div>
                    </div>

                    <div className="my-auto text-center z-10 px-0.5">
                      <div className="text-[9px] text-neutral-200 leading-tight font-serif italic line-clamp-5">
                        「{art.excerpt}」
                      </div>
                    </div>

                    <div className="z-10 bg-white/95 p-1 rounded-xs border border-amber-900/60 text-center mx-0.5 mb-0.5 shadow-inner">
                      <div className="font-mono text-[7px] text-neutral-900 tracking-wider">
                        ||| | |||| | ||| ||||
                      </div>
                      <div className="font-mono text-[6px] text-neutral-800">
                        ISBN 978-986-{art.id.toUpperCase().slice(0, 4)}
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-2.5 pt-1.5 border-t border-neutral-100 dark:border-neutral-800 text-center">
                    <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100 truncate group-hover:text-blue-600 transition-colors">
                      {art.title} (封底)
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                      收錄日期：{art.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
