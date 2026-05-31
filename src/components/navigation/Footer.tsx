'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail, Phone, MapPin, Award, PawPrint } from 'lucide-react';
import { useHref } from '../../lib/navigation';
import Logo from './Logo';
import type { SiteConfig } from '../../types';

export default function Footer({ config }: { config: SiteConfig['footer'] }) {
  const href = useHref();

  const contacts = [
    { icon: MapPin, label: config.address, kind: 'text' as const },
    { icon: Phone, label: config.phone, kind: 'tel' as const },
    { icon: Mail, label: config.email, kind: 'mail' as const },
  ].filter((c) => c.label);

  return (
    <footer className="relative overflow-hidden bg-amber-950 text-stone-300 pt-6 pb-4 lg:py-12">
      {/* Soft heather glow + paw watermark for a warm, branded backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-amber-700/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
      />
      <PawPrint
        aria-hidden
        className="pointer-events-none absolute -right-10 top-16 h-64 w-64 rotate-12 text-white/[0.025]"
        strokeWidth={1}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pb-4">

          {/* Brand & bio */}
          <div className="lg:col-span-4 space-y-5">
            <Logo
              brandName={config.brandName}
              brandSubtitle={config.brandSubtitle}
              tone="light"
              icon={
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-700/30 ring-1 ring-amber-500/30 transition-transform duration-300 group-hover:-rotate-6">
                  <PawPrint className="h-5 w-5 text-amber-300" strokeWidth={2} />
                </span>
              }
            />
            <p className="max-w-xs text-sm leading-relaxed text-stone-400">{config.tagline}</p>
            <div className="flex items-center gap-3 pt-1">
              {config.instagramUrl && (
                <a href={config.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="rounded-full p-2.5 bg-white/5 ring-1 ring-white/10 text-stone-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:text-white hover:ring-amber-600">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {config.facebookUrl && (
                <a href={config.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"
                  className="rounded-full p-2.5 bg-white/5 ring-1 ring-white/10 text-stone-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:text-white hover:ring-amber-600">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Link columns */}
          {config.columns.map((col, ci) => (
            <div key={ci} className="lg:col-span-2">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300/70 mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <Link
                      href={href.page(link.target)}
                      className="text-stone-400 underline decoration-transparent decoration-1 underline-offset-4 transition-all duration-300 hover:text-white hover:decoration-amber-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Accreditations */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300/70 mb-4">Accreditations</h3>
            <div className="space-y-3">
              {config.accreditations.map((a, ai) => (
                <div key={ai} className="group flex items-center gap-3.5 rounded-2xl py-2 transition-colors ">
                  {/* Trust badge: real logo on a soft white tile, or an icon fallback */}
                  {a.logoUrl ? (
                    <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={a.logoUrl}
                        alt={a.logoAlt || a.title}
                        width={44}
                        height={44}
                        className="h-full w-full object-contain"
                      />
                    </span>
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-700/20 ring-1 ring-amber-600/30">
                      <Award className="h-5 w-5 text-amber-300" />
                    </span>
                  )}
                  <div className="min-w-0 text-xs leading-relaxed">
                    <p className="truncate font-semibold text-stone-100">{a.title}</p>
                    <p className="text-stone-500">{a.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact pills */}
        {contacts.length > 0 && (
          <div className="flex flex-wrap gap-3 py-8 border-b border-white/10">
            {contacts.map((c, i) => {
              const Inner = (
                <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 font-mono text-xs text-stone-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-white">
                  <c.icon className="h-4 w-4 text-amber-400" />
                  {c.label}
                </span>
              );
              if (c.kind === 'tel') return <a key={i} href={`tel:${c.label.replace(/\s+/g, '')}`}>{Inner}</a>;
              if (c.kind === 'mail') return <a key={i} href={`mailto:${c.label}`}>{Inner}</a>;
              return <span key={i}>{Inner}</span>;
            })}
          </div>
        )}

        {/* Bottom credits */}
        <div className="flex flex-col-reverse md:flex-row lg:items-center justify-between gap-4 pt-8 text-xs text-stone-500">
          <p className="inline-flex items-center gap-1.5">
            <PawPrint className="h-3.5 w-3.5 text-amber-500" />
            {config.copyright}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono uppercase tracking-wider text-stone-600">
            {config.bottomTags.map((tag, ti) => (
              <span key={ti} className="transition-colors hover:text-stone-400">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
