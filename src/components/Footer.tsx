import React from 'react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenShare?: () => void;
}

export function Footer({ onNavigate, onOpenShare }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#101418] mt-20 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-sm bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center text-xs font-serif font-bold">
              W
            </span>
            <span className="font-serif font-bold text-neutral-900 dark:text-neutral-100 text-sm">
              Waynipedia 蔣萬安百科
            </span>
            <span className="text-xs text-neutral-400">· 自由的市政與時事百科全書</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              首頁
            </button>
            <button
              onClick={() => onNavigate('chiang')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer font-medium text-blue-600 dark:text-blue-400"
            >
              蔣萬安 主條目
            </button>
            <button
              onClick={() => onNavigate('columns')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              議題專欄特刊
            </button>
            <button
              onClick={() => onNavigate('books')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              3D 典藏書庫
            </button>
            <button
              onClick={() => onNavigate('cards')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              卡牌專頁
            </button>
            <button
              onClick={() => onNavigate('history')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              歷史全日期時間軸
            </button>
            <button
              onClick={() => onNavigate('dyk')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              你知道嗎
            </button>
            <button
              onClick={() => onNavigate('numbers')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              關鍵數字看板
            </button>
            <button
              onClick={() => onNavigate('quiz-arena')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              時事測驗競技場
            </button>
            <button
              onClick={() => onNavigate('links')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer font-medium text-sky-600 dark:text-sky-400"
            >
              外部連結 🔗
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer font-medium text-emerald-600 dark:text-emerald-400"
            >
              朝聖地圖 🗺️
            </button>
            <button
              onClick={() => onNavigate('graph')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer font-medium text-violet-600 dark:text-violet-400"
            >
              決策關係圖 🕸️
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer font-medium text-blue-600 dark:text-blue-400"
            >
              關於本站
            </button>
            {onOpenShare && (
              <button
                onClick={onOpenShare}
                className="text-blue-600 dark:text-blue-400 hover:underline transition-colors cursor-pointer font-medium"
              >
                社群分享預覽圖
              </button>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed space-y-1.5">
          <p>
            <strong>免責與查核聲明</strong>：本站為非官方公共時事研究百科，資料整理自各大公開權威新聞媒體報導。各方說法兼聽並陳，未定論之司法案或指控以「稱」、「指」標明，非已證實事實；迷因條目包含網路社群文化觀察與諷刺成分。
          </p>
          <p>
            文字內容依據創用 CC 姓名標示-相同方式分享 4.0 國際授權條款釋出。
          </p>
        </div>
      </div>
    </footer>
  );
}
