import React, { useState, useMemo } from 'react';
import { didYouKnowData } from '../data/stats';
import { articles } from '../data/articles';
import { HelpCircle, Search, ArrowLeft, ArrowUpRight } from 'lucide-react';

interface DykViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
}

export function DykView({ onSelectArticle, onNavigateHome }: DykViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const articleMap = useMemo(() => new Map(articles.map((a) => [a.id, a])), []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return didYouKnowData;
    const q = searchQuery.toLowerCase();
    return didYouKnowData.filter((item) => {
      const art = articleMap.get(item.articleId);
      const artTitle = art ? art.title.toLowerCase() : '';
      return item.fact.toLowerCase().includes(q) || artTitle.includes(q);
    });
  }, [searchQuery, articleMap]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
        <button
          onClick={onNavigateHome}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 mb-3 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回首頁</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-neutral-400 shrink-0" />
          <span>你知道嗎？ – 全部趣味事蹟與冷知識</span>
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
          收錄台北市政決策、網路迷因與時事焦點中鮮為人知或引發熱議的事實整理，目前已擴增至 {didYouKnowData.length} 則。點擊引註即可前往條目詳讀完整 Markdown 紀錄。
        </p>

        {/* Search input */}
        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋趣味事蹟關鍵字..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-[#181c21] border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              清除
            </button>
          )}
        </div>
      </div>

      {/* List of all Did You Know Items */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center text-neutral-500 dark:text-neutral-400 text-sm">
          查無符合「{searchQuery}」的項目
        </div>
      ) : (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
          {filteredItems.map((item, idx) => {
            const article = articleMap.get(item.articleId);

            return (
              <div
                key={idx}
                className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/60 dark:hover:bg-neutral-800/20 px-2 rounded transition-colors group"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="font-mono text-xs text-neutral-400 font-medium shrink-0 pt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    ……{item.fact}
                  </p>
                </div>

                {article && (
                  <button
                    onClick={() => onSelectArticle(article.id)}
                    className="shrink-0 self-end sm:self-center text-xs font-medium text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>詳見「{article.title}」</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
