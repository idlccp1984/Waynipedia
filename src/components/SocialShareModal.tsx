import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Globe,
  Palette,
  Bookmark,
  ChevronDown,
  Layers,
  ArrowRight,
  Link2,
  Sparkles,
  ExternalLink,
  Search,
} from 'lucide-react';
import { Article } from '../types';
import { articles } from '../data/articles';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteUrl?: string;
  currentArticle?: Article;
}

type CardTheme = 'obsidian' | 'navy' | 'emerald' | 'crimson';
type PreviewViewTab = 'card169' | 'socialFeed';

interface ThemeConfig {
  id: CardTheme;
  name: string;
  cardBg: string;
  border: string;
  accentText: string;
  badgeBg: string;
  goldLine: string;
  glow: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: 'obsidian',
    name: '黑金典藏',
    cardBg: 'from-[#0d1015] via-[#161a22] to-[#080b0f]',
    border: 'border-amber-400/50',
    accentText: 'text-amber-300',
    badgeBg: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    goldLine: 'from-transparent via-amber-400/50 to-transparent',
    glow: 'from-amber-500/10',
  },
  {
    id: 'navy',
    name: '深海湛藍',
    cardBg: 'from-[#081226] via-[#0d1d3d] to-[#050b18]',
    border: 'border-blue-400/50',
    accentText: 'text-blue-300',
    badgeBg: 'bg-blue-400/15 text-blue-300 border-blue-400/30',
    goldLine: 'from-transparent via-blue-400/50 to-transparent',
    glow: 'from-blue-500/15',
  },
  {
    id: 'emerald',
    name: '墨綠史冊',
    cardBg: 'from-[#081a14] via-[#0e271f] to-[#040e0b]',
    border: 'border-emerald-400/50',
    accentText: 'text-emerald-300',
    badgeBg: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
    goldLine: 'from-transparent via-emerald-400/50 to-transparent',
    glow: 'from-emerald-500/15',
  },
  {
    id: 'crimson',
    name: '深緋印璽',
    cardBg: 'from-[#1c0c10] via-[#2d1218] to-[#12070a]',
    border: 'border-rose-400/50',
    accentText: 'text-rose-300',
    badgeBg: 'bg-rose-400/15 text-rose-300 border-rose-400/30',
    goldLine: 'from-transparent via-rose-400/50 to-transparent',
    glow: 'from-rose-500/15',
  },
];

