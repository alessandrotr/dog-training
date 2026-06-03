import { CalendarDays } from 'lucide-react'
import MetaPill from './meta-pill'

// Cute published-date badge. `date` is the already-formatted string; renders
// nothing when absent.
export default function PublishDate({
  date,
  className,
}: {
  date?: string | null
  className?: string
}) {
  if (!date) return null
  return (
    <MetaPill icon={CalendarDays} className={className}>
      {date}
    </MetaPill>
  )
}
