export interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

// Every Storyblok blok carries `_uid` + `component`. Bloks extend this so the
// shared contract lives in one place: `interface HeroBlok extends BlokBase {...}`.
export interface BlokBase {
  _uid: string;
  component: string;
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
  logoUrl?: string;
  logoAlt?: string;
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

// Canonical category/tag value → localized label (from Storyblok datasource
// dimensions). Display-only; posts still store/filter by canonical values.
export interface BlogTaxonomies {
  categories: Record<string, string>;
  tags: Record<string, string>;
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
  serviceIds?: string[]; // uuids of related services
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

// A client case study: the dog, the challenge, what was done (text), the outcome,
// and the service it relates to. (Underlying Storyblok type is still `testimonial`.)
export interface TestimonialItem {
  id: string;
  slug: string;
  name: string;
  dogBreed: string;
  challenge?: string; // the problem in one line
  text: string; // the story — what the trainer did
  outcome?: string; // the result
  rating: number; // legacy, no longer displayed
  imageUrl?: string;
  date: string;
  source: 'google' | 'direct';
  serviceId?: string; // uuid of the service this case study is for, if tagged
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
