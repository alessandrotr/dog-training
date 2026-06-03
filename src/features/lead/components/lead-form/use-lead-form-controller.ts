'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'
import { useInquiryCart } from '@/features/inquiry/components/InquiryCartProvider'
import { useLeadForm, EMPTY_LEAD, type LeadDraft } from '@/features/lead/stores/lead-form'
import { submitLead, makeLeadSchema } from '@/features/lead/lib/lead'

export type LeadStatus = 'idle' | 'loading' | 'success' | 'error'

// Owns every non-presentational concern of the contact/waitlist form. Field
// state + validation are delegated to TanStack Form (zod via Standard Schema);
// this hook wires it to the persisted draft store, the inquiry cart, and the
// submit lifecycle. Section components stay presentational and bind via
// `form.Field`.
export function useLeadFormController({
  available,
  onSuccess,
}: {
  available: boolean
  onSuccess?: () => void
}) {
  const { i18n } = useTranslation()
  const de = i18n.language === 'de'
  const waitlist = !available // fully booked → frame the form as a waitlist join
  const cart = useInquiryCart()
  const [status, setStatus] = useState<LeadStatus>('idle')

  // A message is required unless services were added to the inquiry — the
  // selected programs carry the intent. Recomputed as the cart/locale change.
  // Messages describe the rule (min length / valid email) since they surface
  // live as the visitor types.
  const schema = makeLeadSchema(
    {
      name: de ? 'Mindestens 2 Zeichen' : 'At least 2 characters',
      email: de ? 'Bitte eine gültige E-Mail eingeben' : 'Enter a valid email address',
      message: de ? 'Mindestens 15 Zeichen' : 'At least 15 characters',
    },
    cart.items.length === 0,
  )

  // One validator per field, derived from the schema so the live field errors,
  // the submit gate and the submit-time check all share the same rules.
  const fieldValidator =
    (name: keyof LeadDraft) =>
    ({ value }: { value: string }) => {
      const result = schema.shape[name].safeParse(value)
      return result.success ? undefined : result.error.issues[0]?.message
    }
  const validate = (values: LeadDraft) => schema.safeParse(values).success

  const form = useForm({
    // Seeded once from the persisted draft (client-only; the dialog is
    // dynamically imported, so localStorage is already rehydrated).
    defaultValues: useLeadForm.getState().draft,
    validators: {
      // Run zod on submit and map issues onto the matching fields. (A function
      // validator avoids the schema-input/value type mismatch and keeps full
      // control over the localized, cart-aware messages.)
      onSubmit: ({ value }) => {
        const result = schema.safeParse(value)
        if (result.success) return undefined
        const fe = result.error.flatten().fieldErrors
        return {
          fields: {
            name: fe.name?.[0],
            email: fe.email?.[0],
            message: fe.message?.[0],
          },
        }
      },
    },
    onSubmit: async ({ value }) => {
      setStatus('loading')
      try {
        const prefix = de ? 'Interessiert an: ' : 'Interested in: '
        const services = cart.items.map((i) => i.title)
        const waitlistNote = waitlist ? (de ? '⏳ Wartelisten-Anfrage' : '⏳ Waitlist request') : ''
        const message = [
          waitlistNote,
          services.length ? `${prefix}${services.join(', ')}` : '',
          value.message.trim(),
        ]
          .filter(Boolean)
          .join('\n\n')
        await submitLead({ ...value, message })
        cart.clear()
        useLeadForm.getState().reset()
        setStatus('success')
        onSuccess?.()
      } catch {
        setStatus('error')
      }
    },
  })

  // Persist the draft on every change so a closed/reloaded dialog resumes.
  useEffect(() => {
    const sub = form.store.subscribe(() => useLeadForm.getState().setDraft(form.state.values))
    return () => sub.unsubscribe()
  }, [form])

  function reset() {
    form.reset(EMPTY_LEAD)
    useLeadForm.getState().reset()
    setStatus('idle')
  }

  return { form, status, reset, waitlist, fieldValidator, validate }
}

// The form instance type, derived so sections don't need to name TanStack's
// internal generics.
export type LeadFormApi = ReturnType<typeof useLeadFormController>['form']
export type FieldValidator = ReturnType<typeof useLeadFormController>['fieldValidator']
