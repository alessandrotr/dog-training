// Static assets and structured SEO data still used by the app.
// Services, testimonials, FAQs and blog posts now live in Storyblok
// (fetched via src/lib/content-server.ts), so their arrays were removed.

export const IMAGES = {
  hero: '/assets/images/hero_trainer_1780093921073.png',
  puppy: '/assets/images/puppy_training_1780093940929.png',
  reactive: '/assets/images/reactive_dog_1780093958673.png',
  obedience: '/assets/images/obedience_dog_1780093976803.png',
  dog1: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200&h=200',
  dog2: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=200&h=200',
  dog3: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200&h=200',
  trainerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "DogTrainingBusiness",
  "name": "Sophia Binder Canine Academy",
  "image": "https://sophiabinder-canine-academy.com" + IMAGES.hero,
  "@id": "https://sophiabinder-training-academy.com",
  "url": "https://sophiabinder-training-academy.com",
  "telephone": "+1-555-019-2819",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "42 Moss Ridge Road",
    "addressLocality": "Sophia Hills",
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
    "https://facebook.com/sophiabinder.canine",
    "https://instagram.com/sophiabinder.canine"
  ]
};
