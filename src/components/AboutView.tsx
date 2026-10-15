import React from 'react';
import {
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  Compass,
  Sparkles,
  ExternalLink,
  Flame,
  BookMarked,
  Layers,
  HelpCircle,
  FileText,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { articles } from '../data/articles';
import { pilgrimageSpots } from '../data/pilgrimageSpots';

interface AboutViewProps {
  onNavigateHome: () => void;
  onNavigateMap: () => void;
  onNavigateColumns: (columnId?: string) => void;
  onNavigateOddities: () => void;
  onNavigateBooks: () => void;
  onRandomArticle: () => void;
}

export function AboutView({
  onNavigateHome,
  onNavigateMap,
  onNavigateColumns,
  onNavigateOddities,
  onNavigateBooks,
  onRandomArticle,
}: AboutViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <button
          onClick={onNavigateHome}
          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回百科首頁</span>
        </button>
        <span className="font-mono text-neutral-400">
          ABOUT WAYNIPEDIA · 自由的市政百科全書
        </span>
      </div>

      {/* Hero Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>關於本站 · About Waynipedia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
          Waynipedia · 萬安百科
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          記錄台北市第八屆市長蔣萬安任內的重大市政決策、重大工程演進、跨黨派議會質詢攻防、社會民生焦點與網路迷因文化。秉持開放、中立與可查證之百科全書體例，供市民大眾與文史研究者查閱考證。
        </p>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            📚 現正收錄 <strong>{articles.length}</strong> 篇完整條目
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            🗺️ 涵蓋 <strong>{pilgrimageSpots.length}</strong> 處實體市政朝聖地標
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            ⚖️ 100% 標註主流新聞與公報引證
          </span>
        </div>
      </div>

      {/* Section 1: 宗旨與願景 */}
      <section className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>計畫緣起與創立宗旨</span>
        </h2>
        <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3 font-sans">
          <p>
            首都台北市為全台灣的政治、經濟與文化核心樞紐，市長與市府團隊的每一項決策，皆深刻影響二百五十萬市民生活，並牽動全台公共政策導向。
          </p>
          <p>
            在資訊爆炸與社群演算法破碎化的時代，公眾焦點往往隨每日新聞標題迅速轉移，使得重大公共工程（如台北大巨蛋漏水、基泰大直民宅下陷）、司法風暴（如台智光案、京華城容積率案）或社群熱議話題（如「trash time」英語風波、「問A答B」質詢模式）的脈絡與演進細節難以被完整回溯與客觀審視。
          </p>
          <p>
            <strong>Waynipedia</strong>（萬安百科）在此背景下誕生，旨在建立一個<strong>客觀、中立、系統化且永久存取</strong>的市政數位知識庫。不作政黨宣傳工具，亦不作片面情緒宣洩，而是如實記錄歷史發生過的事實、官方政策立論與各方監督批評。
          </p>
        </div>
      </section>

      {/* Section 2: 三大編撰核心原則 */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>維基百科體例三大核心準則</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14181d] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
              中立觀點 (NPOV)
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              所有條目必須以中立、冷靜的語氣書寫。在充滿爭議的市政事件中，兼顧市府官方論述、在野黨與議員質詢觀點、學者專家評析與市民民間感受，絕不偏廢特定立場。
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14181d] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
              可查證性 (Verifiability)
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              全站條目內文皆附有詳細的參考文獻與外部超連結，嚴格引用主流新聞通訊社報導、市議會質詢公報、法院裁定書及台北市政府官方新聞稿，杜絕未經查證之網路傳言。
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14181d] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
              拒絕原創研究 (NOR)
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              百科內容純粹梳理既有之公開事實與公共紀錄，不添加撰寫者個人揣測、主觀臆斷或私自發明之新理論，確保資料的文史權威與可信度。
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 站內特色功能矩陣 */}
      <section className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>全方位數位百科特色功能</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#161a20] space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>市政實體朝聖地圖（Google Maps 即時連動）</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              收錄全台北市 38 處市政重大工程、爭議風暴與迷因現場（如台北大巨蛋、和平新生天橋、基泰大直工區、艋舺龍山寺丟甘蔗處、市府trash time清運點），整合 Google 地圖導航與街景，並支援「🎲 隨機朝聖點」功能。
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#161a20] space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Google AI 摘要專屬命令連動</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              每個條目旁均設有「如果你覺得內容不完整你可以查看AI摘要」按鈕，精準帶入命令：「請直接以維基百科格式與中立口吻撰寫關於蔣萬安的{'{{條目標題}}'}條目。禁止輸出任何開頭介紹、結尾問候或後續建議，直接從條目導言開始輸出。」
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#161a20] space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>萬安志異 · 迷因特刊</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              師法《聊齋志異》體裁，以古典文人典雅筆觸記錄當代政治流行語錄與社群迷因（如跳針語錄、深蹲搭公車、美沙冬毒品防制口角、trash time 英語風波），呈現嚴肅市政背後的黑色幽默。
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#161a20] space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>3D 擬真雙頁實體書庫模擬</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              高度逼真的典藏百科精裝本模擬系統，左右雙頁對稱開本、中央立體書脊陰影谷谷與緞帶書籤，重現翻閱沉甸歷史巨著的真實書香觸感。
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: 免責聲明與版權資訊 */}
      <section className="bg-neutral-50 dark:bg-[#12151a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-semibold text-sm">
          <Info className="w-4 h-4 text-blue-500" />
          <span>版權與免責聲明</span>
        </div>
        <p>
          1. <strong>非官方所屬</strong>：本網站為獨立公民文史與公共資訊整理專案，並非台北市政府、任何政黨或維基媒體基金會（Wikimedia Foundation）之官方所屬機構。
        </p>
        <p>
          2. <strong>資料來源說明</strong>：本站所有文章均引證自國內外公開新聞媒體、政府開放資料平台、市議會公報記錄與公開司法判決書，引證均遵循著作權法之合理使用原則。
        </p>
        <p>
          3. <strong>持續更正與勘誤</strong>：若條目內容有任何事實出入、日期訛誤或新增最新發展，歡迎各界監督指正，我們將依據最新可信文獻持續修正更新。
        </p>
      </section>

      {/* Footer Navigation Buttons */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onNavigateHome}
          className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          ← 返回百科首頁
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNavigateMap}
            className="px-3.5 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>探索市政朝聖地圖</span>
          </button>
          <button
            onClick={() => onNavigateColumns()}
            className="px-3.5 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>瀏覽專欄特刊</span>
          </button>
          <button
            onClick={onRandomArticle}
            className="px-3.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>隨機抽閱條目</span>
          </button>
        </div>
      </div>
    </div>
  );
}
