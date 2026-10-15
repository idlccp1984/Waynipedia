import React, { useState, useMemo } from 'react';
import { statsData } from '../data/stats';
import { articles } from '../data/articles';
import { BarChart3, ArrowLeft, ArrowUpRight, Search } from 'lucide-react';

interface NumbersViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
}

export function NumbersView({ onSelectArticle, onNavigateHome }: NumbersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const articleMap = useMemo(() => new Map(articles.map((a) => [a.id, a])), []);

  const filteredStats = useMemo(() => {
    if (!searchQuery.trim()) return statsData;
    const q = searchQuery.toLowerCase();
    return statsData.filter((item) => {
      const art = articleMap.get(item.articleId);
      const artTitle = art ? art.title.toLowerCase() : '';
      return (
        item.value.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        artTitle.includes(q)
      );
    });
  }, [searchQuery, articleMap]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8">
        <button
          onClick={onNavigateHome}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回首頁</span>
        </button>

        <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-neutral-400" />
          <span>數字會說話 – 全量關鍵數據檔案</span>
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
          彙整台北市重大市政指標、預算公帑動支、留言破紀錄數據與政策爭議之 {statsData.length} 筆量化事實。點擊卡片即可檢視對應之 Markdown 條目深度報告。
        </p>

        {/* Search */}
        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋數據或關鍵字（如：大巨蛋、遮陽傘、留言）..."
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

      {/* Grid of All Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStats.map((item, idx) => {
          const article = articleMap.get(item.articleId);

          return (
            <button
              key={idx}
              onClick={() => onSelectArticle(item.articleId)}
              className="text-left p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#14181d] transition-all hover:shadow-xs group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-blue-700 dark:text-blue-400 font-mono tabular-nums tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-2 font-medium leading-snug">
                  {item.label}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors w-full">
                <span>條目：{article ? article.title : item.articleId}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
