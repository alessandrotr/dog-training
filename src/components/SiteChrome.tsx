'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';
import ConnectFab from './navigation/ConnectFab';
import LeadDialogMount from './lead/LeadDialogMount';
import {AvailabilityProvider} from './AvailabilityProvider';
import {InquiryCartProvider} from './InquiryCartProvider';
import InquiryCartBar from './InquiryCartBar';
import type {SiteConfig, AvailabilityData} from '../types';

// Persistent app shell rendered around every route by the root layout.
export default function SiteChrome({
  config,
  availability,
  children,
}: {
  config: SiteConfig;
  availability: AvailabilityData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Scroll to top on route changes.
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
  }, [pathname]);

  return (
    <AvailabilityProvider value={availability}>
      <InquiryCartProvider>
        <div className="relative min-h-screen flex flex-col bg-stone-50 font-sans text-stone-850 antialiased selection:bg-amber-700/10 selection:text-amber-900">
          {/* Primary Top Header Navigation */}
          <Navbar config={config} />

          {/* Main Display Body */}
          <main className="grow">
            <div className="relative">{children}</div>
          </main>

          {/* Primary Footer Coordinates */}
          <Footer config={config.footer} />

          {/* Floating actions */}
          <ConnectFab />
          <InquiryCartBar />

          {/* Unified Book/Contact dialog + global CTA interceptor */}
          <LeadDialogMount />
        </div>
      </InquiryCartProvider>
    </AvailabilityProvider>
  );
}
