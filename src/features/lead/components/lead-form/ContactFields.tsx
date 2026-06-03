'use client'

import { useTranslation } from 'react-i18next'
import { User, AtSign } from 'lucide-react'
import FormField from './FormField'
import { fieldError } from './field-error'
import type { LeadFormApi, FieldValidator } from './use-lead-form-controller'

// Name + email. Validated live (via the schema-derived field validators) so an
// invalid email is flagged as the visitor types.
export default function ContactFields({
  form,
  fieldValidator,
}: {
  form: LeadFormApi
  fieldValidator: FieldValidator
}) {
  const { t, i18n } = useTranslation()
  const de = i18n.language === 'de'
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <form.Field
        name="name"
        validators={{ onChange: fieldValidator('name'), onBlur: fieldValidator('name') }}
      >
        {(field) => (
          <FormField
            id="lead-name"
            icon={User}
            label={t('contact.fields.fullName')}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder={de ? 'z. B. Anna Müller' : 'e.g. Jane Doe'}
            error={fieldError(field.state.meta.errors)}
          />
        )}
      </form.Field>
      <form.Field
        name="email"
        validators={{ onChange: fieldValidator('email'), onBlur: fieldValidator('email') }}
      >
        {(field) => (
          <FormField
            id="lead-email"
            type="email"
            icon={AtSign}
            label={t('contact.fields.emailAddress')}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder={de ? 'du@beispiel.de' : 'you@example.com'}
            error={fieldError(field.state.meta.errors)}
          />
        )}
      </form.Field>
    </div>
  )
}
