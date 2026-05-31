import {renderRichText} from '@storyblok/react/rsc';
import type {ServiceItem, TestimonialItem, FAQItem, BlogPost} from '../types';

// Splits a Storyblok textarea (one value per line) into a string array.
const lines = (s?: string) =>
  s ? s.split('\n').map((l) => l.trim()).filter(Boolean) : [];

// Safely render a richtext field (string, richtext doc, or empty) to HTML.
const richText = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  try {
    return renderRichText(val) ?? '';
  } catch {
    return '';
  }
};

// Injects stable `id`s into the article's h2/h3 headings and extracts a table
// of contents, server-side, so anchors exist in the SSR HTML (reliable scroll).
const buildToc = (html: string): {html: string; toc: BlogPost['tableOfContents']} => {
  const toc: NonNullable<BlogPost['tableOfContents']> = [];
  const seen = new Set<string>();
  const decode = (s: string) =>
    s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
  const out = html.replace(/<(h[23])((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/g, (m, tag, attrs, inner) => {
    const text = decode(String(inner).replace(/<[^>]+>/g, '')).trim();
    if (!text) return m;
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'section';
    let id = base;
    for (let i = 2; seen.has(id); i++) id = `${base}-${i}`;
    seen.add(id);
    toc.push({id, text, depth: tag === 'h3' ? 3 : 2});
    return /\bid=/.test(attrs) ? m : `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
  return {html: out, toc};
};

// Period label from a structured value+unit, e.g. (2,'hour') -> "2 hours".
const periodLabel = (value: any, unit?: string): string => {
  if (!unit) return '';
  const n = Number(value) || 1;
  return n > 1 ? `${n} ${unit}s` : unit;
};

export const adaptService = (s: any): ServiceItem => {
  const c = s?.content ?? {};
  // Duration is structured (value + unit) and also drives the price unit, so
  // the price reads e.g. "€100 / 2 hours". Falls back to any legacy text.
  const duration = periodLabel(c.duration_value, c.duration_unit) || (typeof c.duration === 'string' ? c.duration : '');
  const amount = c.price_amount;
  const hasAmount = amount !== undefined && amount !== null && String(amount).trim() !== '';
  const price = hasAmount ? `€${amount}${duration ? ` / ${duration}` : ''}` : (c.price ?? '');
  return {
    id: s?.uuid ?? s?.slug ?? '',
    slug: s?.slug ?? '',
    title: c.title ?? '',
    shortDescription: c.short_description ?? '',
    longDescription: c.long_description ?? '',
    price,
    duration,
    features: lines(c.features),
    imageUrl: c.image?.filename ?? '',
    audience: c.audience ?? '',
    icon: c.icon ?? '',
  };
};

export const adaptTestimonial = (s: any): TestimonialItem => {
  const c = s?.content ?? {};
  return {
    id: s?.uuid ?? '',
    name: c.name ?? '',
    dogBreed: c.dog_breed ?? '',
    rating: Number(c.rating) || 5,
    text: c.text ?? '',
    imageUrl: c.image?.filename || undefined,
    date: c.date ?? '',
    source: c.source ?? 'direct',
    serviceId: c.service || undefined,
  };
};

export const adaptFaq = (s: any): FAQItem => {
  const c = s?.content ?? {};
  return {
    id: s?.uuid ?? '',
    category: c.category ?? '',
    question: c.question ?? '',
    answer: c.answer ?? '',
  };
};

export const adaptBlogPost = (s: any): BlogPost => {
  const c = s?.content ?? {};
  const {html, toc} = buildToc(richText(c.content));
  return {
    id: s?.uuid ?? s?.slug ?? '',
    slug: s?.slug ?? '',
    title: c.title ?? '',
    summary: c.summary ?? '',
    content: html,
    tableOfContents: toc,
    imageUrl: c.image?.filename ?? '',
    publishDate: c.publish_date ?? '',
    readingTime: c.reading_time ?? '',
    category: c.category ?? '',
    // tags is now a multi-option (datasource) array; tolerate the old textarea.
    tags: Array.isArray(c.tags) ? c.tags.filter(Boolean) : lines(c.tags),
    seo: {
      metaTitle: c.meta_title ?? '',
      metaDescription: c.meta_description ?? '',
    },
  };
};
