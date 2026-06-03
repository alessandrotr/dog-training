// Unified lead submission. Single chokepoint so the UI never needs to change
// when a real backend is wired (Resend / form service / API route).
//
// TODO(backend): there is no destination yet. Replace the stub body with a
// POST to /api/lead (or a form service). Until then submissions are NOT
// delivered anywhere — keep success copy honest.
import {z} from 'zod';

// Validation schema for the contact / waitlist form. Built as a factory so the
// caller can pass localised error copy and flip whether a free-text message is
// required (it isn't when the visitor has already attached services to the
// inquiry — the selected programs carry the intent).
export function makeLeadSchema(messages: {name: string; email: string; message: string}, requireMessage: boolean) {
  return z.object({
    name: z.string().trim().min(2, messages.name),
    email: z.string().trim().email(messages.email),
    dogName: z.string().trim().optional(),
    dogAge: z.string().trim().optional(),
    dogBreed: z.string().trim().optional(),
    message: requireMessage
      ? z.string().trim().min(15, messages.message)
      : z.string().trim().optional(),
  });
}

export type LeadPayload = z.infer<ReturnType<typeof makeLeadSchema>>;

export async function submitLead(payload: LeadPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[lead] submitLead is a stub — not wired to a backend yet.', payload);
  }
}
