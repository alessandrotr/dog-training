// Unified lead submission. Single chokepoint so the UI never needs to change
// when a real backend is wired (Resend / form service / API route).
//
// TODO(backend): there is no destination yet. Replace the stub body with a
// POST to /api/lead (or a form service). Until then submissions are NOT
// delivered anywhere — keep success copy honest.
export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  dogInfo?: string;
  concern?: string;
  message: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[lead] submitLead is a stub — not wired to a backend yet.', payload);
  }
}
