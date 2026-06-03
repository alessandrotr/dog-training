import { Clock3 } from 'lucide-react'
import MetaPill from './meta-pill'

// Cute reading-time badge. `time` is the already-formatted string
// (e.g. "5 min read"); renders nothing when absent.
export default function ReadingTime({
  time,
  className,
}: {
  time?: string | null
  className?: string
}) {
  if (!time) return null
  return (
    <MetaPill icon={Clock3} className={className}>
      {time}
    </MetaPill>
  )
}
