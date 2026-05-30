// Inserts an `availability` blok into the home page (after the hero) so the new
// status card is live. Re-runnable (replaces an existing one). Usage:
//   STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/seed-availability.mjs

const PAT = process.env.STORYBLOK_PAT;
const SPACE = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.STORYBLOK_REGION || 'eu';
if (!PAT || !SPACE) {
  console.error('Set STORYBLOK_PAT and STORYBLOK_SPACE_ID');
  process.exit(1);
}
const HOST = REGION === 'us' ? 'https://api-us.storyblok.com' : 'https://mapi.storyblok.com';
const headers = {Authorization: PAT, 'Content-Type': 'application/json'};
const tr = (key, en, de) => ({[key]: en, [`${key}__i18n__de`]: de});

const availability = {
  _uid: 'home-availability',
  component: 'availability',
  available: true,
  name: 'Sophia Binder',
  handle: '@sophiabinder',
  avatar: {fieldtype: 'asset', filename: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'},
  verified: true,
  ...tr('available_status', 'Available for new clients', 'Nimmt neue Kunden an'),
  ...tr('unavailable_status', 'Fully booked right now', 'Aktuell ausgebucht'),
  location: 'Seattle & Bellevue',
  ...tr('response_time', 'Usually replies in 24h', 'Antwortet meist in 24 Std.'),
  spots_total: '5',
  spots_left: '2',
  ...tr('available_cta_label', 'Book a free consult', 'Kostenloses Erstgespräch'),
  available_cta_target: 'booking',
  ...tr('unavailable_cta_label', 'Join the waitlist', 'Auf die Warteliste'),
  unavailable_cta_target: 'contact',
};

const list = await fetch(`${HOST}/v1/spaces/${SPACE}/stories?starts_with=pages/&per_page=100`, {headers}).then((r) => r.json());
const ref = (list.stories || []).find((s) => s.full_slug === 'pages/home');
if (!ref) {
  console.error('No pages/home story.');
  process.exit(1);
}
const {story} = await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${ref.id}`, {headers}).then((r) => r.json());
// Remove any standalone availability block, then nest it inside the hero's aside slot.
const body = (story.content.body || []).filter((b) => b.component !== 'availability');
const hero = body.find((b) => b.component === 'hero');
if (hero) {
  hero.aside = [availability];
  // The availability card carries the booking CTA + status, so drop them from
  // the hero's left side on the home page.
  for (const k of ['primary_label', 'primary_label__i18n__de', 'primary_target', 'availability', 'availability__i18n__de']) {
    delete hero[k];
  }
}
story.content.body = body;

const res = await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${ref.id}`, {
  method: 'PUT',
  headers,
  body: JSON.stringify({story: {content: story.content}, publish: 1}),
});
console.log(res.ok ? '✓ availability added to home + published' : `✗ ${res.status} ${await res.text()}`);
