import 'server-only';
import {cache} from 'react';
import {getStoryblokApi} from './storyblok';
import type {Locale} from './locales';
import type {AvailabilityData} from '../types';

// Fallback when the `availability` global story doesn't exist yet.
export const DEFAULT_AVAILABILITY: AvailabilityData = {
  available: true,
  name: 'Sophia Binder',
  handle: '@sophiabinder',
  avatar: '',
  availableStatus: 'Available for new clients',
  unavailableStatus: 'Fully booked right now',
  location: 'Berlin & Brandenburg',
  responseTime: 'Usually replies in 24h',
  availableCtaLabel: 'Book a free consult',
  availableCtaTarget: 'booking',
  unavailableCtaLabel: 'Join the waitlist',
  unavailableCtaTarget: 'contact',
};

function adaptAvailability(c: any): AvailabilityData {
  const d = DEFAULT_AVAILABILITY;
  return {
    available: c.available !== false,
    name: c.name || d.name,
    handle: c.handle || d.handle,
    avatar: c.avatar?.filename || '',
    availableStatus: c.available_status || d.availableStatus,
    unavailableStatus: c.unavailable_status || d.unavailableStatus,
    location: c.location || '',
    responseTime: c.response_time || '',
    availableCtaLabel: c.available_cta_label || d.availableCtaLabel,
    availableCtaTarget: c.available_cta_target || d.availableCtaTarget,
    unavailableCtaLabel: c.unavailable_cta_label || d.unavailableCtaLabel,
    unavailableCtaTarget: c.unavailable_cta_target || d.unavailableCtaTarget,
  };
}

// Single global availability record (its own Storyblok story). Sophia edits it
// once; useAvailability() surfaces it everywhere.
export const getAvailability = cache(async (lang: Locale, preview = false): Promise<AvailabilityData> => {
  try {
    const api = getStoryblokApi();
    const {data} = await api.get('cdn/stories/availability', {
      version: preview ? 'draft' : 'published',
      language: lang === 'en' ? 'default' : lang,
      fallback_lang: 'default',
      ...(preview ? {cv: Date.now()} : {}),
    });
    return data?.story?.content ? adaptAvailability(data.story.content) : DEFAULT_AVAILABILITY;
  } catch {
    return DEFAULT_AVAILABILITY;
  }
});
