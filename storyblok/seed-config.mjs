// Creates/updates the global `config` story (header + footer) with EN + DE.
// Usage: STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/seed-config.mjs

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
let uid = 0;
const navLink = (label, labelDe, target) => ({
  _uid: `nl-${uid++}`,
  component: 'nav_link',
  ...tr('label', label, labelDe),
  target,
});

const content = {
  component: 'config',
  _uid: 'config-root',
  nav_items: [
    navLink('Home', 'Startseite', 'home'),
    navLink('About Sophia', 'Über Sophia', 'about'),
    navLink('Services', 'Leistungen', 'services'),
    navLink('Canine Blog', 'Hunde-Blog', 'blog'),
    navLink('Reviews', 'Bewertungen', 'testimonials'),
    navLink('FAQ', 'FAQ', 'faq'),
    navLink('Contact', 'Kontakt', 'contact'),
  ],
  ...tr('cta_label', 'Book Consult', 'Erstgespräch buchen'),
  cta_target: 'booking',
  footer_brand_name: 'SOPHIA BINDER',
  ...tr('footer_brand_subtitle', 'Gentle Education', 'Sanfte Erziehung'),
  ...tr(
    'footer_tagline',
    'Premium, evidence-based, force-free canine education. Bringing Scandinavian warmth and peaceful training methodologies into Seattle and Bellevue homes.',
    'Hochwertige, wissenschaftlich fundierte und gewaltfreie Hundeerziehung. Skandinavische Wärme und ruhige Trainingsmethoden für Familien in Seattle und Bellevue.',
  ),
  instagram_url: 'https://instagram.com/sophiabinder.canine',
  facebook_url: 'https://facebook.com/sophiabinder.canine',
  footer_columns: [
    {
      _uid: 'fc-1',
      component: 'footer_column',
      ...tr('title', 'Directories', 'Verzeichnis'),
      links: [
        navLink('Home Dashboard', 'Startseite', 'home'),
        navLink('About Sophia', 'Über Sophia', 'about'),
        navLink('Training programs', 'Trainingsprogramme', 'services'),
        navLink('Behavior Blog', 'Verhaltens-Blog', 'blog'),
      ],
    },
    {
      _uid: 'fc-2',
      component: 'footer_column',
      ...tr('title', 'Resources', 'Ressourcen'),
      links: [
        navLink('Success Stories', 'Erfolgsgeschichten', 'testimonials'),
        navLink('Frequently Asked Questions', 'Häufige Fragen', 'faq'),
        navLink('Calendly Booking portal', 'Terminbuchung', 'booking'),
        navLink('Emergency Contact & Enquiry', 'Kontakt & Anfrage', 'contact'),
      ],
    },
  ],
  accreditations: [
    {_uid: 'ac-1', component: 'accreditation', ...tr('title', 'CCPDT-KA Certified', 'CCPDT-KA zertifiziert'), ...tr('subtitle', 'Certification for Professional Dog Trainers', 'Zertifizierung für professionelle Hundetrainer')},
    {_uid: 'ac-2', component: 'accreditation', ...tr('title', 'IAABC Consultant', 'IAABC-Beraterin'), ...tr('subtitle', 'Intl Association of Animal Behavior Consultants', 'Intl. Vereinigung für Tierverhaltensberater')},
    {_uid: 'ac-3', component: 'accreditation', ...tr('title', 'Fear-Free Certified', 'Fear-Free zertifiziert'), ...tr('subtitle', 'Dedicated to preventing fear, stress, & anxiety', 'Gegen Angst, Stress und Unbehagen')},
  ],
  ...tr('footer_address', '42 Moss Ridge Road, Bellevue, WA 98004', '42 Moss Ridge Road, Bellevue, WA 98004'),
  footer_phone: '+1 (555) 019-2819',
  footer_email: 'hello@sophiabindercanine.com',
  ...tr('footer_copyright', '© 2026 Sophia Binder Dog Trainer LLC. All rights reserved.', '© 2026 Sophia Binder Dog Trainer LLC. Alle Rechte vorbehalten.'),
  ...tr('footer_bottom_tags', 'Force-Free & Scientifically Aligned\nScandinavian Philosophy', 'Gewaltfrei & wissenschaftlich fundiert\nSkandinavische Philosophie'),
};

const list = await fetch(`${HOST}/v1/spaces/${SPACE}/stories?per_page=100`, {headers}).then((r) => r.json());
const existing = (list.stories || []).find((s) => s.full_slug === 'config');
const story = {name: 'Site Config', slug: 'config', content};
const res = existing
  ? await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${existing.id}`, {method: 'PUT', headers, body: JSON.stringify({story, publish: 1})})
  : await fetch(`${HOST}/v1/spaces/${SPACE}/stories`, {method: 'POST', headers, body: JSON.stringify({story, publish: 1})});
console.log(res.ok ? `✓ config ${existing ? 'updated' : 'created'} + published` : `✗ ${res.status} ${await res.text()}`);
