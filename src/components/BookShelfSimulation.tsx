import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types';
import { articles } from '../data/articles';
import { getGoogleAiSummaryUrl, buildAiPrompt } from '../utils/aiSummary';
import { pilgrimageSpots } from '../data/pilgrimageSpots';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Layers,
  X,
  Sparkles,
  RotateCw,
  Columns,
  Eye,
  CheckCircle,
  Play,
  Pause,
  ExternalLink,
  MapPin,
} from 'lucide-react';

interface BookShelfSimulationProps {
  onSelectArticle: (articleId: string) => void;
  initialArticleId?: string;
  allBooksMode?: boolean;
}

const BOOK_PALETTES = [
  {
    bg: 'from-[#1a2634] via-[#121c27] to-[#0b1219]',
    spine: 'bg-[#141f2b]',
    border: 'border-amber-400/80',
    gold: 'text-amber-300',
    ribbon: 'bg-red-700',
    backBg: 'from-[#0b1219] via-[#121c27] to-[#1a2634]',
  },
  {
    bg: 'from-[#2b1810] via-[#1e100a] to-[#120a06]',
    spine: 'bg-[#20120c]',
    border: 'border-amber-300/80',
    gold: 'text-amber-200',
    ribbon: 'bg-amber-600',
    backBg: 'from-[#120a06] via-[#1e100a] to-[#2b1810]',
  },
  {
    bg: 'from-[#142920] via-[#0d1c16] to-[#07120e]',
    spine: 'bg-[#0f211a]',
    border: 'border-emerald-400/80',
    gold: 'text-emerald-200',
    ribbon: 'bg-emerald-700',
    backBg: 'from-[#07120e] via-[#0d1c16] to-[#142920]',
  },
  {
    bg: 'from-[#2b1322] via-[#1d0d17] to-[#12070e]',
    spine: 'bg-[#220f1b]',
    border: 'border-rose-300/80',
    gold: 'text-rose-200',
    ribbon: 'bg-purple-800',
    backBg: 'from-[#12070e] via-[#1d0d17] to-[#2b1322]',
  },
  {
    bg: 'from-[#221c2c] via-[#17131e] to-[#0e0b13]',
    spine: 'bg-[#1b1623]',
    border: 'border-purple-300/80',
    gold: 'text-purple-200',
    ribbon: 'bg-blue-800',
    backBg: 'from-[#0e0b13] via-[#17131e] to-[#221c2c]',
  },
];

