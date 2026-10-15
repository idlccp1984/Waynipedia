import React, { useState, useRef } from 'react';
import { X, Download, Palette, Check, Sparkles, Share2, Layers } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
}

export type CardThemeStyle = 'navy' | 'classic' | 'parchment' | 'cyber';

interface StyleConfig {
  id: CardThemeStyle;
  name: string;
  bgGradient: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  titleColor: string;
  excerptColor: string;
  accentColor: string;
  canvasBg: string;
  canvasCardBg: string;
  canvasTextColor: string;
  canvasTitleColor: string;
  canvasAccentColor: string;
  canvasBorderColor: string;
}

const STYLES: StyleConfig[] = [
  {
    id: 'navy',
    name: '👔 萬安深藍政經風',
    bgGradient: 'from-[#081329] via-[#0d1e3d] to-[#040914]',
    cardBorder: 'border-blue-500/40',
    badgeBg: 'bg-blue-500/20 border-blue-400/40',
    badgeText: 'text-blue-300',
    titleColor: 'text-white',
    excerptColor: 'text-blue-100/90',
    accentColor: '#38bdf8',
    canvasBg: '#050b17',
    canvasCardBg: '#0c1b38',
    canvasTextColor: '#bae6fd',
    canvasTitleColor: '#ffffff',
    canvasAccentColor: '#38bdf8',
    canvasBorderColor: '#1d4ed8',
  },
  {
    id: 'classic',
    name: '🏛️ 經典維基典藏風',
    bgGradient: 'from-[#fbfaf8] via-[#f5f2eb] to-[#ece7dc]',
    cardBorder: 'border-[#a29b8b]',
    badgeBg: 'bg-neutral-800 text-white border-neutral-900',
    badgeText: 'text-white',
    titleColor: 'text-neutral-900',
    excerptColor: 'text-neutral-700',
    accentColor: '#1e293b',
    canvasBg: '#f0ece3',
    canvasCardBg: '#faf8f5',
    canvasTextColor: '#334155',
    canvasTitleColor: '#0f172a',
    canvasAccentColor: '#0284c7',
    canvasBorderColor: '#cbd5e1',
  },
  {
    id: 'parchment',
    name: '📰 復古迷因公報風',
    bgGradient: 'from-[#2e1d10] via-[#3d2716] to-[#1c1109]',
    cardBorder: 'border-amber-500/50',
    badgeBg: 'bg-amber-500/20 border-amber-400/40',
    badgeText: 'text-amber-300',
    titleColor: 'text-amber-100',
    excerptColor: 'text-amber-200/90',
    accentColor: '#f59e0b',
    canvasBg: '#1f130a',
    canvasCardBg: '#2c1a0f',
    canvasTextColor: '#fde68a',
    canvasTitleColor: '#fef3c7',
    canvasAccentColor: '#f59e0b',
    canvasBorderColor: '#b45309',
  },
  {
    id: 'cyber',
    name: '🖤 極簡科技黑曜風',
    bgGradient: 'from-[#0a0d12] via-[#12161f] to-[#05070a]',
    cardBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/40',
    badgeText: 'text-emerald-300',
    titleColor: 'text-white',
    excerptColor: 'text-emerald-100/80',
    accentColor: '#10b981',
    canvasBg: '#05070a',
    canvasCardBg: '#0f141c',
    canvasTextColor: '#a7f3d0',
    canvasTitleColor: '#ffffff',
    canvasAccentColor: '#10b981',
    canvasBorderColor: '#047857',
  },
];

