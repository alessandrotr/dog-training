'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './navigation/Navbar'
import Footer from './navigation/Footer'
import ConnectFab from './navigation/ConnectFab'
import LeadDialogMount from './lead/LeadDialogMount'
import { AvailabilityProvider } from './AvailabilityProvider'
import { InquiryCartProvider, serviceToInquiryItem } from './InquiryCartProvider'
import InquiryCartBar from './InquiryCartBar'
import type { SiteConfig, AvailabilityData, ServiceItem } from '../types'

// Persistent app shell rendered around every route by the root layout.
export default function SiteChrome({
  config,
  availability,
  services,
  children,
}: {
  config: SiteConfig
  availability: AvailabilityData
  services: ServiceItem[]
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Service catalog the inquiry form can offer as an "add a program" picker.
  const catalog = services.map(serviceToInquiryItem)

  // Scroll to top on route changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <AvailabilityProvider value={availability}>
      <InquiryCartProvider catalog={catalog}>
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
  )
}
