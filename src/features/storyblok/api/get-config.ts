import 'server-only';
import {cache} from 'react';
import {getStoryblokApi} from '@/features/storyblok/lib/client';
import {assetUrl} from '@/features/storyblok/lib/adapters';
import type {Locale} from '@/lib/locales';
import type {SiteConfig} from '@/types';

// Faithful fallback used when no `config` story exists yet (so the chrome never
// renders empty). Once the story is published it takes over.
export const DEFAULT_CONFIG: SiteConfig = {
  navItems: [
    {label: 'Home', target: 'home'},
    {label: 'About Sophia', target: 'about'},
    {label: 'Services', target: 'services'},
    {label: 'Canine Blog', target: 'blog'},
    {label: 'Reviews', target: 'testimonials'},
    {label: 'FAQ', target: 'faq'},
    {label: 'Contact', target: 'contact'},
  ],
  ctaLabel: 'Book Consult',
  ctaTarget: 'booking',
  footer: {
    brandName: 'SOPHIA BINDER',
    brandSubtitle: 'Gentle Education',
    tagline:
      'Premium, evidence-based, force-free canine education. Bringing Scandinavian warmth and peaceful training methodologies into Seattle and Bellevue homes.',
    instagramUrl: 'https://instagram.com/sophiabinder.canine',
    facebookUrl: 'https://facebook.com/sophiabinder.canine',
    columns: [
      {
        title: 'Directories',
        links: [
          {label: 'Home Dashboard', target: 'home'},
          {label: 'About Sophia', target: 'about'},
          {label: 'Training programs', target: 'services'},
          {label: 'Behavior Blog', target: 'blog'},
        ],
      },
      {
        title: 'Resources',
        links: [
          {label: 'Success Stories', target: 'testimonials'},
          {label: 'Frequently Asked Questions', target: 'faq'},
          {label: 'Calendly Booking portal', target: 'booking'},
          {label: 'Emergency Contact & Enquiry', target: 'contact'},
        ],
      },
    ],
    accreditations: [
      {title: 'CCPDT-KA Certified', subtitle: 'Certification for Professional Dog Trainers'},
      {title: 'IAABC Consultant', subtitle: 'Intl Association of Animal Behavior Consultants'},
      {title: 'Fear-Free Certified', subtitle: 'Dedicated to preventing fear, stress, & anxiety'},
    ],
    address: '42 Moss Ridge Road, Bellevue, WA 98004',
    phone: '+1 (555) 019-2819',
    email: 'hello@sophiabindercanine.com',
    copyright: '© 2026 Sophia Binder Canine Academy LLC. All rights reserved.',
    bottomTags: ['Force-Free & Scientifically Aligned', 'Scandinavian Philosophy'],
  },
};

const lines = (s?: string) => (s ? s.split('\n').map((l) => l.trim()).filter(Boolean) : []);
const links = (arr?: any[]): {label: string; target: string}[] =>
  (arr ?? []).map((l) => ({label: l.label ?? '', target: l.target ?? 'home'}));

function adaptConfig(content: any): SiteConfig {
  const d = DEFAULT_CONFIG;
  const navItems = links(content.nav_items);
  const columns = (content.footer_columns ?? []).map((c: any) => ({
    title: c.title ?? '',
    links: links(c.links),
  }));
  const accreditations = (content.accreditations ?? []).map((a: any) => ({
    title: a.title ?? '',
    subtitle: a.subtitle ?? '',
    logoUrl: assetUrl(a.logo),
    logoAlt: a.logo?.alt || a.title || '',
  }));
  return {
    navItems: navItems.length ? navItems : d.navItems,
    ctaLabel: content.cta_label || d.ctaLabel,
    ctaTarget: content.cta_target || d.ctaTarget,
    footer: {
      brandName: content.footer_brand_name || d.footer.brandName,
      brandSubtitle: content.footer_brand_subtitle || d.footer.brandSubtitle,
      tagline: content.footer_tagline || d.footer.tagline,
      instagramUrl: content.instagram_url || d.footer.instagramUrl,
      facebookUrl: content.facebook_url || d.footer.facebookUrl,
      columns: columns.length ? columns : d.footer.columns,
      accreditations: accreditations.length ? accreditations : d.footer.accreditations,
      address: content.footer_address || d.footer.address,
      phone: content.footer_phone || d.footer.phone,
      email: content.footer_email || d.footer.email,
      copyright: content.footer_copyright || d.footer.copyright,
      bottomTags: lines(content.footer_bottom_tags).length ? lines(content.footer_bottom_tags) : d.footer.bottomTags,
    },
  };
}

export const getConfig = cache(async (lang: Locale, preview = false): Promise<SiteConfig> => {
  try {
    const api = getStoryblokApi();
    const {data} = await api.get('cdn/stories/config', {
      version: preview ? 'draft' : 'published',
      language: lang === 'en' ? 'default' : lang,
      fallback_lang: 'default',
      ...(preview ? {cv: Date.now()} : {}),
    });
    return data?.story?.content ? adaptConfig(data.story.content) : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
});
