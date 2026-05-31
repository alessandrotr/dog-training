export interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

// Site-wide header/footer config (a single Storyblok `config` story).
export interface NavLink {
  label: string;
  target: string;
}
export interface FooterColumn {
  title: string;
  links: NavLink[];
}
export interface Accreditation {
  title: string;
  subtitle: string;
}
// Single global availability record (edited once in the Site Config, surfaced
// everywhere via useAvailability()).
export interface AvailabilityData {
  available: boolean;
  name: string;
  handle: string;
  avatar: string;
  availableStatus: string;
  unavailableStatus: string;
  location: string;
  responseTime: string;
  availableCtaLabel: string;
  availableCtaTarget: string;
  unavailableCtaLabel: string;
  unavailableCtaTarget: string;
}

export interface SiteConfig {
  navItems: NavLink[];
  ctaLabel: string;
  ctaTarget: string;
  availability: AvailabilityData;
  footer: {
    brandName: string;
    brandSubtitle: string;
    tagline: string;
    instagramUrl: string;
    facebookUrl: string;
    columns: FooterColumn[];
    accreditations: Accreditation[];
    address: string;
    phone: string;
    email: string;
    copyright: string;
    bottomTags: string[];
  };
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
  serviceId?: string; // uuid of the service this review is for, if tagged
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
