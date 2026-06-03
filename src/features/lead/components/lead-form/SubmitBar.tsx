'use client'

import { useTranslation } from 'react-i18next'
import { Send, BellPlus, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LeadDraft } from '@/features/lead/stores/lead-form'
import type { LeadFormApi, LeadStatus } from './use-lead-form-controller'

// Sticky action footer — the send button stays pinned to the bottom of the
// sheet while the fields scroll behind a soft fade. Disabled until the whole
// form passes the schema (required fields filled + a valid email + min
// lengths). `form.Subscribe` keeps the re-render to this button.
export default function SubmitBar({
  form,
  status,
  waitlist,
  validate,
}: {
  form: LeadFormApi
  status: LeadStatus
  waitlist: boolean
  validate: (values: LeadDraft) => boolean
}) {
  const { t, i18n } = useTranslation()
  const de = i18n.language === 'de'
  const loading = status === 'loading'

  return (
    <div className="sticky bottom-0 -mx-1 mt-1 space-y-2.5 bg-linear-to-t from-stone-50 via-stone-50 to-transparent px-1 pb-1 pt-5">
      {status === 'error' && (
        <p className="flex items-center gap-1.5 font-mono text-xs text-red-500">
          <AlertCircle className="size-4" /> {t('contact.fields.sendButton')} — try again.
        </p>
      )}
      <form.Subscribe selector={(s) => s.values}>
        {(values) => (
          <Button
            type="submit"
            size="xl"
            className="w-full"
            disabled={loading || !validate(values)}
            variant="ctaDots"
          >
            {loading
              ? t('contact.fields.transmitting')
              : waitlist
                ? de
                  ? 'Auf die Warteliste'
                  : 'Join the waitlist'
                : t('contact.fields.sendButton')}
            {!loading && (waitlist ? <BellPlus className="size-4" /> : <Send className="size-4" />)}
          </Button>
        )}
      </form.Subscribe>
    </div>
  )
}
