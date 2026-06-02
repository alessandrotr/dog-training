import { PawPrint, Bone } from 'lucide-react'

// Faint scattered paws + a bone for the dark/gradient CTAs (ctaDots / ConnectFab).
// Purely decorative: aria-hidden, pointer-events-none, and `-z-10` so it sits
// behind the label. Three static inline SVGs — no images, no animation, no perf
// cost. Drop it as a child of a `relative isolate overflow-hidden` button.
export default function CtaDecor() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 text-white/12">
      <PawPrint className="absolute -bottom-2 -left-1 h-9 w-9 rotate-12" strokeWidth={1.5} />
      <Bone className="absolute -top-1 right-5 h-5 w-5 -rotate-12" strokeWidth={1.5} />
      <PawPrint className="absolute right-10 bottom-1 h-4 w-4 -rotate-6" strokeWidth={1.5} />
    </span>
  )
}
