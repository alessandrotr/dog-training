'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Search, MessageCircle, HelpCircle } from 'lucide-react';
import { useNavigate } from '../../lib/navigation';
import type { FAQItem, Localized } from '../../types';

export default function FAQ({ faqsByLang }: { faqsByLang: Localized<FAQItem> }) {
  const setCurrentPage = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFAQId, setActiveFAQId] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';
  const faqs = faqsByLang[lang];

  const toggleFAQ = (id: string) => {
    setActiveFAQId(activeFAQId === id ? null : id);
  };

  // Filter list
  const filteredFAQs = faqs.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-16 py-12 pb-24 text-left">
      
      {/* Dynamic Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">CLEAR CANINE ANSWERS</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-955 sm:text-5xl leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-sm text-stone-500 max-w-2xl leading-relaxed">
            Have questions about force-free conditioning, session logistics, or puppy vaccination rules? Read our detailed, scientifically informed guide below.
          </p>
        </div>
      </section>

      {/* Search box block */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-md w-full border-b border-stone-200 pb-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            id="faq-search-field"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search puppy, methods, reactive, pricing..."
            className="block w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-stone-905 placeholder-stone-450 focus:border-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
          />
        </div>
      </section>

      {/* Accordion List */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        {filteredFAQs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-250 py-16 text-center space-y-4">
            <HelpCircle className="h-10 w-10 text-stone-400 mx-auto" />
            <h3 className="font-sans text-base font-bold text-stone-800">No FAQs Resolved</h3>
            <p className="text-xs text-stone-500 font-sans">We couldn't locate any matching responses for your query "<b>{searchQuery}</b>". Contact Clara directly for immediate support.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isOpen = activeFAQId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all shadow-sm"
                >
                  {/* Trigger Header */}
                  <button
                    id={`faq-trigger-${faq.id}`}
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left font-sans text-base font-bold text-stone-850 hover:text-amber-950 focus:outline-none focus:ring-1 focus:ring-amber-900/10 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 rounded-full bg-stone-100 p-2 text-stone-605 group-hover:bg-stone-200">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {/* Collapsible content (Accordion) */}
                  {isOpen && (
                    <div className="border-t border-stone-105 bg-stone-50/50 p-5 transition-all text-sm text-stone-600 leading-relaxed text-left font-sans">
                      <p>{faq.answer}</p>
                      
                      {/* Tag metadata */}
                      <div className="mt-4 pt-4 border-t border-stone-150/50 flex justify-between items-center text-[10px] font-mono text-stone-400">
                        <span>Category: <b>{faq.category}</b></span>
                        <span>Verified Answer</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Visual Support CTA card */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-stone-100 p-8 text-center max-w-2xl mx-auto space-y-4">
          <MessageCircle className="h-8 w-8 text-amber-800 mx-auto" />
          <h3 className="font-sans text-xl font-bold text-stone-900">Still have unanswered questions?</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Canine learning vectors are profoundly individual. Clara is available to talk through your household dynamics directly and provide honest advice.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              id="faq-book-call-btn"
              onClick={() => setCurrentPage('contact')}
              className="rounded-lg bg-stone-900 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-black"
            >
              Contact Clara Directly
            </button>
            <button
              id="faq-booking"
              onClick={() => setCurrentPage('booking')}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-50"
            >
              Book Consult via Calendly
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
