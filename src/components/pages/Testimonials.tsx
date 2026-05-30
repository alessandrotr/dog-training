'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ShieldCheck, Sparkles, MessageSquare, Award, ArrowUpRight } from 'lucide-react';
import { useNavigate } from '../../lib/navigation';
import type { TestimonialItem, Localized } from '../../types';

export default function Testimonials({ testimonialsByLang }: { testimonialsByLang: Localized<TestimonialItem> }) {
  const setCurrentPage = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';
  const testimonials = testimonialsByLang[lang];
  
  const googlePlaceholderReviews = [
    {
      id: 'g-1',
      name: 'Oliver G.',
      breed: 'Bernese Mountain Dog (5 months)',
      text: 'Our Bernese pup Oliver is massive and used to knock guests down. Clara guided us patiently through target training. Outstanding behaviorist, very clear homework!',
      rating: 5,
      date: 'April 3, 2026'
    },
    {
      id: 'g-2',
      name: 'Julia & Koda',
      breed: 'Shiba Inu (3 years)',
      text: 'Shibas are famously independent. We thought Kodas separation howling was permanent. Claras progressive enrichment routines and calming guides completely transformed our home life.',
      rating: 5,
      date: 'March 24, 2026'
    },
    {
      id: 'g-3',
      name: 'The Campbell Family',
      breed: 'Cocker Spaniel (1 year)',
      text: 'Professional, calm, incredibly compassionate. Simply a world class local Bellevue business. Do not waste money on generic training groups—hire Clara immediately!',
      rating: 5,
      date: 'May 10, 2026'
    }
  ];

  return (
    <div className="space-y-24 py-12 pb-24 text-left">
      
      {/* Page headers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">HONEST HUMAN ENGAGEMENT</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-955 sm:text-5xl leading-tight">
            Client Success Stories
          </h1>
          <p className="font-sans text-sm text-stone-500 max-w-2xl leading-relaxed">
            Discover real-world outcomes from owners who navigated high reactivity, separation anxiety, and puppy socialization. We let our results speak for themselves.
          </p>
        </div>
      </section>

      {/* Case studies / Extended testimonials block */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              id={`t-page-card-${t.id}`}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* 5 stars */}
                <div className="flex items-center space-x-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 stroke-none" />
                  ))}
                </div>
                <blockquote className="font-serif text-base text-amber-955 leading-relaxed italic">
                  “{t.text}”
                </blockquote>
              </div>

              <div className="flex items-center space-x-3.5 border-t border-stone-100 pt-4">
                {t.imageUrl && (
                  <img
                    src={t.imageUrl}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <p className="text-sm font-bold text-stone-900 leading-none">{t.name}</p>
                  <p className="text-[11px] text-stone-500 font-mono -mt-0.5">{t.dogBreed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SPECIFIC GOOGLE REVIEWS PLACEHOLDER SECTION */}
      <section className="bg-stone-100 py-16 border-y border-stone-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-700">GOOGLE BUSINESS PLATFORM</span>
              <h2 className="font-sans text-2xl font-extrabold text-amber-955 sm:text-3xl">
                Google Verified Praise
              </h2>
              <p className="font-sans text-xs text-stone-500">
                Live automated reviews pulled from our Google Business Profile in Microsoft/Bellevue coordinates.
              </p>
            </div>
            
            {/* Average box */}
            <div className="mt-4 md:mt-0 bg-white border border-stone-200 px-4 py-3 rounded-xl flex items-center space-x-3 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 font-sans text-lg font-black font-mono">
                G
              </div>
              <div className="text-left font-sans">
                <div className="flex items-center space-x-0.5 text-amber-550">
                  <Star className="h-3.5 w-3.5 fill-amber-500 stroke-none" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 stroke-none" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 stroke-none" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 stroke-none" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 stroke-none" />
                </div>
                <p className="text-xs font-bold leading-none mt-1">4.9 / 5.0 (184 reviews)</p>
              </div>
            </div>
          </div>

          {/* Grid list of Google place reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {googlePlaceholderReviews.map((g) => (
              <div
                key={g.id}
                id={`goog-card-${g.id}`}
                className="rounded-xl border border-stone-200 bg-white p-5 text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-stone-900">{g.name}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{g.date}</span>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    {[...Array(g.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-500 stroke-none" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-550 leading-relaxed font-sans">{g.text}</p>
                </div>

                <div className="border-t border-stone-100/80 pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-stone-400">
                  <span className="uppercase text-stone-500 font-bold tracking-wider">{g.breed}</span>
                  <span>Google Review</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust Callout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900 border border-amber-200/50">
              <Award className="h-5.5 w-5.5" />
            </div>
            <div className="text-left font-sans space-y-1">
              <h3 className="text-base font-bold text-stone-900">Are you ready to write your own success story?</h3>
              <p className="text-xs text-stone-500">Every journey begins with a complimentary 15-minute phone alignment assessment.</p>
            </div>
          </div>
          <button
            id="testimonials-cta-booking"
            onClick={() => setCurrentPage('booking')}
            className="rounded-xl bg-amber-900 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm hover:bg-amber-950 hover:shadow transition"
          >
            Schedule Assessment Calls
          </button>
        </div>
      </section>

    </div>
  );
}
