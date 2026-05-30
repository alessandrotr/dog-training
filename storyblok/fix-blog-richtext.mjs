// One-off fix: the blog `content` field was switched to a Richtext editor, but
// the seeded value is an HTML string (invalid for richtext → publish errors).
// This converts each blog post's HTML (EN + DE) into a valid Storyblok richtext
// document and republishes. Future posts are authored directly in the editor.
//
// Usage:
//   STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/fix-blog-richtext.mjs

const PAT = process.env.STORYBLOK_PAT;
const SPACE = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.STORYBLOK_REGION || 'eu';
if (!PAT || !SPACE) {
  console.error('Set STORYBLOK_PAT and STORYBLOK_SPACE_ID');
  process.exit(1);
}
const HOST = REGION === 'us' ? 'https://api-us.storyblok.com' : 'https://mapi.storyblok.com';
const headers = {Authorization: PAT, 'Content-Type': 'application/json'};

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&nbsp;/g, ' ');
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

// Minimal but robust HTML -> Storyblok richtext doc. Preserves headings,
// paragraphs and lists; inline emphasis is flattened to text (fine for the
// demo posts — real posts get authored in the rich editor).
function htmlToRichtext(html) {
  if (!html || typeof html !== 'string') return html;
  const nodes = [];
  const re = /<(h2|h3|h4|p|ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase();
    const inner = m[2];
    if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
      const text = stripTags(inner);
      if (text) nodes.push({type: 'heading', attrs: {level: tag === 'h2' ? 2 : tag === 'h3' ? 3 : 4}, content: [{type: 'text', text}]});
    } else if (tag === 'p') {
      const text = stripTags(inner);
      if (text) nodes.push({type: 'paragraph', content: [{type: 'text', text}]});
    } else {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((li) => stripTags(li[1]))
        .filter(Boolean);
      if (items.length) {
        nodes.push({
          type: tag === 'ul' ? 'bullet_list' : 'ordered_list',
          content: items.map((t) => ({type: 'list_item', content: [{type: 'paragraph', content: [{type: 'text', text: t}]}]})),
        });
      }
    }
  }
  if (!nodes.length) nodes.push({type: 'paragraph'});
  return {type: 'doc', content: nodes};
}

const list = await fetch(`${HOST}/v1/spaces/${SPACE}/stories?starts_with=blog/&per_page=100`, {headers}).then((r) => r.json());
const blogStories = (list.stories || []).filter((s) => !s.is_folder);

for (const ref of blogStories) {
  const {story} = await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${ref.id}`, {headers}).then((r) => r.json());
  const content = story.content;
  let changed = false;
  if (typeof content.content === 'string') {
    content.content = htmlToRichtext(content.content);
    changed = true;
  }
  if (typeof content.content__i18n__de === 'string') {
    content.content__i18n__de = htmlToRichtext(content.content__i18n__de);
    changed = true;
  }
  if (!changed) {
    console.log(`– ${ref.full_slug} already richtext, skipped`);
    continue;
  }
  const res = await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${ref.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({story: {content}, publish: 1}),
  });
  console.log(`${res.ok ? '✓' : '✗ ' + res.status} ${ref.full_slug} ${res.ok ? 'converted + published' : await res.text()}`);
}
console.log('Done.');
