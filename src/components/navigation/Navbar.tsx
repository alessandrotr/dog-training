
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sparkles, CalendarRange } from 'lucide-react';
import { useNavigate, useCurrentPage } from '../../lib/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const setCurrentPage = useNavigate();
  const currentPage = useCurrentPage();

  const navItems = [
    { id: 'nav-home', name: t('nav.home'), page: 'home' },
    { id: 'nav-about', name: t('nav.about'), page: 'about' },
    { id: 'nav-services', name: t('nav.services'), page: 'services' },
    { id: 'nav-blog', name: t('nav.blog'), page: 'blog' },
    { id: 'nav-testimonials', name: t('nav.testimonials'), page: 'testimonials' },
    { id: 'nav-faq', name: t('nav.faq'), page: 'faq' },
    { id: 'nav-contact', name: t('nav.contact'), page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <button
          id="logo-button"
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2 text-stone-900 focus:outline-none cursor-pointer"
        >
          <div className="text-left">
            <span className="block font-sans text-lg font-bold tracking-tight text-amber-950">SOPHIA BINDER</span>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 -mt-1">Gentle Education</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.id}
                id={item.id}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-2 ${
                  isActive
                    ? 'text-amber-900 border-b-2 border-amber-900'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Booking & Call CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            id="nav-cta-booking"
            onClick={() => handleNavClick('booking')}
            className="flex items-center space-x-2 rounded-xl bg-amber-900 px-4 py-2.5 text-xs font-medium tracking-wide text-white shadow-sm transition-all hover:bg-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <CalendarRange className="h-4 w-4" />
            <span>{t('nav.bookConsult')}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center space-x-1 rounded-lg bg-stone-150 p-0.5 border border-stone-200">
            <button
              id="lang-select-en"
              onClick={() => i18n.changeLanguage('en')}
              className={`rounded px-1.5 py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                i18n.language === 'en'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              EN
            </button>
            <button
              id="lang-select-de"
              onClick={() => i18n.changeLanguage('de')}
              className={`rounded px-1.5 py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                i18n.language === 'de'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              DE
            </button>
          </div>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            id="mobile-nav-booking"
            onClick={() => handleNavClick('booking')}
            className="rounded-lg bg-amber-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-950"
          >
            {t('nav.bookConsult')}
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Accordion style) */}
      {isOpen && (
        <nav className="border-t border-stone-200 bg-stone-50 md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.id}
                  id={`${item.id}-mobile`}
                  onClick={() => handleNavClick(item.page)}
                  className={`block w-full text-left rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-stone-250 text-amber-950 bg-stone-150'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}

            {/* Mobile Language Selector */}
            <div className="flex items-center justify-between border-t border-stone-200/80 my-2 pt-2">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wide px-1">Language / Sprache</span>
              <div className="flex items-center space-x-1 rounded-lg bg-stone-150 p-0.5 border border-stone-200">
                <button
                  id="lang-select-en-mobile"
                  onClick={() => i18n.changeLanguage('en')}
                  className={`rounded px-2.5 py-1 text-xs font-mono font-bold uppercase transition-all ${
                    i18n.language === 'en'
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-950'
                  }`}
                >
                  EN
                </button>
                <button
                  id="lang-select-de-mobile"
                  onClick={() => i18n.changeLanguage('de')}
                  className={`rounded px-2.5 py-1 text-xs font-mono font-bold uppercase transition-all ${
                    i18n.language === 'de'
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-950'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>

            <div className="border-t border-stone-200/80 my-2 pt-2">
              <button
                id="mobile-drawer-booking"
                onClick={() => handleNavClick('booking')}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-amber-900 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-950"
              >
                <CalendarRange className="h-4 w-4" />
                <span>{t('nav.bookConsult')}</span>
              </button>
              <div className="text-center mt-3 text-xs font-mono text-stone-500">
                {t('nav.directLine')}: +1 555-019-2819
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
