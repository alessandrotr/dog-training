import type {SiteConfig} from '@/types';

// Local image assets (used as the structured-data image fallback).
export const IMAGES = {
  hero: '/assets/images/hero_trainer_1780093921073.png',
  puppy: '/assets/images/puppy_training_1780093940929.png',
  reactive: '/assets/images/reactive_dog_1780093958673.png',
  obedience: '/assets/images/obedience_dog_1780093976803.png',
};

// LocalBusiness JSON-LD built from the Storyblok Site Config (single source of
// truth for name / NAP / socials) and the canonical site URL — no hardcoded
// business data. `@type` is a valid schema.org type; `url`/`@id`/`image` resolve
// to the real site so Google accepts the markup. Optional fields are omitted
// rather than faked (better to send nothing than wrong geo/hours).
export function buildLocalBusinessSchema(config: SiteConfig, siteUrl: string) {
  const {seo, footer} = config;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: seo.siteName,
    url: siteUrl,
    '@id': siteUrl,
    image: seo.defaultImageUrl || `${siteUrl}${IMAGES.hero}`,
    ...(footer.phone ? {telephone: footer.phone} : {}),
    ...(footer.email ? {email: footer.email} : {}),
    ...(footer.address ? {address: footer.address} : {}),
    sameAs: [footer.instagramUrl, footer.facebookUrl].filter(Boolean),
  };
}
