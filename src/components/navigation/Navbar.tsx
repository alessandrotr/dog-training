'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Menu, X, CalendarRange } from 'lucide-react';
import { useCurrentPage, useHref } from '../../lib/navigation';
import LocaleToggle from './LocaleToggle';
import type { SiteConfig } from '../../types';

export default function Navbar({ config }: { config: SiteConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const href = useHref();
  const currentPage = useCurrentPage();
  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href={href.page('home')}
          onClick={close}
          className="flex items-center space-x-2 text-stone-900 focus:outline-none cursor-pointer"
        >
          <div className="text-left">
            <span className="block font-sans text-lg font-bold tracking-tight text-amber-950">{config.footer.brandName}</span>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 -mt-1">{config.footer.brandSubtitle}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {config.navItems.map((item) => {
            const isActive = currentPage === item.target;
            return (
              <Link
                key={item.target}
                href={href.page(item.target)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-2 ${
                  isActive
                    ? 'text-amber-900 border-b-2 border-amber-900'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Language switcher */}
        <div className="hidden lg:flex items-center">
          <LocaleToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav className="border-t border-stone-200 bg-stone-50 md:hidden">
          <div className="space-y-1 px-4 py-3">
            {config.navItems.map((item) => {
              const isActive = currentPage === item.target;
              return (
                <Link
                  key={item.target}
                  href={href.page(item.target)}
                  onClick={close}
                  className={`block w-full text-left rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                    isActive ? 'bg-stone-150 text-amber-950' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="flex items-center justify-between border-t border-stone-200/80 my-2 pt-3">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wide px-1">Language / Sprache</span>
              <LocaleToggle />
            </div>

            <div className="border-t border-stone-200/80 my-2 pt-2">
              <Link
                href={href.page(config.ctaTarget)}
                onClick={close}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-amber-900 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-950"
              >
                <CalendarRange className="h-4 w-4" />
                <span>{config.ctaLabel}</span>
              </Link>
              <div className="text-center mt-3 text-xs font-mono text-stone-500">
                {t('nav.directLine')}: {config.footer.phone}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
