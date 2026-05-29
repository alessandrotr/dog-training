import { BlogPost, ServiceItem, TestimonialItem, FAQItem, StoryblokPage } from './types';

// Concrete paths for generated premium images
export const IMAGES = {
  hero: '/src/assets/images/hero_trainer_1780093921073.png',
  puppy: '/src/assets/images/puppy_training_1780093940929.png',
  reactive: '/src/assets/images/reactive_dog_1780093958673.png',
  obedience: '/src/assets/images/obedience_dog_1780093976803.png',
  dog1: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200&h=200',
  dog2: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=200&h=200',
  dog3: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200&h=200',
  trainerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
};

export const SERVICES: { en: ServiceItem[]; de: ServiceItem[] } = {
  en: [
    {
      id: 's-1',
      slug: 'puppy-training',
      title: 'Puppy Foundations',
      shortDescription: 'Set your puppy up for a lifetime of success with socialization, toilet training, and essential manners.',
      longDescription: 'Our Puppy Foundations program is designed for puppies aged 8 to 20 weeks. This critical developmental window is the absolute best time to shape good habits, prevent fear issues, and teach your pup how to navigate our human world with confidence.',
      price: '$120 / session',
      duration: '60 minutes',
      features: [
        'Positive socialization concepts',
        'Crate and toilet training guides',
        'Basic commands (Sit, Stay, Come)',
        'Biting, chewing, and jumping deterrence',
        'Personalized development blueprint',
        'Lifetime access to Puppy Portal digital resources'
      ],
      imageUrl: IMAGES.puppy,
      audience: 'Puppies 8-20 weeks old',
      icon: 'Sparkles'
    },
    {
      id: 's-2',
      slug: 'reactive-dog-rehab',
      title: 'Reactive Dog Rehabilitation',
      shortDescription: 'Transform stressful walks into peaceful strolls. Specialised support for leash pulling, barking, and lunging.',
      longDescription: 'Does your dog bark, lunge, or growl at other dogs, cars, or people? Reactivity is almost always driven by fear or over-arousal. Rather than force or punishment, we use force-free desensitization and counter-conditioning to change your dog’s underlying emotional state.',
      price: '$160 / session',
      duration: '75 minutes',
      features: [
        'Deep-dive behavioral assessment',
        'Understanding thresholds and trigger management',
        'Force-free counter-conditioning framework',
        'Loose leash techniques with high distraction',
        'Calming protocol guidelines',
        '14-day WhatsApp message support between consults'
      ],
      imageUrl: IMAGES.reactive,
      audience: 'Dogs of all ages exhibiting hyper-arousal, fear, or frustration',
      icon: 'ShieldAlert'
    },
    {
      id: 's-3',
      slug: 'private-obedience',
      title: 'Private One-on-One Obedience',
      shortDescription: 'Tailored coaching in the comfort of your own home to address specific manners, recall, and lifestyle habits.',
      longDescription: 'Whether you want a bulletproof recall, polite greetings at the front door, or simply a dog that listens the first time you ask, private sessions are the most efficient way to achieve your family lifestyle goals.',
      price: '$140 / session',
      duration: '60 minutes',
      features: [
        'In-home personalized coaching sessions',
        'Reliable recalls under heavy local distraction',
        'Polite guestsgreeting protocols',
        'Impeding resource guarding tendencies',
        'Customized homework worksheet after every session',
        '30-day follow-up review call'
      ],
      imageUrl: IMAGES.obedience,
      audience: 'All breeds and ages seeking targeted skill development',
      icon: 'UserCheck'
    },
    {
      id: 's-4',
      slug: 'board-and-train-lite',
      title: 'Day Training & Socialization',
      shortDescription: 'Leave your dog with a professional trainer for high-quality instruction and stimulation during the day.',
      longDescription: 'Are you busy? Day training allows our professional trainers to do the heavy lifting for you. We pick up your dog, train them in real-world contexts, and bring them back with a detailed handover lesson so you can maintain their progress effortlessly.',
      price: '$750 / week',
      duration: '3 days a week',
      features: [
        '3 professional training sessions per day',
        'Real-world proofing in parks and urban domains',
        'In-depth 45-min weekly handler handover session',
        'Video progress trackers and trainer voice-notes',
        'Polite social exposures with helper dogs',
        'Priority booking access'
      ],
      imageUrl: IMAGES.hero,
      audience: 'Busy owners wanting fast, professional habit shaping',
      icon: 'CalendarDays'
    }
  ],
  de: [
    {
      id: 's-1',
      slug: 'puppy-training',
      title: 'Welpen-Grundlagen',
      shortDescription: 'Bereiten Sie Ihren Welpen mit gezielter Sozialisierung, Stubenreinheitstraining und Grundgehorsam auf ein glückliches Hundeleben vor.',
      longDescription: 'Unser Welpen-Grundlagen-Programm wurde speziell für Welpen im Alter von 8 bis 20 Wochen entwickelt. Dieses kritische Entwicklungsfenster ist die beste Zeit, um gute Gewohnheiten zu formen, Angstproblemen vorzubeugen und Ihrem Welpen beizubringen, sich mit Vertrauen in unserer Menschenwelt zu bewegen.',
      price: '110 € / Einheit',
      duration: '60 Minuten',
      features: [
        'Konzepte zur positiven Sozialisierung',
        'Anleitungen zur Boxen- & Stubenreinheit',
        'Grunkommandos (Sitz, Platz, Hier)',
        'Umgang mit Knabbern, Beißen und Anspringen',
        'Persönlicher Entwicklungsplan',
        'Lebenslanger Zugriff auf digitale Ressourcen im Welpenportal'
      ],
      imageUrl: IMAGES.puppy,
      audience: 'Welpen im Alter von 8 bis 20 Wochen',
      icon: 'Sparkles'
    },
    {
      id: 's-2',
      slug: 'reactive-dog-rehab',
      title: 'Reaktivitäts-Rehabilitation',
      shortDescription: 'Verwandeln Sie stressige Spaziergänge in entspannte Ausflüge. Spezialisierte Hilfe bei Zerren, Bellen und Leinenaggression.',
      longDescription: 'bellt, zieht oder knurrt Ihr Hund andere Hunde, Autos oder Menschen an der Leine an? Reaktivität wird fast immer durch Angst oder Übererregung ausgelöst. Statt Zwang nutzen wir sanfte, gewaltfreie Desensibilisierung und Gegenkonditionierung, um den emotionalen Zustand Ihres Hundes nachhaltig zu verbessern.',
      price: '150 € / Einheit',
      duration: '75 Minuten',
      features: [
        'Detaillierte Analyse des Verhaltensbudgets',
        'Erkennung von Reizschwellen und Trigger-Management',
        'Gewaltfreie Gegenkonditionierungsmethoden',
        'Leinenführigkeit unter hoher Ablenkung',
        'Entspannungsprotokolle für den Alltag',
        '14 Tage WhatsApp-Support zwischen den Einheiten'
      ],
      imageUrl: IMAGES.reactive,
      audience: 'Hunde jeden Alters, die Frustration oder Angst an der Leine zeigen',
      icon: 'ShieldAlert'
    },
    {
      id: 's-3',
      slug: 'private-obedience',
      title: 'Privates Einzeltraining',
      shortDescription: 'Präzises Coaching im vertrauten Heimbereich für exzellenten Rückruf, Höflichkeit im Alltag und glückliches Zusammenleben.',
      longDescription: 'Egal, ob Sie einen absolut verlässlichen Rückruf aufbauen möchten, höfliches Verhalten beim Empfang von Gästen üben oder einfach eine bessere Bindung wünschen – private Einzelstunden sind der effizienteste Weg, Ihre Ziele zu erreichen.',
      price: '130 € / Einheit',
      duration: '60 Minuten',
      features: [
        'Individuelle Betreuung direkt bei Ihnen vor Ort',
        'Zuverlässiger Rückruf unter hoher Ablenkung',
        'Höfliches Begrüßen von Gästen an der Haustür',
        'Vorbeugung von Ressourcenverteidigung',
        'Detaillierter Trainingsplan nach jeder Stunde',
        '30 Tage Nachsorge-Telefonat inklusive'
      ],
      imageUrl: IMAGES.obedience,
      audience: 'Alle Rassen und Altersstufen bei gezielten Trainingswünschen',
      icon: 'UserCheck'
    },
    {
      id: 's-4',
      slug: 'board-and-train-lite',
      title: 'Tages-Training & Sozialisierung',
      shortDescription: 'Geben Sie Ihren Hund tagsüber in die Hände eines Profis für hochkarätiges Training und tiergerechte Auslastung.',
      longDescription: 'Haben Sie einen vollen Terminkalender? Beim Tages-Training übernehmen wir die Arbeit für Sie. Wir holen Ihren Hund ab, trainieren ihn in realen Situationen und bringen ihn mit einer detaillierten Übergabe-Lektion zurück, damit Sie die Fortschritte mühelos festigen können.',
      price: '700 € / Woche',
      duration: '3 Tage pro Woche',
      features: [
        '3 professionelle Trainingseinheiten pro Tag',
        'Training im städtischen Raum und in Parks',
        'Inhaltsreiche 45-minütige Übergabe-Stunde jede Woche',
        'Tägliche Fortschritts-Videos & Feedback per Sprachnachricht',
        'Kontrollierte Sozialkontakte mit Assistenzhunden',
        'Bevorzugter Zugriff auf weitere Termine'
      ],
      imageUrl: IMAGES.hero,
      audience: 'Beschäftigte Hundehalter, die sich schnelle Ergebnisse wünschen',
      icon: 'CalendarDays'
    }
  ]
};

