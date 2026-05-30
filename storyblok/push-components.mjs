// Push the block schemas in components.json to your Storyblok space via the
// Management API — no CLI needed. Creates each block, or updates it if it
// already exists (safe to re-run).
//
// Usage:
//   STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/push-components.mjs
//   (add STORYBLOK_REGION=us if your space is in the US region)
//
// Get a Personal Access Token: https://app.storyblok.com/#/me/account?tab=token
// Find your Space ID: Storyblok → Settings (or the number in the dashboard URL).

import fs from 'node:fs';

const PAT = process.env.STORYBLOK_PAT;
const SPACE = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.STORYBLOK_REGION || 'eu';

if (!PAT || !SPACE) {
  console.error('Missing env. Run:\n  STORYBLOK_PAT=<token> STORYBLOK_SPACE_ID=<id> node storyblok/push-components.mjs');
  process.exit(1);
}

const HOST = REGION === 'us' ? 'https://api-us.storyblok.com' : 'https://mapi.storyblok.com';
const headers = {Authorization: PAT, 'Content-Type': 'application/json'};

const {components} = JSON.parse(
  fs.readFileSync(new URL('./components.json', import.meta.url), 'utf8'),
);

// Fetch existing components so we update rather than duplicate.
const listRes = await fetch(`${HOST}/v1/spaces/${SPACE}/components/`, {headers});
if (!listRes.ok) {
  console.error(`Failed to list components (${listRes.status}). Check token/space/region.`);
  console.error(await listRes.text());
  process.exit(1);
}
const existing = (await listRes.json()).components ?? [];
const idByName = new Map(existing.map((c) => [c.name, c.id]));

for (const component of components) {
  const id = idByName.get(component.name);
  const url = id
    ? `${HOST}/v1/spaces/${SPACE}/components/${id}`
    : `${HOST}/v1/spaces/${SPACE}/components/`;
  const res = await fetch(url, {
    method: id ? 'PUT' : 'POST',
    headers,
    body: JSON.stringify({component}),
  });
  if (res.ok) {
    console.log(`✓ ${component.name} ${id ? 'updated' : 'created'}`);
  } else {
    console.error(`✗ ${component.name} failed (${res.status}): ${await res.text()}`);
  }
}

console.log('Done.');
