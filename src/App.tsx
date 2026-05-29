import React, { useState, useEffect } from 'react';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import WhatsAppCTA from './components/navigation/WhatsAppCTA';
import MobileStickyCTA from './components/navigation/MobileStickyCTA';
import CMSVisualDebugger from './components/storyblok/CMSVisualDebugger';

// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Blog from './components/pages/Blog';
import Testimonials from './components/pages/Testimonials';
import FAQ from './components/pages/FAQ';
import Contact from './components/pages/Contact';
import Booking from './components/pages/Booking';

import { LOCAL_BUSINESS_SCHEMA } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  
  // Storyblok draft visual web-hook simulation
  const [isDraftMode, setIsDraftMode] = useState<boolean>(true);

  // Smooth scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);

  // Inject Local Business Schema into document body for accurate local search vectors
  useEffect(() => {
    const existingScript = document.getElementById('local-schema');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'local-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(LOCAL_BUSINESS_SCHEMA);
      document.body.appendChild(script);
    }
  }, []);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedBlogSlug={setSelectedBlogSlug}
            isDraftMode={isDraftMode}
          />
        );
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services setCurrentPage={setCurrentPage} isDraftMode={isDraftMode} />;
      case 'blog':
        return (
          <Blog
            selectedBlogSlug={selectedBlogSlug}
            setSelectedBlogSlug={setSelectedBlogSlug}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'testimonials':
        return <Testimonials setCurrentPage={setCurrentPage} />;
      case 'faq':
        return <FAQ setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'booking':
        return <Booking />;
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedBlogSlug={setSelectedBlogSlug}
            isDraftMode={isDraftMode}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-stone-50 font-sans text-stone-850 antialiased selection:bg-amber-900/10 selection:text-amber-900">
      
      {/* Dynamic Visual Storyblok Connector Panel (visible on desktop) */}
      <CMSVisualDebugger
        currentPage={currentPage}
        isDraftMode={isDraftMode}
        setIsDraftMode={setIsDraftMode}
      />

      {/* Primary Top Header Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onBlogSlugChange={(slug) => setSelectedBlogSlug(slug)}
      />

      {/* Main Display Body with soft transition spacing */}
      <main className="flex-grow">
        <div className="relative">
          {renderActivePage()}
        </div>
      </main>

      {/* Primary Footer Coordinates */}
      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onBlogSlugChange={(slug) => setSelectedBlogSlug(slug)}
      />

      {/* Floating high-priority actions */}
      <WhatsAppCTA />
      
      <MobileStickyCTA
        setCurrentPage={setCurrentPage}
        onBlogSlugChange={(slug) => setSelectedBlogSlug(slug)}
      />

    </div>
  );
}
