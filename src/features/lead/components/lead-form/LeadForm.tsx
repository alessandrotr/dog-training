'use client'

import { useLeadFormController } from './use-lead-form-controller'
import WaitlistBanner from './WaitlistBanner'
import ProgramPicker from './ProgramPicker'
import ContactFields from './ContactFields'
import DogFields from './DogFields'
import MessageField from './MessageField'
import SubmitBar from './SubmitBar'
import LeadFormSuccess from './LeadFormSuccess'

// Unified contact / waitlist intake form. Rendered on the /contact page and
// inside the lead dialog. Pure composition — TanStack Form (in the controller)
// owns state/validation, the section components own markup.
export default function LeadForm({
  onSuccess,
  available = true,
}: {
  onSuccess?: () => void
  available?: boolean
}) {
  const { form, status, reset, waitlist, fieldValidator, validate } = useLeadFormController({
    available,
    onSuccess,
  })

  if (status === 'success') {
    return <LeadFormSuccess waitlist={waitlist} onReset={reset} />
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-5 text-left"
    >
      {waitlist && <WaitlistBanner />}
      <ProgramPicker />
      <ContactFields form={form} fieldValidator={fieldValidator} />
      <DogFields form={form} />
      <MessageField form={form} fieldValidator={fieldValidator} />
      <SubmitBar form={form} status={status} waitlist={waitlist} validate={validate} />
    </form>
  )
}
