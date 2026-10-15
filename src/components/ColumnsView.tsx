import React, { useState } from 'react';
import { TopicColumn } from '../types';
import { topicColumns } from '../data/columns';
import { articles } from '../data/articles';
import {
  BookMarked,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface ColumnsViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  onNavigateBooks: () => void;
  initialColumnId?: string;
}

export function ColumnsView({
  onSelectArticle,
  onNavigateHome,
  onNavigateBooks,
  initialColumnId,
}: ColumnsViewProps) {
  const [selectedColumnId, setSelectedColumnId] = useState<string>('all');

  const articleMap = React.useMemo(() => new Map(articles.map((a) => [a.id, a])), []);

  // When initialColumnId is passed or changes, scroll to the corresponding column
  React.useEffect(() => {
    if (initialColumnId && initialColumnId !== 'all') {
      const scrollTarget = () => {
        const el =
          document.getElementById(`column-${initialColumnId}`) ||
          document.getElementById(initialColumnId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      // Delay slightly for render completion
      const timer = setTimeout(scrollTarget, 100);
      return () => clearTimeout(timer);
    }
  }, [initialColumnId]);

  const displayedColumns =
    selectedColumnId === 'all'
      ? topicColumns
      : topicColumns.filter((col) => col.id === selectedColumnId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
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
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/30">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                議題專欄彙整特刊
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                梳理核心脈絡 · 6 大主題專欄彙整閱讀動線
              </p>
            </div>
          </div>
        </div>

        {/* Quick button to 3D Books */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onNavigateBooks}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3D 書庫專頁 →</span>
          </button>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-neutral-900 dark:text-neutral-100 font-semibold block mb-0.5">
            專欄閱讀動線設計
          </strong>
          本站將全站收錄的 {articles.length} 篇市政決策、爭議與迷因條目，系統性彙整為 6
          大專題專欄。每個專欄均提供背景導讀、核心提問清單，並依關聯性串接深入條目，讓您一目了然事件演進與正反觀點。
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedColumnId('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
            selectedColumnId === 'all'
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold shadow-xs'
              : 'bg-white dark:bg-[#14181e] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100'
          }`}
        >
          全部專欄 (6)
        </button>
        {topicColumns.map((col) => (
          <button
            key={col.id}
            onClick={() => setSelectedColumnId(col.id)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 cursor-pointer ${
              selectedColumnId === col.id
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs font-semibold'
                : 'bg-white dark:bg-[#14181e] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100'
            }`}
          >
            <span>{col.icon}</span>
            <span>{col.title.replace('專欄', '')}</span>
          </button>
        ))}
      </div>

      {/* Columns List */}
      <div className="space-y-8 sm:space-y-10">
        {displayedColumns.map((col, idx) => {
          const colArticles = col.articleIds
            .map((id) => articleMap.get(id))
            .filter((a): a is typeof articles[0] => Boolean(a));

          return (
            <section
              key={col.id}
              id={`column-${col.id}`}
              className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-8 shadow-xs space-y-6 scroll-mt-20"
            >
              {/* Column Title and Lead Header */}
              <div className="border-b border-neutral-100 dark:border-neutral-800 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {col.badge} · 專題 0{idx + 1}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    收錄 {colArticles.length} 篇核心條目
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2.5">
                  <span className="text-2xl">{col.icon}</span>
                  <span>{col.title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                  {col.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-[#181d24] p-3.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                  {col.lead}
                </p>
              </div>

              {/* Core Questions */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>本專欄探討核心關鍵問題</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  {col.coreQuestions.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-2.5 rounded-lg bg-neutral-50/70 dark:bg-[#181c22]/70 border border-neutral-200/50 dark:border-neutral-800 flex items-start gap-2"
                    >
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold shrink-0">
                        Q{qIdx + 1}.
                      </span>
                      <span className="leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Articles in this Column */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                    收錄條目清單 ({colArticles.length})
                  </h3>
                  <span className="text-[11px] text-neutral-400">點擊條目深入閱讀全文</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {colArticles.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => onSelectArticle(art.id)}
                      className="text-left p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#161a20] transition-all hover:shadow-xs group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
                          <span className="font-mono">{art.date}</span>
                          <span className="text-base">{art.icon}</span>
                        </div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {art.title}
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed font-normal">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                        <span>閱讀全文條目</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
