import React from 'react';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function extractTocHeadings(markdown: string, skipFirstH1 = true): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split('\n');
  let isFirstH1 = true;

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      if (level === 1 && skipFirstH1 && isFirstH1) {
        isFirstH1 = false;
        continue;
      }
      isFirstH1 = false;

      const rawText = match[2].trim();
      const cleanText = rawText.replace(/[*_`]/g, '');
      const id = cleanText
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');

      headings.push({
        id: id || `heading-${headings.length}`,
        text: cleanText,
        level,
      });
    }
  }

  return headings;
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/;

  while (remaining.length > 0) {
    const match = remaining.match(tokenRegex);
    if (!match || match.index === undefined) {
      nodes.push(remaining);
      break;
    }

    if (match.index > 0) {
      nodes.push(remaining.substring(0, match.index));
    }

    const matchedStr = match[0];
    if (matchedStr.startsWith('[')) {
      const linkText = match[2];
      const linkUrl = match[3];
      const isExternal = linkUrl.startsWith('http') || linkUrl.startsWith('//');
      nodes.push(
        <a
          key={`inline-link-${keyIndex++}`}
          href={linkUrl}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {linkText}
        </a>
      );
    } else if (matchedStr.startsWith('**')) {
      nodes.push(
        <strong key={`inline-bold-${keyIndex++}`} className="font-semibold text-neutral-900 dark:text-neutral-100">
          {match[4]}
        </strong>
      );
    } else if (matchedStr.startsWith('`')) {
      nodes.push(
        <code
          key={`inline-code-${keyIndex++}`}
          className="px-1.5 py-0.5 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded border border-neutral-200 dark:border-neutral-700"
        >
          {match[5]}
        </code>
      );
    } else if (matchedStr.startsWith('*')) {
      nodes.push(
        <em key={`inline-em-${keyIndex++}`} className="italic">
          {match[6]}
        </em>
      );
    }

    remaining = remaining.substring(match.index + matchedStr.length);
  }

  return nodes;
}

export function MarkdownRenderer({
  content,
  skipFirstH1 = true,
}: {
  content: string;
  skipFirstH1?: boolean;
}) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let index = 0;
  let isFirstH1 = true;

  let inList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let inBlockquote: string[] | null = null;

  const flushList = () => {
    if (inList) {
      if (inList.type === 'ul') {
        elements.push(
          <ul key={`list-${index++}`} className="my-4 pl-6 space-y-1.5 list-disc text-neutral-800 dark:text-neutral-200 leading-relaxed">
            {inList.items.map((item, i) => (
              <li key={i}>{renderInlineFormatting(item)}</li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${index++}`} className="my-4 pl-6 space-y-1.5 list-decimal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            {inList.items.map((item, i) => (
              <li key={i}>{renderInlineFormatting(item)}</li>
            ))}
          </ol>
        );
      }
      inList = null;
    }
  };

  const flushBlockquote = () => {
    if (inBlockquote) {
      elements.push(
        <blockquote
          key={`quote-${index++}`}
          className="my-5 pl-4 py-2 border-l-2 border-neutral-300 dark:border-neutral-700 italic text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-900/50 rounded-r"
        >
          {inBlockquote.map((q, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {renderInlineFormatting(q)}
            </p>
          ))}
        </blockquote>
      );
      inBlockquote = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      flushBlockquote();
      continue;
    }

    const headingMatch = rawLine.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      flushBlockquote();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const cleanText = text.replace(/[*_`]/g, '');
      const id = cleanText
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (level === 1) {
        if (skipFirstH1 && isFirstH1) {
          isFirstH1 = false;
          continue;
        }
        isFirstH1 = false;

        elements.push(
          <h1
            key={`h1-${index++}`}
            id={id}
            className="text-2xl sm:text-3xl font-serif font-bold mt-8 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 scroll-mt-20"
          >
            {renderInlineFormatting(text)}
          </h1>
        );
      } else if (level === 2) {
        elements.push(
          <h2
            key={`h2-${index++}`}
            id={id}
            className="text-xl sm:text-2xl font-serif font-semibold mt-7 mb-3 pb-1 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 scroll-mt-20"
          >
            {renderInlineFormatting(text)}
          </h2>
        );
      } else if (level === 3) {
        elements.push(
          <h3
            key={`h3-${index++}`}
            id={id}
            className="text-lg sm:text-xl font-serif font-medium mt-5 mb-2 text-neutral-900 dark:text-neutral-100 scroll-mt-20"
          >
            {renderInlineFormatting(text)}
          </h3>
        );
      } else {
        elements.push(
          <h4
            key={`h4-${index++}`}
            id={id}
            className="text-base font-semibold mt-4 mb-2 text-neutral-900 dark:text-neutral-100 scroll-mt-20"
          >
            {renderInlineFormatting(text)}
          </h4>
        );
      }
      continue;
    }

    if (trimmed.startsWith('>')) {
      flushList();
      const quoteText = trimmed.replace(/^>\s?/, '');
      if (!inBlockquote) inBlockquote = [];
      inBlockquote.push(quoteText);
      continue;
    } else {
      flushBlockquote();
    }

    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      if (!inList || inList.type !== 'ul') {
        flushList();
        inList = { type: 'ul', items: [] };
      }
      inList.items.push(ulMatch[1]);
      continue;
    }

    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || inList.type !== 'ol') {
        flushList();
        inList = { type: 'ol', items: [] };
      }
      inList.items.push(olMatch[2]);
      continue;
    }

    flushList();

    elements.push(
      <p
        key={`p-${index++}`}
        className="my-3 text-neutral-800 dark:text-neutral-200 leading-[1.85] text-[15px] sm:text-[16px]"
      >
        {renderInlineFormatting(trimmed)}
      </p>
    );
  }

  flushList();
  flushBlockquote();

  return <div className="markdown-prose max-w-none">{elements}</div>;
}
