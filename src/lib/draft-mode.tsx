'use client';

import React, {createContext, useContext, useState} from 'react';

interface DraftModeContextValue {
  isDraftMode: boolean;
  setIsDraftMode: (val: boolean) => void;
}

const DraftModeContext = createContext<DraftModeContextValue>({
  isDraftMode: true,
  setIsDraftMode: () => {},
});

// Holds the Storyblok draft-preview toggle, shared between the CMS debugger
// panel and the pages that read it (Home, Services).
export function DraftModeProvider({children}: {children: React.ReactNode}) {
  const [isDraftMode, setIsDraftMode] = useState(true);
  return (
    <DraftModeContext.Provider value={{isDraftMode, setIsDraftMode}}>
      {children}
    </DraftModeContext.Provider>
  );
}

export function useDraftMode() {
  return useContext(DraftModeContext);
}
