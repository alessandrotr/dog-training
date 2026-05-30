'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';
import WhatsAppCTA from './navigation/WhatsAppCTA';
import MobileStickyCTA from './navigation/MobileStickyCTA';
import {LOCAL_BUSINESS_SCHEMA} from '../data';

// Persistent app shell rendered around every route by the root layout.
export default function SiteChrome({children}: {children: React.ReactNode}) {
  const pathname = usePathname();

  // Scroll to top on route changes.
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
  }, [pathname]);

  // Inject Local Business Schema for accurate local search vectors.
  useEffect(() => {
    if (document.getElementById('local-schema')) return;
    const script = document.createElement('script');
    script.id = 'local-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(LOCAL_BUSINESS_SCHEMA);
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-stone-50 font-sans text-stone-850 antialiased selection:bg-amber-900/10 selection:text-amber-900">
      {/* Primary Top Header Navigation */}
      <Navbar />

      {/* Main Display Body */}
      <main className="flex-grow">
        <div className="relative">{children}</div>
      </main>

      {/* Primary Footer Coordinates */}
      <Footer />

      {/* Floating high-priority actions */}
      <WhatsAppCTA />
      <MobileStickyCTA />
    </div>
  );
}