export const TESTIMONIALS: { en: TestimonialItem[]; de: TestimonialItem[] } = {
  en: [
    {
      id: 't-1',
      name: 'Sarah & Cooper',
      dogBreed: 'Golden Retriever (7 months)',
      rating: 5,
      text: 'Enrolling in the Puppy Foundations program was the single best decision we made. Clara’s calm, positive approach clicked immediately with Cooper. Walks are absolutely joyful now and his recall is flawless!',
      imageUrl: IMAGES.dog1,
      date: 'May 12, 2026',
      source: 'direct'
    },
    {
      id: 't-2',
      name: 'Marcus & Baxter',
      dogBreed: 'German Shepherd mix (2 years)',
      rating: 5,
      text: 'Baxter was extremely reactive to other dogs—barking, lunging, and pulling. Claras techniques didn’t crush Baxters spirit; they taught him how to trust us and settle down. We can finally walk comfortably in busy parks!',
      imageUrl: IMAGES.dog2,
      date: 'April 28, 2026',
      source: 'google'
    },
    {
      id: 't-3',
      name: 'Emily, Tomas & Luna',
      dogBreed: 'French Bulldog (11 months)',
      rating: 5,
      text: 'Luna had horrible separation anxiety and chewed through our doors. The gentle, Scandinavian-inspired conditioning approach worked wonders. She is now calm, independent, and truly enjoys her cozy crate space.',
      imageUrl: IMAGES.dog3,
      date: 'May 15, 2026',
      source: 'google'
    }
  ],
  de: [
    {
      id: 't-1',
      name: 'Sarah & Cooper',
      dogBreed: 'Golden Retriever (7 Monate)',
      rating: 5,
      text: 'Die Teilnahme am Welpen-Grundlagen-Kurs war die beste Entscheidung überhaupt. Claras ruhiges, positives Vorgehen hat bei Cooper sofort Früchte getragen. Unsere Spaziergänge machen wieder richtig Spaß!',
      imageUrl: IMAGES.dog1,
      date: '12. Mai 2026',
      source: 'direct'
    },
    {
      id: 't-2',
      name: 'Marcus & Baxter',
      dogBreed: 'Mischling (2 Jahre)',
      rating: 5,
      text: 'Baxter war an der Leine extrem reaktiv. Claras Methoden haben seinen Charakter geachtet und ihm beigebracht, uns zu vertrauen und sich zu entspannen. Spaziergänge im Park sind nun wieder völlig entspannt.',
      imageUrl: IMAGES.dog2,
      date: '28. April 2026',
      source: 'google'
    },
    {
      id: 't-3',
      name: 'Emily, Tomas & Luna',
      dogBreed: 'Französische Bulldogge (11 Monate)',
      rating: 5,
      text: 'Luna litt unter massiver Trennungsangst. Das sanfte skandinavische Training wirkte wahre Wunder. Inzwischen schläft sie entspannt in ihrer Hundebox, wenn wir weg sind.',
      imageUrl: IMAGES.dog3,
      date: '15. Mai 2026',
      source: 'google'
    }
  ]
};

