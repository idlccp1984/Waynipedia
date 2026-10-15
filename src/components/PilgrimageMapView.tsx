import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Compass,
  Sparkles,
  Search,
  ArrowRight,
  Share2,
  Check,
  Copy,
  Layers,
  Calendar,
  AlertCircle,
  Building,
  Flag,
  Dices,
  Shuffle,
} from 'lucide-react';
import { pilgrimageSpots, PilgrimageSpot } from '../data/pilgrimageSpots';
import { articles } from '../data/articles';
import { getGoogleAiSummaryUrl, buildAiPrompt } from '../utils/aiSummary';

interface PilgrimageMapViewProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  initialSpotId?: string;
}

export function PilgrimageMapView({
  onSelectArticle,
  onNavigateHome,
  initialSpotId,
}: PilgrimageMapViewProps) {
  const [selectedSpotId, setSelectedSpotId] = useState<string>(
    initialSpotId || pilgrimageSpots[0].id
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapDisplayMode, setMapDisplayMode] = useState<'google-embed' | 'radar-overview'>('google-embed');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [randomToast, setRandomToast] = useState<string | null>(null);
  const [isRandomRolling, setIsRandomRolling] = useState<boolean>(false);

  const selectedSpot = useMemo(() => {
    return pilgrimageSpots.find((s) => s.id === selectedSpotId) || pilgrimageSpots[0];
  }, [selectedSpotId]);

  const relatedArticle = useMemo(() => {
    return articles.find((a) => a.id === selectedSpot.articleId);
  }, [selectedSpot.articleId]);

  const districts = useMemo(() => {
    const list = Array.from(new Set(pilgrimageSpots.map((s) => s.district)));
    return ['all', ...list];
  }, []);

  const categories = useMemo(() => {
    const list = Array.from(new Set(pilgrimageSpots.map((s) => s.category)));
    return ['all', ...list];
  }, []);

  const filteredSpots = useMemo(() => {
    return pilgrimageSpots.filter((s) => {
      const matchCat = filterCategory === 'all' || s.category === filterCategory;
      const matchDist = filterDistrict === 'all' || s.district === filterDistrict;
      const matchSearch =
        !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.headline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchDist && matchSearch;
    });
  }, [filterCategory, filterDistrict, searchQuery]);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleShareSpot = () => {
    const url = `${window.location.origin}/#/map?spot=${selectedSpot.id}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <button
          onClick={onNavigateHome}
          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>← 返回首頁</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-neutral-600 dark:text-neutral-300">
            GOOGLE MAPS PILGRIMAGE GUIDE · 全站收錄 {pilgrimageSpots.length} 大爭議聖地
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>台北市政實體聖地巡禮地圖</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
            萬安市政朝聖地圖 🗺️
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            透過 Google 地圖即時定位與衛星實景，全面展示台北大巨蛋、和平新生天橋、基泰大直塌陷案、艋舺龍山寺丟甘蔗等重大工程、時事風波與迷因現場，供各界市民與文史考證者親臨朝聖勘查。
          </p>
        </div>

        {/* Global Summary Stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white dark:bg-[#15191f] border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 text-center shadow-xs">
            <div className="text-xl sm:text-2xl font-serif font-bold text-blue-600 dark:text-blue-400">
              {pilgrimageSpots.length}
            </div>
            <div className="text-[11px] text-neutral-500 font-mono">收錄朝聖點位</div>
          </div>
          <div className="bg-white dark:bg-[#15191f] border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 text-center shadow-xs">
            <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400">
              {districts.length - 1}
            </div>
            <div className="text-[11px] text-neutral-500 font-mono">覆蓋行政轄區</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#15191f] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋聖地名稱、地址、大巨蛋、甘蔗、公館吸菸區..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-[#1a2028] border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
              >
                清除
              </button>
            )}
          </div>

          {/* District Select Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-neutral-500 font-medium mr-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-neutral-400" />
              <span>行政區：</span>
            </span>
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setFilterDistrict(d)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  filterDistrict === d
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {d === 'all' ? '全部轄區' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          <span className="text-neutral-500 font-medium mr-1 flex items-center gap-1">
            <Flag className="w-3.5 h-3.5 text-neutral-400" />
            <span>事件類別：</span>
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer border ${
                filterCategory === c
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                  : 'bg-white dark:bg-[#1a2028] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
              }`}
            >
              {c === 'all' ? '全部聖地類別' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage: Map View + Spot Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Stage (Cols 7): Google Map Embed & Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-[#15191f] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-lg">
            {/* Map Top Bar */}
            <div className="px-4 py-3 bg-neutral-50 dark:bg-[#1a2028] border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedSpot.icon}</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-xs sm:max-w-sm">
                    {selectedSpot.name}
                  </h3>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    {selectedSpot.district} · {selectedSpot.coordinates.lat.toFixed(4)},{' '}
                    {selectedSpot.coordinates.lng.toFixed(4)}
                  </div>
                </div>
              </div>

              {/* View Mode Toggle Button */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setMapDisplayMode('google-embed')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    mapDisplayMode === 'google-embed'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>Google 地圖實景</span>
                </button>
                <button
                  onClick={() => setMapDisplayMode('radar-overview')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    mapDisplayMode === 'radar-overview'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300'
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  <span>全台北點位雷達</span>
                </button>
              </div>
            </div>

            {/* Map Content Area */}
            {mapDisplayMode === 'google-embed' ? (
              <div className="relative aspect-4/3 sm:aspect-16/10 w-full bg-neutral-100 dark:bg-[#0f1318]">
                <iframe
                  key={selectedSpot.id}
                  title={`Google Map - ${selectedSpot.name}`}
                  src={selectedSpot.googleEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full block"
                />

                {/* Overlaid Floating Badge */}
                <div className="absolute bottom-3 left-3 z-10 bg-white/95 dark:bg-[#12161b]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-md text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Google 地圖即時定位中
                  </span>
                  <a
                    href={selectedSpot.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>全螢幕開啟</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ) : (
              /* Radar Overview Canvas: interactive Taipei map radar with plotted points */
              <div className="relative aspect-4/3 sm:aspect-16/10 w-full bg-gradient-to-br from-[#121822] via-[#0d121a] to-[#080b10] p-4 flex flex-col justify-between overflow-hidden select-none">
                {/* Background Grid & Compass lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/10 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/10 pointer-events-none" />

                {/* Top Radar Legend */}
                <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-amber-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>TAIPEI INCIDENTS RADAR · 台北市行政區分佈總覽</span>
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    點擊各點位即時載入 Google 地圖
                  </span>
                </div>

                {/* Plotted Interactive Spots */}
                <div className="relative z-10 flex-1 my-3 flex flex-wrap items-center justify-center gap-2 p-2 overflow-y-auto max-h-[300px]">
                  {pilgrimageSpots.map((spot) => {
                    const isSelected = spot.id === selectedSpot.id;
                    return (
                      <button
                        key={spot.id}
                        onClick={() => {
                          setSelectedSpotId(spot.id);
                          setMapDisplayMode('google-embed');
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-lg scale-105 z-20 ring-2 ring-blue-300'
                            : 'bg-neutral-800/80 hover:bg-neutral-700/90 text-neutral-200 border-neutral-700/80 hover:scale-102 z-10'
                        }`}
                      >
                        <span className="text-sm">{spot.icon}</span>
                        <span className="truncate max-w-[130px]">{spot.name}</span>
                        <span className="text-[10px] font-mono opacity-70">[{spot.district}]</span>
                      </button>
                    );
                  })}
                </div>

                {/* Radar Bottom Bar */}
                <div className="relative z-10 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>坐標範圍：北緯 25.01° ~ 25.12° · 東經 121.49° ~ 121.61°</span>
                  <button
                    onClick={() => setMapDisplayMode('google-embed')}
                    className="text-blue-400 hover:text-blue-300 underline font-sans font-semibold cursor-pointer"
                  >
                    查看此點 Google 實景 →
                  </button>
                </div>
              </div>
            )}

            {/* Map Action Buttons Bottom Bar */}
            <div className="p-3.5 bg-neutral-50 dark:bg-[#1a2028] border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={selectedSpot.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="在官方 Google 地圖中開啟此地點"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>在 Google 地圖中開啟</span>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>

                <a
                  href={selectedSpot.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="使用 Google 地圖規劃前往此地點之導航路線"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google 導航朝聖路線</span>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>

                <button
                  onClick={() => handleCopyAddress(selectedSpot.address)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">地址已複製</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>複製實體地址</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleShareSpot}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                title="複製此朝聖景點之專屬分享網址"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">景點網址已複製</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>分享此景點</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Stage (Cols 5): Selected Spot Dossier & Article Action */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#15191f] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-5">
            {/* Header / Category / District */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${selectedSpot.categoryColor}`}
                >
                  【{selectedSpot.category}】
                </span>
                <span className="text-xs font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded">
                  發生時間：{selectedSpot.incidentDate}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl">{selectedSpot.icon}</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                  {selectedSpot.name}
                </h2>
              </div>

              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-1.5 bg-neutral-50 dark:bg-[#1a2028] p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/80">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed select-all font-mono text-[11px]">
                  {selectedSpot.address}
                </span>
              </div>
            </div>

            {/* Event Headline */}
            <div className="text-xs sm:text-sm font-serif font-semibold text-neutral-800 dark:text-neutral-200 border-l-2 border-blue-600 pl-3 leading-snug">
              {selectedSpot.headline}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              {selectedSpot.description}
            </p>

            {/* Pilgrimage Guide Box (朝聖看點與指南) */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 font-serif">
                <span>🌟</span>
                <span>朝聖現場指南與看點推薦：</span>
              </div>
              <p className="text-xs text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
                {selectedSpot.pilgrimageTip}
              </p>
            </div>

            {/* Actions: View Article & Google AI Summary */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5">
              {/* Primary Article Link */}
              {relatedArticle && (
                <button
                  onClick={() => onSelectArticle(relatedArticle.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer shadow-md group"
                >
                  <span className="flex items-center gap-2">
                    <span>📖</span>
                    <span>閱讀百科完整條目：《{relatedArticle.title}》</span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {/* Google AI Summary with requested text: 「如果你覺得內容不完整你可以查看AI摘要」 */}
              <a
                href={getGoogleAiSummaryUrl(
                  relatedArticle ? relatedArticle.title : selectedSpot.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer shadow-md group"
                title={`前往 Google AI 摘要：${buildAiPrompt(
                  relatedArticle ? relatedArticle.title : selectedSpot.name
                )}`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0 group-hover:rotate-12 transition-transform" />
                  <span className="truncate">如果你覺得內容不完整你可以查看AI摘要</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/80 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pilgrimage Spot Directory Cards */}
      <div className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>全站朝聖景點目錄（點選切換地圖即時定位）</span>
            <span className="text-xs font-mono font-normal text-neutral-400">
              ({filteredSpots.length} 個點位)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredSpots.map((spot) => {
            const isSelected = spot.id === selectedSpot.id;
            return (
              <div
                key={spot.id}
                onClick={() => {
                  setSelectedSpotId(spot.id);
                  setMapDisplayMode('google-embed');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                    : 'bg-white dark:bg-[#15191f] border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                      {spot.district}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold border ${spot.categoryColor}`}
                    >
                      {spot.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xl shrink-0">{spot.icon}</span>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      {spot.name}
                    </h4>
                  </div>

                  <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {spot.headline}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>查看地圖實景</span>
                  </span>
                  <a
                    href={spot.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-500 hover:text-emerald-600 flex items-center gap-0.5"
                    title="在 Google 地圖規劃路線"
                  >
                    <span>導航</span>
                    <Navigation className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
