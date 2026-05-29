import React from 'react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../../data';
import { CalendarRange, Sparkles, Check, Building, Milestone, ShieldCheck, HeartPulse } from 'lucide-react';
import { useNavigate } from '../../lib/navigation';
import { useDraftMode } from '../../lib/draft-mode';

export default function Services() {
  const setCurrentPage = useNavigate();
  const { isDraftMode } = useDraftMode();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';
  const services = SERVICES[lang];
  
  const handleBook = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 py-12 pb-24 text-left">
      
      {/* Services Hero Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {isDraftMode && (
            <div className="inline-flex items-center space-x-1.5 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-mono font-bold tracking-wide text-amber-900 border border-amber-200 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-700" />
              <span>EDITING COMPONENT: SERVICES_GRID</span>
            </div>
          )}
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-750">FORCE-FREE STUDY CURRICULA</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-955 sm:text-5xl leading-tight">
            Comprehensive Behavioral <br />
            Education Programs
          </h1>
          <p className="font-sans text-base text-stone-500 max-w-2xl leading-relaxed">
            All programs take place on location—directly in your home, garden, or local Seattle/Bellevue neighborhood coordinates where actual stressors happen. Prices include exhaustive handover templates and direct text consulting support.
          </p>
        </div>
      </section>

      {/* Services List Layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {services.map((svc, sIdx) => {
            const isEven = sIdx % 2 === 0;
            return (
              <div
                key={svc.id}
                id={`services-block-${svc.slug}`}
                className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center border-b border-stone-200/60 pb-16 last:border-b-0`}
              >
                
                {/* Visual Area */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                  <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                    <div className="absolute -inset-1 rounded-3xl bg-amber-900/10 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-stone-100 shadow-xl overflow-hidden aspect-video max-h-72">
                      <img
                        src={svc.imageUrl}
                        alt={svc.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6 text-left`}>
                  
                  {/* Badge */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-stone-150 px-2.5 py-1 text-xs font-mono font-medium text-stone-800">
                      Target Audience: {svc.audience}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-mono font-bold text-amber-900 border border-amber-200/40">
                      Est. {svc.duration}
                    </span>
                  </div>

                  <h2 className="font-sans text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                    {svc.title}
                  </h2>

                  <p className="font-sans text-sm font-semibold text-amber-900 text-lg font-mono leading-none">
                    Hourly / Retainer Fee: {svc.price}
                  </p>

                  <p className="font-sans text-sm text-stone-500 leading-relaxed">
                    {svc.longDescription}
                  </p>

                  {/* Included features list */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-sans text-xs font-extrabold uppercase tracking-widest text-stone-400">Included in Program</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2 text-xs text-stone-600 leading-relaxed">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action row link */}
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      id={`book-${svc.slug}`}
                      onClick={handleBook}
                      className="inline-flex items-center space-x-2 rounded-xl bg-amber-900 px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-amber-950 hover:shadow"
                    >
                      <CalendarRange className="h-4 w-4" />
                      <span>Book Free Assessments</span>
                    </button>

                    <a
                      id={`whatsapp-query-${svc.slug}`}
                      href={`https://wa.me/15550192819?text=Hi%20Clara!%20I'd%20like%20to%20query%20the%20${svc.title}%20service.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      Instant WhatsApp Query
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing / Packages module */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-950 p-8 md:p-12 text-stone-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-64 w-64 bg-amber-900/10 blur-3xl rounded-full"></div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center relative z-10">
            
            {/* Left pricing intro */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold">SAVINGS WITH MULTI-SESSION MODULES</span>
              <h2 className="font-sans text-2xl font-extrabold sm:text-3xl text-stone-50">
                Package Structures & Commitment Care
              </h2>
              <p className="font-sans text-sm text-stone-300 leading-relaxed">
                Reinventing habits takes structured repetitions. To encourage long-term commitment and provide better overall value, we offer special packaged bundles for private families.
              </p>
              
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-stone-300 leading-relaxed">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                  <span>Fully CCPDT Insurance Registered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                  <span>Structured Handover PDFs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                  <span>30-Day Support Period Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                  <span>Force-Free or Full Refund Policy</span>
                </div>
              </div>
            </div>

            {/* Right layout card */}
            <div className="lg:col-span-5 bg-stone-900/40 border border-stone-800 p-6 rounded-2xl md:p-8 space-y-6 text-left">
              <div>
                <span className="font-mono text-[10px] uppercase bg-amber-900 text-stone-100 px-2 py-0.5 rounded">Most Popular</span>
                <h3 className="font-sans text-lg font-bold text-stone-100 mt-2">Combined Rehabilitative Pass</h3>
                <p className="text-xs text-stone-400 leading-relaxed mt-1">A curated program spanning 4 intensive 1-on-1 private lessons + follow-up audits.</p>
              </div>

              <div className="border-t border-stone-850 pt-4 flex items-baseline space-x-1.5 font-mono">
                <span className="text-2xl font-bold text-stone-100">$480</span>
                <span className="text-stone-500 text-xs text-stone-400 font-normal"> / Complete Bundle Package</span>
              </div>

              <div className="space-y-2 text-xs text-stone-300">
                <p>✓ Includes initial 60-min intake assesment</p>
                <p>✓ Save over $160 compared to individual consult rates</p>
                <p>✓ Unlimited WhatsApp support logs with Clara</p>
              </div>

              <button
                id="book-package-btn"
                onClick={handleBook}
                className="w-full text-center rounded-xl bg-amber-800 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm hover:bg-amber-700 hover:shadow"
              >
                Inquire For Combined Pass
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