export function BookShelfSimulation({
  onSelectArticle,
  initialArticleId = 'chiang',
  allBooksMode = false,
}: BookShelfSimulationProps) {
  const bookList = articles;

  const [selectedIndex, setSelectedIndex] = useState<number>(() => {
    const idx = bookList.findIndex((a) => a.id === initialArticleId);
    return idx !== -1 ? idx : 0;
  });

  // Display mode: 'front' (前面), 'back' (後面), 'side-by-side' (雙面並排), 'open' (翻開內頁)
  // 手機版預設顯示前面封面 ('front')，電腦版寬螢幕預設雙面並排 ('side-by-side')
  const [displayMode, setDisplayMode] = useState<'front' | 'back' | 'side-by-side' | 'open'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'front';
    }
    return 'side-by-side';
  });

  // 3D 擬真旋轉控制（自動 3D 緩慢轉動 / 拖曳角度互動）
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [manualRotateY, setManualRotateY] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);

  // 雙擊與雙碰 (Double-Tap) 翻開書頁之時間戳紀錄
  const lastTapRef = useRef<number>(0);
  const handleTouchTap = (onSingleAction: () => void) => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      // 雙碰！翻開書本
      setDisplayMode('open');
    } else {
      // 單碰延遲處理
      onSingleAction();
    }
    lastTapRef.current = now;
  };

  // Mobile folio view: 'spread' (雙頁對開), 'left' (左頁目錄), 'right' (右頁提要)
  const [mobileFolioView, setMobileFolioView] = useState<'spread' | 'left' | 'right'>('spread');
  const shelfRef = useRef<HTMLDivElement>(null);

  const currentArticle = bookList[selectedIndex] || bookList[0];
  const palette = BOOK_PALETTES[selectedIndex % BOOK_PALETTES.length];

  // Sync when initialArticleId changes
  useEffect(() => {
    if (initialArticleId) {
      const idx = bookList.findIndex((a) => a.id === initialArticleId);
      if (idx !== -1) {
        setSelectedIndex(idx);
      }
    }
  }, [initialArticleId, bookList]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : bookList.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev < bookList.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        setDisplayMode('side-by-side');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookList.length]);

  // Center active book on shelf
  useEffect(() => {
    if (shelfRef.current) {
      const activeElement = shelfRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : bookList.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < bookList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900 via-[#13171c] to-[#0c0e12] border border-neutral-800 text-neutral-100 shadow-2xl p-4 sm:p-7 md:p-8 my-3">
      {/* Ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />

      {/* Top Header & Mode Switcher */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 font-mono">
              3D BOOK SIMULATION · 全站 {bookList.length} 卷典藏大典
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
            擬真典藏館 · 完整雙面裝訂 (前面與後面)
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            每本書籍均具備完整前面（精裝封面）與後面（典藏封底），收錄內容梗概、文獻引證與ISBN條碼。
          </p>
        </div>

        {/* View Mode Tabs (雙面並排 / 封面前面 / 封底後面 / 翻開雙頁) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Side by side Button (Default) */}
          <button
            onClick={() => setDisplayMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
              displayMode === 'side-by-side'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 font-semibold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
            }`}
            title="同時並排展示正面封面與背面封底"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>🔄 雙面並排同展</span>
          </button>

          {/* Front Button */}
          <button
            onClick={() => setDisplayMode('front')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
              displayMode === 'front'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 font-semibold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
            }`}
          >
            <span>📖 前面 (封面)</span>
          </button>

          {/* Back Button */}
          <button
            onClick={() => setDisplayMode('back')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
              displayMode === 'back'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 font-semibold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>📑 後面 (封底)</span>
          </button>

          {/* Open Double-Page */}
          <button
            onClick={() => setDisplayMode(displayMode === 'open' ? 'side-by-side' : 'open')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
              displayMode === 'open'
                ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-md shadow-blue-600/30'
                : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{displayMode === 'open' ? '合上書本' : '翻開雙頁'}</span>
          </button>

          {/* 3D Auto Rotate Toggle Button */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
              isAutoRotating
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'
            }`}
            title="開啟或關閉 3D 自動微角立體旋轉展示"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'text-amber-400' : ''}`} />
            <span>3D旋轉: {isAutoRotating ? '開' : '關'}</span>
          </button>

          {/* Full Article Link */}
          <button
            onClick={() => onSelectArticle(currentArticle.id)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 shadow-md shadow-blue-900/30 cursor-pointer"
          >
            <span>條目全文</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Helper Banner: Double Click / Double Tap Notice */}
      <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-amber-300 font-mono bg-black/50 backdrop-blur-xs py-1.5 px-3.5 rounded-full border border-amber-500/30 max-w-fit mx-auto my-2 shadow-sm text-center">
        <span className="text-amber-400">✨</span>
        <span>雙擊書本 (Double Click / 手機雙觸) 翻開書頁進入內頁</span>
        <span className="text-amber-400/80 hidden xs:inline">· 單擊切換封面/封底</span>
      </div>

      {/* Main Display Area */}
      <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center py-6 sm:py-8">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous Book"
          className="absolute left-1 sm:left-3 z-30 p-2 sm:p-3 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 shadow-xl transition-transform active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next Book"
          className="absolute right-1 sm:right-3 z-30 p-2 sm:p-3 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 shadow-xl transition-transform active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* MODE 1: SIDE-BY-SIDE (FRONT & BACK BOTH VISIBLE SIMULTANEOUSLY) */}
        {displayMode === 'side-by-side' && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 animate-in fade-in zoom-in-95 duration-200 max-w-4xl mx-auto">
            {/* FRONT COVER */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold mb-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>【書籍前面 · 精裝封面】</span>
              </div>
              <div
                onClick={() => onSelectArticle(currentArticle.id)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setDisplayMode('open');
                }}
                onTouchEnd={() => handleTouchTap(() => onSelectArticle(currentArticle.id))}
                title="雙擊翻開書頁 · 單擊閱讀全文"
                className={`w-[210px] sm:w-[260px] h-[300px] sm:h-[390px] rounded-r-xl rounded-l-xs bg-gradient-to-br ${palette.bg} border-2 ${palette.border} shadow-[18px_24px_50px_rgba(0,0,0,0.85)] relative flex flex-col justify-between p-4 sm:p-5 pl-8 sm:pl-10 cursor-pointer group hover:scale-[1.02] transition-transform select-none`}
              >
                {/* Left Spine Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none border-r border-black/40 z-20" />
                <div className="absolute inset-2.5 sm:inset-3 border border-amber-400/40 rounded-xs pointer-events-none" />
                <div className="absolute inset-3.5 sm:inset-4 border border-dashed border-amber-400/25 rounded-xs pointer-events-none" />

                {/* Corner Accents */}
                <div className="absolute top-4 left-7 w-2 h-2 border-t border-l border-amber-400/70" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-amber-400/70" />
                <div className="absolute bottom-4 left-7 w-2 h-2 border-b border-l border-amber-400/70" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-amber-400/70" />

                {/* Top Vol */}
                <div className="relative z-10 pt-1 text-center">
                  <span className="font-mono text-[9px] sm:text-[10px] text-amber-300/90 tracking-widest uppercase">
                    VOL. {String(selectedIndex + 1).padStart(2, '0')} · {currentArticle.category}
                  </span>
                </div>

                {/* Central Emblem & Title Plaque */}
                <div className="relative z-10 text-center my-auto py-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-b from-amber-400/25 via-black/50 to-black/75 border-2 border-amber-400/70 flex items-center justify-center shadow-lg group-hover:border-amber-300 transition-colors">
                    <span className="text-3xl sm:text-4xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {currentArticle.icon}
                    </span>
                  </div>
                  <div className="mt-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-black/80 backdrop-blur-xs border-y border-amber-400/60 shadow-md">
                    <h3 className="font-serif font-bold text-amber-200 text-xs sm:text-sm line-clamp-2 leading-tight">
                      {currentArticle.title}
                    </h3>
                    {currentArticle.isMainBiography && (
                      <span className="inline-block mt-1 text-[8px] sm:text-[9px] font-mono text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/40">
                        ★ 百科核心主條目
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Spine Line */}
                <div className="relative z-10 text-center pb-1">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto" />
                </div>

                {/* Ribbon Bookmark */}
                <div className={`absolute bottom-[-14px] right-8 w-3.5 h-8 ${palette.ribbon} shadow-lg rounded-b-xs transform translate-y-1 z-30`} />
              </div>
            </div>

            {/* BACK COVER */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold mb-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>【書籍後面 · 典藏封底】</span>
              </div>
              <div
                onClick={() => onSelectArticle(currentArticle.id)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setDisplayMode('open');
                }}
                onTouchEnd={() => handleTouchTap(() => onSelectArticle(currentArticle.id))}
                title="雙擊翻開書頁 · 單擊閱讀全文"
                className={`w-[210px] sm:w-[260px] h-[300px] sm:h-[390px] rounded-l-xl rounded-r-xs bg-gradient-to-bl ${palette.backBg} border-2 border-amber-400/80 shadow-[18px_24px_50px_rgba(0,0,0,0.85)] relative flex flex-col justify-between p-4 sm:p-5 pr-8 sm:pr-10 pl-5 sm:pl-6 cursor-pointer group hover:scale-[1.02] transition-transform select-none`}
              >
                {/* Right Edge Shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-black/90 via-black/40 to-transparent pointer-events-none border-l border-black/40 z-20" />
                <div className="absolute inset-2.5 sm:inset-3 border border-amber-400/40 rounded-xs pointer-events-none" />
                <div className="absolute inset-3.5 sm:inset-4 border border-dashed border-amber-400/25 rounded-xs pointer-events-none" />

                {/* Back Header */}
                <div className="text-center pt-1 z-10">
                  <div className="text-xs sm:text-sm font-serif font-bold text-amber-300 tracking-wider">
                    台北市政檔案大典
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-amber-400/80 font-serif mt-0.5">
                    萬安歷史文庫 · 典藏精裝第 {selectedIndex + 1} 卷
                  </div>
                  <div className="w-14 h-[1px] bg-amber-400/40 mx-auto mt-1.5" />
                </div>

                {/* Excerpt Body */}
                <div className="my-auto text-center z-10 px-1 sm:px-2">
                  <span className="text-[10px] font-mono text-amber-300/80 block mb-1">
                    【封底文獻梗概】
                  </span>
                  <div className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed font-serif italic line-clamp-5">
                    「{currentArticle.excerpt}」
                  </div>
                  <div className="mt-2 text-[9px] sm:text-[10px] font-mono text-neutral-400">
                    收錄日期：{currentArticle.date}
                  </div>
                </div>

                {/* Barcode & ISBN Seal */}
                <div className="z-10 bg-white/95 p-1.5 sm:p-2 rounded-xs border border-amber-900/60 text-center mx-1 mb-1 shadow-inner">
                  <div className="font-mono text-[9px] text-neutral-900 tracking-wider">
                    ||| | |||| | ||| |||| || | |||| |
                  </div>
                  <div className="font-mono text-[7px] sm:text-[8px] text-neutral-800">
                    ISBN 978-986-{currentArticle.id.toUpperCase().slice(0, 5)}-{selectedIndex + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: FRONT COVER ONLY */}
        {displayMode === 'front' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>書籍前面 (封面) · 雙擊翻開書頁 · 單擊翻看後面</span>
            </div>
            <div className={`perspective-1000 ${isAutoRotating ? 'animate-book-3d' : ''}`}>
              <div
                onClick={() => setDisplayMode('back')}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setDisplayMode('open');
                }}
                onTouchEnd={() => handleTouchTap(() => setDisplayMode('back'))}
                title="雙擊翻開書頁 · 單擊翻轉背面"
                className={`w-[220px] sm:w-[280px] h-[310px] sm:h-[410px] rounded-r-xl rounded-l-xs bg-gradient-to-br ${palette.bg} border-2 ${palette.border} shadow-[20px_28px_60px_rgba(0,0,0,0.9)] relative flex flex-col justify-between p-4 sm:p-5 pl-9 sm:pl-11 cursor-pointer group hover:scale-[1.02] transition-transform select-none`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-7 sm:w-9 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none border-r border-black/40 z-20" />
                <div className="absolute inset-3 border border-amber-400/40 rounded-xs pointer-events-none" />
                <div className="absolute inset-4 border border-dashed border-amber-400/25 rounded-xs pointer-events-none" />

                <div className="relative z-10 pt-1 text-center">
                  <span className="font-mono text-[10px] sm:text-xs text-amber-300/90 tracking-widest uppercase">
                    VOL. {String(selectedIndex + 1).padStart(2, '0')} · {currentArticle.category}
                  </span>
                </div>

                <div className="relative z-10 text-center my-auto py-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-b from-amber-400/25 via-black/50 to-black/75 border-2 border-amber-400/70 flex items-center justify-center shadow-lg group-hover:border-amber-300 transition-colors">
                    <span className="text-4xl sm:text-5xl">{currentArticle.icon}</span>
                  </div>
                  <div className="mt-3 px-3 py-2 bg-black/80 border-y border-amber-400/60 shadow-md">
                    <h3 className="font-serif font-bold text-amber-200 text-sm sm:text-base line-clamp-2 leading-tight">
                      {currentArticle.title}
                    </h3>
                    {currentArticle.isMainBiography && (
                      <span className="inline-block mt-1 text-[9px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                        ★ 百科核心主條目
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative z-10 text-center pb-1">
                  <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto" />
                </div>

                <div className={`absolute bottom-[-16px] right-10 w-4 h-10 ${palette.ribbon} shadow-lg rounded-b-xs transform translate-y-1 z-30`} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setDisplayMode('back')}
                className="px-3 py-1.5 text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>翻轉至後面 (封底)</span>
              </button>

              <button
                onClick={() => setDisplayMode('open')}
                className="px-3 py-1.5 text-xs text-blue-300 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>雙擊或點此翻開內頁</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: BACK COVER ONLY */}
        {displayMode === 'back' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>書籍後面 (封底) · 雙擊翻開書頁 · 單擊翻看前面</span>
            </div>
            <div className={`perspective-1000 ${isAutoRotating ? 'animate-book-3d' : ''}`}>
              <div
                onClick={() => setDisplayMode('front')}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setDisplayMode('open');
                }}
                onTouchEnd={() => handleTouchTap(() => setDisplayMode('front'))}
                title="雙擊翻開書頁 · 單擊翻轉前面"
                className={`w-[220px] sm:w-[280px] h-[310px] sm:h-[410px] rounded-l-xl rounded-r-xs bg-gradient-to-bl ${palette.backBg} border-2 border-amber-400/80 shadow-[20px_28px_60px_rgba(0,0,0,0.9)] relative flex flex-col justify-between p-4 sm:p-5 pr-9 sm:pr-11 pl-6 sm:pl-7 cursor-pointer group hover:scale-[1.02] transition-transform select-none`}
              >
                <div className="absolute right-0 top-0 bottom-0 w-7 sm:w-9 bg-gradient-to-l from-black/90 via-black/40 to-transparent pointer-events-none border-l border-black/40 z-20" />
                <div className="absolute inset-3 border border-amber-400/40 rounded-xs pointer-events-none" />
                <div className="absolute inset-4 border border-dashed border-amber-400/25 rounded-xs pointer-events-none" />

                <div className="text-center pt-2 z-10">
                  <div className="text-sm sm:text-base font-serif font-bold text-amber-300 tracking-wider">
                    台北市政檔案大典
                  </div>
                  <div className="text-[10px] sm:text-xs text-amber-400/80 font-serif mt-0.5">
                    萬安歷史文庫 · 典藏精裝第 {selectedIndex + 1} 卷
                  </div>
                  <div className="w-16 h-[1px] bg-amber-400/40 mx-auto mt-2" />
                </div>

                <div className="my-auto text-center z-10 px-2 sm:px-3">
                  <span className="text-[11px] font-mono text-amber-300/80 block mb-1">
                    【封底文獻梗概】
                  </span>
                  <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-serif italic line-clamp-6">
                    「{currentArticle.excerpt}」
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-neutral-400">
                    收錄日期：{currentArticle.date}
                  </div>
                </div>

                <div className="z-10 bg-white/95 p-2 rounded-xs border border-amber-900/60 text-center mx-2 mb-1 shadow-inner">
                  <div className="font-mono text-[9px] sm:text-[10px] text-neutral-900 tracking-wider">
                    ||| | |||| | ||| |||| || | |||| |
                  </div>
                  <div className="font-mono text-[8px] text-neutral-800">
                    ISBN 978-986-{currentArticle.id.toUpperCase().slice(0, 5)}-{selectedIndex + 1}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setDisplayMode('front')}
                className="px-3 py-1.5 text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>翻轉至前面 (封面)</span>
              </button>

              <button
                onClick={() => setDisplayMode('open')}
                className="px-3 py-1.5 text-xs text-blue-300 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>雙擊或點此翻開內頁</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 4: OPEN DOUBLE SPREAD */}
        {displayMode === 'open' && (
          <div className="relative max-w-3xl w-full mx-auto select-none animate-in fade-in zoom-in-95 duration-300">
            {/* Mobile Folio View Selector (Visible only on small screens) */}
            <div className="flex md:hidden items-center justify-between bg-black/40 backdrop-blur-sm p-1.5 rounded-xl border border-amber-500/30 mb-3 text-xs">
              <span className="text-[11px] font-mono text-amber-300 font-semibold pl-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>3D 書頁視角：</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMobileFolioView('spread')}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                    mobileFolioView === 'spread'
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-2xs'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  雙頁對開
                </button>
                <button
                  onClick={() => setMobileFolioView('left')}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                    mobileFolioView === 'left'
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-2xs'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  左頁 (目錄)
                </button>
                <button
                  onClick={() => setMobileFolioView('right')}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                    mobileFolioView === 'right'
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-2xs'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  右頁 (提要)
                </button>
              </div>
            </div>

            {/* 3D Realistic Open Book Hardcover Exterior Casing */}
            <div className="relative rounded-2xl p-2.5 sm:p-4 bg-gradient-to-b from-[#1b1f24] via-[#12161b] to-[#0a0d11] border-2 border-amber-500/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
              {/* Gold Filigree Corner Accents on Hardcover */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/70 rounded-tl pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/70 rounded-tr pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/70 rounded-bl pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/70 rounded-br pointer-events-none" />

              {/* Silk Ribbon Bookmark dangling from spine top (perfectly centered on spine) */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-16 ${palette.ribbon} shadow-lg rounded-b-xs z-30 pointer-events-none opacity-90`} />

              {/* Close Button */}
              <button
                onClick={() => setDisplayMode('side-by-side')}
                className="absolute top-4 right-4 z-40 p-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-amber-300 border border-amber-500/40 transition-colors cursor-pointer shadow-md"
                title="合上書本 (返回封面封底同展)"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Opened Paper Block with 3D Page Stack Ridges */}
              <div className="relative rounded-xl overflow-hidden bg-[#fdfaf3] text-neutral-900 shadow-[inset_0_0_35px_rgba(140,110,60,0.18)] border border-amber-900/30">
                {/* 3D Precise Center Book Spine Crease & Shadow Valley */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-black/15 via-black/40 to-black/15 pointer-events-none z-20 shadow-inner" />
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1.5px] -translate-x-1/2 bg-amber-950/50 pointer-events-none z-20" />

                {/* Left Page Edge Rim & Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-900/15 to-transparent pointer-events-none z-10" />
                {/* Right Page Edge Rim & Shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-amber-900/15 to-transparent pointer-events-none z-10" />

                {/* Inner Pages Symmetrical 2-Column Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px] sm:min-h-[430px] w-full">
                  {/* LEFT PAGE (PAGE 1) */}
                  <div
                    className={`flex flex-col justify-between p-5 sm:p-6 md:py-7 md:pl-7 md:pr-9 relative w-full ${
                      mobileFolioView === 'right' ? 'hidden md:flex' : 'flex'
                    } ${
                      mobileFolioView === 'spread' ? 'border-b md:border-b-0 border-amber-900/20' : ''
                    }`}
                  >
                    <div>
                      {/* Page Running Header */}
                      <div className="text-[10px] font-mono tracking-widest text-amber-900/70 uppercase border-b border-amber-900/20 pb-1.5 flex items-center justify-between">
                        <span className="font-serif font-bold">🏛️ WAYNIPEDIA 萬安市政大典</span>
                        <span>卷 {selectedIndex + 1} / {bookList.length}</span>
                      </div>

                      {/* Main Title Header */}
                      <div className="mt-4 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-amber-100/80 border-2 border-amber-700/30 flex items-center justify-center shadow-inner mb-2.5">
                          <span className="text-3xl sm:text-4xl">{currentArticle.icon}</span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-serif font-bold text-neutral-900 leading-tight">
                          {currentArticle.title}
                        </h3>
                        <div className="mt-1.5 inline-flex items-center gap-2 text-xs text-amber-800 font-medium font-serif bg-amber-100/50 px-2.5 py-0.5 rounded-full border border-amber-600/20">
                          <span>【{currentArticle.category}】</span>
                          <span>·</span>
                          <span>收錄初版：{currentArticle.date}</span>
                        </div>
                      </div>

                      {/* Chapters / Syllabus */}
                      <div className="mt-4 pt-3 border-t border-amber-900/15">
                        <h4 className="text-xs font-serif font-bold text-neutral-800 mb-1.5 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-amber-700" />
                          <span>典藏章節目錄綱要</span>
                        </h4>
                        <ul className="text-xs space-y-1.5 text-neutral-700 pl-3 border-l-2 border-amber-700/40 font-serif">
                          <li>第一章 · 序言及背景來龍去脈</li>
                          <li>第二章 · 核心爭議與事態關鍵節點</li>
                          <li>第三章 · 市府回應、各方質詢與處置</li>
                          <li>第四章 · 新聞引證來源與文獻溯源</li>
                        </ul>
                      </div>
                    </div>

                    {/* Page 1 Bottom Footer */}
                    <div className="pt-4 border-t border-amber-900/15 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>卷號：{currentArticle.id}</span>
                      <span className="font-serif italic font-semibold text-amber-900">- 第 1 頁 (左頁) -</span>
                      <button
                        onClick={() => setMobileFolioView('right')}
                        className="md:hidden text-amber-800 font-bold underline cursor-pointer"
                      >
                        翻至右頁 →
                      </button>
                    </div>
                  </div>

                  {/* RIGHT PAGE (PAGE 2) */}
                  <div
                    className={`flex flex-col justify-between p-5 sm:p-6 md:py-7 md:pl-9 md:pr-7 relative bg-gradient-to-r from-amber-100/30 to-transparent w-full ${
                      mobileFolioView === 'left' ? 'hidden md:flex' : 'flex'
                    }`}
                  >
                    <div>
                      {/* Page Running Header */}
                      <div className="text-[10px] font-mono tracking-widest text-amber-900/70 uppercase border-b border-amber-900/20 pb-1.5 flex items-center justify-between">
                        <span>文獻史實梗概摘要</span>
                        <span className="text-emerald-800 font-semibold">● 權威文獻收錄</span>
                      </div>

                      {/* Excerpt Body with drop cap */}
                      <div className="mt-3 text-xs sm:text-[13px] font-serif leading-relaxed text-neutral-800 italic bg-amber-100/40 p-3.5 rounded-lg border border-amber-300/50 shadow-inner">
                        <span className="text-amber-900 font-serif text-lg font-bold pr-1">「</span>
                        {currentArticle.excerpt}
                        <span className="text-amber-900 font-serif text-lg font-bold pl-1">」</span>
                      </div>

                      {/* Sources Block */}
                      <div className="mt-4 space-y-1.5 bg-white/70 p-3 rounded-lg border border-amber-900/15">
                        <div className="text-[11px] font-bold text-neutral-800 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>權威報導與考證出處：</span>
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500">
                            共 {currentArticle.sources.length} 篇 (防404查核)
                          </span>
                        </div>
                        {currentArticle.sources.slice(0, 3).map((src, i) => {
                          const cleanQuery = `蔣萬安 ${src.title.replace(/^[^：:]{2,8}[：:]\s*/, '').slice(0, 20)}`;
                          const newsUrl = `https://news.google.com/search?q=${encodeURIComponent(cleanQuery)}&hl=zh-TW&gl=TW&ceid=TW:zh-Hant`;
                          return (
                            <a
                              key={i}
                              href={newsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-blue-900 hover:text-blue-700 hover:underline truncate font-sans flex items-center gap-1 group cursor-pointer"
                              title="點擊前往 Google 新聞查核真實報導存檔"
                            >
                              <span className="text-amber-800">•</span>
                              <span className="truncate">{src.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-neutral-400 shrink-0 group-hover:text-blue-600" />
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Page 2 Bottom Footer */}
                    <div className="pt-4 border-t border-amber-900/15 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {mobileFolioView === 'right' && (
                          <button
                            onClick={() => setMobileFolioView('left')}
                            className="md:hidden text-[10px] text-amber-800 font-bold underline cursor-pointer"
                          >
                            ← 翻回左頁
                          </button>
                        )}
                        <span className="text-[10px] font-mono text-neutral-500 font-serif italic">
                          - 第 2 頁 (右頁) -
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {/* 條目對應之市政朝聖地標按鈕 */}
                        {(() => {
                          const spot = pilgrimageSpots.find((s) => s.articleId === currentArticle.id);
                          if (!spot) return null;
                          return (
                            <a
                              href={`#/map?spot=${spot.id}`}
                              className="px-2.5 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer shadow-xs group"
                              title={`前往實體朝聖地圖：${spot.name}`}
                            >
                              <MapPin className="w-3 h-3 text-emerald-200 group-hover:scale-110 transition-transform" />
                              <span>朝聖地標</span>
                            </a>
                          );
                        })()}

                        <a
                          href={getGoogleAiSummaryUrl(currentArticle.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-md bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 hover:from-blue-800 hover:to-indigo-800 text-white text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer shadow-xs group"
                          title={`前往 Google AI 摘要：${buildAiPrompt(currentArticle.title)}`}
                        >
                          <Sparkles className="w-3 h-3 text-amber-300 group-hover:rotate-12 transition-transform" />
                          <span className="hidden sm:inline">如果你覺得內容不完整你可以查看AI摘要</span>
                          <span className="sm:hidden">查看AI摘要</span>
                          <ExternalLink className="w-2.5 h-2.5 text-white/70" />
                        </a>

                        <button
                          onClick={() => onSelectArticle(currentArticle.id)}
                          className="px-3.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-amber-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <span>進入條目全文</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Book Page Stack Edge simulation */}
              <div className="h-2 mt-1 mx-2 bg-gradient-to-r from-neutral-300 via-amber-100 to-neutral-300 rounded-b border-t border-neutral-400/50 shadow-inner" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Horizontal Shelf Scrollbar (Physical Spines) */}
      <div className="relative pt-4 border-t border-neutral-800/80">
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
          <span className="font-mono">
            書架陳列 · 卷 {selectedIndex + 1} / {bookList.length}：{currentArticle.title}
          </span>
          <span className="hidden sm:inline text-[11px]">
            ← 點選書脊切換閱覽 →
          </span>
        </div>

        {/* Physical Wooden Shelf Graphic */}
        <div
          ref={shelfRef}
          className="flex items-end gap-1 sm:gap-1.5 overflow-x-auto pb-4 pt-2 px-2 scrollbar-thin scrollbar-thumb-neutral-700"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {bookList.map((art, idx) => {
            const isSelected = idx === selectedIndex;
            const p = BOOK_PALETTES[idx % BOOK_PALETTES.length];

            return (
              <button
                key={art.id}
                onClick={() => setSelectedIndex(idx)}
                className={`group shrink-0 relative transition-all duration-200 cursor-pointer text-left focus:outline-none ${
                  isSelected
                    ? 'transform -translate-y-3.5 z-20'
                    : 'hover:-translate-y-1.5 opacity-85 hover:opacity-100 z-10'
                }`}
                style={{ scrollSnapAlign: 'center' }}
                title={`${art.title} (Vol. ${idx + 1})`}
              >
                {/* Book Spine */}
                <div
                  className={`w-7 sm:w-8.5 h-[135px] sm:h-[160px] ${p.spine} rounded-t-xs border-t-2 border-r border-l ${
                    isSelected ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-neutral-700'
                  } flex flex-col justify-between items-center py-2 text-[9px] text-amber-200 font-serif`}
                >
                  <span className="font-mono text-[8px] text-amber-400/90 font-bold">
                    #{idx + 1}
                  </span>
                  <span className="[writing-mode:vertical-rl] tracking-wider text-[9px] sm:text-[10px] font-medium truncate max-h-[85px] sm:max-h-[105px] text-neutral-200 group-hover:text-amber-200 transition-colors">
                    {art.title}
                  </span>
                  <span className="text-xs">{art.icon}</span>
                </div>

                {/* Bottom Spine Shadow */}
                <div className="h-1.5 w-full bg-black/60 rounded-full mt-0.5" />
              </button>
            );
          })}
        </div>

        {/* Shelf Base Board */}
        <div className="h-3 w-full bg-gradient-to-r from-[#2c1d11] via-[#4a301e] to-[#2c1d11] rounded-b-md border-t border-amber-900/60 shadow-inner" />
      </div>
    </div>
  );
}
