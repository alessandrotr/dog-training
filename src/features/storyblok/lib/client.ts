import {apiPlugin, storyblokInit} from '@storyblok/react/rsc';
import Page from '@/features/storyblok/bloks/Page';
import Hero from '@/features/storyblok/bloks/Hero';
import TrustStats from '@/features/storyblok/bloks/TrustStats';
import HowItWorks from '@/features/storyblok/bloks/HowItWorks';
import CtaBanner from '@/features/storyblok/bloks/CtaBanner';
import ServicesGrid from '@/features/storyblok/bloks/ServicesGrid';
import Testimonials from '@/features/storyblok/bloks/Testimonials';
import BlogList from '@/features/storyblok/bloks/BlogList';
import BlogFiltered from '@/features/storyblok/bloks/BlogFiltered';
import Faq from '@/features/storyblok/bloks/Faq';
import BioHero from '@/features/storyblok/bloks/BioHero';
import ValueCards from '@/features/storyblok/bloks/ValueCards';
import ValueCard from '@/features/storyblok/bloks/ValueCard';
import Pricing from '@/features/storyblok/bloks/Pricing';
import Availability from '@/features/storyblok/bloks/Availability';
import PageHeader from '@/features/storyblok/bloks/PageHeader';

// Registry mapping Storyblok blok names -> React components, so StoryblokStory
// / StoryblokServerComponent can render composed pages.
const components = {
  page: Page,
  hero: Hero,
  trust_stats: TrustStats,
  how_it_works: HowItWorks,
  cta_banner: CtaBanner,
  services_grid: ServicesGrid,
  testimonials: Testimonials,
  blog_list: BlogList,
  blog_filtered: BlogFiltered,
  faq_section: Faq,
  bio_hero: BioHero,
  value_cards: ValueCards,
  value_card: ValueCard,
  pricing: Pricing,
  availability: Availability,
  page_header: PageHeader,
};

// Server-side Storyblok client. The token stays server-only (no NEXT_PUBLIC_
// prefix), so it is never shipped to the browser.
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    // Storyblok default is 'eu'. Set STORYBLOK_REGION=us in .env.local if your
    // space lives in the US region.
    region: (process.env.STORYBLOK_REGION as 'eu' | 'us' | 'ap' | 'ca' | 'cn') ?? 'eu',
  },
});
