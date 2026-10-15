import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PortalHome } from './components/PortalHome';
import { ColumnsView } from './components/ColumnsView';
import { BooksView } from './components/BooksView';
import { CardsView } from './components/CardsView';
import { HistoryTimeline } from './components/HistoryTimeline';
import { ArticleView } from './components/ArticleView';
import { DykView } from './components/DykView';
import { NumbersView } from './components/NumbersView';
import { QuizView } from './components/QuizView';
import { ExternalLinksView } from './components/ExternalLinksView';
import { WanAnOdditiesView } from './components/WanAnOdditiesView';
import { SearchResultsView } from './components/SearchResultsView';
import { PilgrimageMapView } from './components/PilgrimageMapView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { AboutView } from './components/AboutView';
import { SocialShareModal } from './components/SocialShareModal';
import { Footer } from './components/Footer';
import { articles } from './data/articles';
import { updateDocumentSeo } from './utils/seo';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('chiang');
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [selectedSpotId, setSelectedSpotId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizInitialMode, setQuizInitialMode] = useState<'blind' | 'fact'>('blind');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('waynipedia-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Dark mode effect on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('waynipedia-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('waynipedia-theme', 'light');
    }
  }, [darkMode]);

  // Hash-based client router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      window.scrollTo(0, 0);

      if (!hash || hash === '') {
        const queryParams = new URLSearchParams(window.location.search);
        const queryArtId = queryParams.get('article') || queryParams.get('id');
        if (queryArtId) {
          const target = articles.find((a) => a.id === queryArtId);
          if (target) {
            setSelectedArticleId(target.id);
            setCurrentRoute('article');
            updateDocumentSeo({
              title: target.title,
              description: target.excerpt,
              type: 'article',
            });
            return;
          }
        }

        setCurrentRoute('home');
        updateDocumentSeo({
          title: '首頁',
          description:
            '收錄台北市長蔣萬安相關市政、選舉、議題專欄、歷史上的今天與書籍卡牌典藏之現代化百科全書。',
          type: 'website',
        });
        return;
      }

      if (hash === 'columns' || hash.startsWith('columns?') || hash.startsWith('columns/')) {
        let colId = '';
        if (hash.includes('?')) {
          const params = new URLSearchParams(hash.substring(hash.indexOf('?') + 1));
          colId = params.get('id') || params.get('column') || '';
        } else if (hash.includes('/')) {
          colId = hash.split('/')[1] || '';
        }
        setSelectedColumnId(colId);
        setCurrentRoute('columns');
        updateDocumentSeo({
          title: '議題專欄特刊 – 6 大核心議題深入脈絡',
          description:
            '從重大工程、兒少教育、選戰攻防到身世人物檢驗與社群迷因，以主題專欄模式彙整閱讀動線。',
          type: 'website',
        });
        return;
      }

      // About page (關於本站)
      if (
        hash === 'about' ||
        hash === 'about-us' ||
        hash === 'intro' ||
        hash === 'statement' ||
        hash.startsWith('about?')
      ) {
        setCurrentRoute('about');
        updateDocumentSeo({
          title: '關於 Waynipedia · 萬安百科 – 自由的市政百科全書',
          description:
            '認識 Waynipedia 萬安百科之創立緣起、維基三大編輯原則（NPOV/可查證/非原創）與數位特色功能矩陣。',
          type: 'website',
        });
        return;
      }

      if (hash === 'books') {
        setCurrentRoute('books');
        updateDocumentSeo({
          title: `3D 典藏書庫專頁 – 全站 ${articles.length} 卷完整雙面精裝書`,
          description:
            '全站所有條目以 3D 精裝實體書本風格呈現，具備完整前面書名、書脊與封底摘要，支援 180° 翻轉與翻頁閱讀。',
          type: 'website',
        });
        return;
      }

      if (hash === 'cards') {
        setCurrentRoute('cards');
        updateDocumentSeo({
          title: '歷史卡牌典藏專頁 – 全息事件卡牌',
          description:
            `全站 ${articles.length} 篇核心條目化為精裝收藏卡牌，支援卡面全息光澤、翻轉閱覽背面精華與分類檢索。`,
          type: 'website',
        });
        return;
      }

      if (hash === 'history' || hash.startsWith('history')) {
        setCurrentRoute('history');
        updateDocumentSeo({
          title: '歷史上的今天 – 全年事件檔案時間軸',
          description:
            '完整列出全年所有收錄之重大歷史事件與市政決策記錄，依月份與日期時間軸呈現，支援即時關鍵字過濾與 Markdown 預覽。',
          type: 'website',
        });
        return;
      }

      if (hash === 'dyk') {
        setCurrentRoute('dyk');
        updateDocumentSeo({
          title: '你知道嗎 – 趣味事蹟與冷知識',
          description:
            '精選台北市政與時事焦點之 42 則關鍵事蹟與趣味冷知識，包含大巨蛋、遮陽傘與社群熱搜紀錄。',
          type: 'website',
        });
        return;
      }

      if (hash === 'numbers') {
        setCurrentRoute('numbers');
        updateDocumentSeo({
          title: '數字會說話 – 關鍵數據檔案',
          description:
            '精選台北市政與時事爭議之 32 大關鍵量化數字，涵蓋預算公帑、觀眾人次、留言紀錄與工程數據。',
          type: 'website',
        });
        return;
      }

      // Dedicated interactive quiz arena (盲測大考驗 / 時事題庫競技場)
      if (
        hash === 'blind-quiz' ||
        hash === 'vote-quiz' ||
        hash === 'blind-vote' ||
        hash === 'vote' ||
        hash.startsWith('blind-quiz') ||
        hash === 'quiz-arena' ||
        hash === 'quiz-test' ||
        hash === 'quiz-game' ||
        hash === 'fact-quiz'
      ) {
        if (hash === 'fact-quiz' || hash.includes('mode=fact')) {
          setQuizInitialMode('fact');
        } else {
          setQuizInitialMode('blind');
        }
        setCurrentRoute('quiz-arena');
        updateDocumentSeo({
          title: hash.includes('fact')
            ? '時事百科知識競技場 – 35 題市政決策題庫'
            : '盲測大考驗：不看姓名，你會不會選蔣萬安？ – 萬安百科',
          description:
            '遮蔽候選人姓名與照片，純憑真實施政風格與迷因共鳴作答！測測看你骨子裡到底會不會投給蔣萬安？另備有時事百科記憶題庫。',
          type: 'website',
        });
        return;
      }

      // External links dedicated page
      if (hash === 'links' || hash === 'external-links' || hash === 'tools') {
        setCurrentRoute('links');
        updateDocumentSeo({
          title: '外部精選連結專頁 🔗 – 回應產生器、蔣出來遊戲與心動彈幕',
          description:
            '彙整民間各大公共時事熱門互動工具：包含「你知道記者剛剛問蔣萬安什麼嗎」、「蔣萬安回應產生器」、「蔣出來」遊戲與考證主站、「台北心動彈幕」等精選推薦連結。',
          type: 'website',
        });
        return;
      }

      // Oddities dedicated page (萬安志異)
      if (
        hash === 'oddities' ||
        hash === 'wanan-oddities' ||
        hash === 'memes' ||
        hash === 'wanyi-oddities'
      ) {
        setCurrentRoute('oddities');
        updateDocumentSeo({
          title: '萬安志異 🏮 – 維基誌異特刊 · 迷因、空話金句與市政奇觀',
          description:
            '參考中文維基百科《維基誌異/辱包文化》體例，全面收錄火鍋市長一稿五用、萬安演習政治防護、水溝長山蘇、700萬雨傘、回應產生器等當代政治奇觀與社群迷因。',
          type: 'website',
        });
        return;
      }

      // Dedicated Pilgrimage Map Page (萬安市政朝聖地圖專頁)
      if (
        hash === 'map' ||
        hash.startsWith('map?') ||
        hash === 'pilgrimage' ||
        hash.startsWith('pilgrimage?') ||
        hash === 'spots' ||
        hash.startsWith('spots?')
      ) {
        let spotId = '';
        if (hash.includes('?')) {
          const params = new URLSearchParams(hash.substring(hash.indexOf('?') + 1));
          spotId = params.get('spot') || '';
        }
        setSelectedSpotId(spotId);
        setCurrentRoute('map');
        updateDocumentSeo({
          title: '萬安市政朝聖地圖 🗺️ – 台北重大工程與時事焦點 Google 地圖聖地巡禮',
          description:
            '以 Google 地圖即時定位與衛星實景，展示台北大巨蛋、和平新生天橋、基泰大直、龍山寺丟甘蔗等 18 大市政爭議與歷史發生地。',
          type: 'website',
        });
        return;
      }

      // Dedicated Knowledge Graph Page (市政決策關係圖 · D3 圖譜)
      if (
        hash === 'graph' ||
        hash === 'knowledge-graph' ||
        hash === 'relations' ||
        hash === 'relation-map'
      ) {
        setCurrentRoute('graph');
        updateDocumentSeo({
          title: '市政決策連動關係圖 🕸️ – D3 互動知識圖譜',
          description:
            '利用 D3.js 力導向圖呈現台北市政重大議題、重大工程、迷因語錄與蔣萬安市政決策之間的交互連動網絡。',
          type: 'website',
        });
        return;
      }

      // Search results page (類搜尋引擎檢索頁)
      if (hash === 'search' || hash.startsWith('search?') || hash.startsWith('search/')) {
        let q = '';
        if (hash.includes('?')) {
          const params = new URLSearchParams(hash.substring(hash.indexOf('?') + 1));
          q = params.get('q') || '';
        } else if (hash.startsWith('search/')) {
          q = decodeURIComponent(hash.substring(7));
        }
        setSearchQuery(q);
        setCurrentRoute('search');
        updateDocumentSeo({
          title: q ? `搜尋結果：${q} – 檢索百科條目` : '全站條目搜尋 – 檢索百科條目',
          description: `檢索台北市政檔案、重大工程、爭議風波與迷因金句，全站收錄 ${articles.length} 篇核心條目全文即時檢索。`,
          type: 'website',
        });
        return;
      }

      if (hash === 'random') {
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];
        window.location.hash = `#/${randomArticle.id}`;
        return;
      }

      // Check if hash matches an article ID (Note: hash 'quiz' will match quizArticle!
      // This solves: 「你知道記者剛剛問蔣萬安什麼」不是跳到問答頁面 是條目啦！)
      const targetArticle = articles.find((a) => a.id === hash);
      if (targetArticle) {
        setSelectedArticleId(targetArticle.id);
        setCurrentRoute('article');
        updateDocumentSeo({
          title: targetArticle.title,
          description: targetArticle.excerpt,
          type: 'article',
          publishedTime: targetArticle.date,
        });
      } else {
        // Fallback to home
        setCurrentRoute('home');
        updateDocumentSeo({});
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: string, param?: string) => {
    if (route === 'columns' && param) {
      setSelectedColumnId(param);
      window.location.hash = `#/columns?id=${param}`;
    } else {
      window.location.hash = `#/${route === 'home' ? '' : route}`;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectArticle = (articleId: string) => {
    window.location.hash = `#/${articleId}`;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const currentArticle = articles.find((a) => a.id === selectedArticleId) || articles[0];

  const handleRandomArticle = () => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomArt = articles[randomIndex];
    handleSelectArticle(randomArt.id);
  };

  const handleSearch = (query: string) => {
    const q = query.trim();
    setSearchQuery(q);
    window.location.hash = q ? `#/search?q=${encodeURIComponent(q)}` : '#/search';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-[#101418] text-[#202122] dark:text-[#eaecf0] transition-colors">
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
        onSelectArticle={handleSelectArticle}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onRandomArticle={handleRandomArticle}
        onOpenShare={() => setIsShareOpen(true)}
        onSearch={handleSearch}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onSelectArticle={handleSelectArticle}
        onRandomArticle={handleRandomArticle}
        onOpenShare={() => setIsShareOpen(true)}
      />

      <main className="flex-1">
        {currentRoute === 'home' && (
          <PortalHome
            onSelectArticle={handleSelectArticle}
            onNavigateHistory={() => handleNavigate('history')}
            onNavigateNumbers={() => handleNavigate('numbers')}
            onNavigateQuiz={() => handleNavigate('quiz-arena')}
            onNavigateDyk={() => handleNavigate('dyk')}
            onNavigateBooks={() => handleNavigate('books')}
            onNavigateCards={() => handleNavigate('cards')}
            onNavigateColumns={(colId) => handleNavigate('columns', colId)}
            onNavigateLinks={() => handleNavigate('links')}
            onNavigateOddities={() => handleNavigate('oddities')}
            onNavigateMap={() => handleNavigate('map')}
            onNavigateGraph={() => handleNavigate('graph')}
            onNavigateAbout={() => handleNavigate('about')}
            onRandomArticle={handleRandomArticle}
            onOpenShare={() => setIsShareOpen(true)}
            onSearch={handleSearch}
          />
        )}

        {currentRoute === 'columns' && (
          <ColumnsView
            initialColumnId={selectedColumnId}
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooks={() => handleNavigate('books')}
          />
        )}

        {currentRoute === 'books' && (
          <BooksView
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateCards={() => handleNavigate('cards')}
            onNavigateColumns={() => handleNavigate('columns')}
          />
        )}

        {currentRoute === 'cards' && (
          <CardsView
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooks={() => handleNavigate('books')}
            onNavigateColumns={() => handleNavigate('columns')}
          />
        )}

        {currentRoute === 'history' && (
          <HistoryTimeline onSelectArticle={handleSelectArticle} />
        )}

        {currentRoute === 'dyk' && (
          <DykView
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'numbers' && (
          <NumbersView
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'quiz-arena' && (
          <QuizView
            initialMode={quizInitialMode}
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'links' && (
          <ExternalLinksView
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooks={() => handleNavigate('books')}
            onNavigateColumns={() => handleNavigate('columns')}
          />
        )}

        {currentRoute === 'oddities' && (
          <WanAnOdditiesView
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooks={() => handleNavigate('books')}
            onNavigateLinks={() => handleNavigate('links')}
          />
        )}

        {currentRoute === 'map' && (
          <PilgrimageMapView
            initialSpotId={selectedSpotId}
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'graph' && (
          <KnowledgeGraphView
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'about' && (
          <AboutView
            onNavigateHome={() => handleNavigate('home')}
            onNavigateMap={() => handleNavigate('map')}
            onNavigateColumns={(colId) => handleNavigate('columns', colId)}
            onNavigateOddities={() => handleNavigate('oddities')}
            onNavigateBooks={() => handleNavigate('books')}
            onRandomArticle={handleRandomArticle}
          />
        )}

        {currentRoute === 'search' && (
          <SearchResultsView
            initialQuery={searchQuery}
            onSelectArticle={handleSelectArticle}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooks={() => handleNavigate('books')}
          />
        )}

        {currentRoute === 'article' && (
          <ArticleView
            article={currentArticle}
            onSelectArticle={handleSelectArticle}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenShare={() => setIsShareOpen(true)}
      />

      <SocialShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        currentArticle={currentRoute === 'article' ? currentArticle : undefined}
      />
    </div>
  );
}
