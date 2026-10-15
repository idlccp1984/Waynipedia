import React, { useState } from 'react';
import { Article } from '../types';
import { articles } from '../data/articles';
import { BookOpen, Sparkles, ArrowRight, Calendar, Bookmark, Layers } from 'lucide-react';

const CARD_THEMES: Record<
  string,
  {
    border: string;
    bg: string;
    badge: string;
    accent: string;
    glow: string;
    tag: string;
  }
> = {
  人物傳記: {
    border: 'border-amber-400/60 hover:border-amber-300',
    bg: 'from-[#2e210b] via-[#1f1606] to-[#120c02]',
    badge: 'bg-amber-900/70 text-amber-200 border-amber-400/50',
    accent: 'text-amber-300',
    glow: 'group-hover:shadow-[0_15px_35px_rgba(245,158,11,0.35)]',
    tag: 'LEGENDARY 人物傳記',
  },
  重大工程: {
    border: 'border-blue-500/50 hover:border-blue-400',
    bg: 'from-[#111c2e] via-[#0c1524] to-[#070d17]',
    badge: 'bg-blue-900/60 text-blue-300 border-blue-500/40',
    accent: 'text-blue-400',
    glow: 'group-hover:shadow-[0_15px_35px_rgba(37,99,235,0.3)]',
    tag: 'UR 重大工程',
  },
  市政政策: {
    border: 'border-cyan-500/40 hover:border-cyan-400',
    bg: 'from-[#0f222b] via-[#0a171d] to-[#060e12]',
    badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
    accent: 'text-cyan-400',
    glow: 'group-hover:shadow-[0_15px_35px_rgba(6,182,212,0.25)]',
    tag: 'SSR 政策紀實',
  },
  選戰政治: {
    border: 'border-amber-500/40 hover:border-amber-400',
    bg: 'from-[#2b1a10] via-[#1f130b] to-[#120a06]',
    badge: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
    accent: 'text-amber-400',
    glow: 'group-hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)]',
    tag: 'UR 選戰焦點',
  },
  網路迷因: {
    border: 'border-purple-500/40 hover:border-purple-400',
    bg: 'from-[#22132d] via-[#180d21] to-[#0d0713]',
    badge: 'bg-purple-950/60 text-purple-300 border-purple-500/40',
    accent: 'text-purple-400',
    glow: 'group-hover:shadow-[0_15px_35px_rgba(168,85,247,0.25)]',
    tag: 'SR 迷因文化',
  },
  個人爭議: {
    border: 'border-rose-500/40 hover:border-rose-400',
    bg: 'from-[#2a111a] via-[#1d0b12] to-[#100609]',
    badge: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
    accent: 'text-rose-400',
    glow: 'group-hover:shadow-[0_15px_35px_rgba(244,63,94,0.25)]',
    tag: 'SSR 公眾檢驗',
  },
  資訊安全: {
    border: 'border-emerald-500/40 hover:border-emerald-400',
    bg: 'from-[#0e271c] via-[#091c13] to-[#05110b]',
    badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
    accent: 'text-emerald-400',
    glow: 'group-hover:shadow-[0_15px_35px_rgba(16,185,129,0.25)]',
    tag: 'UR 資安防護',
  },
};

export function ArticleCardDeck({ onSelectArticle }: { onSelectArticle: (articleId: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = ['全部', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredCards =
    selectedCategory === '全部'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900 via-[#13161c] to-[#0a0d12] border border-neutral-800 text-neutral-100 shadow-2xl p-4 sm:p-7 md:p-8 my-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400 font-mono">
              COLLECTIBLE CARDS · 全站 {articles.length} 卷全息典藏卡
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
            歷史卡牌典藏館
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            以精裝卡牌風格呈現全站 {articles.length} 篇代表性條目，點選即可閱覽完整百科內容。
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40 font-semibold'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 pt-6">
        {filteredCards.map((art) => {
          const theme = CARD_THEMES[art.category] || CARD_THEMES['市政政策'];
          const globalIndex = articles.findIndex((a) => a.id === art.id);

          return (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art.id)}
              className={`group relative rounded-xl border p-4 sm:p-5 cursor-pointer bg-gradient-to-b ${theme.bg} ${theme.border} ${theme.glow} transition-all duration-300 hover:-translate-y-2 select-none flex flex-col justify-between overflow-hidden card-shimmer`}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-400 mb-3">
                  <span className="font-bold text-white/90">
                    #{(globalIndex + 1).toString().padStart(2, '0')}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${theme.badge}`}
                  >
                    {theme.tag}
                  </span>
                </div>

                <div className="relative py-4 text-center my-1 rounded-lg bg-black/30 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="text-4xl sm:text-5xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                    {art.icon}
                  </div>
                  <div className="mt-2 text-[10px] font-serif text-neutral-400 tracking-widest uppercase">
                    {art.category}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-amber-200 transition-colors mt-3 line-clamp-1 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-neutral-300/80 font-sans line-clamp-2 mt-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="text-[11px] font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-500" />
                  <span>{art.date}</span>
                </span>

                <span className="flex items-center gap-1 font-serif text-[11px] font-medium text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>翻開閱讀</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative mt-7 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
        <span>❖ 全息卡牌典藏 · 點擊卡片閱覽完整深度報告</span>
        <span className="text-[11px] font-mono text-neutral-500">
          全站共收錄 {articles.length} 篇獨立條目
        </span>
      </div>
    </div>
  );
}