export function SocialShareModal({
  isOpen,
  onClose,
  siteUrl,
  currentArticle,
}: SocialShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedCardText, setCopiedCardText] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>('obsidian');
  const [previewTab, setPreviewTab] = useState<PreviewViewTab>('card169');

  // Input for pasting link or searching article
  const [pastedLinkInput, setPastedLinkInput] = useState<string>('');
  const [parseNotice, setParseNotice] = useState<string | null>(null);

  // Selected article
  const [selectedArticleId, setSelectedArticleId] = useState<string>(() => {
    return currentArticle ? currentArticle.id : 'trashtime';
  });

  const [previewMode, setPreviewMode] = useState<'article' | 'site'>(() => {
    return currentArticle ? 'article' : 'article';
  });

  // Sync when currentArticle changes
  useEffect(() => {
    if (currentArticle) {
      setSelectedArticleId(currentArticle.id);
      setPreviewMode('article');
      setPastedLinkInput(`${window.location.origin}${window.location.pathname}#/${currentArticle.id}`);
    }
  }, [currentArticle]);

  if (!isOpen) return null;

  const activeArticle =
    articles.find((a) => a.id === selectedArticleId) || currentArticle || articles[0];
  const theme = THEMES.find((t) => t.id === selectedTheme) || THEMES[0];

  const baseUrl =
    siteUrl ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://ais-pre-a5ckeudorp52zpwoktr3dd-202312038015.asia-northeast1.run.app');

  // Display metadata based on mode
  const isArticleMode = previewMode === 'article';
  const displayTitle = isArticleMode
    ? activeArticle.title
    : 'Waynipedia 蔣萬安百科 – 自由的市政與時事百科全書';
  const displayExcerpt = isArticleMode
    ? activeArticle.excerpt
    : '收錄台北市長蔣萬安相關市政決策、重大工程、選戰攻防、議題專欄、歷史上的今天與書籍卡牌典藏之現代化百科全書。';
  const displayCategory = isArticleMode ? activeArticle.category : '百科全書首頁';
  const displayDate = isArticleMode ? activeArticle.date : '典藏檔案大典';
  const displayIcon = isArticleMode ? activeArticle.icon : '🏛️';

  // Distinct target URL for each article
  const shareTargetUrl = isArticleMode
    ? `${baseUrl}?article=${encodeURIComponent(activeArticle.id)}&title=${encodeURIComponent(
        activeArticle.title
      )}#/${activeArticle.id}`
    : `${baseUrl}#/`;

  // Parser: when user pastes a link
  const handlePastedUrlChange = (inputVal: string) => {
    setPastedLinkInput(inputVal);
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setParseNotice(null);
      return;
    }

    // Try extracting ID from hash or query or path
    let targetId = '';

    // Check query params: ?article=xxx or ?id=xxx
    if (trimmed.includes('?')) {
      try {
        const queryPart = trimmed.substring(trimmed.indexOf('?') + 1).split('#')[0];
        const params = new URLSearchParams(queryPart);
        const qArt = params.get('article') || params.get('id');
        if (qArt) targetId = qArt;
      } catch (e) {
        // ignore
      }
    }

    // Check hash: #/xxx
    if (!targetId && trimmed.includes('#')) {
      const hashPart = trimmed.substring(trimmed.indexOf('#') + 1).replace(/^\/?/, '');
      const cleanHash = hashPart.split('?')[0].trim();
      if (cleanHash) targetId = cleanHash;
    }

    // Check bare input
    if (!targetId) {
      targetId = trimmed;
    }

    // Find match by ID
    let found = articles.find(
      (a) => a.id.toLowerCase() === targetId.toLowerCase()
    );

    // If not found by ID, try finding by title or partial title
    if (!found) {
      found = articles.find((a) =>
        a.title.toLowerCase().includes(targetId.toLowerCase())
      );
    }

    if (found) {
      setSelectedArticleId(found.id);
      setPreviewMode('article');
      setParseNotice(`已成功辨識條目「${found.title}」！已即時載入專屬標題與導言簡介。`);
    } else if (trimmed.includes('http') || trimmed.includes('/')) {
      setParseNotice(`正在預覽該網址。若為站內條目，請確認包含條目ID（如 #/trashtime）`);
    } else {
      setParseNotice(null);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareTargetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyCardText = () => {
    const cardText = `【${displayTitle}】\n${displayExcerpt}\n\n📖 閱讀全文：${shareTargetUrl}\n🏛️ 來源：Waynipedia 蔣萬安百科`;
    navigator.clipboard.writeText(cardText);
    setCopiedCardText(true);
    setTimeout(() => setCopiedCardText(false), 2500);
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareTargetUrl)}`,
      '_blank'
    );
  };

  const shareToLine = () => {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareTargetUrl)}`,
      '_blank'
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${displayTitle} – Waynipedia 蔣萬安百科`
      )}&url=${encodeURIComponent(shareTargetUrl)}`,
      '_blank'
    );
  };

  const shareToThreads = () => {
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(
        `${displayTitle}\n${displayExcerpt}\n${shareTargetUrl}`
      )}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#14181f] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span>社群分享卡片預覽圖</span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  即時解析 · 專屬標題與簡介
                </span>
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                貼上任何條目連結，立即動態呈現該條目的專屬標題與精華導言，不再千篇一律！
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* ============================================================== */}
          {/* PASTE URL INPUT BAR (貼上連結出現標題及簡介而不是都一樣)          */}
          {/* ============================================================== */}
          <div className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <strong className="font-bold">貼上條目連結或網址（即時讀取標題與簡介）：</strong>
              </span>
              <span className="text-[11px] text-neutral-400">支援網址、#/條目ID 或關鍵字</span>
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                value={pastedLinkInput}
                onChange={(e) => handlePastedUrlChange(e.target.value)}
                placeholder="貼上網址，如：#/trashtime、https://.../trashtime、或輸入「trash time」..."
                className="w-full text-xs sm:text-sm pl-3 pr-20 py-2 rounded-lg bg-white dark:bg-[#181c21] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
              {pastedLinkInput && (
                <button
                  onClick={() => handlePastedUrlChange('')}
                  className="absolute right-2 px-2 py-0.5 text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                >
                  清除
                </button>
              )}
            </div>

            {/* Quick Chips for Hot Topics */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-neutral-400">熱門條目：</span>
              {[
                { id: 'trashtime', name: 'trash time' },
                { id: 'english', name: '英語能力' },
                { id: 'cane', name: '丟甘蔗' },
                { id: 'rat', name: '天降老鼠' },
                { id: 'squat', name: '深蹲換公車' },
                { id: 'umb', name: '700萬遮陽傘' },
              ].map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handlePastedUrlChange(`#/${chip.id}`)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer border ${
                    selectedArticleId === chip.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-blue-400'
                  }`}
                >
                  {chip.name}
                </button>
              ))}
            </div>

            {/* Parse Notice */}
            {parseNotice && (
              <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{parseNotice}</span>
              </div>
            )}
          </div>

          {/* Controls Bar: Mode Switcher + Article Dropdown + Theme Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-neutral-100 dark:border-neutral-800/80">
            {/* Mode switch */}
            <div className="inline-flex rounded-lg border border-neutral-300 dark:border-neutral-700 p-0.5 bg-neutral-100 dark:bg-neutral-800">
              <button
                onClick={() => setPreviewMode('article')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  isArticleMode
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                條目專屬卡片 ({activeArticle.title})
              </button>
              <button
                onClick={() => setPreviewMode('site')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  !isArticleMode
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                百科首頁卡片
              </button>
            </div>

            {/* Preview style tab: 16:9 Card vs Social Platform Feed Preview */}
            <div className="inline-flex rounded-lg border border-neutral-300 dark:border-neutral-700 p-0.5 bg-neutral-100 dark:bg-neutral-800 text-[11px]">
              <button
                onClick={() => setPreviewTab('card169')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  previewTab === 'card169'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                16:9 精裝卡片
              </button>
              <button
                onClick={() => setPreviewTab('socialFeed')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  previewTab === 'socialFeed'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                社群貼上預覽
              </button>
            </div>

            {/* Background Theme Selector */}
            {previewTab === 'card169' && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  <span>底色：</span>
                </span>
                <div className="flex items-center gap-1">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTheme(t.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer border ${
                        selectedTheme === t.id
                          ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold'
                          : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* VIEW 1: NON-AI TYPOGRAPHIC SOCIAL PREVIEW CARD (16:9 RATIO)     */}
          {/* ============================================================== */}
          {previewTab === 'card169' && (
            <div className="relative rounded-xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 shadow-xl select-none group">
              {/* Card Frame (16:9 Proportion) */}
              <div
                className={`relative aspect-video w-full p-4 sm:p-6 bg-gradient-to-br ${theme.cardBg} border-2 ${theme.border} text-white flex flex-col justify-between overflow-hidden`}
              >
                {/* Atmospheric Background Lighting */}
                <div
                  className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${theme.glow} via-transparent to-transparent pointer-events-none`}
                />

                {/* Watermark Logo Texture */}
                <div className="absolute right-4 bottom-2 text-[68px] sm:text-[96px] font-serif font-black text-white/[0.04] select-none pointer-events-none tracking-tighter leading-none">
                  WAYNI
                </div>

                {/* Classical Corner Filigree Accents */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-amber-400/40 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-amber-400/40 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-amber-400/40 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-amber-400/40 pointer-events-none" />

                {/* CARD TOP: Monogram + Category Badge + Date */}
                <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-xs bg-white text-neutral-950 font-serif font-black flex items-center justify-center text-[11px] shadow-xs">
                      W
                    </div>
                    <span className="font-serif font-bold text-xs tracking-wider text-neutral-200">
                      Waynipedia 蔣萬安百科
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badgeBg}`}
                    >
                      {displayCategory}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 hidden xs:inline">
                      {displayDate}
                    </span>
                  </div>
                </div>

                {/* CARD CENTER: Big Bold Article Name & Serif Excerpt */}
                <div className="relative z-10 my-auto py-2">
                  <div className="flex items-start gap-2.5 sm:gap-3.5">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                      <span className="text-xl sm:text-3xl">{displayIcon}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif font-black text-base sm:text-xl md:text-2xl text-white tracking-tight leading-tight line-clamp-2 drop-shadow-sm">
                        {displayTitle}
                      </h2>
                      <p
                        className={`mt-1.5 sm:mt-2 text-[11px] sm:text-xs font-serif leading-relaxed line-clamp-3 text-neutral-300 italic`}
                      >
                        「{displayExcerpt}」
                      </p>
                    </div>
                  </div>
                </div>

                {/* CARD BOTTOM: Divider + Barcode + Domain Verification */}
                <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="tracking-widest text-neutral-300 font-mono text-[8px] sm:text-[9px]">
                      ||| | |||| | ||| |||| || |
                    </span>
                    <span className="hidden sm:inline text-neutral-400">
                      條目識別碼：WAYNI-{activeArticle.id.toUpperCase().slice(0, 8)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>waynipedia.tw · 自由公共百科</span>
                  </div>
                </div>
              </div>

              {/* Label pill on bottom-right of preview container */}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[10px] text-amber-300 font-mono z-20">
                1200 × 675 格式 · 文章專屬標題與導言排版
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: SOCIAL MEDIA PLATFORM FEED UNURL PREVIEW               */}
          {/* ============================================================== */}
          {previewTab === 'socialFeed' && (
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-[#12151a] border border-neutral-300 dark:border-neutral-700 space-y-2">
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center justify-between">
                <span>貼文預覽效果 (Facebook / LINE / Threads / Discord)：</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  ✓ 專屬標題與簡介已生效
                </span>
              </div>

              {/* Feed Card */}
              <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#181c22] shadow-xs">
                {/* Header Banner */}
                <div className="h-28 bg-gradient-to-r from-neutral-900 to-neutral-800 p-4 flex items-center justify-between text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {displayCategory}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white mt-1.5 line-clamp-1">
                      {displayTitle}
                    </h3>
                  </div>
                  <div className="text-4xl relative z-10 shrink-0 ml-3">{displayIcon}</div>
                  <div className="absolute -right-4 -bottom-4 text-7xl font-serif font-black text-white/5 select-none pointer-events-none">
                    W
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    waynipedia.tw · 萬安百科
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
                    {displayTitle} – Waynipedia 蔣萬安百科
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {displayExcerpt}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions: Copy Card Text */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-neutral-500 dark:text-neutral-400 truncate max-w-xs">
              當前條目：<strong className="text-neutral-800 dark:text-neutral-200">{displayTitle}</strong>
            </span>
            <button
              onClick={handleCopyCardText}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-medium shrink-0"
            >
              {copiedCardText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">已複製條目引文</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>複製卡片圖文引文</span>
                </>
              )}
            </button>
          </div>

          {/* Share Links & URL Copy */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareTargetUrl}
                className="flex-1 px-3 py-2 text-xs bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 font-mono truncate select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>已複製專屬連結</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製專屬連結</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={shareToFacebook}
                className="px-2 py-2 rounded-lg text-xs font-medium border border-blue-600/30 bg-blue-600/10 text-blue-700 dark:text-blue-300 hover:bg-blue-600/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                title="分享至 Facebook"
              >
                <span>FB 分享</span>
              </button>
              <button
                onClick={shareToLine}
                className="px-2 py-2 rounded-lg text-xs font-medium border border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                title="分享至 LINE"
              >
                <span>LINE 傳送</span>
              </button>
              <button
                onClick={shareToThreads}
                className="px-2 py-2 rounded-lg text-xs font-medium border border-neutral-700/30 bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-500/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                title="發布至 Threads"
              >
                <span>Threads</span>
              </button>
              <button
                onClick={shareToTwitter}
                className="px-2 py-2 rounded-lg text-xs font-medium border border-sky-600/30 bg-sky-600/10 text-sky-700 dark:text-sky-300 hover:bg-sky-600/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                title="分享至 X (Twitter)"
              >
                <span>X / 推特</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-5 py-3 bg-neutral-50 dark:bg-[#13171d] border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span>支援貼上任何條目連結即時解析標題與簡介 · 拒絕AI假圖</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs text-neutral-600 dark:text-neutral-300 hover:underline cursor-pointer"
          >
            完成關閉
          </button>
        </div>
      </div>
    </div>
  );
}
