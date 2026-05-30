// Populates the `home` story with a `page` blok composition (EN + DE), matching
// the original hardcoded homepage. Re-runnable (updates + publishes).
//
// Usage: STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/seed-home.mjs

const PAT = process.env.STORYBLOK_PAT;
const SPACE = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.STORYBLOK_REGION || 'eu';
if (!PAT || !SPACE) {
  console.error('Set STORYBLOK_PAT and STORYBLOK_SPACE_ID');
  process.exit(1);
}
const HOST = REGION === 'us' ? 'https://api-us.storyblok.com' : 'https://mapi.storyblok.com';
const headers = {Authorization: PAT, 'Content-Type': 'application/json'};

// Helper: a translatable field pair -> {field, field__i18n__de}
const tr = (key, en, de) => ({[key]: en, [`${key}__i18n__de`]: de});
const asset = (filename) => ({fieldtype: 'asset', filename});

const body = [
  {
    _uid: 'home-hero',
    component: 'hero',
    ...tr('eyebrow', 'SCANDINAVIAN CANINE EDUCATION', 'SKANDINAVISCHE HUNDEERZIEHUNG'),
    ...tr('headline', 'Cultivating Calm,', 'Ruhe kultivieren,'),
    ...tr('headline_highlight', 'Connected', 'verbundene'),
    ...tr('headline_suffix', 'Companions', 'Begleiter'),
    ...tr(
      'subheadline',
      'Crafting premium, scientifically backed, force-free canine education. Specialized private training and behavior modification shaped around your unique family lifestyle.',
      'Hochwertige, wissenschaftlich fundierte und gewaltfreie Hundeerziehung. Spezialisiertes Einzeltraining und Verhaltensmodifikation, abgestimmt auf Ihren Familienalltag.',
    ),
    image: asset('/assets/images/hero_trainer_1780093921073.png'),
    ...tr('primary_label', 'Book Free Consult', 'Kostenloses Erstgespräch'),
    primary_target: 'booking',
    ...tr('secondary_label', 'Browse Services', 'Leistungen ansehen'),
    secondary_target: 'services',
    ...tr('badge_title', 'Certified Behavior Professional', 'Zertifizierte Verhaltensexpertin'),
    badge_subtitle: 'CCPDT & IAABC Accredited',
    ...tr(
      'availability',
      'Sophia is available for in-person consults in Seattle & Bellevue',
      'Sophia bietet persönliche Beratungen in Seattle & Bellevue an',
    ),
  },
  {
    _uid: 'home-trust',
    component: 'trust_stats',
    ...tr('stat1_value', '12+ Years', '12+ Jahre'),
    ...tr('stat1_label', 'Expert Canine Instruction', 'Fachkundige Hundeausbildung'),
    ...tr('stat1_note', 'Clinical Behavior Background', 'Klinischer Verhaltenshintergrund'),
    ...tr('stat2_value', '1,400+ Dogs', '1.400+ Hunde'),
    ...tr('stat2_label', 'Rehabilitated & Welcomed', 'Rehabilitiert & Begleitet'),
    ...tr('stat2_note', 'From Puppies to Reactive Seniors', 'Vom Welpen bis zum reaktiven Senior'),
    ...tr('stat3_value', '4.9', '4,9'),
    ...tr('stat3_label', '180+ Google Reviews', '180+ Google-Bewertungen'),
    ...tr('stat3_note', '100% Force-Free Methodology', '100% gewaltfreie Methodik'),
    ...tr('badges_title', 'Credentials & Safe methods verified by', 'Qualifikationen & sichere Methoden geprüft durch'),
    badges: 'Association of Professional Dog Trainers\nCCPDT Governing Body\nFear-Free Pets Association',
  },
  {
    _uid: 'home-services',
    component: 'services_grid',
    ...tr('eyebrow', 'EXPERTISE TAILORED FOR INDIVIDUALS', 'MASSGESCHNEIDERTE EXPERTISE'),
    ...tr('headline', 'Our Core In-Home Disciplines', 'Unsere Kern-Trainingsbereiche'),
    ...tr(
      'subheadline',
      'Every canine is completely unique. Rather than uniform templates, we implement specialized science based habit coaching aligned with your dog’s age, emotional threshold, and goals.',
      'Jeder Hund ist einzigartig. Statt starrer Schemata setzen wir auf wissenschaftlich fundiertes Coaching, abgestimmt auf Alter, Reizschwelle und Ziele Ihres Hundes.',
    ),
    limit: 3,
    ...tr('footer_label', 'VIEW ALL COMPREHENSIVE PROGRAMS', 'ALLE PROGRAMME ANSEHEN'),
  },
  {
    _uid: 'home-testimonials',
    component: 'testimonials',
    ...tr('eyebrow', 'Google Verified Client Reviews', 'Von Google verifizierte Bewertungen'),
    ...tr('footer_label', 'Browse more Google Reviews', 'Weitere Google-Bewertungen ansehen'),
  },
  {
    _uid: 'home-how',
    component: 'how_it_works',
    ...tr('eyebrow', 'OUR SIMPLE ROADMAP', 'UNSER EINFACHER FAHRPLAN'),
    ...tr('headline', 'Success in Four Phases', 'Erfolg in vier Phasen'),
    ...tr(
      'subheadline',
      'Rehabilitating behavior or raising a puppy doesn’t happen overhead. We partner continuously with you to create lasting canine composure.',
      'Verhalten zu rehabilitieren oder einen Welpen zu erziehen braucht Zeit. Wir begleiten Sie kontinuierlich zu dauerhafter Gelassenheit.',
    ),
    ...tr('step1_title', 'Dynamic Consult', 'Erstberatung'),
    ...tr('step1_desc', 'We coordinate an initial, deep-dive 60-minute evaluation to map environmental stressors and behavioral thresholds in your house.', 'Eine ausführliche 60-minütige Erstanalyse zu Stressfaktoren und Reizschwellen bei Ihnen zu Hause.'),
    ...tr('step2_title', 'Bespoke Blueprint', 'Individueller Plan'),
    ...tr('step2_desc', 'We design a beautiful, itemized clinical training roadmap detailing trigger management protocols, treat metrics, and physical layouts.', 'Wir erstellen einen detaillierten Trainingsfahrplan mit Trigger-Management, Belohnungsplan und Abläufen.'),
    ...tr('step3_title', 'Continuous Coaching', 'Laufendes Coaching'),
    ...tr('step3_desc', 'Our professional coaches work side-by-side with you during direct in-home lessons to build core communication and physical handling confidence.', 'Wir arbeiten in Einheiten bei Ihnen zu Hause direkt mit Ihnen an Kommunikation und sicherem Handling.'),
    ...tr('step4_title', 'Lifetime Support', 'Lebenslange Unterstützung'),
    ...tr('step4_desc', 'Receive direct WhatsApp support and custom homework checklists after every session. Join an exclusive list of local dog guardians.', 'Direkter WhatsApp-Support und individuelle Hausaufgaben nach jeder Einheit.'),
  },
  {
    _uid: 'home-blog',
    component: 'blog_list',
    ...tr('eyebrow', 'LATEST FREE CANINE RESOURCES', 'AKTUELLE KOSTENLOSE RESSOURCEN'),
    ...tr('headline', 'The Behavioral Study', 'Das Verhaltens-Journal'),
    ...tr('footer_label', 'EXPLORE ALL RESEARCH ARTICLES', 'ALLE ARTIKEL ENTDECKEN'),
  },
  {
    _uid: 'home-cta',
    component: 'cta_banner',
    ...tr('headline', 'Ready for a Peaceful Household?', 'Bereit für ein harmonisches Zuhause?'),
    ...tr(
      'description',
      'Schedule a comprehensive and completely free behavior consult call to walk through your dog’s triggers and receive instant, actionable feedback.',
      'Vereinbaren Sie ein umfassendes, kostenloses Beratungsgespräch, um die Auslöser Ihres Hundes zu besprechen und sofort umsetzbares Feedback zu erhalten.',
    ),
    ...tr('primary_label', 'Schedule Consultation', 'Beratung vereinbaren'),
    primary_target: 'booking',
    ...tr('secondary_label', 'Send Direct Message', 'Direkt schreiben'),
    secondary_target: 'contact',
    ...tr('note', 'In-home assessment times are strictly limited each week. Zero obligation.', 'Die Termine für Hausbesuche sind wöchentlich streng begrenzt. Unverbindlich.'),
  },
];

const content = {
  component: 'page',
  _uid: 'home-page-root',
  body,
  ...tr('seo_title', 'Sophia Binder Canine Academy', 'Sophia Binder Hundeakademie'),
  ...tr(
    'seo_description',
    'Scandinavian-inspired force-free dog training in Seattle & Bellevue.',
    'Skandinavisch inspiriertes, gewaltfreies Hundetraining in Seattle & Bellevue.',
  ),
};

const list = await fetch(`${HOST}/v1/spaces/${SPACE}/stories?per_page=100`, {headers}).then((r) => r.json());
const existing = (list.stories || []).find((s) => s.full_slug === 'home');

const story = {name: 'Home', slug: 'home', content};
const res = existing
  ? await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${existing.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({story, publish: 1}),
    })
  : await fetch(`${HOST}/v1/spaces/${SPACE}/stories`, {
      method: 'POST',
      headers,
      body: JSON.stringify({story, publish: 1}),
    });
console.log(res.ok ? `✓ home page ${existing ? 'updated' : 'created'} + published` : `✗ ${res.status} ${await res.text()}`);
