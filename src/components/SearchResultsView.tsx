import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  ArrowUpDown,
  ArrowRight,
  Calendar,
  ChevronRight,
  Home,
  Sparkles,
} from 'lucide-react';
import { articles } from '../data/articles';
import { ArticleCategory } from '../types';
import { getGoogleAiSummaryUrl, buildAiPrompt } from '../utils/aiSummary';

interface SearchResultsViewProps {
  initialQuery?: string;
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  onNavigateBooks: () => void;
}

const POPULAR_TAGS = [
  '大巨蛋',
  '台智光',
  '京華城',
  '坐公車深蹲',
  '火鍋市長',
  '和平新生天橋',
  '寶林茶室',
  '明天放',
  '北士科',
  '生生喝鮮乳',
  '丟甘蔗',
  '索資佛地魔',
];

export function SearchResultsView({
  initialQuery = '',
  onSelectArticle,
  onNavigateHome,
  onNavigateBooks,
}: SearchResultsViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');

  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Scoring and matching algorithm
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      let list = [...articles];
      if (selectedCategory !== '全部') {
        list = list.filter((a) => a.category === selectedCategory);
      }
      if (sortBy === 'newest') {
        list.sort((a, b) => b.date.localeCompare(a.date));
      } else if (sortBy === 'oldest') {
        list.sort((a, b) => a.date.localeCompare(b.date));
      }
      return list.map((a) => ({ article: a, score: 1, snippet: a.excerpt }));
    }

    const terms = q.split(/\s+/).filter(Boolean);

    const scored = articles
      .map((article) => {
        let score = 0;
        const titleLower = article.title.toLowerCase();
        const excerptLower = article.excerpt.toLowerCase();
        const markdownLower = article.markdown.toLowerCase();
        const categoryLower = article.category.toLowerCase();

        // Exact full query match bonuses
        if (titleLower === q) score += 100;
        else if (titleLower.includes(q)) score += 50;

        if (article.isMainBiography && q.includes('蔣萬安')) score += 40;

        if (excerptLower.includes(q)) score += 25;
        if (markdownLower.includes(q)) score += 10;
        if (categoryLower.includes(q)) score += 15;

        // Individual term matches
        for (const term of terms) {
          if (titleLower.includes(term)) score += 20;
          if (excerptLower.includes(term)) score += 8;
          if (categoryLower.includes(term)) score += 6;
          const matches = (markdownLower.match(new RegExp(term, 'g')) || []).length;
          score += Math.min(matches * 2, 10);
        }

        // Generate snippet around the match
        let snippet = article.excerpt;
        const matchIndex = markdownLower.indexOf(q);
        if (matchIndex !== -1 && matchIndex > 30) {
          const start = Math.max(0, matchIndex - 40);
          const end = Math.min(article.markdown.length, matchIndex + q.length + 80);
          snippet = '…' + article.markdown.substring(start, end).replace(/[#*`>]/g, '') + '…';
        }

        return {
          article,
          score,
          snippet,
        };
      })
      .filter((item) => item.score > 0);

    // Apply category filter
    let filtered = scored;
    if (selectedCategory !== '全部') {
      filtered = filtered.filter((item) => item.article.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'relevance') {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.article.date.localeCompare(a.article.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.article.date.localeCompare(b.article.date));
    }

    return filtered;
  }, [query, selectedCategory, sortBy]);

  // Categories with count
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = { 全部: 0 };
    const q = query.trim().toLowerCase();

    articles.forEach((a) => {
      let matches = true;
      if (q) {
        matches =
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.markdown.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q);
      }
      if (matches) {
        counts['全部'] = (counts['全部'] || 0) + 1;
        counts[a.category] = (counts[a.category] || 0) + 1;
      }
    });

    const categoriesList: (string | ArticleCategory)[] = [
      '全部',
      '重大工程',
      '市政政策',
      '選戰政治',
      '網路迷因',
      '個人爭議',
      '人物傳記',
      '資訊安全',
    ];

    return categoriesList.map((cat) => ({
      name: cat,
      count: counts[cat] || 0,
    }));
  }, [query]);

  // Highlight keywords helper
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.trim()})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-amber-200 dark:bg-amber-900/70 text-neutral-900 dark:text-amber-100 font-semibold px-0.5 rounded-xs"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
        <button
          onClick={onNavigateHome}
          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>首頁</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 dark:text-neutral-100 font-medium">全站條目搜尋</span>
      </div>

      {/* Hero-like Search Control Bar (類搜尋引擎介面) */}
      <div className="bg-white dark:bg-[#14181f] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜尋市政爭議、重大工程、金句名場面或迷因（如：大巨蛋、台智光、深蹲、火鍋）..."
              className="w-full pl-11 pr-24 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl bg-neutral-50 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-neutral-800 transition-all shadow-inner"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-12 p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-md cursor-pointer"
                title="清空關鍵字"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {}}
              className="absolute right-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              檢索
            </button>
          </div>
        </div>

        {/* Hot Search Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300 shrink-0">
            熱門檢索標籤：
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer border ${
                query === tag
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categoryStats.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.name
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 font-semibold shadow-2xs'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <span>{cat.name}</span>
              <span className="ml-1.5 text-[10px] font-mono opacity-80">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0">
          <span className="text-neutral-500 dark:text-neutral-400 font-mono">
            共找到 <strong className="text-neutral-900 dark:text-neutral-100">{searchResults.length}</strong> 卷結果
          </span>

          <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 py-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-neutral-800 dark:text-neutral-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="relevance">相關度最高</option>
              <option value="newest">最新記錄日期</option>
              <option value="oldest">歷史最先記錄</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results List */}
      <div className="space-y-3.5">
        {searchResults.length > 0 ? (
          searchResults.map(({ article, snippet }) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="bg-white dark:bg-[#14181f] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 sm:p-5 hover:border-blue-500/70 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">{article.icon}</span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {highlightMatch(article.title, query)}
                    </h3>
                    {article.isMainBiography && (
                      <span className="text-[10px] font-mono bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40">
                        核心主條目
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px]">
                      {article.category}
                    </span>
                    <span className="font-mono text-[11px] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{article.date}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed line-clamp-3 mt-1.5">
                  {highlightMatch(snippet, query)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                  收錄日期：{article.date}
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={getGoogleAiSummaryUrl(article.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold flex items-center gap-1 text-xs transition-colors"
                    title={`前往 Google AI 摘要：${buildAiPrompt(article.title)}`}
                  >
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span>如果你覺得內容不完整你可以查看AI摘要</span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArticle(article.id);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>閱讀全文</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#14181f] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-neutral-800 dark:text-neutral-200">
              查無符合「{query}」的條目
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              建議檢查是否有錯別字、減少搜尋字詞長度，或點擊下方熱門分類與關鍵字重新探索。
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setQuery('')}
                className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-xs font-semibold cursor-pointer"
              >
                瀏覽全部 {articles.length} 卷條目
              </button>
              <button
                onClick={onNavigateBooks}
                className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold cursor-pointer"
              >
                前往 3D 典藏書庫
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