export function ArticleCardModal({ isOpen, onClose, article }: ArticleCardModalProps) {
  const [selectedStyleId, setSelectedStyleId] = useState<CardThemeStyle>('navy');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const cardPreviewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentStyle = STYLES.find((s) => s.id === selectedStyleId) || STYLES[0];

  const handleDownloadCard = () => {
    setIsGenerating(true);
    try {
      const width = aspectRatio === '16:9' ? 1200 : 1080;
      const height = aspectRatio === '16:9' ? 675 : 1080;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setIsGenerating(false);
        return;
      }

      // 1. Background
      ctx.fillStyle = currentStyle.canvasBg;
      ctx.fillRect(0, 0, width, height);

      // Gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, currentStyle.canvasCardBg);
      gradient.addColorStop(1, currentStyle.canvasBg);
      ctx.fillStyle = gradient;
      ctx.fillRect(24, 24, width - 48, height - 48);

      // Card border
      ctx.strokeStyle = currentStyle.canvasBorderColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 24, width - 48, height - 48);

      // Inner subtle border
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      // 2. Corner filigree ornaments
      const cornerSize = 20;
      ctx.strokeStyle = currentStyle.canvasAccentColor;
      ctx.lineWidth = 3;
      // Top-left
      ctx.beginPath();
      ctx.moveTo(36, 36 + cornerSize);
      ctx.lineTo(36, 36);
      ctx.lineTo(36 + cornerSize, 36);
      ctx.stroke();
      // Top-right
      ctx.beginPath();
      ctx.moveTo(width - 36 - cornerSize, 36);
      ctx.lineTo(width - 36, 36);
      ctx.lineTo(width - 36, 36 + cornerSize);
      ctx.stroke();
      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(36, height - 36 - cornerSize);
      ctx.lineTo(36, height - 36);
      ctx.lineTo(36 + cornerSize, height - 36);
      ctx.stroke();
      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(width - 36 - cornerSize, height - 36);
      ctx.lineTo(width - 36, height - 36);
      ctx.lineTo(width - 36, height - 36 - cornerSize);
      ctx.stroke();

      // 3. Header text
      ctx.fillStyle = currentStyle.canvasAccentColor;
      ctx.font = 'bold 24px "Noto Serif TC", serif';
      ctx.fillText('WAYNIPEDIA · 蔣萬安百科 自由的市政百科全書', 64, 88);

      ctx.fillStyle = currentStyle.canvasTextColor;
      ctx.font = '600 20px monospace';
      ctx.fillText(`分類：${article.category}  |  記錄日期：${article.date}`, 64, 124);

      // Divider
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(64, 146);
      ctx.lineTo(width - 64, 146);
      ctx.stroke();

      // 4. Large Icon + Title
      ctx.font = '72px sans-serif';
      ctx.fillText(article.icon || '📄', 64, 250);

      ctx.fillStyle = currentStyle.canvasTitleColor;
      ctx.font = 'bold 54px "Noto Serif TC", serif';

      // Title line wrap
      const maxTitleWidth = width - 200;
      const titleWords = article.title;
      let titleLine = '';
      let titleY = 240;

      for (let i = 0; i < titleWords.length; i++) {
        const testLine = titleLine + titleWords[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTitleWidth && i > 0) {
          ctx.fillText(titleLine, 170, titleY);
          titleLine = titleWords[i];
          titleY += 68;
        } else {
          titleLine = testLine;
        }
      }
      ctx.fillText(titleLine, 170, titleY);

      // 5. Excerpt Box
      const excerptY = titleY + 60;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(64, excerptY, width - 128, height - excerptY - 140);

      ctx.strokeStyle = currentStyle.canvasBorderColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(64, excerptY, width - 128, height - excerptY - 140);

      ctx.fillStyle = currentStyle.canvasTextColor;
      ctx.font = 'italic 28px "Noto Serif TC", serif';
      const excerptText = `「${article.excerpt}」`;
      const maxExcerptWidth = width - 180;
      let currentExcerptLine = '';
      let textY = excerptY + 54;

      for (let i = 0; i < excerptText.length; i++) {
        const testLine = currentExcerptLine + excerptText[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxExcerptWidth && i > 0) {
          ctx.fillText(currentExcerptLine, 96, textY);
          currentExcerptLine = excerptText[i];
          textY += 44;
          if (textY > height - 160) break;
        } else {
          currentExcerptLine = testLine;
        }
      }
      if (textY <= height - 160) {
        ctx.fillText(currentExcerptLine, 96, textY);
      }

      // 6. Footer Branding
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.moveTo(64, height - 90);
      ctx.lineTo(width - 64, height - 90);
      ctx.stroke();

      ctx.fillStyle = currentStyle.canvasAccentColor;
      ctx.font = 'bold 20px monospace';
      ctx.fillText('|||| | ||| |||| | |||| || 條目識別：WAYNI-' + article.id.toUpperCase(), 64, height - 52);

      ctx.fillStyle = currentStyle.canvasTextColor;
      ctx.font = '600 20px "Noto Serif TC", serif';
      const rightText = 'waynipedia.tw · 數位客觀市政資料庫';
      const rMetrics = ctx.measureText(rightText);
      ctx.fillText(rightText, width - 64 - rMetrics.width, height - 52);

      // 7. Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `waynipedia-${article.id}-card.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to generate card', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#14181d] border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                條目知識圖卡生成器
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                自由選擇 4 款專屬設計風格，1-Click 下載高畫質社群分享圖卡 (PNG)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Controls: Styles and Format */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            {/* Style Choices */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>圖卡風格切換：</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStyleId(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      selectedStyleId === st.id
                        ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold border-neutral-900 shadow-xs ring-1 ring-neutral-400'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Format toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>畫幅比例：</span>
              </label>
              <div className="inline-flex rounded-lg border border-neutral-300 dark:border-neutral-700 p-0.5 bg-neutral-100 dark:bg-neutral-800 text-xs">
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                    aspectRatio === '16:9'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  橫式 16:9 (社群)
                </button>
                <button
                  onClick={() => setAspectRatio('1:1')}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                    aspectRatio === '1:1'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  正方形 1:1 (IG/貼文)
                </button>
              </div>
            </div>
          </div>

          {/* Live Card Preview */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center justify-between">
              <span>圖卡即時渲染預覽：</span>
              <span className="font-mono text-[11px] text-neutral-400">
                {aspectRatio === '16:9' ? '1200 × 675 px' : '1080 × 1080 px'}
              </span>
            </div>

            <div
              ref={cardPreviewRef}
              className={`relative rounded-xl overflow-hidden border-2 shadow-xl p-5 sm:p-7 flex flex-col justify-between transition-all bg-gradient-to-br ${
                currentStyle.bgGradient
              } ${currentStyle.cardBorder} ${
                aspectRatio === '16:9' ? 'aspect-video' : 'aspect-square max-w-md mx-auto'
              }`}
            >
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-current opacity-40" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-current opacity-40" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-current opacity-40" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-current opacity-40" />

              {/* Watermark Logo */}
              <div className="absolute right-4 bottom-4 text-7xl sm:text-8xl font-serif font-black opacity-5 pointer-events-none select-none tracking-tighter">
                WAYNI
              </div>

              {/* Card Top */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-current/15 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-xs bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-serif font-black flex items-center justify-center text-[11px]">
                    W
                  </div>
                  <span className="font-serif font-bold tracking-wider opacity-90">
                    Waynipedia 蔣萬安百科
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${currentStyle.badgeBg} ${currentStyle.badgeText}`}>
                    {article.category}
                  </span>
                  <span className="text-[10px] opacity-70 font-mono hidden xs:inline">{article.date}</span>
                </div>
              </div>

              {/* Card Center: Icon & Title & Excerpt */}
              <div className="relative z-10 my-auto py-3 space-y-3">
                <div className="flex items-start gap-3.5">
                  <span className="text-3xl sm:text-4xl shrink-0 p-2 rounded-xl bg-current/10">
                    {article.icon}
                  </span>
                  <div>
                    <h2 className={`font-serif font-black text-lg sm:text-2xl md:text-3xl tracking-tight leading-tight ${currentStyle.titleColor}`}>
                      {article.title}
                    </h2>
                    <p className={`mt-2 text-xs sm:text-sm font-serif leading-relaxed line-clamp-3 sm:line-clamp-4 italic ${currentStyle.excerptColor}`}>
                      「{article.excerpt}」
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Bottom */}
              <div className="relative z-10 pt-3 border-t border-current/15 flex items-center justify-between text-[10px] font-mono opacity-80">
                <div className="flex items-center gap-2">
                  <span className="tracking-widest">||| |||| | || |||</span>
                  <span className="hidden sm:inline">條目ID: WAYNI-{article.id.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>waynipedia.tw · 自由公共百科</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-5 py-3.5 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-900/60">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>高解析度 2x 繪製，適合發布於 Threads、Facebook、LINE 及 Instagram</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              關閉
            </button>

            <button
              onClick={handleDownloadCard}
              disabled={isGenerating}
              className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>已完成下載！</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isGenerating ? '生成圖片中...' : '下載條目圖卡 (PNG)'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
