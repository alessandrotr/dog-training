import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-2xl border border-stone-200 bg-white px-3.5 py-3 text-base text-stone-900 shadow-xs transition-[color,box-shadow,border-color] outline-none placeholder:text-stone-400 hover:border-stone-300 focus-visible:border-amber-400 focus-visible:ring-4 focus-visible:ring-amber-700/10 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-400 aria-invalid:ring-4 aria-invalid:ring-red-500/10 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
