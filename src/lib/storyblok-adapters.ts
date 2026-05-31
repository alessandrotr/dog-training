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

export const adaptService = (s: any): ServiceItem => {
  const c = s?.content ?? {};
  return {
    id: s?.uuid ?? s?.slug ?? '',
    slug: s?.slug ?? '',
    title: c.title ?? '',
    shortDescription: c.short_description ?? '',
    longDescription: c.long_description ?? '',
    price: c.price ?? '',
    duration: c.duration ?? '',
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
  return {
    id: s?.uuid ?? s?.slug ?? '',
    slug: s?.slug ?? '',
    title: c.title ?? '',
    summary: c.summary ?? '',
    content: richText(c.content),
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
