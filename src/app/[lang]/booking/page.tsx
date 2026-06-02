import type { Metadata } from 'next'
import OpenLeadOnMount from '@/features/lead/components/OpenLeadOnMount'

// Not a standalone page — it just opens the booking dialog — so it's kept out of
// the index and inherits the site-level title/description (no per-page SEO copy).
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function Page() {
  return <OpenLeadOnMount mode="book" />
}
