'use client'

import { useParallax } from '@/hooks/use-parallax'

export default function CaseStudyLabel() {
  const labelRef = useParallax<HTMLSpanElement>(0, -220, 600)
  return (
    <span
      ref={labelRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-[-0.12em] left-1/2 flex w-full -translate-x-1/2 select-none flex-col items-center bg-linear-to-b from-amber-700/12 via-amber-700/6 to-transparent bg-clip-text text-center font-sans text-[27vw] font-black uppercase leading-[0.82] tracking-tighter text-transparent sm:w-auto sm:flex-row sm:gap-[0.18em] sm:whitespace-nowrap sm:text-[20vw] sm:leading-none lg:text-[15rem]"
    >
      <span>Case</span>
      <span>Study</span>
    </span>
  )
}
