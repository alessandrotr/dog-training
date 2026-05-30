export interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown or HTML content
  imageUrl: string;
  publishDate: string;
  readingTime: string;
  category: string;
  author: Author;
  tags?: string[];
  seo: SEOFields;
  tableOfContents?: { id: string; text: string; depth: number }[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  duration: string;
  features: string[];
  imageUrl: string;
  audience: string;
  icon: string; // Lucide icon name
}

export interface TestimonialItem {
  id: string;
  name: string;
  dogBreed: string;
  rating: number; // 1-5
  text: string;
  imageUrl?: string;
  date: string;
  source: 'google' | 'direct';
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface StoryblokComponentSchema {
  _uid: string;
  component: string;
  [key: string]: any;
}

export interface StoryblokPage {
  name: string;
  slug: string;
  seo: SEOFields;
  body: StoryblokComponentSchema[];
}
