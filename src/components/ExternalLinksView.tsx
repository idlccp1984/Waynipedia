import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Search,
  Copy,
  Check,
  Sparkles,
  Gamepad2,
  Bot,
  MessageSquare,
  BookOpen,
  Scroll,
  Shield,
  Layers,
  Home,
  BookMarked,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { externalLinksData, ExternalSiteResource } from '../data/externalLinks';

interface ExternalLinksViewProps {
  onNavigateHome: () => void;
  onNavigateBooks: () => void;
  onNavigateColumns: () => void;
}

export function ExternalLinksView({
  onNavigateHome,
  onNavigateBooks,
  onNavigateColumns,
}: ExternalLinksViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const list = ['全部', '時事互動', '迷因工具', '遊戲闖關', '身世考證', '社群彈幕', '公民監督'];
    return list;
  }, []);

  const filteredLinks = useMemo(() => {
    return externalLinksData.filter((item) => {
      const matchCat =
        selectedCategory === '全部' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchCat;
      const matchText =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = (id: string, url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((curr) => (curr === id ? null : curr));
    }, 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case '時事互動':
        return '🎙️';
      case '迷因工具':
        return '🤖';
      case '遊戲闖關':
        return '🎮';
      case '身世考證':
        return '📜';
      case '社群彈幕':
        return '💬';
      case '公民監督':
        return '🏛️';
      default:
        return '🔗';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fadeIn">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateHome}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>首頁</span>
          </button>
          <span>/</span>
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">
            外部精選連結專頁 🔗
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateColumns}
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>議題專欄</span>
          </button>
          <span>·</span>
          <button
            onClick={onNavigateBooks}
            className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3D 典藏書庫</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-blue-950 text-white p-6 sm:p-8 md:p-10 shadow-xl border border-neutral-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
              <ExternalLink className="w-3 h-3" />
              精選外部互動站點
            </span>
            <span className="text-xs text-neutral-400">
              收錄社群熱門開源與獨立創作站點
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-neutral-50 flex items-center gap-3">
            <span>外部精選連結 🔗 專頁</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
            為方便讀者全面掌握網路社群之公共時事創作，特別彙整民間各界開發之「時事快問互動」、「AI 回應產生器」、「闖關遊戲」、「身世考證文獻站」與「心動彈幕牆」。所有外部網站均為獨立開發者專案，點擊即可無縫跳轉瀏覽。
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              收錄 5 大核心民間互動專案
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              含遊戲、產生器、考證主站與彈幕牆
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              點擊安全另開新視窗
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#14181d] p-3 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-neutral-400 shrink-0 ml-1 mr-0.5 hidden xs:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat !== '全部' && (
                <span className="mr-1">{getCategoryIcon(cat)}</span>
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[200px] sm:min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋站點名稱、介紹或網址..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Core User-Requested Featured Showcase (5 Key Sites) */}
      {selectedCategory === '全部' && !searchQuery.trim() && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-neutral-500 dark:text-neutral-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>社群熱門焦點站點推薦 (5 大民間專案)</span>
            </h2>
            <span className="text-xs text-neutral-400">點擊卡片直接開啟</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalLinksData
              .filter((x) => x.isFeatured)
              .map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14181d] hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <span className="p-1.5 rounded-md text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 transition-colors">
                      <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1 font-medium">
                    {item.tagline}
                  </p>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-neutral-400 truncate max-w-[170px] sm:max-w-[200px]">
                      {item.url.replace(/^https?:\/\//, '')}
                    </span>
                    <span className="font-medium text-blue-600 dark:text-blue-400 flex items-center gap-0.5 shrink-0">
                      開啟網站 <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
          </div>
        </div>
      )}

      {/* Main Full Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-neutral-400" />
            <span>全站收錄清單 ({filteredLinks.length} 個站點)</span>
          </h2>
          <span className="text-xs text-neutral-400">
            分類：{selectedCategory}
          </span>
        </div>

        {filteredLinks.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#14181d] rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 space-y-2">
            <p className="text-base font-medium">未找到符合條件的外部站點</p>
            <p className="text-xs text-neutral-400">
              嘗試調整搜尋關鍵字，或切換為「全部」分類。
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('全部');
              }}
              className="mt-3 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              清除所有過濾條件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredLinks.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#14181d] rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        {item.icon}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-50 mt-1 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    {item.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 mb-4 bg-neutral-50 dark:bg-[#181d23] p-3 rounded-lg border border-neutral-100 dark:border-neutral-800/80">
                    <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                      站點核心亮點：
                    </div>
                    {item.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-1.5"
                      >
                        <span className="text-blue-500 font-bold">・</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 max-w-[240px] sm:max-w-[280px]">
                    <span className="text-[11px] font-mono text-neutral-400 truncate">
                      {item.url}
                    </span>
                    <button
                      onClick={(e) => handleCopy(item.id, item.url, e)}
                      title="複製網址"
                      className="p-1 rounded text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {copiedId === item.id && (
                      <span className="text-[10px] text-emerald-500 font-medium">
                        已複製！
                      </span>
                    )}
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-2xs cursor-pointer active:scale-95"
                  >
                    <span>{item.buttonText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Notice and Disclaimer */}
      <div className="bg-neutral-50 dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
        <div className="flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200">
          <Shield className="w-4 h-4 text-blue-500" />
          <span>外部網站瀏覽提醒與第三方聲明</span>
        </div>
        <p className="leading-relaxed">
          本頁所引介之外部工具、產生器、遊戲與專題網站（包括《你知道記者剛剛問蔣萬安什麼嗎》、《蔣萬安回應產生器》、《蔣出來》遊戲與資訊主站、《台北心動彈幕》等），均由民間社群或獨立開發者維護建置。Waynipedia
          蔣萬安百科僅作為公共時事資訊彙整與學術/公民參考之用，非上述網站之營運主體。若於外部站點遇載入問題或需聯繫開發者，請逕洽各該站點頁底資訊。
        </p>
      </div>
    </div>
  );
}
