'use client';

import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// The form's value shape — all strings (controlled inputs never hold undefined).
// Validation/optionality lives in the zod schema (see makeLeadSchema), not here.
export interface LeadDraft {
  name: string;
  email: string;
  dogName: string;
  dogAge: string;
  dogBreed: string;
  message: string;
}

export const EMPTY_LEAD: LeadDraft = {
  name: '',
  email: '',
  dogName: '',
  dogAge: '',
  dogBreed: '',
  message: '',
};

interface LeadFormState {
  draft: LeadDraft;
  setDraft: (draft: LeadDraft) => void;
  reset: () => void;
  // Whether the "Inquiring about" programs accordion is expanded. Open by
  // default, but the visitor's choice persists across opens / reloads.
  programsOpen: boolean;
  setProgramsOpen: (open: boolean) => void;
}

// Persists the in-progress draft so a visitor can close the dialog (or reload)
// and resume where they left off. TanStack Form owns the live field state; this
// store is just the persistence layer (seeded into defaults, written back on
// change, cleared on successful submit).
export const useLeadForm = create<LeadFormState>()(
  persist(
    (set) => ({
      draft: EMPTY_LEAD,
      setDraft: (draft) => set({draft}),
      reset: () => set({draft: EMPTY_LEAD}),
      programsOpen: true,
      setProgramsOpen: (open) => set({programsOpen: open}),
    }),
    {name: 'lead-form-draft'},
  ),
);