export const FAQS: { en: FAQItem[]; de: FAQItem[] } = {
  en: [
    {
      id: 'f-1',
      category: 'Methods',
      question: 'What training methods do you use?',
      answer: 'We use strictly force-free, scientific positive-reinforcement methods. This means we reward desired behaviors with food, play, play-exposure, and praise, while using trigger management and environment restructuring to prevent unwanted behaviors. We never employ choke chains, prong collars, shock collars, or physical corrections, as modern canine science proves these damage trust and increase reactivity.'
    },
    {
      id: 'f-2',
      category: 'Logistics',
      question: 'Where do the training sessions take place?',
      answer: 'Our private sessions take place in your home, backyard, or local neighborhood parks—wherever your dog’s actual triggers and behaviors occur. For reactivity rehab, we usually start in a distraction-free space inside your home before gradually transferring to outdoor spaces once your dog has built baseline emotional stability.'
    },
    {
      id: 'f-3',
      category: 'Puppies',
      question: 'At what age can my puppy start training?',
      answer: 'Your puppy can start private foundations or in-home socialization as early as 8 weeks old, as long as they have received their first round of vaccinations. In fact, training during the 8-to-16-week window is the absolute most impactful training your canine will ever receive.'
    },
    {
      id: 'f-4',
      category: 'Behavior',
      question: 'My dog is extremely fearful and aggressive. Can you help?',
      answer: 'Yes. Clara specializes in complex behavioral rehabilitation, including dog-to-dog reactivity, resource guarding, and separation anxiety. We complete a comprehensive stress and environment audit of your dog’s daily routine to design a holistic rehabilitation program.'
    }
  ],
  de: [
    {
      id: 'f-1',
      category: 'Methoden',
      question: 'Welche Trainingsmethoden wenden Sie an?',
      answer: 'Wir arbeiten ausschließlich mit gewaltfreien, wissenschaftlich fundierten Methoden der positiven Verstärkung. Das bedeutet, dass wir erwünschtes Verhalten mit Futter, Spiel und Lob belohnen, während wir das Umfeld so anpassen, dass unerwünschtes Verhalten gar nicht erst entsteht. Würger, Stachelhalsbänder oder körperliche Korrekturen lehnen wir strikt ab, da sie das Vertrauen zerstören und Angst bzw. Reaktivität verstärken.'
    },
    {
      id: 'f-2',
      category: 'Ablauf',
      question: 'Wo finden die Einheiten statt?',
      answer: 'Unsere Einzelstunden finden direkt bei Ihnen zu Hause, im Garten oder in Ihren lokalen Parks statt – genau dort, wo die Auslöser im Alltag auftreten. Bei reaktiven Hunden starten wir oft in ablenkungsfreier Umgebung in Ihren vier Wänden, bevor wir schrittweise nach draußen gehen.'
    },
    {
      id: 'f-3',
      category: 'Welpen',
      question: 'Ab welchem Alter kann mein Welpe mit dem Training starten?',
      answer: 'Ihr Welpe kann bereits ab der 8. Lebenswoche mit dem in-home Einzeltraining beginnen, sobald er die erste Impfung erhalten hat. Die Lebenswochen 8 bis 16 sind die prägendste Phase im Leben eines Hundes, weshalb ein früher, geführter Start enorm wertvoll ist.'
    },
    {
      id: 'f-4',
      category: 'Verhalten',
      question: 'Mein Hund zeigt ausgeprägte Angst oder Aggression. Können Sie helfen?',
      answer: 'Ja, definitiv. Clara hat sich auf komplexe Hundeverhaltenstherapie spezialisiert: darunter Leinenaggressivität, Futterneid, Angstverhalten und Trennungsschmerz. Wir führen eine fundierte Stress- und Umweltanalyse durch, um ein individuelles Therapiekonzept zu erstellen.'
    }
  ]
};

