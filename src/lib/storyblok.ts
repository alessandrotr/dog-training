import {apiPlugin, storyblokInit} from '@storyblok/react/rsc';
import Page from '../components/bloks/Page';
import Hero from '../components/bloks/Hero';
import TrustStats from '../components/bloks/TrustStats';
import HowItWorks from '../components/bloks/HowItWorks';
import CtaBanner from '../components/bloks/CtaBanner';
import ServicesGrid from '../components/bloks/ServicesGrid';
import Testimonials from '../components/bloks/Testimonials';
import BlogList from '../components/bloks/BlogList';
import Faq from '../components/bloks/Faq';
import BioHero from '../components/bloks/BioHero';
import ValueCards from '../components/bloks/ValueCards';
import ValueCard from '../components/bloks/ValueCard';
import Pricing from '../components/bloks/Pricing';
import Availability from '../components/bloks/Availability';

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
  faq_section: Faq,
  bio_hero: BioHero,
  value_cards: ValueCards,
  value_card: ValueCard,
  pricing: Pricing,
  availability: Availability,
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
