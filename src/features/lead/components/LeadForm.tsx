'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Accordion } from '@base-ui/react/accordion'
import {
  Send,
  BellPlus,
  CheckCircle2,
  AlertCircle,
  Check,
  Plus,
  ClipboardList,
  MessageSquareText,
  PawPrint,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Heading, Text, ScrollArea } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useInquiryCart } from '@/features/inquiry/components/InquiryCartProvider'
import { useLeadForm } from '@/features/lead/stores/lead-form'
import { submitLead, makeLeadSchema, type LeadPayload } from '@/features/lead/lib/lead'
import { useTypewriter } from '@/hooks/use-typewriter'

// Rotating "what people write" prompts that auto-type under the message field.
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

type Status = 'idle' | 'loading' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

// Unified contact intake form. Rendered both on the /contact page and inside
// the lead dialog. Submits through submitLead() (currently a stub). Validation
// runs through a zod schema (see makeLeadSchema) that drops the message
// requirement once services are attached to the inquiry.
export default function LeadForm({
  onSuccess,
  available = true,
}: {
  onSuccess?: () => void
  available?: boolean
}) {
  const { t, i18n } = useTranslation()
  const cart = useInquiryCart()
  const de = i18n.language === 'de'
  const waitlist = !available // fully booked → frame the form as a waitlist join
  const { draft: data, setField, reset, programsOpen, setProgramsOpen } = useLeadForm()
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  // Auto-typing inspiration under the message label; pauses once they write.
  const inspiration = useTypewriter(de ? MESSAGE_PROMPTS.de : MESSAGE_PROMPTS.en, {
    enabled: !data.message,
  })

  function set<K extends keyof LeadPayload>(key: K, value: string) {
    setField(key, value)
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): LeadPayload | null {
    const schema = makeLeadSchema(
      {
        name: t('contact.fields.fullName'),
        email: t('contact.fields.emailAddress'),
        message: t('contact.fields.detailBehaviors'),
      },
      // A message is required unless services were added to the inquiry.
      cart.items.length === 0,
    )
    const result = schema.safeParse(data)
    if (!result.success) {
      const f = result.error.flatten().fieldErrors
      setErrors({ name: f.name?.[0], email: f.email?.[0], message: f.message?.[0] })
      return null
    }
    setErrors({})
    return result.data
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const clean = validate()
    if (!clean) return
    setStatus('loading')
    try {
      const prefix = de ? 'Interessiert an: ' : 'Interested in: '
      const services = cart.items.map((i) => i.title)
      const waitlistNote = waitlist ? (de ? '⏳ Wartelisten-Anfrage' : '⏳ Waitlist request') : ''
      const message = [
        waitlistNote,
        services.length ? `${prefix}${services.join(', ')}` : '',
        clean.message?.trim(),
      ]
        .filter(Boolean)
        .join('\n\n')
      await submitLead({ ...clean, message })
      cart.clear()
      reset()
      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <Heading level={3} size="card">
          {waitlist
            ? de
              ? 'Du bist auf der Warteliste!'
              : "You're on the waitlist!"
            : t('contact.successTitle')}
        </Heading>
        <Text className="max-w-sm">
          {waitlist
            ? de
              ? 'Sophia meldet sich, sobald ein Platz frei wird.'
              : 'Sophia will reach out as soon as a spot opens up.'
            : t('contact.successText')}
        </Text>
        <Button
          variant="outline"
          onClick={() => {
            reset()
            setStatus('idle')
          }}
        >
          {t('contact.sendAnother')}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {waitlist && (
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900">
          <span className="font-bold">
            {de ? 'Aktuell ausgebucht.' : 'Currently fully booked.'}
          </span>{' '}
          {de
            ? 'Trag dich in die Warteliste ein – Sophia meldet sich, sobald ein Platz frei wird.'
            : 'Join the waitlist and Sophia will reach out as soon as a spot opens up.'}
        </div>
      )}

      {/* Programs — one collapsible section that is both the picker and the
          selected list. Every catalog card toggles add/remove, so adding a
          program and reviewing the inquiry share one unified, easy UI. */}
      {cart.catalog.length > 0 && (
        <Accordion.Root
          value={programsOpen ? ['items'] : []}
          onValueChange={(v) => setProgramsOpen(v.includes('items'))}
          className="overflow-hidden rounded-xl border border-amber-200/60 bg-linear-to-br from-amber-50 to-white shadow-sm"
        >
          <Accordion.Item value="items">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left outline-none focus-visible:bg-amber-100/40">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  <ClipboardList className="h-3.5 w-3.5" />
                  {cart.items.length > 0
                    ? de
                      ? 'Anfrage zu'
                      : 'Inquiring about'
                    : de
                    ? 'Programm hinzufügen'
                    : 'Add a program'}
                </span>
                <span className="flex items-center gap-2">
                  {/* Always rendered (just hidden when empty) so the chevron
                      doesn't shift when the count first appears. */}
                  <span
                    aria-hidden={cart.items.length === 0}
                    className={cn(
                      'min-w-5 rounded-full bg-amber-100 px-2 py-0.5 text-center font-mono text-[10px] font-bold text-amber-800',
                      cart.items.length === 0 && 'invisible',
                    )}
                  >
                    {cart.items.length || 0}
                  </span>
                  <ChevronDown className="h-4 w-4 text-amber-700/70 transition-transform duration-200 group-data-panel-open:rotate-180" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0">
              <ScrollArea className="max-h-72">
                <ul className="space-y-2 px-3.5 pb-3.5">
                  {cart.catalog.map((item) => {
                    const isSelected = cart.has(item.slug)
                    return (
                      <li key={item.slug}>
                        <button
                          type="button"
                          onClick={() => cart.toggle(item)}
                          aria-pressed={isSelected}
                          className={cn(
                            'group/item flex w-full items-center gap-3 rounded-lg border p-2 text-left shadow-xs transition-colors',
                            isSelected
                              ? 'border-amber-300/70 bg-white hover:border-amber-300'
                              : 'border-stone-200 bg-stone-50/60 hover:border-amber-200 hover:bg-white',
                          )}
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-amber-100">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                sizes="48px"
                                className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center text-amber-700">
                                <PawPrint className="h-5 w-5" />
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <p
                                className={cn(
                                  'truncate font-sans text-sm font-bold',
                                  isSelected ? 'text-stone-900' : 'text-stone-700',
                                )}
                              >
                                {item.title}
                              </p>
                              {item.price && (
                                <span className="shrink-0 font-sans text-sm font-extrabold text-amber-950">
                                  {item.price}
                                </span>
                              )}
                            </div>
                            {item.shortDescription && (
                              <p className="mt-0.5 truncate text-xs leading-relaxed text-stone-500">
                                {item.shortDescription}
                              </p>
                            )}
                          </div>
                          <span
                            className={cn(
                              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors',
                              isSelected
                                ? 'bg-amber-100 text-amber-800'
                                : 'border border-stone-300 text-stone-400 group-hover/item:border-amber-300 group-hover/item:text-amber-700',
                            )}
                          >
                            {isSelected ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </ScrollArea>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      )}

      {/* Contact details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="lead-name">{t('contact.fields.fullName')}</Label>
          <Input
            id="lead-name"
            value={data.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder={de ? 'z. B. Anna Müller' : 'e.g. Jane Doe'}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="font-mono text-[10px] text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-email">{t('contact.fields.emailAddress')}</Label>
          <Input
            id="lead-email"
            type="email"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder={de ? 'du@beispiel.de' : 'you@example.com'}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="font-mono text-[10px] text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* About the dog — soft, friendly card so the optional bits feel inviting */}
      <div className="relative overflow-hidden rounded-xl border border-amber-200/60 bg-linear-to-br from-amber-50/80 to-white p-4 shadow-sm">
        {/* faint paw watermark in the corner */}
        <PawPrint
          className="pointer-events-none absolute -bottom-4 -right-3 h-24 w-24 -rotate-12 text-amber-200/40"
          strokeWidth={1.5}
        />
        <div className="relative flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <PawPrint className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-sans text-sm font-bold text-amber-950">
              {de ? 'Über deinen Hund' : 'About your pup'}
            </p>
            <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-amber-700/70">
              {de ? 'Optional, aber hilfreich' : 'Optional, but it helps'}
            </p>
          </div>
        </div>
        <div className="relative mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="lead-dog-name">{de ? 'Name' : 'Name'}</Label>
            <Input
              id="lead-dog-name"
              value={data.dogName ?? ''}
              onChange={(e) => set('dogName', e.target.value)}
              placeholder={de ? 'z. B. Baxter' : 'e.g. Baxter'}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lead-dog-age">{de ? 'Alter' : 'Age'}</Label>
            <Input
              id="lead-dog-age"
              value={data.dogAge ?? ''}
              onChange={(e) => set('dogAge', e.target.value)}
              placeholder={de ? 'z. B. 8 Monate' : 'e.g. 8 months'}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lead-dog-breed">{de ? 'Rasse' : 'Breed'}</Label>
            <Input
              id="lead-dog-breed"
              value={data.dogBreed ?? ''}
              onChange={(e) => set('dogBreed', e.target.value)}
              placeholder={de ? 'z. B. Border Collie' : 'e.g. Border Collie'}
            />
          </div>
        </div>
      </div>

      {/* Message — the actual ask; framed as "tell us what you need", not pup trivia */}
      <div className="space-y-1.5">
        <Label htmlFor="lead-message" className="text-amber-950">
          <MessageSquareText className="h-3.5 w-3.5 text-amber-700" />
          {t('contact.fields.detailBehaviors')}
        </Label>
        {!data.message && (
          <p className="flex min-w-0 items-center font-mono text-xs text-stone-400" aria-hidden>
            <span className="mr-1 shrink-0 text-amber-700/70">{de ? 'z. B.' : 'e.g.'}</span>
            <span className="truncate">{inspiration}</span>
            <span className="ml-px inline-block h-3.5 w-px shrink-0 bg-stone-400 motion-safe:animate-pulse" />
          </p>
        )}
        <Textarea
          id="lead-message"
          rows={4}
          value={data.message ?? ''}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="font-mono text-[10px] text-red-500">{errors.message}</p>}
      </div>

      {/* Sticky action footer — the send button stays pinned to the bottom of
          the sheet while the fields scroll behind a soft fade. */}
      <div className="sticky bottom-0 -mx-1 mt-1 space-y-2.5 bg-linear-to-t from-stone-50 via-stone-50 to-transparent px-1 pb-1 pt-5">
        {status === 'error' && (
          <p className="flex items-center gap-1.5 font-mono text-xs text-red-500">
            <AlertCircle className="h-4 w-4" /> {t('contact.fields.sendButton')} — try again.
          </p>
        )}
        <Button
          type="submit"
          size="xl"
          className="w-full"
          disabled={status === 'loading'}
          variant="ctaDots"
        >
          {status === 'loading'
            ? t('contact.fields.transmitting')
            : waitlist
            ? de
              ? 'Auf die Warteliste'
              : 'Join the waitlist'
            : t('contact.fields.sendButton')}
          {status !== 'loading' &&
            (waitlist ? <BellPlus className="h-4 w-4" /> : <Send className="h-4 w-4" />)}
        </Button>
      </div>
    </form>
  )
}
