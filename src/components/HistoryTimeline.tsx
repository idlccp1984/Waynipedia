import React, { useState, useMemo } from 'react';
import { Calendar, Search, ChevronRight, BookOpen, Filter, ArrowUpRight, Clock, Eye, ChevronDown } from 'lucide-react';
import { allHistoryEvents, getAllEventsGroupedByMonth, formatEventDate, MonthEventsGroup } from '../data/historyEvents';
import { articles } from '../data/articles';
import { MarkdownRenderer } from '../utils/markdownParser';

interface HistoryTimelineProps {
  onSelectArticle: (articleId: string) => void;
}

export function HistoryTimeline({ onSelectArticle }: HistoryTimelineProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  const articleMap = useMemo(() => new Map(articles.map((a) => [a.id, a])), []);

  const categories = useMemo(() => {
    const set = new Set(allHistoryEvents.map((e) => e.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredEvents = useMemo(() => {
    return allHistoryEvents.filter((event) => {
      const matchQuery =
        !filterQuery.trim() ||
        event.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        event.articleTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
        event.date.includes(filterQuery);

      const matchCategory =
        selectedCategory === 'all' || event.category === selectedCategory;

      return matchQuery && matchCategory;
    });
  }, [filterQuery, selectedCategory]);

  const groupedMonths: MonthEventsGroup[] = useMemo(() => {
    const monthMap = new Map<number, Map<number, typeof allHistoryEvents>>();

    for (const event of filteredEvents) {
      if (!monthMap.has(event.month)) {
        monthMap.set(event.month, new Map());
      }
      const dayMap = monthMap.get(event.month)!;
      if (!dayMap.has(event.day)) {
        dayMap.set(event.day, []);
      }
      dayMap.get(event.day)!.push(event);
    }

    const result: MonthEventsGroup[] = [];

    for (let m = 1; m <= 12; m++) {
      const dayMap = monthMap.get(m);
      if (!dayMap || dayMap.size === 0) continue;

      const daysList = Array.from(dayMap.entries())
        .sort(([a], [b]) => a - b)
        .map(([day, events]) => ({
          day,
          monthDay: `${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          events,
        }));

      const totalCount = daysList.reduce((acc, curr) => acc + curr.events.length, 0);

      result.push({
        month: m,
        eventsCount: totalCount,
        days: daysList,
      });
    }

    return result;
  }, [filteredEvents]);

  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const todayKey = `${String(todayMonth).padStart(2, '0')}-${String(todayDay).padStart(2, '0')}`;

  const scrollToMonth = (m: number) => {
    const el = document.getElementById(`month-anchor-${m}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleExpand = (articleId: string) => {
    setExpandedArticleId((prev) => (prev === articleId ? null : articleId));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          <span>歷史檔案</span>
          <span>/</span>
          <span>全日期總覽 ({allHistoryEvents.length}則事件)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
          歷史上的今天 – 全年事件時間軸
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-3xl">
          完整收錄全年重大決策、重要選舉攻防、工安災害、教育食安與社群迷因事件。不再受限於單日切換，您可依月份快速跳轉、透過關鍵字即時篩選，並在時間軸中即時預覽每篇獨立條目的 Markdown 深度內容。
        </p>

        {/* Quick Month Jumper Anchors Bar */}
        <div className="mt-6 pt-5 border-t border-neutral-200/70 dark:border-neutral-800/70">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>月份快速跳轉</span>
            <span className="text-[11px] font-normal lowercase">共 {filteredEvents.length} 則事件</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
              const hasEvents = groupedMonths.some((g) => g.month === m);
              return (
                <button
                  key={m}
                  onClick={() => scrollToMonth(m)}
                  disabled={!hasEvents}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    hasEvents
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-neutral-700'
                      : 'bg-neutral-50 dark:bg-neutral-900/50 text-neutral-300 dark:text-neutral-700 cursor-not-allowed'
                  }`}
                >
                  {m}月
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="搜尋事件內容、條目名稱或年份..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#181c21] border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
              >
                清除
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-[#181c21] border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部分類</option>
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
      </div>

      {/* Timeline Stream */}
      {groupedMonths.length === 0 ? (
        <div className="py-16 text-center text-neutral-500 dark:text-neutral-400">
          <Clock className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
          <p className="text-base font-medium">查無符合搜尋條件的歷史事件</p>
          <p className="text-xs mt-1">請嘗試更換關鍵字或重設分類篩選</p>
          <button
            onClick={() => {
              setFilterQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-md hover:underline cursor-pointer"
          >
            重設篩選
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedMonths.map((group) => (
            <section
              key={group.month}
              id={`month-anchor-${group.month}`}
              className="scroll-mt-20 relative"
            >
              <div className="sticky top-14 sm:top-16 z-20 bg-white/95 dark:bg-[#101418]/95 backdrop-blur-sm py-2 sm:py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="w-8 h-8 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-serif font-bold text-sm">
                    {group.month}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                    {group.month} 月份事件檔案
                  </h2>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  收錄 {group.eventsCount} 則事件
                </span>
              </div>

              <div className="space-y-8 pl-2 sm:pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 ml-3 sm:ml-4">
                {group.days.map((dayGroup) => {
                  const isToday = dayGroup.monthDay === todayKey;

                  return (
                    <div key={dayGroup.monthDay} className="relative group">
                      <div
                        className={`absolute -left-[19px] sm:-left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-white dark:bg-[#101418] transition-colors ${
                          isToday
                            ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900'
                            : 'border-neutral-400 dark:border-neutral-600 group-hover:border-neutral-800 dark:group-hover:border-neutral-200'
                        }`}
                      />

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                          {group.month}月{dayGroup.day}日
                        </span>
                        {isToday && (
                          <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                            今日發生
                          </span>
                        )}
                      </div>

                      <div className="space-y-4">
                        {dayGroup.events.map((event, eventIdx) => {
                          const article = articleMap.get(event.articleId);
                          const isExpanded = expandedArticleId === `${event.articleId}-${event.date}`;

                          return (
                            <div
                              key={`${event.articleId}-${event.date}-${eventIdx}`}
                              className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 sm:p-5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-shadow hover:shadow-xs"
                            >
                              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                                <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                                  {formatEventDate(event.date)}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{event.category}</span>
                                <span aria-hidden="true">·</span>
                                <span className="text-neutral-400 dark:text-neutral-500">
                                  條目：{event.articleTitle}
                                </span>
                              </div>

                              <h3 className="text-base sm:text-lg font-serif font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                                {event.title}
                              </h3>

                              <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
                                <button
                                  onClick={() => toggleExpand(`${event.articleId}-${event.date}`)}
                                  className="text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronDown className="w-3.5 h-3.5" />
                                      <span>收起條目 Markdown</span>
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>在時間軸預覽 Markdown</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => onSelectArticle(event.articleId)}
                                  className="text-xs font-medium text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <span>閱讀「{event.articleTitle}」完整條目</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {isExpanded && article && (
                                <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 p-3 sm:p-4 rounded-md text-xs sm:text-sm">
                                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-200/80 dark:border-neutral-800 text-[11px] text-neutral-500">
                                    <span>條目內文預覽</span>
                                    <span>分類：{article.category}</span>
                                  </div>
                                  <MarkdownRenderer content={article.markdown} skipFirstH1={true} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 rounded-full cursor-pointer"
        >
          返回頁面頂端 ↑
        </button>
      </div>
    </div>
  );
}
