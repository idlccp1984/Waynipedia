export interface SeoOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}

export function updateDocumentSeo({
  title,
  description,
  url,
  image = '/og-preview.jpg',
  type = 'website',
  publishedTime,
}: SeoOptions) {
  const baseTitle = 'Waynipedia 蔣萬安百科';
  const fullTitle = title ? `${title} – ${baseTitle}` : `${baseTitle} – 自由的市政與時事百科全書`;
  const metaDesc =
    description ||
    '收錄台北市長蔣萬安相關市政決策、爭議事件、選舉攻防、議題專欄與網路迷因之現代化百科全書，支援全日期歷史上的今天時間軸、3D實體書庫與 Markdown 深度閱讀。';

  document.title = fullTitle;

  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'description', metaDesc);
  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', metaDesc);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:image:secure_url', image);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', metaDesc);
  setMeta('name', 'twitter:image', image);

  if (url) {
    setMeta('property', 'og:url', url);
  }

  const scriptId = 'dynamic-seo-jsonld';
  let jsonLdScript = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = scriptId;
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  const structuredData =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: metaDesc,
          image: image,
          datePublished: publishedTime,
          inLanguage: 'zh-TW',
          publisher: {
            '@type': 'Organization',
            name: baseTitle,
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: fullTitle,
          description: metaDesc,
          image: image,
          inLanguage: 'zh-TW',
        };

  jsonLdScript.textContent = JSON.stringify(structuredData);
}
