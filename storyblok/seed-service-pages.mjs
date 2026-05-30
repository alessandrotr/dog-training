// Creates a polished, editable `page` story per service at pages/<service-slug>
// (URL /<lang>/<slug>), composed from existing blocks and pre-filled from each
// service entry (EN + DE). Re-runnable.
//
// Usage: STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/seed-service-pages.mjs

const PAT = process.env.STORYBLOK_PAT;
const SPACE = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.STORYBLOK_REGION || 'eu';
if (!PAT || !SPACE) {
  console.error('Set STORYBLOK_PAT and STORYBLOK_SPACE_ID');
  process.exit(1);
}
const HOST = REGION === 'us' ? 'https://api-us.storyblok.com' : 'https://mapi.storyblok.com';
const headers = {Authorization: PAT, 'Content-Type': 'application/json'};

let uid = 0;
const u = (p) => `${p}-${uid++}`;
// Copy a field + its DE translation from service content into a target object.
const copy = (c, key, target = key) => ({
  [target]: c[key] ?? '',
  [`${target}__i18n__de`]: c[`${key}__i18n__de`] ?? c[key] ?? '',
});
const lines = (s) => (typeof s === 'string' ? s.split('\n').map((x) => x.trim()).filter(Boolean) : []);

function buildPage(c, slug) {
  const featuresEn = lines(c.features);
  const featuresDe = lines(c.features__i18n__de);
  const cards = featuresEn.map((f, i) => ({
    _uid: u(`feat-${slug}`),
    component: 'value_card',
    icon: 'CheckCircle',
    title: f,
    title__i18n__de: featuresDe[i] || f,
  }));

  return {
    component: 'page',
    _uid: `page-svc-${slug}`,
    body: [
      {
        _uid: u(`hero-${slug}`),
        component: 'hero',
        eyebrow: 'TRAINING PROGRAM',
        eyebrow__i18n__de: 'TRAININGSPROGRAMM',
        ...copy(c, 'title', 'headline'),
        ...copy(c, 'short_description', 'subheadline'),
        image: c.image,
        primary_label: 'Book Free Consult',
        primary_label__i18n__de: 'Kostenloses Erstgespräch',
        primary_target: 'booking',
        secondary_label: 'Ask a Question',
        secondary_label__i18n__de: 'Frage stellen',
        secondary_target: 'contact',
        badge_title: c.price ?? '',
        ...copy(c, 'duration', 'badge_subtitle'),
        ...copy(c, 'audience', 'availability'),
      },
      {
        _uid: u(`feats-${slug}`),
        component: 'value_cards',
        eyebrow: 'INCLUDED IN PROGRAM',
        eyebrow__i18n__de: 'IM PROGRAMM ENTHALTEN',
        headline: "Everything you get",
        headline__i18n__de: 'Das ist alles dabei',
        columns: '2',
        cards,
      },
      {
        _uid: u(`pricing-${slug}`),
        component: 'pricing',
        eyebrow: 'PROGRAM & INVESTMENT',
        eyebrow__i18n__de: 'PROGRAMM & INVESTITION',
        ...copy(c, 'title', 'headline'),
        ...copy(c, 'long_description', 'description'),
        trust_items: 'Fully CCPDT insured\nForce-free, science-backed\n30-day support guarantee',
        trust_items__i18n__de: 'CCPDT-versichert\nGewaltfrei & wissenschaftlich\n30 Tage Support-Garantie',
        tier_badge: 'This Program',
        tier_badge__i18n__de: 'Dieses Programm',
        ...copy(c, 'title', 'tier_name'),
        ...copy(c, 'short_description', 'tier_description'),
        tier_price: c.price ?? '',
        ...copy(c, 'duration', 'tier_price_note'),
        cta_label: 'Book Free Consult',
        cta_label__i18n__de: 'Kostenloses Erstgespräch',
        cta_target: 'booking',
      },
      {
        _uid: u(`tst-${slug}`),
        component: 'testimonials',
        eyebrow: 'WHAT FAMILIES SAY',
        eyebrow__i18n__de: 'WAS FAMILIEN SAGEN',
        headline: 'Loved by local dog families',
        headline__i18n__de: 'Beliebt bei Hundefamilien',
        layout: 'carousel',
      },
      {
        _uid: u(`cta-${slug}`),
        component: 'cta_banner',
        headline: 'Ready to get started?',
        headline__i18n__de: 'Bereit loszulegen?',
        description: 'Book a free, no-pressure consult and we will map out a calm, science-backed plan for your dog.',
        description__i18n__de: 'Buchen Sie ein kostenloses, unverbindliches Gespräch und wir erstellen einen ruhigen, wissenschaftlich fundierten Plan.',
        primary_label: 'Schedule Consultation',
        primary_label__i18n__de: 'Beratung vereinbaren',
        primary_target: 'booking',
        secondary_label: 'All Programs',
        secondary_label__i18n__de: 'Alle Programme',
        secondary_target: 'services',
      },
    ],
    seo_title: `${c.title} | Sophia Binder`,
  };
}

const all = await fetch(`${HOST}/v1/spaces/${SPACE}/stories?per_page=100`, {headers}).then((r) => r.json());
const stories = all.stories || [];
const pagesFolder = stories.find((s) => s.is_folder && s.full_slug === 'pages');
if (!pagesFolder) {
  console.error('No "pages" folder.');
  process.exit(1);
}
const serviceRefs = stories.filter((s) => !s.is_folder && s.full_slug.startsWith('services/'));

for (const ref of serviceRefs) {
  const {story} = await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${ref.id}`, {headers}).then((r) => r.json());
  const slug = ref.slug;
  const content = buildPage(story.content, slug);
  const existing = stories.find((s) => s.full_slug === `pages/${slug}`);
  const payload = {story: {name: story.content.title || slug, slug, content, parent_id: pagesFolder.id}, publish: 1};
  const res = existing
    ? await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${existing.id}`, {method: 'PUT', headers, body: JSON.stringify(payload)})
    : await fetch(`${HOST}/v1/spaces/${SPACE}/stories`, {method: 'POST', headers, body: JSON.stringify(payload)});
  console.log(res.ok ? `✓ pages/${slug} ${existing ? 'updated' : 'created'} + published` : `✗ pages/${slug} ${res.status} ${await res.text()}`);
  await new Promise((r) => setTimeout(r, 300));
}
console.log('Done.');
