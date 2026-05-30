import {apiPlugin, storyblokInit} from '@storyblok/react/rsc';

// Server-side Storyblok client. The token stays server-only (no NEXT_PUBLIC_
// prefix), so it is never shipped to the browser.
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    // Storyblok default is 'eu'. Set STORYBLOK_REGION=us in .env.local if your
    // space lives in the US region.
    region: (process.env.STORYBLOK_REGION as 'eu' | 'us' | 'ap' | 'ca' | 'cn') ?? 'eu',
  },
});
