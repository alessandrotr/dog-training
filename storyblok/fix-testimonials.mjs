// One-off fix: testimonial `rating` was seeded as a number, but Storyblok's
// number field validates as a string ("5") — which blocks updates/publishing.
// This stringifies rating, sets the Visual Editor real path, and republishes.
//
// Usage: STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/fix-testimonials.mjs

const PAT = process.env.STORYBLOK_PAT;
const SPACE = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.STORYBLOK_REGION || 'eu';
if (!PAT || !SPACE) {
  console.error('Set STORYBLOK_PAT and STORYBLOK_SPACE_ID');
  process.exit(1);
}
const HOST = REGION === 'us' ? 'https://api-us.storyblok.com' : 'https://mapi.storyblok.com';
const headers = {Authorization: PAT, 'Content-Type': 'application/json'};

const {stories} = await fetch(
  `${HOST}/v1/spaces/${SPACE}/stories?starts_with=testimonials/&per_page=100`,
  {headers},
).then((r) => r.json());

for (const ref of stories.filter((s) => !s.is_folder)) {
  const {story} = await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${ref.id}`, {headers}).then((r) => r.json());
  if (story.content.rating != null) story.content.rating = String(story.content.rating);
  const res = await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${ref.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({story: {content: story.content, path: '/testimonials'}, publish: 1}),
  });
  console.log(`${res.ok ? '✓' : '✗ ' + res.status} ${ref.full_slug} ${res.ok ? '' : await res.text()}`);
}
console.log('Done.');
