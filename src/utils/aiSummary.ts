/**
 * 產生前往 Google AI 摘要（Google AI Overview / udm=50）之查詢指令與網址
 *
 * 最新標準命令規格：
 * 「請直接以維基百科格式與中立口吻撰寫關於蔣萬安的{{}}條目。禁止輸出任何開頭介紹、結尾問候或後續建議，直接從條目導言開始輸出。」
 */

export const EXACT_QUIZ_AI_SUMMARY_URL =
  'https://www.google.com/search?q=%E7%94%A8%E7%99%BE%E7%A7%91%E5%8F%A3%E5%90%BB%E4%BB%8B%E7%B4%B9+%E3%80%8C%E4%BD%A0%E7%9F%A5%E9%81%93%E8%A8%98%E8%80%85%E5%89%9B%E5%89%9B%E5%95%8F%E8%94%A3%E8%90%AC%E5%AE%89%E4%BB%80%E9%BA%BC%E5%97%8E%EF%BC%9F%E3%80%8D+%E7%AC%A6%E5%90%88%E7%B6%AD%E5%9F%BA%E7%99%BE%E7%A7%91%E8%A6%8F%E5%AE%9A%E5%8F%8A%E6%A0%BC%E5%BC%8F&sca_esv=95a3924c91beb42b&sxsrf=APpeQnvXB3sfEq9rQ7vq08pLHHCqcePvFQ%3A1791882082329&udm=50&fbs=ABfTbFUhNGvvPEUFOvrsPMHwBXgOYHJZj29gqXMhi2lMTv7-fBMA_cGFs8sakPw1LXgYR_qJeKVLgIFR09XE-QIsQQ6zI6ibWH2wn-1SSbgHcMkS9GZ3kdVCuVu5afXA8w1h4crKTzImLq47uRk4XV5klIdgRhxBSYZNBUQl3rPKKEOOR_3pTLVIh9ZyayQU6cBkvdPx4Hbu&vsint=&aep=1&ntc=1&cs=1&sa=X&ved=2ahUKEwjSifz30LaXAxWkg68BHWEVMMEQ2J8OegQIExAD&biw=1180&bih=688&dpr=2&mstk=AUtExfBzFmfhnAt960itXv8CXKdvaDPiN4qJqyaKDxbf4647l_LEUyFmop6X3bDNu10nY9k2LPfTDT9UhQgu4ihnENVYcjuhc-88JL3_lOKHzyWAGHPw-slz87ERT90DwTtZrjJQ5paLwQEjp5CjQR00Ynn0JnV77EuwmCo3kQ9sysMAcm_VDoZtOud2yGaCkSUG3jtA3oNIQUA0386TJSmtJ_B9mTmlP-sXWN3EdEje4D2sdD_vStpHpLS_jQ&csuir=1';

/**
 * 清除標題外圍包裹之引號或書名號
 */
export function cleanArticleTitle(title: string): string {
  let clean = (title || '').trim();
  if (
    (clean.startsWith('「') && clean.endsWith('」')) ||
    (clean.startsWith('『') && clean.endsWith('』')) ||
    (clean.startsWith('《') && clean.endsWith('》')) ||
    (clean.startsWith('“') && clean.endsWith('”')) ||
    (clean.startsWith('"') && clean.endsWith('"')) ||
    (clean.startsWith("'") && clean.endsWith("'"))
  ) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
}

/**
 * 建構最新維基百科規格與中立口吻之 Google AI 摘要命令句：
 * 「請直接以維基百科格式與中立口吻撰寫關於蔣萬安的{{}}條目。禁止輸出任何開頭介紹、結尾問候或後續建議，直接從條目導言開始輸出。」
 */
export function buildAiPrompt(title: string): string {
  const clean = cleanArticleTitle(title) || '蔣萬安';
  return `請直接以維基百科格式與中立口吻撰寫關於蔣萬安的${clean}條目。禁止輸出任何開頭介紹、結尾問候或後續建議，直接從條目導言開始輸出。`;
}

/**
 * 產生前往 Google AI 摘要（Google AI Overview / udm=50）之完整查詢網址
 */
export function getGoogleAiSummaryUrl(title: string): string {
  if (!title) return 'https://www.google.com/search?udm=50';

  const prompt = buildAiPrompt(title);
  return `https://www.google.com/search?q=${encodeURIComponent(prompt)}&udm=50&aep=1`;
}
