import React from 'react';
import { Layers, ArrowLeft, BookOpen, Sparkles, BookMarked } from 'lucide-react';
import { ArticleCardDeck } from './ArticleCardDeck';

interface CardsViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  onNavigateBooks: () => void;
  onNavigateColumns: () => void;
}

export function CardsView({
  onSelectArticle,
  onNavigateHome,
  onNavigateBooks,
  onNavigateColumns,
}: CardsViewProps) {
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
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                歷史卡牌典藏專頁
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                全息集換式收藏卡牌 · 互動反轉與分類檢索
              </p>
            </div>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onNavigateColumns}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>議題專欄特刊</span>
          </button>

          <button
            onClick={onNavigateBooks}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>切換至 3D 書庫專頁 →</span>
          </button>
        </div>
      </div>

      {/* Feature Explanation Banner */}
      <div className="bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-neutral-900 dark:text-neutral-100 font-semibold block mb-0.5">
            卡牌互動模式指南
          </strong>
          本專頁將台北市政關鍵議題、歷史爭議、人物傳記與迷因文化轉化為全息質感卡牌。可點選下方按鈕依分類即時篩選，點擊卡面即可深入展開閱讀條目全文。
        </div>
      </div>

      {/* Cards Deck */}
      <div className="bg-white dark:bg-[#12161b] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-8 shadow-sm">
        <ArticleCardDeck onSelectArticle={onSelectArticle} />
      </div>
    </div>
  );
}
