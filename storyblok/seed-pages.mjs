// Creates/updates the About, Services, Testimonials and FAQ builder pages under
// the pages/ folder (block compositions, EN + key DE). Re-runnable.
//
// Usage: STORYBLOK_PAT=xxx STORYBLOK_SPACE_ID=12345 node storyblok/seed-pages.mjs

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
const asset = (filename) => ({fieldtype: 'asset', filename});
const para = (text) => ({type: 'paragraph', content: [{type: 'text', text}]});
const quote = (text) => ({type: 'blockquote', content: [para(text)]});
const doc = (...nodes) => ({type: 'doc', content: nodes});
const card = (uid, icon, title, titleDe, desc, descDe) => ({
  _uid: uid,
  component: 'value_card',
  icon,
  ...tr('title', title, titleDe),
  ...tr('description', desc, descDe),
});

const PAGES = {
  services: [
    {
      _uid: 'svc-list',
      component: 'services_grid',
      layout: 'list',
      ...tr('eyebrow', 'FORCE-FREE STUDY CURRICULA', 'GEWALTFREIE LEHRPLÄNE'),
      ...tr('headline', 'Comprehensive Behavioral Education Programs', 'Umfassende Trainingsprogramme'),
      ...tr(
        'subheadline',
        'All programs take place on location—directly in your home, garden, or local Seattle/Bellevue neighborhood where actual stressors happen. Prices include exhaustive handover templates and direct text consulting support.',
        'Alle Programme finden vor Ort statt – bei Ihnen zu Hause, im Garten oder in Ihrer Nachbarschaft, wo die echten Auslöser sind. Inklusive ausführlicher Unterlagen und direktem Support.',
      ),
    },
    {
      _uid: 'svc-pricing',
      component: 'pricing',
      ...tr('eyebrow', 'SAVINGS WITH MULTI-SESSION MODULES', 'SPAREN MIT MEHR-EINHEITEN-PAKETEN'),
      ...tr('headline', 'Package Structures & Commitment Care', 'Pakete & langfristige Betreuung'),
      ...tr(
        'description',
        'Reinventing habits takes structured repetitions. To encourage long-term commitment and provide better overall value, we offer special packaged bundles for private families.',
        'Neue Gewohnheiten brauchen Wiederholung. Für langfristiges Engagement und besseren Wert bieten wir spezielle Pakete für Familien an.',
      ),
      trust_items: 'Fully CCPDT Insurance Registered\nStructured Handover PDFs\n30-Day Support Period Guarantee\nForce-Free or Full Refund Policy',
      ...tr('tier_badge', 'Most Popular', 'Beliebt'),
      ...tr('tier_name', 'Combined Rehabilitative Pass', 'Kombiniertes Reha-Paket'),
      ...tr('tier_description', 'A curated program spanning 4 intensive 1-on-1 private lessons + follow-up audits.', 'Ein kuratiertes Programm mit 4 intensiven Einzelstunden + Nachkontrollen.'),
      tier_price: '$480',
      ...tr('tier_price_note', ' / Complete Bundle Package', ' / Komplettpaket'),
      tier_features: 'Includes initial 60-min intake assessment\nSave over $160 compared to individual rates\nUnlimited WhatsApp support logs with Sophia',
      ...tr('cta_label', 'Inquire For Combined Pass', 'Kombipaket anfragen'),
      cta_target: 'booking',
    },
  ],
  faq: [
    {
      _uid: 'faq-sec',
      component: 'faq_section',
      ...tr('eyebrow', 'CLEAR CANINE ANSWERS', 'KLARE ANTWORTEN'),
      ...tr('headline', 'Frequently Asked Questions', 'Häufige Fragen'),
      ...tr(
        'subheadline',
        'Have questions about force-free conditioning, session logistics, or puppy vaccination rules? Read our detailed, scientifically informed guide below.',
        'Fragen zu gewaltfreiem Training, Ablauf oder Welpen-Impfregeln? Lesen Sie unseren ausführlichen Leitfaden unten.',
      ),
      ...tr('search_placeholder', 'Search puppy, methods, reactive, pricing...', 'Welpe, Methoden, Reaktivität, Preise...'),
      enable_search: true,
    },
    {
      _uid: 'faq-cta',
      component: 'cta_banner',
      variant: 'light',
      ...tr('headline', 'Still have unanswered questions?', 'Noch offene Fragen?'),
      ...tr('description', 'Sophia is available to talk through your household dynamics directly and provide honest advice.', 'Sophia bespricht Ihre Situation gerne direkt mit Ihnen und gibt ehrlichen Rat.'),
      ...tr('primary_label', 'Contact Sophia Directly', 'Sophia direkt kontaktieren'),
      primary_target: 'contact',
      ...tr('secondary_label', 'Book Consult via Calendly', 'Termin via Calendly buchen'),
      secondary_target: 'booking',
    },
  ],
  testimonials: [
    {
      _uid: 'tst-grid',
      component: 'testimonials',
      layout: 'grid',
      ...tr('eyebrow', 'HONEST HUMAN ENGAGEMENT', 'EHRLICHE ERFAHRUNGEN'),
      ...tr('headline', 'Client Success Stories', 'Erfolgsgeschichten'),
      ...tr(
        'subheadline',
        'Discover real-world outcomes from owners who navigated high reactivity, separation anxiety, and puppy socialization. We let our results speak for themselves.',
        'Echte Ergebnisse von Hundehaltern mit reaktiven Hunden, Trennungsangst und Welpensozialisierung. Unsere Resultate sprechen für sich.',
      ),
    },
    {
      _uid: 'tst-cta',
      component: 'cta_banner',
      variant: 'light',
      ...tr('headline', 'Ready to write your own success story?', 'Bereit für Ihre eigene Erfolgsgeschichte?'),
      ...tr('description', 'Every journey begins with a complimentary 15-minute phone alignment assessment.', 'Jede Reise beginnt mit einem kostenlosen 15-minütigen Telefongespräch.'),
      ...tr('primary_label', 'Schedule Assessment Call', 'Gespräch vereinbaren'),
      primary_target: 'booking',
    },
  ],
  about: [
    {
      _uid: 'ab-bio',
      component: 'bio_hero',
      ...tr('eyebrow', 'FOUNDING BEHAVIORIST BIOGRAPHY', 'BIOGRAFIE DER GRÜNDERIN'),
      ...tr('headline', 'Meet Sophia Binder', 'Lernen Sie Sophia Binder kennen'),
      image: asset('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'),
      body: doc(
        para('Hi, I’m Sophia. My journey into canine behavior started twelve years ago when I adopted a reactive GSD mix. Walks were painful, stressful, and loaded with embarrassment. Despite classic advice of quick physical checks and loud corrections, his reactivity only worsened.'),
        quote('I realized then that classical canine instruction was deeply outdated. We were trying to physically suppress a dog’s panic rather than addressing the root emotional source.'),
        para('This drove me to study behavioral psychology and earn clinical certifications with CCPDT and IAABC. Today, I combine academic canine behavior science with a clean, gentle Scandinavian design philosophy.'),
      ),
      body__i18n__de: doc(
        para('Hallo, ich bin Sophia. Meine Reise in die Hundeverhaltenskunde begann vor zwölf Jahren mit einem reaktiven Schäferhund-Mix. Spaziergänge waren stressig und beschämend. Trotz klassischer Ratschläge verschlimmerte sich seine Reaktivität nur.'),
        quote('Mir wurde klar, dass klassisches Training überholt war. Wir versuchten, die Panik eines Hundes zu unterdrücken, statt die emotionale Ursache anzugehen.'),
        para('Das brachte mich dazu, Verhaltenspsychologie zu studieren und Zertifizierungen bei CCPDT und IAABC zu erwerben. Heute verbinde ich Wissenschaft mit einer sanften skandinavischen Philosophie.'),
      ),
      ...tr('signature_name', 'Sophia Binder', 'Sophia Binder'),
      ...tr('signature_role', 'Founder & Head Consultant • CCPDT-KA', 'Gründerin & Leitende Beraterin • CCPDT-KA'),
      ...tr('badge_text', 'Active Practice WA State', 'Aktive Praxis WA State'),
    },
    {
      _uid: 'ab-certs',
      component: 'value_cards',
      ...tr('headline', 'Accredited Pedigree', 'Akkreditierte Qualifikationen'),
      columns: '2',
      cards: [
        card('cert-1', 'Award', 'CCPDT-KA', 'CCPDT-KA', 'Certified Professional Dog Trainer – Knowledge Assessed. License #412093.', 'Zertifizierte Hundetrainerin – Knowledge Assessed. Lizenz #412093.'),
        card('cert-2', 'Award', 'IAABC-ADT', 'IAABC-ADT', 'Accredited Dog Trainer by the International Association of Animal Behavior Consultants.', 'Akkreditierte Trainerin der IAABC.'),
        card('cert-3', 'Award', 'Fear-Free Pets', 'Fear-Free Pets', 'Certified handling protocols dedicated to complete emotional welfare.', 'Zertifizierte Protokolle für vollständiges emotionales Wohlbefinden.'),
        card('cert-4', 'Award', 'Fear-Free Veterinary', 'Fear-Free Veterinary', 'Specialized clinical behavior and animal restraint certification for vet practices.', 'Spezialisierte klinische Zertifizierung für Tierarztpraxen.'),
      ],
    },
    {
      _uid: 'ab-values',
      component: 'value_cards',
      ...tr('eyebrow', 'FOUNDATIONAL PILLARS', 'GRUNDPFEILER'),
      ...tr('headline', 'The Sophia Binder Framework', 'Das Sophia-Binder-Framework'),
      columns: '3',
      cards: [
        card('val-1', 'BrainCircuit', 'Evidence-Based Methods', 'Evidenzbasierte Methoden', 'We align our methods with modern canine cognitive science, using positive reinforcement to alter emotional responses rather than masking behaviors.', 'Wir richten unsere Methoden an moderner Kognitionswissenschaft aus und nutzen positive Verstärkung statt Verhaltensunterdrückung.'),
        card('val-2', 'HeartHandshake', 'Empathy for Handlers', 'Empathie für Halter', 'Living with an anxious or reactive dog is taxing. We never shame or judge — we cultivate an encouraging learning environment.', 'Das Leben mit einem ängstlichen Hund ist anstrengend. Wir verurteilen nie, sondern schaffen eine ermutigende Lernumgebung.'),
        card('val-3', 'Milestone', 'Clarity & Consistency', 'Klarheit & Konsequenz', 'Dogs thrive on routine. We break complex mechanics into clean worksheets and step-by-step guides so consistency is trivial.', 'Hunde brauchen Routine. Wir zerlegen komplexe Abläufe in klare Anleitungen, damit Konsequenz leichtfällt.'),
      ],
    },
    {
      _uid: 'ab-cta',
      component: 'cta_banner',
      ...tr('headline', 'Ready to start training?', 'Bereit für den Start?'),
      ...tr('description', 'Schedule a complimentary consultation and let’s design a peaceful path for your dog.', 'Vereinbaren Sie eine kostenlose Beratung und gestalten wir gemeinsam einen ruhigen Weg für Ihren Hund.'),
      ...tr('primary_label', 'Schedule Consultation', 'Beratung vereinbaren'),
      primary_target: 'booking',
      ...tr('secondary_label', 'Contact Sophia', 'Sophia kontaktieren'),
      secondary_target: 'contact',
    },
  ],
};

