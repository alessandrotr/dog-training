import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full min-w-0 rounded-xl border border-stone-200 bg-white px-3.5 py-1 text-base text-stone-900 shadow-xs transition-[color,box-shadow,border-color] outline-none placeholder:text-stone-400 hover:border-stone-300 focus-visible:border-amber-400 focus-visible:ring-4 focus-visible:ring-amber-700/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-400 aria-invalid:ring-4 aria-invalid:ring-red-500/10 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
