'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';
import WhatsAppCTA from './navigation/WhatsAppCTA';
import MobileStickyCTA from './navigation/MobileStickyCTA';
import type {SiteConfig} from '../types';

// Persistent app shell rendered around every route by the root layout.
export default function SiteChrome({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Scroll to top on route changes.
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-stone-50 font-sans text-stone-850 antialiased selection:bg-amber-900/10 selection:text-amber-900">
      {/* Primary Top Header Navigation */}
      <Navbar config={config} />

      {/* Main Display Body */}
      <main className="flex-grow">
        <div className="relative">{children}</div>
      </main>

      {/* Primary Footer Coordinates */}
      <Footer config={config.footer} />

      {/* Floating high-priority actions */}
      <WhatsAppCTA />
      <MobileStickyCTA />
    </div>
  );
}
