'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Menu, X, CalendarRange, PawPrint } from 'lucide-react'
import { useCurrentPage, useHref } from '@/lib/navigation'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { useIsAvailable } from '@/features/availability/components/AvailabilityProvider'
import LocaleToggle from './LocaleToggle'
import Logo from './Logo'
import { Button } from '@/components/ui'
import type { SiteConfig } from '@/types'

export default function Navbar({ config }: { config: SiteConfig }) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const href = useHref()
  const currentPage = useCurrentPage()
  const close = () => setIsOpen(false)

  // Fully booked → the booking CTA becomes a waitlist join (routes to the
  // contact page, which the dialog interceptor opens as the Message tab).
  const available = useIsAvailable()
  const ctaLabel = available ? config.ctaLabel : t('booking.waitlist')
  const ctaTarget = available ? config.ctaTarget : 'contact'

  // Hide on scroll down, reveal on scroll up; transparent while at the very top.
  const { hidden, atTop } = useHideOnScroll()

  // Publish the navbar offset so sticky elements (filters, TOC, availability)
  // can ride up/down with the navbar via `top: var(--nav-offset)`.
  useEffect(() => {
    document.documentElement.style.setProperty('--nav-offset', hidden ? '1.5rem' : '6rem')
  }, [hidden])

  const solid = !atTop || isOpen // frosted bar once scrolled or when the mobile menu is open

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-[translate,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden && !isOpen ? '-translate-y-full' : 'translate-y-0'
      } ${
        solid
          ? 'bg-stone-50/90 shadow-[0_1px_0_0_var(--color-stone-200)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo
          brandName={config.footer.brandName}
          brandSubtitle={config.footer.brandSubtitle}
          onClick={close}
          icon={
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-700/30 ring-1 ring-amber-500/30 transition-transform duration-300 group-hover:-rotate-6">
              <PawPrint className="h-5 w-5 text-amber-700" strokeWidth={2} />
            </span>
          }
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {config.navItems.map((item) => {
            const isActive = currentPage === item.target
            return (
              <Link
                key={item.target}
                href={href.page(item.target)}
                className={`text-xs font-medium font-mono uppercase transition-colors cursor-pointer relative py-1 px-2 rounded-full ${
                  isActive ? 'text-white bg-amber-700' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
              </Link>
            )
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
              const isActive = currentPage === item.target
              return (
                <Link
                  key={item.target}
                  href={href.page(item.target)}
                  onClick={close}
                  className={`block w-full text-left rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-stone-100 text-amber-950'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="flex items-center justify-between border-t border-stone-200/80 my-2 pt-3">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wide px-1">
                Language / Sprache
              </span>
              <LocaleToggle />
            </div>

            <div className="border-t border-stone-200/80 my-2 pt-2">
              <Button
                render={<Link href={href.page(ctaTarget)} onClick={close} />}
                variant="cta"
                size="xl"
                className="w-full py-3"
              >
                <CalendarRange className="h-4 w-4" />
                {ctaLabel}
              </Button>
              <div className="text-center mt-3 text-xs font-mono text-stone-500">
                {t('nav.directLine')}: {config.footer.phone}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