export const BLOG_POSTS: { en: BlogPost[]; de: BlogPost[] } = {
  en: [
    {
      id: 'b-1',
      slug: 'understanding-leash-reactivity',
      title: 'Understanding Canine Leash Reactivity: The Fear-Free Desensitization Guide',
      summary: 'Discover why your calm companion barks and lunges at other dogs when on a leash, and learn the essential steps to cultivate lasting composure.',
      imageUrl: IMAGES.reactive,
      publishDate: 'May 20, 2026',
      readingTime: '6 min read',
      category: 'Behavior & Training',
      author: {
        name: 'Clara Sorensen',
        role: 'Certified Head Behaviorist',
        avatar: IMAGES.trainerAvatar,
        bio: 'Clara is a canine behavior specialist certified by the CCPDT and IAABC, focusing on force-free rehabilitation with a calm Scandinavian design philosophy.'
      },
      tags: ['Reactivity', 'Leash Pulling', 'Positive Reinforcement'],
      seo: {
        metaTitle: 'Guide to Canine Leash Reactivity | NordDog Training',
        metaDescription: 'Learn why your dog lunges and barks on leash and how to use force-free desensitization to enjoy calm, happy walks. CCPDT-certified expert guide.',
      },
      tableOfContents: [
        { id: '1-what-is-reactivity', text: 'What is Leash Reactivity?', depth: 2 },
        { id: '2-reactivity-vs-aggression', text: 'Reactivity vs. Aggression: The Key Difference', depth: 2 },
        { id: '3-understand-the-threshold', text: 'Step 1: Understanding Your Dog’s Threshold', depth: 2 },
        { id: '4-counter-conditioning', text: 'Step 2: Desensitization and Counter-Conditioning', depth: 2 },
        { id: '5-practical-tips', text: 'Step 3: Five Crucial Tips for Daily Walks', depth: 2 },
      ],
      content: `
        <h2>The Drama at the End of the Leash</h2>
        <p>It’s a scenario familiar to countless dog owners: you’re enjoying a quiet morning stroll, but the moment another dog appears two blocks away, your sweet family companion turns into a spinning, barking, lunging force of nature. It’s exhausting, isolating, and often deeply embarrassing.</p>
        
        <p>The first step to solving leash reactivity is understanding that <strong>reactivity is not malice; it is a profound emotional overflow</strong>. Today, we'll demystify this behavior and outline the exact roadmap to quiet, harmonious strolls.</p>
  
        <div id="1-what-is-reactivity" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">What actually is Leash Reactivity?</h3>
        <p>Leash reactivity is an over-reaction to normal stimuli (like other dogs, children, bicycles, or cars). The leash acts as a physical barrier. In canine communication, dogs are naturally fluid: when uncomfortable, their instinct is to walk in dynamic curves or turn away. When we clip a tight cord to their collar, we eliminate their primary survival option: flight.</p>
        <p>Left with no escape, the dog chooses <em>fight behaviors</em> (loud barking, lunging, barring teeth) purely as a defensive strategy to drive the scary trigger away. It works: the other dog walks past, so your dog believes their behavior successfully kept them safe.</p>
  
        <div id="2-reactivity-vs-aggression" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Reactivity vs. Aggression: The Key Difference</h3>
        <p>Many owners fear their dog is "aggressive." However, most leash reactive dogs are highly sociable off-leash or simply frustrated "greetings seekers." When off-leash, they can play beautifully. But when tied, their inability to say hello breeds massive frustration. Aggression aims to cause physical harm; reactivity is a panic-driven coping mechanism.</p>
  
        <div id="3-understand-the-threshold" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Step 1: Understanding Your Dog’s Threshold</h3>
        <p>The **threshold** is the imaginary line where your dog transitions from calm and learning-ready to hyper-aroused or panicking. If your dog is already barking and lunging, they are "above threshold." At this stage, their cortex shuts down and their amygdala is flooded with cortisol. Training at this point is completely useless—they literally cannot process rewards or hear your voice.</p>
        <p>Successful training happens <strong>below threshold</strong>, where your dog notices the trigger but remains calm enough to take a treat and disengage voluntarily.</p>
  
        <div id="4-counter-conditioning" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Step 2: Desensitization and Counter-Conditioning</h3>
        <p>Classic desensitization means exposing your dog to the trigger at a distance that keeps them entirely happy and below threshold. Counter-conditioning involves pairing the sight of the trigger with something extremely wonderful—like prime beef liver cubes or roasted chicken.</p>
        <p>Over several weeks, your dog’s brain goes through a profound neurological shift: instead of <em>"Oh no, another dog, I must fight!"</em>, they begin to think: <strong>"Look, a dog! That means delicious liver is coming from my handler. Fantastic!"</strong></p>
  
        <div id="5-practical-tips" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Step 3: Five Crucial Tips for Daily Walks</h3>
        <ul>
          <li><strong>Ditch the Retractable Leash:</strong> Use a flat, fixed 1.8m (6ft) webbing leash attached to a Y-shaped ergonomic harness. Choke chains or prongs increase pain when seeing triggers, worsening their fear.</li>
          <li><strong>Keep the Leash Loose:</strong> Dogs can feel tension through the leash. Tightening your grip tells your dog there is an immediate emergency. Keep a relaxed J-loop leash.</li>
          <li><strong>Play the "Look at That" Game:</strong> The moment your dog looks at another dog, mark with a clicker or word "Yes!" and feed a high-value treaty. Let them voluntarily choice to look back at you.</li>
          <li><strong>Master the U-Turn:</strong> Create a fun, verbal cue like "Let's go!" and practice rapid, happy 180-degree turns inside your hallway before applying it on walks to evade sudden triggers around blind corners.</li>
          <li><strong>Be Kind to Yourself:</strong> Recovery is not linear. There will be bad days. If an overflow happens, calmly walk away, give your dog a couple of days to decompress, and reset.</li>
        </ul>
      `
    },
    {
      id: 'b-2',
      slug: 'puppy-socialization-checklist',
      title: 'The Modern Puppy Socialization Checklist: Quality Over Quantity',
      summary: 'Socialization is not simply letting your pup meet every dog on the block. Discover why controlled positive exposures shape a secure, friendly adult dog.',
      imageUrl: IMAGES.puppy,
      publishDate: 'May 10, 2026',
      readingTime: '5 min read',
      category: 'Puppy Care',
      author: {
        name: 'Clara Sorensen',
        role: 'Certified Head Behaviorist',
        avatar: IMAGES.trainerAvatar,
      },
      tags: ['Puppy', 'Socialization', 'Preventative Care'],
      seo: {
        metaTitle: 'Puppy Socialization Checklist & Guide | NordDog Training',
        metaDescription: 'Discover the scientific modern approach to puppy socialization. Learn guidelines for exposure, habituation, and positive canine associations.',
      },
      tableOfContents: [
        { id: '1-what-is-socialization', text: 'Socialization is Not "Greeting"', depth: 2 },
        { id: '2-critical-window', text: 'The Critical Development Window', depth: 2 },
        { id: '3-golden-rules', text: 'Three Golden Rules of Exposure', depth: 2 },
      ],
      content: `
        <h2>The Socialization Myth</h2>
        <p>For decades, new puppy owners were told to introduce their puppy to "100 people and 100 dogs in the first 100 days." While well-meaning, this frantic approach often produces super-frustrated or highly anxious adult dogs who expect to greet every single creature, or feel completely overwhelmed in public.</p>
        
        <p>Modern canine science emphasizes <strong>quality of exposure over sheer quantity</strong>. Socialization isn't about physical interaction; it's about learning that the world is a safe place where unusual objects can be ignored calmly.</p>
  
        <div id="1-what-is-socialization" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Socialization is Not "Greeting"</h3>
        <p>True socialization is the process of building neutral and positive associations. When your puppy sees a stranger open a colorful umbrella, we don't need them to run over and lick the person. Instead, we want your puppy to watch the event, hear the noise, glance back at you, receive a treat, and realize: "Ah, that weird umbrella thing is totally normal and boring."</p>
  
        <div id="2-critical-window" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">The Critical Development Window</h3>
        <p>Dogs have a specific neurological window between 3 and 16 weeks of age where fear levels are very low, and their brains are highly receptive to novel sights, sounds, surfaces, and smells. Once this window closes, anything unfamiliar is treated with natural biological suspicion.</p>
  
        <div id="3-golden-rules" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Three Golden Rules of Exposure</h3>
        <ul>
          <li><strong>Control the Distance:</strong> Always supervise exposures. Ensure your puppy can watch unusual things from a safe distance where they feel secure enough to feed.</li>
          <li><strong>Listen to the Body Language:</strong> Licking lips, yawning, pinning ears, or tucking tail means your puppy is overwhelmed. Remove them immediately from the scenario.</li>
          <li><strong>Expose to Diverse Textures:</strong> Walk them on gravel, sand, iron grates, wet grass, and plastic sheets. This builds deep neural resilience.</li>
        </ul>
      `
    }
  ],
  de: [
    {
      id: 'b-1',
      slug: 'understanding-leash-reactivity',
      title: 'Hundereaktivität an der Leine verstehen: Der entspannte Trainingsguide',
      summary: 'Erfahren Sie, warum Ihr Hund an der Leine andere Hunde anbellt und anzieht, und lernen Sie die entscheidenden Schritte für entspannte Begegnungen.',
      imageUrl: IMAGES.reactive,
      publishDate: '20. Mai 2026',
      readingTime: '6 Min. Lesezeit',
      category: 'Verhalten & Training',
      author: {
        name: 'Clara Sorensen',
        role: 'Zertifizierte Verhaltenstherapeutin',
        avatar: IMAGES.trainerAvatar,
        bio: 'Clara ist eine nach CCPDT und IAABC zertifizierte Hunde-Spezialistin. Sie fokussiert sich auf gewaltfreie Rehabilitation mit einem klaren, von Geduld geprägten Leitbild.'
      },
      tags: ['Leinenaggression', 'Hundebegegnung', 'Positive Verstärkung'],
      seo: {
        metaTitle: 'Hundereaktivität an der Leine | NordDog Training',
        metaDescription: 'Warum Hunde an der Leine bellen und wie man mit Gegenkonditionierung entspannte Hundebegegnungen meistert. Fachlicher Leitfaden von Clara.',
      },
      tableOfContents: [
        { id: '1-what-is-reactivity', text: 'Was ist eigentlich Leinenreaktivität?', depth: 2 },
        { id: '2-reactivity-vs-aggression', text: 'Reaktivität vs. Aggression: Der große Unterschied', depth: 2 },
        { id: '3-understand-the-threshold', text: 'Schritt 1: Reizschwellen richtig einschätzen', depth: 2 },
        { id: '4-counter-conditioning', text: 'Schritt 2: Desensibilisierung im Alltag', depth: 2 },
        { id: '5-practical-tips', text: 'Schritt 3: 5 goldene Regeln für den Spaziergang', depth: 2 },
      ],
      content: `
        <h2>Das Drama am Ende der Leine</h2>
        <p>Ein Bild, das viele Hundebesitzer kennen: Sie gehen entspannt spazieren, doch sobald am Horizont ein anderer Hund auftaucht, verwandelt sich Ihr geliebter Vierbeiner in ein bellendes, ziehendes Energiebündel. Das ist anstrengend und oft sehr peinlich.</p>
        
        <p>Der erste Schritt zur Lösung: <strong>Reaktivität entspringt fast nie böswilliger Absicht, sondern einer emotionalen Überlastung.</strong> Heute zeigen wir Ihnen das wissenschaftlich bewährte Vorgehen für entspannte Begegnungen.</p>
  
        <div id="1-what-is-reactivity" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Was ist Leinenreaktivität?</h3>
        <p>Leinenreaktivität ist eine Überreaktion auf normale Umweltreize (wie andere Hunde, Fahrräder oder Autos). Die Leine schränkt die Bewegungsfreiheit ein. Im freien Kontakt weichen Hunde im Bogen aus. Durch die kurze Leine entfällt die Option der Flucht.</p>
        <p>Ohne Fluchtoption wählt der Hund oft die Verteidigung nach vorne (Bellen, Knurren, Drohen), um den Reiz auf Distanz zu halten. Hat der andere Hund die Distanz vergrößert, verbucht das Hundegehirn dies als Erfolg seiner Strategie.</p>
  
        <div id="2-reactivity-vs-aggression" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Reaktivität vs. Aggression: Der große Unterschied</h3>
        <p>Viele Besitzer befürchten direkt, ihr Hund sei „aggressiv“. Doch die meisten leinenreaktiven Hunde sind ohne Leine absolut verträglich oder schlicht frustriert, weil sie nicht hinlaufen können. Echte Aggression möchte verletzen. Reaktivität ist ein angstbasiertes Ventil.</p>
  
        <div id="3-understand-the-threshold" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Schritt 1: Reizschwellen richtig einschätzen</h3>
        <p>Die <strong>Reizschwelle</strong> ist der Bereich, in dem Ihr Hund von Ruhe in Stress umschaltet. Ist ein Hund bereits am Bellen und Toben, befindet er sich weit über dieser Schwelle. Ein Lernen oder der Abruf von Kommandos ist in dieser Kampf- oder Flucht-Phase im Gehirn biologisch blockiert.</p>
        <p>Erfolgreiches Training findet stets <strong>unter der Reizschwelle</strong> statt – dort, wo der Hund den Auslöser zwar registriert, aber noch ansprechbar ist und eine Belohnung annehmen kann.</p>
  
        <div id="4-counter-conditioning" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Schritt 2: Desensibilisierung im Alltag</h3>
        <p>Systematische Desensibilisierung heißt, den Hund Reizen in einer Entfernung auszusetzen, die ihn nicht stresst. Dies koppeln wir mit exzellenten Belohnungen (z. B. feinstes Hühnchenfleisch oder Käse).</p>
        <p>Nach einigen Wochen verknüpft das Gehirn neu: Aus <em>„Hilfe, ein Hund, ich muss drohen!“</em> wird <strong>„Klasse, ein Hund! Das bedeutet, bei meiner Bezugsperson gibt es gleich etwas ganz Leckeres!“</strong></p>
  
        <div id="5-practical-tips" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Schritt 3: 5 goldene Regeln für den Spaziergang</h3>
        <ul>
          <li><strong>Verzichten Sie auf Rollleinen:</strong> Nutzen Sie eine feste 2-Meter-Leine und ein gut sitzendes, ergonomisches Y-Geschirr. Halsbänder oder gar Würger verstärken Schmerzen bei Zug, was die Panik vor dem Auslöser schürt.</li>
          <li><strong>Halten Sie die Leine locker:</strong> Spannung überträgt sich direkt auf den Hund. Ein verkrampfter Griff signalisiert Gefahr. Ein lockerer Durchhang signalisiert Ruhe.</li>
          <li><strong>Etablieren Sie das „Zeigen und Benennen“:</strong> Sobald Ihr Hund den Auslöser ansieht, markieren Sie dies (Clicker/Markerwort) und belohnen Sie ihn hochwertig. Lassen Sie ihn selbstständig wegschauen klären.</li>
          <li><strong>Meistern Sie die Plan-B-Kehrtwende:</strong> Üben Sie zu Hause eine fröhliche 180-Grad-Kurve („Kehrt!“) und setzen Sie diese draußen proaktiv ein, um Überraschungen an unübersichtlichen Ecken auszuweichen.</li>
          <li><strong>Seien Sie nachsichtig:</strong> Verhaltenstherapie verläuft nicht geradlinig. Es wird Rückschläge geben. Gehen Sie gelassen damit um und weichen Sie beim nächsten Mal großräumiger aus.</li>
        </ul>
      `
    },
    {
      id: 'b-2',
      slug: 'puppy-socialization-checklist',
      title: 'Der moderne Welpen-Sozialisierungsguide: Klasse statt Masse',
      summary: 'Sozialisierung bedeutet nicht, dass Ihr Welpe jeden Hund auf der Straße beschnüffeln muss. Erfahren Sie, warum kontrollierte positive Erfahrungen einen souveränen Hund formen.',
      imageUrl: IMAGES.puppy,
      publishDate: '10. Mai 2026',
      readingTime: '5 Min. Lesezeit',
      category: 'Welpenerziehung',
      author: {
        name: 'Clara Sorensen',
        role: 'Zertifizierte Verhaltenstherapeutin',
        avatar: IMAGES.trainerAvatar,
      },
      tags: ['Welpenerziehung', 'Sozialisierung', 'Prävention'],
      seo: {
        metaTitle: 'Welpen richtig sozialisieren | NordDog Training',
        metaDescription: 'Wissenschaftlicher Ansatz zur Welpen-Sozialisierung. Erfahren Sie die wichtigsten Leitlinien für positive Umwelterfahrungen ohne Überforderung.',
      },
      tableOfContents: [
        { id: '1-what-is-socialization', text: 'Sozialisierung ist nicht gleich „Hallo sagen“', depth: 2 },
        { id: '2-critical-window', text: 'Die sensible Entwicklungsphase', depth: 2 },
        { id: '3-golden-rules', text: '3 goldene Regeln für Welpen-Exkursionen', depth: 2 },
      ],
      content: `
        <h2>Der Mythos der Sozialisierung</h2>
        <p>Jahrzehntelang hieß es: Ein Welpe muss in den ersten 100 Tagen möglichst 100 Menschen und 100 Hunde treffen. Diese hektische Reizüberflutung erzeugt jedoch oft völlig aufgedrehte oder extrem ängstliche erwachsene Hunde, die in der Öffentlichkeit keine Ruhe mehr finden.</p>
        
        <p>Die moderne Kynologie betont: <strong>Qualität der Erfahrung geht vor Quantität.</strong> Bei der Sozialisierung geht es darum, dass der Welpe lernt, ungewöhnliche Reize entspannt zu ignorieren.</p>
  
        <div id="1-what-is-socialization" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Sozialisierung ist nicht gleich „Hallo sagen“</h3>
        <p>Sinnvolle Sozialisierung baut neutrale bis positive Abspeicherung auf. Wenn ein Passant vor Ihrem Welpen einen großen Regenschirm öffnet, muss der Welpe nicht hinlaufen. Wir möchten vielmehr, dass er das Geschehen kurz ansieht, sich zu Ihnen wendet und ein Leckerli kassiert. Er speichert ab: „Ah, der aufgespannte Schirm ist völlig harmlos und langweilig.“</p>
  
        <div id="2-critical-window" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Die sensible Entwicklungsphase</h3>
        <p>Hunde durchlaufen zwischen der 3. und 16. Lebenswoche ein kurzes Zeitfenster, in der das Gehirn extrem anpassungsfähig und neugierig ist. Später werden unbekannte Reize instinktiv erst einmal biologisch misstrauisch beäugt.</p>
  
        <div id="3-golden-rules" class="scroll-mt-24 h-4"></div>
        <h3 class="text-2xl font-semibold mt-8 mb-4">3 goldene Regeln für Welpen-Exkursionen</h3>
        <ul>
          <li><strong>Wahren Sie Distanz:</strong> Ermöglichen Sie es Ihrem Welpen, Neues aus sicherer Entfernung zu beobachten, in der er sich sicher fühlt und fressen kann.</li>
          <li><strong>Achten Sie auf Körpersignale:</strong> Lefzenlecken, Gähnen, angelegte Ohren oder ein eingezogener Schwanz sind Stressanzeichen. Beenden Sie die Situation sofort.</li>
          <li><strong>Gemeinsam verschiedene Böden erkunden:</strong> Gehen Sie mit Ihrem Welpen über Kies, Sand, nasse Wiesen, Metallgitter und knisternde Planen. Das stärkt das Selbstvertrauen nachhaltig.</li>
        </ul>
      `
    }
  ]
};

