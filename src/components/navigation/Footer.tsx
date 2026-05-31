'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin, Award } from 'lucide-react';
import { useHref } from '../../lib/navigation';
import type { SiteConfig } from '../../types';

export default function Footer({ config }: { config: SiteConfig['footer'] }) {
  const href = useHref();

  return (
    <footer className="bg-stone-900 text-stone-200 border-t border-stone-850 pt-16 pb-24 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 pb-12 border-b border-stone-800">

          {/* Logo & Bio Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div>
                <span className="block font-sans text-lg font-bold tracking-tight text-white">{config.brandName}</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 -mt-1">{config.brandSubtitle}</span>
              </div>
            </div>
            <p className="text-sm text-stone-400 max-w-xs leading-relaxed">{config.tagline}</p>
            <div className="flex space-x-4 pt-2">
              {config.instagramUrl && (
                <a href={config.instagramUrl} target="_blank" rel="noreferrer" className="rounded-lg p-2 bg-stone-800 hover:bg-amber-700 transition-colors text-stone-400 hover:text-white" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {config.facebookUrl && (
                <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="rounded-lg p-2 bg-stone-800 hover:bg-amber-700 transition-colors text-stone-400 hover:text-white" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {config.columns.map((col, ci) => (
            <div key={ci}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <Link
                      href={href.page(link.target)}
                      className="hover:text-white transition-colors cursor-pointer text-stone-400 text-left"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Accreditations */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-1 font-semibold">Accreditations</h3>
            <div className="space-y-3.5">
              {config.accreditations.map((a, ai) => (
                <div key={ai} className="flex items-start space-x-3 text-stone-450 text-xs">
                  <Award className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-stone-200">{a.title}</p>
                    <p className="text-stone-500">{a.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-stone-800 text-sm font-mono text-stone-400">
          <div className="flex items-center space-x-2.5">
            <MapPin className="h-4 w-4 text-amber-700" />
            <span>{config.address}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Phone className="h-4 w-4 text-amber-700" />
            <span>{config.phone}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Mail className="h-4 w-4 text-amber-700" />
            <span>{config.email}</span>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-stone-500 leading-normal">
          <p>{config.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {config.bottomTags.map((tag, ti) => (
              <span key={ti}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
