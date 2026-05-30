/**
 * Seeds your Storyblok space with all content from src/data.ts:
 *   - ensures the German (de) language exists
 *   - creates the services/ testimonials/ faqs/ blog/ folders
 *   - creates a PUBLISHED story per item, with EN values + DE translations
 *
 * Run the component push FIRST (so the blocks + translatable flags exist):
 *   STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/push-components.mjs
 * Then seed (tsx lets us import the TypeScript data file directly):
 *   STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 npx tsx storyblok/seed.ts
 *   (add STORYBLOK_REGION=us if your space is in the US region)
 *
 * Idempotent: re-running updates existing stories instead of duplicating.
 */

import {SERVICES, TESTIMONIALS, FAQS, BLOG_POSTS} from '../src/data';

const PAT = process.env.STORYBLOK_PAT;
const SPACE = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.STORYBLOK_REGION || 'eu';

if (!PAT || !SPACE) {
  console.error('Missing env. Run:\n  STORYBLOK_PAT=<token> STORYBLOK_SPACE_ID=<id> npx tsx storyblok/seed.ts');
  process.exit(1);
}

const HOST = REGION === 'us' ? 'https://api-us.storyblok.com' : 'https://mapi.storyblok.com';
const headers = {Authorization: PAT, 'Content-Type': 'application/json'};

async function api(path: string, opts: RequestInit = {}): Promise<any> {
  const res = await fetch(`${HOST}/v1/spaces/${SPACE}${path}`, {headers, ...opts});
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 1000));
    return api(path, opts);
  }
  if (!res.ok) {
    throw new Error(`${opts.method || 'GET'} ${path} -> ${res.status} ${await res.text()}`);
  }
  return res.status === 204 ? null : res.json();
}

const asset = (url?: string) => (url ? {fieldtype: 'asset', filename: url} : null);

// Merge EN base content with DE overrides as Storyblok field-level i18n keys.
function merge(en: Record<string, any>, de: Record<string, any> | null, translatable: string[]) {
  const content = {...en};
  if (de) for (const k of translatable) if (de[k] !== undefined) content[`${k}__i18n__de`] = de[k];
  return content;
}

// ---- field mappers (TS shape -> Storyblok content) ----
const service = (s: any) => ({
  component: 'service',
  title: s.title,
  short_description: s.shortDescription,
  long_description: s.longDescription,
  price: s.price,
  duration: s.duration,
  audience: s.audience,
  icon: s.icon,
  features: (s.features || []).join('\n'),
  image: asset(s.imageUrl),
});
const SERVICE_TR = ['title', 'short_description', 'long_description', 'price', 'duration', 'audience', 'features'];

const testimonial = (t: any) => ({
  component: 'testimonial',
  name: t.name,
  dog_breed: t.dogBreed,
  rating: t.rating,
  text: t.text,
  date: t.date,
  source: t.source,
  image: asset(t.imageUrl),
});
const TESTIMONIAL_TR = ['dog_breed', 'text', 'date'];

const faq = (f: any) => ({
  component: 'faq',
  category: f.category,
  question: f.question,
  answer: f.answer,
});
const FAQ_TR = ['category', 'question', 'answer'];

const blog = (b: any) => ({
  component: 'blog_post',
  title: b.title,
  summary: b.summary,
  content: b.content,
  category: b.category,
  reading_time: b.readingTime,
  publish_date: b.publishDate,
  tags: (b.tags || []).join('\n'),
  image: asset(b.imageUrl),
  author_name: b.author?.name,
  author_role: b.author?.role,
  author_avatar: asset(b.author?.avatar),
  meta_title: b.seo?.metaTitle,
  meta_description: b.seo?.metaDescription,
});
const BLOG_TR = ['title', 'summary', 'content', 'category', 'reading_time', 'publish_date', 'tags', 'author_role', 'meta_title', 'meta_description'];

// ---- story bookkeeping ----
type StoryRef = {id: number; is_folder: boolean};

async function fetchAllStories(): Promise<Map<string, StoryRef>> {
  const map = new Map<string, StoryRef>();
  for (let page = 1; ; page++) {
    const {stories} = await api(`/stories?per_page=100&page=${page}`);
    for (const s of stories) map.set(s.full_slug, {id: s.id, is_folder: s.is_folder});
    if (stories.length < 100) break;
  }
  return map;
}

async function ensureFolder(slug: string, name: string, map: Map<string, StoryRef>) {
  const ex = map.get(slug);
  if (ex?.is_folder) return ex.id;
  const {story} = await api('/stories', {
    method: 'POST',
    body: JSON.stringify({story: {name, slug, is_folder: true}}),
  });
  map.set(slug, {id: story.id, is_folder: true});
  console.log(`📁 ${slug}/ folder created`);
  return story.id;
}

async function upsert(parentId: number, parentSlug: string, slug: string, name: string, content: any, map: Map<string, StoryRef>) {
  const fullSlug = `${parentSlug}/${slug}`;
  const ex = map.get(fullSlug);
  const body = JSON.stringify({story: {name, slug, parent_id: parentId, content}, publish: 1});
  if (ex && !ex.is_folder) {
    await api(`/stories/${ex.id}`, {method: 'PUT', body});
    return 'updated';
  }
  const {story} = await api('/stories', {method: 'POST', body});
  map.set(fullSlug, {id: story.id, is_folder: false});
  return 'created';
}

// ---- run ----
type Group = {
  folder: string;
  name: string;
  en: any[];
  de: any[];
  map: (x: any) => any;
  tr: string[];
  slugOf: (x: any) => string;
  nameOf: (x: any) => string;
};

const groups: Group[] = [
  {folder: 'services', name: 'Services', en: SERVICES.en, de: SERVICES.de, map: service, tr: SERVICE_TR, slugOf: (s) => s.slug, nameOf: (s) => s.title},
  {folder: 'testimonials', name: 'Testimonials', en: TESTIMONIALS.en, de: TESTIMONIALS.de, map: testimonial, tr: TESTIMONIAL_TR, slugOf: (t) => t.id, nameOf: (t) => t.name},
  {folder: 'faqs', name: 'FAQs', en: FAQS.en, de: FAQS.de, map: faq, tr: FAQ_TR, slugOf: (f) => f.id, nameOf: (f) => f.question.slice(0, 60)},
  {folder: 'blog', name: 'Blog', en: BLOG_POSTS.en, de: BLOG_POSTS.de, map: blog, tr: BLOG_TR, slugOf: (b) => b.slug, nameOf: (b) => b.title},
];

async function main() {
  const {space} = await api('');
  const langs: any[] = space.languages || [];
  if (!langs.some((l) => l.code === 'de')) {
    await api('', {method: 'PUT', body: JSON.stringify({space: {languages: [...langs, {code: 'de', name: 'Deutsch'}]}})});
    console.log('🌐 Added German (de) language');
  }

  const map = await fetchAllStories();

  for (const g of groups) {
    const folderId = await ensureFolder(g.folder, g.name, map);
    for (let i = 0; i < g.en.length; i++) {
      const enItem = g.en[i];
      const deItem = g.de[i] ?? null;
      const content = merge(g.map(enItem), deItem ? g.map(deItem) : null, g.tr);
      const action = await upsert(folderId, g.folder, g.slugOf(enItem), g.nameOf(enItem), content, map);
      console.log(`  ✓ ${g.folder}/${g.slugOf(enItem)} ${action}`);
    }
  }

  console.log('Done. Content published — refresh your site (or wait out the 60s ISR window).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