export const STORYBLOK_DEMO_DATA: { en: { [slug: string]: StoryblokPage }; de: { [slug: string]: StoryblokPage } } = {
  en: {
    'home': {
      name: 'Home Page Template',
      slug: 'home',
      seo: {
        metaTitle: 'NordDog | Premium Gentle Canine Education & Training',
        metaDescription: 'CCBDT & IAABC certified force-free dog training in beautiful Scandinavian-inspired spaces. Puppy foundations, reactivity rehabilitation, and private in-home obedience coaching.',
        ogImage: IMAGES.hero,
        ogType: 'website'
      },
      body: [
        {
          _uid: 'component-hero-1',
          component: 'hero',
          headline: 'Cultivating Calm, Connected Companions',
          subheadline: 'Crafting premium, scientifically backed, force-free canine education. Specialized private training shaped around your unique family lifestyle.',
          cta_primary: 'Book Consult',
          cta_secondary: 'Browse Services',
          image: IMAGES.hero,
          badge: 'SCANDINAVIAN CANINE EDUCATION'
        },
        {
          _uid: 'component-trust-1',
          component: 'trust_indicators',
          years_experience: '12+ Years',
          happy_dogs: '1,400+ Successes',
          rating: '4.9/5 stars based on 180+ Google reviews',
          certifications: ['CCPDT-KA Certified Handler', 'IAABC Behavior Consultant', 'Fear-Free Certified Professional']
        },
        {
          _uid: 'component-services-1',
          component: 'services_grid',
          title: 'Our Core Practices',
          subtitle: 'Every dog is an individual. We tailor our scientific approach specifically to your dog’s age, breed, and family routine.',
          services_slugs: ['puppy-training', 'reactive-dog-rehab', 'private-obedience']
        },
        {
          _uid: 'component-cta-1',
          component: 'cta',
          title: 'Ready for a Peaceful Companion?',
          description: 'Schedule a comprehensive behavior consult and receive a customized, step-by-step training outline tailored to your household.',
          btn_label: 'Schedule Your In-Home Assessment',
          btn_link: 'booking'
        }
      ]
    },
    'about': {
      name: 'About Page Template',
      slug: 'about',
      seo: {
        metaTitle: 'About Clara | NordDog Head Trainer',
        metaDescription: 'Meet Clara Sorensen, accredited canine behaviorist. Combining positive scientific frameworks with peaceful, dedicated family training.',
        ogImage: IMAGES.trainerAvatar,
        ogType: 'website'
      },
      body: [
        {
          _uid: 'about-hero-1',
          component: 'hero',
          headline: 'About Clara & The NordDog Philosophy',
          subheadline: 'Canine behavioral science does not require force or intimidation. When we understand how dogs learn, we can teach with clarity, kindness, and deep precision.',
          cta_primary: 'Read Bio',
          cta_secondary: 'Contact Directly',
          image: IMAGES.trainerAvatar,
          badge: 'FOUNDING BEHAVIORIST'
        },
        {
          _uid: 'about-desc-1',
          component: 'rich_text',
          title: 'The Philosophy of Connected Leadership',
          text: 'Clara Sorensen founded NordDog with a simple, powerful vision: bringing high-end, compassionate Scandinavian-inspired dog training directly to families. Trained in behavioral psychology, Clara holds credentials from top-tier canine organizations and focuses on teaching handlers how to communicate effectively without ever reverting to fear or pain.'
        }
      ]
    }
  },
  de: {
    'home': {
      name: 'Startseiten-Template (Home)',
      slug: 'home',
      seo: {
        metaTitle: 'NordDog | Hochwertiges & Gewalterfreies Hundetraining',
        metaDescription: 'CCBDT & IAABC zertifiziertes gewaltfreies Hundetraining. Welpenerziehung, Leinenreaktivität-Rehabilitation und privates Einzeltraining vor Ort.',
        ogImage: IMAGES.hero,
        ogType: 'website'
      },
      body: [
        {
          _uid: 'component-hero-1',
          component: 'hero',
          headline: 'Fröhliche, entspannte Alltagsbegleiter an Ihrer Seite',
          subheadline: 'Entwickeln Sie eine tiefe Bindung durch wissenschaftlich fundiertes, gewaltfreies Hundetraining. Speziell auf das häusliche Umfeld und Ihren Alltag abgestimmt.',
          cta_primary: 'Erstgespräch buchen',
          cta_secondary: 'Trainingsprogramme',
          image: IMAGES.hero,
          badge: 'SKANDINAVISCHE HUNDEAUSBILDUNG'
        },
        {
          _uid: 'component-trust-1',
          component: 'trust_indicators',
          years_experience: '12+ Jahre',
          happy_dogs: '1.400+ Erfolge',
          rating: '4.9/5 Sterne aus über 180 Google-Bewertungen',
          certifications: ['CCPDT-KA Zertifizierter Trainer', 'IAABC Verhaltensberater', 'Fear-Free Zertifizierter Experte']
        },
        {
          _uid: 'component-services-1',
          component: 'services_grid',
          title: 'Unsere Leitlinien',
          subtitle: 'Jeder Hund ist ein Individuum. Wir richten unser Training nach Alter, Rasse und dem individuellen Lebensstil Ihrer Familie aus.',
          services_slugs: ['puppy-training', 'reactive-dog-rehab', 'private-obedience']
        },
        {
          _uid: 'component-cta-1',
          component: 'cta',
          title: 'Sehnen Sie sich nach entspannten Spaziergängen?',
          description: 'Vereinbaren Sie eine fundierte Verhaltensberatung und erhalten Sie ein individuelles Konzept für das häusliche Training.',
          btn_label: 'Jetzt Beratungstermin anfragen',
          btn_link: 'booking'
        }
      ]
    },
    'about': {
      name: 'Ueber-Uns-Template (About)',
      slug: 'about',
      seo: {
        metaTitle: 'Über Clara | NordDog Hundeschule',
        metaDescription: 'Lernen Sie Clara Sorensen kennen, qualifizierte Verhaltenstrainerin. Kombination aus wissenschaftlich positiver Erziehung und liebevollem Familientraining.',
        ogImage: IMAGES.trainerAvatar,
        ogType: 'website'
      },
      body: [
        {
          _uid: 'about-hero-1',
          component: 'hero',
          headline: 'Über Clara & die Philosophie dahinter',
          subheadline: 'Gewaltfreie Methoden respektieren den Geist Ihres Hundes. Wenn wir verstehen, wie Hunde lernen, lehren wir mit spielerischer Klarheit und tiefer Empathie.',
          cta_primary: 'Lebenslauf ansehen',
          cta_secondary: 'Direkter Kontakt',
          image: IMAGES.trainerAvatar,
          badge: 'GRÜNDERIN & EXPERTIN'
        },
        {
          _uid: 'about-desc-1',
          component: 'rich_text',
          title: 'Das Prinzip des Vertrauenssports',
          text: 'Clara Sorensen gründete NordDog mit dem Wunsch, wissenschaftliches, bedürfnisorientiertes Hundetraining verständlich in Familien zu etablieren. Als ausgebildete Kynologin besitzt sie anerkannte Lizenzen führender Hundeverbände und verzichtet konsequent auf jede Form von Druck oder Einschüchterung.'
        }
      ]
    }
  }
};

// Local Business Schema JSON
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "DogTrainingBusiness",
  "name": "NordDog Canine Academy",
  "image": "https://norddog-canine-academy.com" + IMAGES.hero,
  "@id": "https://norddog-training-academy.com",
  "url": "https://norddog-training-academy.com",
  "telephone": "+1-555-019-2819",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "42 Moss Ridge Road",
    "addressLocality": "Clara Hills",
    "addressRegion": "WA",
    "postalCode": "98004",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6101,
    "longitude": -122.2015
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "15:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/norddog.canine",
    "https://instagram.com/norddog.canine"
  ]
};
