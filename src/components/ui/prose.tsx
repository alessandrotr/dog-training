import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Wrapper for server-rendered rich-text HTML (blog article, case-study body).
// Owns the shared `prose` base in one place; pass `html` for dangerouslySet
// content, or children. Context-specific tweaks (headings, blockquote) ride on
// `className`.
const BASE = 'prose prose-stone max-w-none prose-p:leading-relaxed prose-p:text-stone-600'

export default function Prose({
  html,
  className,
  children,
}: {
  html?: string
  className?: string
  children?: ReactNode
}) {
  if (html != null) {
    return <div className={cn(BASE, className)} dangerouslySetInnerHTML={{ __html: html }} />
  }
  return <div className={cn(BASE, className)}>{children}</div>
}
