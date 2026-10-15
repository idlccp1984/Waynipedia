import React, { useEffect, useState } from 'react';
import {
  X,
  Home,
  BookOpen,
  Layers,
  Calendar,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  BookMarked,
  FolderTree,
  User,
  Share2,
  ExternalLink,
  Flame,
  MapPin,
  Info,
  Network,
} from 'lucide-react';
import { articles } from '../data/articles';
import { allHistoryEvents } from '../data/historyEvents';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onSelectArticle: (articleId: string) => void;
  onRandomArticle: () => void;
  onOpenShare?: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  currentRoute,
  onNavigate,
  onSelectArticle,
  onRandomArticle,
  onOpenShare,
}: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const categories = React.useMemo(() => {
    const map = new Map<string, typeof articles>();
    for (const art of articles) {
      if (!map.has(art.category)) {
        map.set(art.category, []);
      }
      map.get(art.category)!.push(art);
    }
    return Array.from(map.entries());
  }, []);

  const navItems = [
    {
      id: 'home',
      label: '首頁',
      sublabel: '傳統百科入口 · 典範條目推薦',
      icon: Home,
      color: 'text-blue-500',
    },
    {
      id: 'columns',
      label: '議題專欄特刊',
      sublabel: '6 大主題專欄 · 彙整閱讀動線',
      icon: BookMarked,
      color: 'text-indigo-500',
      badge: '專欄',
    },
    {
      id: 'books',
      label: '3D 典藏書庫',
      sublabel: `完整雙面裝訂 · ${articles.length}卷擬真精裝書`,
      icon: BookOpen,
      color: 'text-amber-500',
      badge: '專頁',
    },
    {
      id: 'cards',
      label: '歷史卡牌專頁',
      sublabel: '全息典藏卡牌 · 互動反轉閱覽',
      icon: Layers,
      color: 'text-purple-400',
      badge: '專頁',
    },
    {
      id: 'history',
      label: '歷史全日期時間軸',
      sublabel: '全年 365 天重大事件檔案',
      icon: Calendar,
      color: 'text-emerald-500',
    },
    {
      id: 'dyk',
      label: '你知道嗎',
      sublabel: '精選 42 則趣味冷知識與事蹟',
      icon: HelpCircle,
      color: 'text-amber-400',
    },
    {
      id: 'numbers',
      label: '關鍵數字看板',
      sublabel: '32 項市政量化關鍵指標',
      icon: TrendingUp,
      color: 'text-cyan-400',
    },
    {
      id: 'quiz-arena',
      label: '盲測與時事測驗',
      sublabel: '盲測你會選蔣萬安嗎 · 35題題庫',
      icon: CheckCircle2,
      color: 'text-rose-400',
      badge: '盲測',
    },
    {
      id: 'links',
      label: '外部精選連結專頁',
      sublabel: '回應產生器 · 蔣出來遊戲 · 心動彈幕',
      icon: ExternalLink,
      color: 'text-sky-500',
      badge: '專頁',
    },
    {
      id: 'oddities',
      label: '萬安志異 · 迷因特刊',
      sublabel: '維基誌異體例 · 流行語錄與市政奇觀',
      icon: Flame,
      color: 'text-amber-500',
      badge: '誌異',
    },
    {
      id: 'map',
      label: '市政朝聖地圖',
      sublabel: 'Google 地圖實景 · 全台北爭議聖地巡禮',
      icon: MapPin,
      color: 'text-emerald-500',
      badge: '地圖',
    },
    {
      id: 'graph',
      label: '市政決策關係圖',
      sublabel: 'D3 互動知識圖譜 · 議題與施政連動',
      icon: Network,
      color: 'text-violet-500',
      badge: 'D3圖譜',
    },
    {
      id: 'about',
      label: '關於本站 · 百科宗旨',
      sublabel: '自由百科全書願景 · 中立觀點與查證原則',
      icon: Info,
      color: 'text-blue-500',
      badge: '關於',
    },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  const handleRandomClick = () => {
    onClose();
    onRandomArticle();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <aside className="w-80 sm:w-96 bg-white dark:bg-[#12161b] border-r border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col h-full z-10 transition-transform transform">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-[#151a21]/80 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-sm bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center text-sm font-serif font-bold shadow-xs">
                W
              </span>
              <div>
                <h2 className="text-base font-serif font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                  Waynipedia
                </h2>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  蔣萬安百科 · 全方位導覽目錄
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="關閉側邊欄"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-6">
            {/* Primary Biography Fast Link */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-amber-500/10 border border-blue-500/30">
              <div className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 font-semibold mb-1">
                ★ 核心人物傳記
              </div>
              <button
                onClick={() => {
                  onSelectArticle('chiang');
                  onClose();
                }}
                className="w-full flex items-center justify-between text-left group cursor-pointer"
              >
                <div>
                  <h3 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    蔣萬安 主條目
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    台北市第八屆市長 · 完整生平與政績檔案
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Core Section Links */}
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase px-3 mb-2 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5" />
                <span>站內核心專題與典藏</span>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold shadow-xs'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-white/20 dark:bg-neutral-900/20 text-white dark:text-neutral-900'
                            : 'bg-neutral-100 dark:bg-neutral-800/80 ' + item.color
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-medium truncate">
                            {item.label}
                          </span>
                          {item.badge && !isActive && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-300/40">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[11px] truncate mt-0.5 ${
                            isActive
                              ? 'text-white/80 dark:text-neutral-700'
                              : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {item.sublabel}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase px-3 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>快速探索</span>
              </div>
              <button
                onClick={handleRandomClick}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all font-medium group cursor-pointer mb-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base group-hover:scale-110 transition-transform">🎲</span>
                  <span className="text-amber-800 dark:text-amber-300 font-semibold">隨機漫遊抽閱條目</span>
                </div>
                <span className="text-[11px] text-amber-700/80 dark:text-amber-400 font-mono">前往 →</span>
              </button>

              {onOpenShare && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenShare();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all font-medium group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-800 dark:text-blue-300 font-semibold">社群分享與預覽圖</span>
                  </div>
                  <span className="text-[11px] text-blue-700/80 dark:text-blue-400 font-mono">預覽 →</span>
                </button>
              )}
            </div>

            {/* Category Directory */}
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase px-3 mb-2 flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span>分類條目目錄 ({articles.length})</span>
              </div>
              <div className="space-y-1.5">
                {categories.map(([category, catArticles]) => {
                  const isExpanded = expandedCategory === category;
                  return (
                    <div
                      key={category}
                      className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-[#14181d]"
                    >
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : category)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-100/90 dark:bg-[#1c222b] hover:bg-neutral-200/90 dark:hover:bg-[#252d3a] transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="font-semibold text-neutral-900 dark:text-white">{category}</span>
                        </span>
                        <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/70 dark:bg-black/30 text-neutral-600 dark:text-neutral-300">
                            {catArticles.length} 篇
                          </span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-2 py-1.5 bg-white dark:bg-[#111419] max-h-48 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60">
                          {catArticles.map((art) => (
                            <button
                              key={art.id}
                              onClick={() => {
                                onSelectArticle(art.id);
                                onClose();
                              }}
                              className="w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 rounded transition-colors cursor-pointer"
                            >
                              <span className="shrink-0">{art.icon}</span>
                              <span className="truncate flex-1">{art.title}</span>
                              {art.isMainBiography && (
                                <span className="text-[9px] text-amber-500 font-mono">★</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer info in sidebar */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#14181e] text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span>收錄統計</span>
              <span>{articles.length} 條目 · {allHistoryEvents.length} 事件</span>
            </div>
            <p className="text-[10px] leading-tight text-neutral-400 dark:text-neutral-500 pt-1">
              客觀紀錄台北市政歷史與各方觀點。內容依據公開媒體與政府公報引證。
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