const SEO = {
  services: ['Training Programs | Sophia Binder', 'Trainingsprogramme | Sophia Binder'],
  faq: ['FAQ | Sophia Binder', 'FAQ | Sophia Binder'],
  testimonials: ['Client Reviews | Sophia Binder', 'Bewertungen | Sophia Binder'],
  about: ['About Sophia Binder', 'Über Sophia Binder'],
};

const list = await fetch(`${HOST}/v1/spaces/${SPACE}/stories?per_page=100`, {headers}).then((r) => r.json());
const stories = list.stories || [];
const pagesFolder = stories.find((s) => s.is_folder && s.full_slug === 'pages');
if (!pagesFolder) {
  console.error('No "pages" folder found — create it in Storyblok first.');
  process.exit(1);
}

for (const [slug, body] of Object.entries(PAGES)) {
  const content = {
    component: 'page',
    _uid: `page-${slug}`,
    body,
    ...tr('seo_title', SEO[slug][0], SEO[slug][1]),
  };
  const existing = stories.find((s) => s.full_slug === `pages/${slug}`);
  const story = {name: slug.charAt(0).toUpperCase() + slug.slice(1), slug, content, parent_id: pagesFolder.id};
  const res = existing
    ? await fetch(`${HOST}/v1/spaces/${SPACE}/stories/${existing.id}`, {method: 'PUT', headers, body: JSON.stringify({story, publish: 1})})
    : await fetch(`${HOST}/v1/spaces/${SPACE}/stories`, {method: 'POST', headers, body: JSON.stringify({story, publish: 1})});
  console.log(res.ok ? `✓ pages/${slug} ${existing ? 'updated' : 'created'} + published` : `✗ pages/${slug} ${res.status} ${await res.text()}`);
  await new Promise((r) => setTimeout(r, 300));
}
console.log('Done.');
