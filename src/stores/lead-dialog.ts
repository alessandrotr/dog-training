'use client';

import {useCallback} from 'react';
import {useQueryState, parseAsStringLiteral} from 'nuqs';

export const LEAD_MODES = ['book', 'contact'] as const;
export type LeadMode = (typeof LEAD_MODES)[number];

// Client-friendly URL param: ?connect=book | ?connect=contact
const leadParser = parseAsStringLiteral(LEAD_MODES).withOptions({scroll: false});

// Dialog state lives in the URL via nuqs so it's deep-linkable, shareable, and
// closes with the browser back button. Presence of ?connect = open; value = tab.
export function useLeadDialog() {
  const [connect, setConnect] = useQueryState('connect', leadParser);

  const open = useCallback((mode: LeadMode = 'book') => setConnect(mode, {history: 'push'}), [setConnect]);
  const close = useCallback(() => setConnect(null, {history: 'push'}), [setConnect]);
  const setMode = useCallback((mode: LeadMode) => setConnect(mode, {history: 'replace'}), [setConnect]);

  return {
    isOpen: connect !== null,
    mode: (connect ?? 'book') as LeadMode,
    open,
    close,
    setMode,
  };
}
