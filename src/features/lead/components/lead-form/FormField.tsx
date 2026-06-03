import type { LucideIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Labeled text input with an optional leading icon and inline validation
// message — the repeating unit across the contact and "about your pup"
// sections. Purely presentational; the section wires it to a TanStack
// `form.Field`.
export default function FormField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  onBlur,
  placeholder,
  type,
  error,
}: {
  id: string
  label: string
  icon?: LucideIcon
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  type?: string
  error?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {Icon && <Icon className="size-3.5 text-amber-700" />}
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {error && <p className="font-mono text-[10px] text-red-500">{error}</p>}
    </div>
  )
}
