// TanStack field errors are Standard Schema issues (objects with `message`) or
// plain strings depending on the validator. Normalize to the first message.
export function fieldError(errors: readonly unknown[]): string | undefined {
  const first = errors?.[0]
  if (!first) return undefined
  if (typeof first === 'string') return first
  return (first as { message?: string }).message
}
