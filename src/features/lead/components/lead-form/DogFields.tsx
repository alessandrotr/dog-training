'use client'

import { useTranslation } from 'react-i18next'
import { PawPrint, Dog, Cake, Dna } from 'lucide-react'
import FormField from './FormField'
import type { LeadFormApi } from './use-lead-form-controller'

// Optional "about your pup" facts in a soft, friendly card so they feel
// inviting rather than like extra required work.
export default function DogFields({ form }: { form: LeadFormApi }) {
  const { i18n } = useTranslation()
  const de = i18n.language === 'de'
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-200/60 bg-linear-to-br from-amber-50/80 to-white p-4 shadow-sm">
      {/* faint paw watermark in the corner */}
      <PawPrint
        className="pointer-events-none absolute -bottom-4 -right-3 size-24 -rotate-12 text-amber-200/40"
        strokeWidth={1.5}
      />
      <div className="relative flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <PawPrint className="size-4" />
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
        <form.Field name="dogName">
          {(field) => (
            <FormField
              id="lead-dog-name"
              icon={Dog}
              label="Name"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              placeholder={de ? 'z. B. Baxter' : 'e.g. Baxter'}
            />
          )}
        </form.Field>
        <form.Field name="dogAge">
          {(field) => (
            <FormField
              id="lead-dog-age"
              icon={Cake}
              label={de ? 'Alter' : 'Age'}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              placeholder={de ? 'z. B. 8 Monate' : 'e.g. 8 months'}
            />
          )}
        </form.Field>
        <form.Field name="dogBreed">
          {(field) => (
            <FormField
              id="lead-dog-breed"
              icon={Dna}
              label={de ? 'Rasse' : 'Breed'}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              placeholder={de ? 'z. B. Border Collie' : 'e.g. Border Collie'}
            />
          )}
        </form.Field>
      </div>
    </div>
  )
}
