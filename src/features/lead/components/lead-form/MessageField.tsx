'use client'

import { useTranslation } from 'react-i18next'
import { useStore } from '@tanstack/react-form'
import { MessageSquareText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTypewriter } from '@/hooks/use-typewriter'
import { useInquiryCart } from '@/features/inquiry/components/InquiryCartProvider'
import { fieldError } from './field-error'
import type { LeadFormApi, FieldValidator } from './use-lead-form-controller'

const MIN_CHARS = 15

// Rotating "what people write" prompts that auto-type under the message label.
const MESSAGE_PROMPTS = {
  en: [
    'My pup pulls on the leash — I want calm walks.',
    'He barks at other dogs and I want to help him.',
    "We're getting a puppy and want to start right.",
    'She panics when left alone at home.',
  ],
  de: [
    'Mein Hund zieht an der Leine — ich will entspannte Spaziergänge.',
    'Er bellt andere Hunde an und ich möchte ihm helfen.',
    'Wir bekommen bald einen Welpen und wollen es richtig machen.',
    'Sie ist ängstlich, wenn sie allein zu Hause ist.',
  ],
}

// The actual ask, framed as "tell us what you need" (not pup trivia). An
// auto-typing inspiration line cues what to write; it pauses once they start.
export default function MessageField({
  form,
  fieldValidator,
}: {
  form: LeadFormApi
  fieldValidator: FieldValidator
}) {
  const { t, i18n } = useTranslation()
  const de = i18n.language === 'de'
  const cart = useInquiryCart()
  const required = cart.items.length === 0
  // Read the live value at top level (hooks can't run inside a Field render-prop).
  const message = useStore(form.store, (s) => s.values.message)
  const inspiration = useTypewriter(de ? MESSAGE_PROMPTS.de : MESSAGE_PROMPTS.en, {
    enabled: !message,
  })

  return (
    <div className="space-y-1.5">
      <Label htmlFor="lead-message" className="text-amber-950">
        <MessageSquareText className="size-3.5 text-amber-700" />
        {t('contact.fields.detailBehaviors')}
      </Label>
      {!message && (
        <p className="flex min-w-0 items-center font-mono text-xs text-stone-400" aria-hidden>
          <span className="mr-1 shrink-0 text-amber-700/70">{de ? 'z. B.' : 'e.g.'}</span>
          <span className="truncate">{inspiration}</span>
          <span className="ml-px inline-block h-3.5 w-px shrink-0 bg-stone-400 motion-safe:animate-pulse" />
        </p>
      )}
      <form.Field
        name="message"
        validators={{ onChange: fieldValidator('message'), onBlur: fieldValidator('message') }}
      >
        {(field) => {
          const error = fieldError(field.state.meta.errors)
          const len = field.state.value.length
          const belowMin = required && len < MIN_CHARS
          const remaining = MIN_CHARS - len
          return (
            <>
              <Textarea
                id="lead-message"
                rows={4}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!!error}
              />
              <div className="flex items-start justify-between gap-2">
                {error ? (
                  <p className="font-mono text-[10px] text-red-500">{error}</p>
                ) : (
                  <span />
                )}
                {/* Hidden while empty (a bare "0/15" reads like a 15-char limit).
                    While short, count down to the minimum; then show the count. */}
                {len > 0 && (
                  <span
                    className={cn(
                      'shrink-0 font-mono text-[10px] tabular-nums',
                      belowMin ? 'text-amber-600' : 'text-stone-400',
                    )}
                  >
                    {belowMin ? (de ? `noch ${remaining}` : `${remaining} more`) : len}
                  </span>
                )}
              </div>
            </>
          )
        }}
      </form.Field>
    </div>
  )
}
