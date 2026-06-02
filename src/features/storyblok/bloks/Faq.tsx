'use client'

import { useState } from 'react'
import { storyblokEditable } from '@storyblok/react'
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react'
import { usePageData } from '@/features/storyblok/components/PageDataProvider'
import { Card, Heading, Text } from '@/components/ui'

import type { BlokBase } from '@/types'

interface FaqBlok extends BlokBase {
  search_placeholder?: string
  enable_search?: boolean
}

// Data-bound: pulls faq stories from the page route. Includes search + accordion.
export default function Faq({ blok }: { blok: FaqBlok }) {
  const { faqs } = usePageData()
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)

  const filtered = faqs.filter((f) => {
    const q = query.toLowerCase()
    return (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    )
  })

  return (
    <section {...storyblokEditable(blok as any)} className="space-y-16 text-left">
      {blok.enable_search !== false && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md w-full border-b border-stone-200 pb-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={blok.search_placeholder || 'Search...'}
              className="block w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-200 py-16 text-center space-y-4">
            <HelpCircle className="h-10 w-10 text-stone-400 mx-auto" />
            <Heading level={3} size="cardSm">
              No FAQs found
            </Heading>
            <Text size="xs">
              We couldn&apos;t locate any matching responses for &quot;<b>{query}</b>&quot;.
            </Text>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((faq) => {
              const isOpen = activeId === faq.id
              return (
                <Card key={faq.id} className="overflow-hidden transition-all shadow-sm">
                  <button
                    onClick={() => setActiveId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left font-sans text-base font-bold text-stone-850 hover:text-amber-950 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 rounded-full bg-stone-100 p-2 text-stone-600">
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-stone-100 bg-stone-50/50 p-5 transition-all text-sm text-stone-600 leading-relaxed text-left font-sans">
                      <p>{faq.answer}</p>
                      <div className="mt-4 pt-4 border-t border-stone-200/50 flex justify-between items-center text-[10px] font-mono text-stone-400">
                        <span>
                          Category: <b>{faq.category}</b>
                        </span>
                        <span>Verified Answer</span>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
