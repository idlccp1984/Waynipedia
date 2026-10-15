import React, { useState, useMemo } from 'react';
import { quizQuestions } from '../data/quiz';
import { blindVoteQuestions, blindVotePersonas } from '../data/blindVoteQuiz';
import { articles } from '../data/articles';
import { QuizQuestion, BlindVoteQuestion, BlindVoteOption } from '../types';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Award,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Share2,
  Check,
  Flame,
  ChevronDown,
  ChevronUp,
  Vote,
  Compass,
} from 'lucide-react';

interface QuizViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  initialMode?: 'blind' | 'fact';
}

export function QuizView({ onSelectArticle, onNavigateHome, initialMode = 'blind' }: QuizViewProps) {
  const [activeTab, setActiveTab] = useState<'blind' | 'fact'>(initialMode);

  // -------------------------------------------------------------
  // TAB 1: 盲測大考驗（不看姓名，你會不會選蔣萬安）State
  // -------------------------------------------------------------
  type BlindCountChoice = 10 | 20 | 30 | 40 | 'all';
  const [blindCountChoice, setBlindCountChoice] = useState<BlindCountChoice>(20);
  const [blindStarted, setBlindStarted] = useState<boolean>(false);
  const [activeBlindQuestions, setActiveBlindQuestions] = useState<BlindVoteQuestion[]>(() => {
    return [...blindVoteQuestions].slice(0, 20);
  });

  const [blindIndex, setBlindIndex] = useState(0);
  const [blindSelectedOption, setBlindSelectedOption] = useState<number | null>(null);
  const [blindAnswers, setBlindAnswers] = useState<Array<{ qId: string; optionIndex: number; score: number }>>([]);
  const [blindFinished, setBlindFinished] = useState(false);
  const [showRealContext, setShowRealContext] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const currentBlindQ: BlindVoteQuestion =
    activeBlindQuestions[blindIndex] || activeBlindQuestions[0] || blindVoteQuestions[0];

  const handleStartBlind = (choice: BlindCountChoice = blindCountChoice) => {
    setBlindCountChoice(choice);
    const count = choice === 'all' ? blindVoteQuestions.length : choice;
    const shuffled = [...blindVoteQuestions].sort(() => 0.5 - Math.random());
    setActiveBlindQuestions(shuffled.slice(0, count));
    setBlindIndex(0);
    setBlindSelectedOption(null);
    setBlindAnswers([]);
    setBlindFinished(false);
    setShowRealContext(false);
    setBlindStarted(true);
  };

  const handleSelectBlindOption = (optionIndex: number) => {
    if (blindSelectedOption !== null) return;
    setBlindSelectedOption(optionIndex);
  };

  const handleNextBlind = () => {
    if (blindSelectedOption === null) return;
    const selectedOpt = currentBlindQ.options[blindSelectedOption];
    const newAnswers = [
      ...blindAnswers,
      {
        qId: currentBlindQ.id,
        optionIndex: blindSelectedOption,
        score: selectedOpt.wanAnScore,
      },
    ];
    setBlindAnswers(newAnswers);

    if (blindIndex + 1 < activeBlindQuestions.length) {
      setBlindIndex((i) => i + 1);
      setBlindSelectedOption(null);
      setShowRealContext(false);
    } else {
      setBlindFinished(true);
    }
  };

  const handleRestartBlind = () => {
    handleStartBlind(blindCountChoice);
  };

  const handleReconfigureBlind = () => {
    setBlindStarted(false);
    setBlindFinished(false);
    setBlindIndex(0);
    setBlindSelectedOption(null);
    setBlindAnswers([]);
    setShowRealContext(false);
  };

  // Calculate final blind vote score & persona
  const blindResult = useMemo(() => {
    if (blindAnswers.length === 0) return { score: 0, persona: blindVotePersonas[3] };
    const total = blindAnswers.reduce((sum, a) => sum + a.score, 0);
    const avgScore = Math.round(total / blindAnswers.length);

    const persona =
      blindVotePersonas.find((p) => avgScore >= p.range[0] && avgScore <= p.range[1]) ||
      blindVotePersonas[3];

    return { score: avgScore, persona };
  }, [blindAnswers]);

  const handleCopyBlindResult = () => {
    const text = `【萬安盲測結果出爐 🗳️】\n測驗題數：${activeBlindQuestions.length} 題\n我的萬安契合度指數：${blindResult.score}%\n稱號：${blindResult.persona.title}\n\n「${blindResult.persona.summary}」\n\n不看姓名、撕掉政黨濾鏡，你會不會選蔣萬安？\n快來《萬安百科 Waynipedia》一起測測看：${window.location.origin}${window.location.pathname}#blind-quiz`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };


  // -------------------------------------------------------------
  // TAB 2: 時事百科知識競技場 State
  // -------------------------------------------------------------
  const [factSeed, setFactSeed] = useState(0);
  const factQuestions = useMemo(() => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
    return shuffled.map((q) => {
      const correctText = q.options[q.correctIndex];
      const randomizedOptions = [...q.options].sort(() => 0.5 - Math.random());
      const newCorrectIndex = randomizedOptions.indexOf(correctText);
      return {
        ...q,
        options: randomizedOptions,
        correctIndex: newCorrectIndex,
      };
    });
  }, [factSeed]);

  const [factIndex, setFactIndex] = useState(0);
  const [factSelectedOption, setFactSelectedOption] = useState<number | null>(null);
  const [factAnswered, setFactAnswered] = useState(false);
  const [factScore, setFactScore] = useState(0);
  const [factFinished, setFactFinished] = useState(false);

  const currentFactQ: QuizQuestion = factQuestions[factIndex];
  const articleMap = useMemo(() => new Map(articles.map((a) => [a.id, a])), []);
  const relatedFactArticle = articleMap.get(currentFactQ?.articleId);

  const handleSelectFactOption = (index: number) => {
    if (factAnswered) return;
    setFactSelectedOption(index);
    setFactAnswered(true);

    if (index === currentFactQ.correctIndex) {
      setFactScore((s) => s + 1);
    }
  };

  const handleNextFact = () => {
    if (factIndex + 1 < factQuestions.length) {
      setFactIndex((i) => i + 1);
      setFactSelectedOption(null);
      setFactAnswered(false);
    } else {
      setFactFinished(true);
    }
  };

  const handleRestartFact = () => {
    setFactSeed((s) => s + 1);
    setFactIndex(0);
    setFactSelectedOption(null);
    setFactAnswered(false);
    setFactScore(0);
    setFactFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
        <button
          onClick={onNavigateHome}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回首頁</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-2.5">
              <span>🎭</span>
              <span>萬安百科互動測驗中心</span>
            </h1>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              提供搞笑荒謬的「不看姓名盲測選市長」與考證嚴謹的「時事百科知識競技場」雙重模式。
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg max-w-md">
          <button
            onClick={() => setActiveTab('blind')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'blind'
                ? 'bg-white dark:bg-[#14181d] text-neutral-900 dark:text-neutral-100 shadow-xs font-bold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Vote className="w-4 h-4 text-rose-500" />
            <span>盲測：你會選蔣萬安嗎？</span>
            <span className="text-[10px] bg-rose-500/15 text-rose-600 dark:text-rose-300 px-1.5 py-0.2 rounded-full font-sans font-normal">
              HOT
            </span>
          </button>

          <button
            onClick={() => setActiveTab('fact')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'fact'
                ? 'bg-white dark:bg-[#14181d] text-neutral-900 dark:text-neutral-100 shadow-xs font-bold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Award className="w-4 h-4 text-blue-500" />
            <span>時事百科知識競技場</span>
            <span className="text-[10px] bg-blue-500/15 text-blue-600 dark:text-blue-300 px-1.5 py-0.2 rounded-full font-sans font-normal">
              {quizQuestions.length}題
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: 盲測大考驗（不看姓名，你會不會選蔣萬安） */}
      {/* ========================================================= */}
      {activeTab === 'blind' && (
        <div>
          {!blindStarted ? (
            /* ======================================================= */
            /* Question Count Selection Intro Card                     */
            /* ======================================================= */
            <div className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-9 shadow-xs space-y-7 animate-in fade-in duration-200">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                  <Vote className="w-3.5 h-3.5" />
                  <span>盲測大考驗 · 靈魂契合度檢測</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  不看姓名，你會不會選蔣萬安？
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                  撕掉政黨標籤、抹除顏值濾鏡與名媛光環！純粹透過真實市政突發危機與生活直覺，檢視你靈魂深處的萬安契合度！全題庫已全面擴充至 <strong>50 題</strong>爆笑與寫實情境。
                </p>
              </div>

              {/* Question Count Selector */}
              <div className="p-5 sm:p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>請選擇測驗題數：</span>
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    目前已擴充收錄 50 道完整市政情境
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(
                    [
                      { count: 10, label: '10 題', time: '約 2 分鐘', desc: '快速摸底速測' },
                      { count: 20, label: '20 題', time: '約 4 分鐘', desc: '標準診斷', isRecommended: true },
                      { count: 30, label: '30 題', time: '約 6 分鐘', desc: '深度檢驗' },
                      { count: 40, label: '40 題', time: '約 8 分鐘', desc: '硬核考驗' },
                      { count: 'all', label: '全部 50 題', time: '約 10 分鐘', desc: '全題庫大滿貫' },
                    ] as Array<{ count: BlindCountChoice; label: string; time: string; desc: string; isRecommended?: boolean }>
                  ).map((item) => {
                    const isSelected = blindCountChoice === item.count;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setBlindCountChoice(item.count)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 dark:border-rose-500 ring-2 ring-rose-500/30 shadow-xs'
                            : 'bg-white dark:bg-[#161a20] border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                        }`}
                      >
                        {item.isRecommended && (
                          <span className="absolute -top-2 right-2 text-[10px] bg-rose-600 text-white font-semibold px-2 py-0.2 rounded-full shadow-2xs">
                            推薦
                          </span>
                        )}
                        <div>
                          <div
                            className={`text-base sm:text-lg font-serif font-bold ${
                              isSelected
                                ? 'text-rose-700 dark:text-rose-300'
                                : 'text-neutral-900 dark:text-neutral-100'
                            }`}
                          >
                            {item.label}
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/80 text-[10px] text-neutral-400 font-mono">
                          ⏱️ {item.time}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Humorous Teasers Preview */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider text-left">
                  🔥 爆笑精選情境劇透預告：
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs text-neutral-700 dark:text-neutral-300">
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 flex items-center gap-2">
                    <span className="text-lg">🎋</span>
                    <span>你會不會隨手丟甘蔗回歸花圃大地？</span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 flex items-center gap-2">
                    <span className="text-lg">🐀</span>
                    <span>議會天花板掉出活老鼠你該如何回答？</span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 flex items-center gap-2">
                    <span className="text-lg">🗑️</span>
                    <span>垃圾車音樂響起是不是你的 Trash Time？</span>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 flex items-center gap-2">
                    <span className="text-lg">🌧️</span>
                    <span>大巨蛋漏水要不要發明專利水管接水？</span>
                  </div>
                </div>
              </div>

              {/* Start CTA Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => handleStartBlind(blindCountChoice)}
                  className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Vote className="w-5 h-5" />
                  <span>
                    開始盲測（
                    {blindCountChoice === 'all' ? '全部 50 題' : `${blindCountChoice} 題`}
                    ）→
                  </span>
                </button>
              </div>
            </div>
          ) : !blindFinished ? (
            /* ======================================================= */
            /* Active Blind Test Question Card                         */
            /* ======================================================= */
            <div className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 sm:p-7 shadow-xs">
              {/* Progress and Notice */}
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                <button
                  onClick={handleReconfigureBlind}
                  className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 font-medium cursor-pointer"
                  title="返回重新選擇測驗題數"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>重新選擇題數（目前共 {activeBlindQuestions.length} 題）</span>
                </button>
                <span className="text-neutral-400 dark:text-neutral-500 hidden sm:inline">
                  🙈 盲測中：不看姓名，純依本能直覺作答
                </span>
              </div>

              {/* Enhanced Progress Tracking Bar */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20 text-xs">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>第 {blindIndex + 1} 題</span>
                      <span className="text-neutral-400 font-normal">/ 共 {activeBlindQuestions.length} 題</span>
                    </span>
                    <span className="text-[11px] text-neutral-400 hidden xs:inline">
                      剩餘 {activeBlindQuestions.length - (blindIndex + 1)} 題
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      測驗進度
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-mono font-bold text-xs shadow-2xs">
                      {Math.round(((blindIndex + 1) / activeBlindQuestions.length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Multi-Stop Gradient Track with Shimmer */}
                <div className="relative w-full bg-neutral-100 dark:bg-neutral-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-neutral-200/80 dark:border-neutral-700/80 shadow-inner">
                  <div
                    className="relative bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out shadow-xs"
                    style={{
                      width: `${Math.max(5, ((blindIndex + 1) / activeBlindQuestions.length) * 100)}%`,
                    }}
                  >
                    {/* Inner highlight pulse */}
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                  </div>
                </div>

                {/* Milestone indicators */}
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 px-1 pt-0.5">
                  <span className={blindIndex + 1 >= 1 ? 'text-rose-500 font-bold' : ''}>起點</span>
                  <span className={((blindIndex + 1) / activeBlindQuestions.length) >= 0.25 ? 'text-rose-500 font-bold' : ''}>25%</span>
                  <span className={((blindIndex + 1) / activeBlindQuestions.length) >= 0.5 ? 'text-amber-500 font-bold' : ''}>50% (中繼站)</span>
                  <span className={((blindIndex + 1) / activeBlindQuestions.length) >= 0.75 ? 'text-indigo-500 font-bold' : ''}>75%</span>
                  <span className={blindIndex + 1 === activeBlindQuestions.length ? 'text-indigo-600 font-bold' : ''}>100% 揭曉</span>
                </div>
              </div>

              {/* Question Header */}
              <div className="mb-6">
                <div className="inline-block text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded mb-2">
                  市政靈魂契合度題目 #{blindIndex + 1}
                </div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {currentBlindQ.question}
                </h2>
                {currentBlindQ.subtitle && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 italic">
                    {currentBlindQ.subtitle}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentBlindQ.options.map((opt, idx) => {
                  const isSelected = blindSelectedOption === idx;
                  let cardStyle =
                    'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-[#181c21] text-neutral-900 dark:text-neutral-100 cursor-pointer';

                  if (blindSelectedOption !== null) {
                    if (isSelected) {
                      cardStyle =
                        'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 font-medium ring-1 ring-rose-500/30';
                    } else {
                      cardStyle = 'opacity-40 border-neutral-200 dark:border-neutral-800 cursor-default';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectBlindOption(idx)}
                      disabled={blindSelectedOption !== null}
                      className={`w-full text-left p-4 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${cardStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5 text-neutral-600 dark:text-neutral-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Humorous Feedback */}
              {blindSelectedOption !== null && (
                <div className="p-4 sm:p-5 rounded-lg bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span>
                        選擇評語 · 風格：{currentBlindQ.options[blindSelectedOption].vibe}（萬安指數 {currentBlindQ.options[blindSelectedOption].wanAnScore}%）
                      </span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                    👉 {currentBlindQ.options[blindSelectedOption].feedback}
                  </p>

                  {/* Accordion: Real Municipal Context */}
                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <button
                      onClick={() => setShowRealContext(!showRealContext)}
                      className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span>🔍 這題背後的真實市政事件是什麼？</span>
                      {showRealContext ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {showRealContext && (
                      <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 bg-white dark:bg-[#14181d] p-3 rounded border border-neutral-200 dark:border-neutral-800 leading-relaxed">
                        <p>{currentBlindQ.contextRealEvent}</p>
                        <div className="mt-2 text-right">
                          <button
                            onClick={() => onSelectArticle(currentBlindQ.articleId)}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>前往查閱完整百科條目 →</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Next Question Button */}
                  <div className="pt-2 text-right">
                    <button
                      onClick={handleNextBlind}
                      className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 rounded-md transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                    >
                      <span>
                        {blindIndex + 1 < activeBlindQuestions.length ? '前往下一題 →' : '揭曉盲測結果：我會選蔣萬安嗎？🗳️'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ======================================================= */
            /* Blind Vote Finished Result Card                         */
            /* ======================================================= */
            <div className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-9 shadow-sm space-y-7 animate-in fade-in duration-300">
              {/* Header Badge */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                  <span>{blindResult.persona.emoji}</span>
                  <span>盲測投票匹配鑑定報告</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  {blindResult.persona.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                  在遮蔽候選人姓名與外貌的前提下，根據你對 <strong>{activeBlindQuestions.length} 題</strong>市政突發危機與生活情境的本能抉擇，你的盲選結果出爐！
                </p>
              </div>

              {/* Big Score Meter */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-b from-rose-50/60 to-amber-50/40 dark:from-rose-950/20 dark:to-neutral-900 border border-rose-100 dark:border-rose-900/40 text-center">
                <div className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-1">
                  萬安靈魂契合度指數 (Wan-an Affinity Index)
                </div>
                <div className="text-5xl sm:text-6xl font-serif font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight">
                  {blindResult.score}%
                </div>
                <div className="mt-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  投票預測結論：
                  <span className="text-rose-600 dark:text-rose-400">
                    {blindResult.score >= 50 ? ' 你極有可能在選票上蓋下蔣萬安！' : ' 盲測顯示你絕不可能投給蔣萬安！'}
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                  「{blindResult.persona.summary}」
                </p>
              </div>

              {/* Detailed Personality Analysis */}
              <div className="p-5 sm:p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 text-left">
                <div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>深度性格解析</span>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {blindResult.persona.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>給您的市民良心建議：</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {blindResult.persona.advice}
                  </p>
                </div>
              </div>

              {/* Answer Breakdown Accordion */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider text-left">
                  {activeBlindQuestions.length} 題答題風格軌跡回顧：
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  {activeBlindQuestions.map((q, idx) => {
                    const ans = blindAnswers[idx];
                    const chosen = ans !== undefined ? q.options[ans.optionIndex] : null;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161a20] text-xs flex items-center justify-between"
                      >
                        <div className="truncate mr-2">
                          <span className="font-semibold text-neutral-500 mr-1.5">#{idx + 1}</span>
                          <span className="text-neutral-700 dark:text-neutral-300">{q.question.slice(0, 15)}...</span>
                        </div>
                        {chosen && (
                          <span
                            className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                              chosen.wanAnScore >= 80
                                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300'
                                : chosen.wanAnScore >= 40
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300'
                                : 'bg-blue-500/15 text-blue-600 dark:text-blue-300'
                            }`}
                          >
                            {chosen.vibe} ({chosen.wanAnScore}%)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={handleCopyBlindResult}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
                >
                  {copySuccess ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
                  <span>{copySuccess ? '已複製結果到剪貼簿！' : '分享我的盲測結果'}</span>
                </button>

                <button
                  onClick={handleRestartBlind}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>同題數再測一次</span>
                </button>

                <button
                  onClick={handleReconfigureBlind}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/40 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Vote className="w-3.5 h-3.5" />
                  <span>更換測驗題數（10/20/30/40/50題）</span>
                </button>

                <button
                  onClick={() => setActiveTab('fact')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>切換至時事百科題庫</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: 時事百科知識競技場 */}
      {/* ========================================================= */}
      {activeTab === 'fact' && (
        <div>
          {!factFinished ? (
            <div className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 sm:p-7 shadow-xs">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <span>
                  第 <strong className="font-semibold text-neutral-900 dark:text-neutral-100">{factIndex + 1}</strong> / {factQuestions.length} 題
                </span>
                <span>目前得分：{factScore} 分</span>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 leading-relaxed mb-6">
                {currentFactQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentFactQ.options.map((opt, idx) => {
                  let btnStyle =
                    'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white dark:bg-[#181c21] text-neutral-900 dark:text-neutral-100 cursor-pointer';

                  if (factAnswered) {
                    if (idx === currentFactQ.correctIndex) {
                      btnStyle =
                        'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium cursor-default';
                    } else if (idx === factSelectedOption) {
                      btnStyle =
                        'border-red-500 bg-red-50/80 dark:bg-red-950/40 text-red-900 dark:text-red-200 cursor-default';
                    } else {
                      btnStyle = 'opacity-50 border-neutral-200 dark:border-neutral-800 cursor-default';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectFactOption(idx)}
                      disabled={factAnswered}
                      className={`w-full text-left p-4 rounded-md border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {factAnswered && idx === currentFactQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {factAnswered && idx === factSelectedOption && idx !== currentFactQ.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Article Citation */}
              {factAnswered && (
                <div className="p-4 rounded-md bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 animate-in fade-in duration-200">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {factSelectedOption === currentFactQ.correctIndex ? (
                      <span className="text-emerald-600 dark:text-emerald-400">✓ 恭喜答對！</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">✕ 答錯了，正確答案是：{currentFactQ.options[currentFactQ.correctIndex]}</span>
                    )}
                  </div>

                  {currentFactQ.explanation && (
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      {currentFactQ.explanation}
                    </p>
                  )}

                  {relatedFactArticle && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">相關條目檔案：</span>
                      <button
                        onClick={() => onSelectArticle(relatedFactArticle.id)}
                        className="text-blue-700 dark:text-blue-400 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>閱讀「{relatedFactArticle.title}」</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <div className="pt-2 text-right">
                    <button
                      onClick={handleNextFact}
                      className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      {factIndex + 1 < factQuestions.length ? '前往下一題 →' : '檢視測驗成績 →'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results View */
            <div className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-lg p-8 text-center shadow-xs space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  時事測驗完成！
                </h2>
                <div className="mt-2 text-4xl font-serif font-bold text-blue-700 dark:text-blue-400 font-mono">
                  {factScore} / {factQuestions.length}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  {factScore >= 8
                    ? '太厲害了！你對台北市政決策與重大爭議新聞有著極為深刻的掌握！'
                    : factScore >= 5
                    ? '表現不錯！多數焦點市政議題都能準確掌握。'
                    : '還有許多精彩的歷史檔案與市政紀錄值得細細品讀！'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={handleRestartFact}
                  className="px-5 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>重新抽取 10 題再玩一次</span>
                </button>
                <button
                  onClick={() => setActiveTab('blind')}
                  className="px-5 py-2 text-xs sm:text-sm font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
                >
                  挑戰「盲測你會選蔣萬安嗎」🎭
                </button>
                <button
                  onClick={onNavigateHome}
                  className="px-5 py-2 text-xs sm:text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  返回百科首頁
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
