'use client';

import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {LeadPayload} from '@/lib/lead';

const EMPTY: LeadPayload = {name: '', email: '', dogAge: '', dogBreed: '', message: ''};

interface LeadFormState {
  draft: LeadPayload;
  setField: <K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) => void;
  reset: () => void;
  // Whether the "Inquiring about" programs accordion is expanded. Open by
  // default, but the visitor's choice persists across opens / reloads.
  programsOpen: boolean;
  setProgramsOpen: (open: boolean) => void;
}

// Persisted draft of the lead form so a visitor can close the dialog (or reload)
// and pick up exactly where they left off. Mirrors the inquiry cart's
// localStorage persistence; the draft is cleared on successful submit.
export const useLeadForm = create<LeadFormState>()(
  persist(
    (set) => ({
      draft: EMPTY,
      setField: (key, value) => set((s) => ({draft: {...s.draft, [key]: value}})),
      reset: () => set({draft: EMPTY}),
      programsOpen: true,
      setProgramsOpen: (open) => set({programsOpen: open}),
    }),
    {name: 'lead-form-draft'},
  ),
);
