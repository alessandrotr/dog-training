'use client';

import {useRouter} from 'next/navigation';
import {PawPrint} from 'lucide-react';
import {LOCALES} from '../../lib/locales';
import {useLocale, useSwitchLocalePath} from '../../lib/navigation';

// Playful language switcher: a paw "trots" (slides) between EN / DE on an amber
// thumb. Shared by the desktop nav and the mobile drawer.
export default function LocaleToggle() {
  const router = useRouter();
  const locale = useLocale();
  const switchLocale = useSwitchLocalePath();
  const activeIndex = LOCALES.indexOf(locale);

  return (
    <div className="inline-flex items-center gap-2">
      <PawPrint className="h-4 w-4 shrink-0 text-amber-700/70" aria-hidden="true" />
      <div className="relative flex items-center rounded-full border border-stone-200 bg-stone-100 p-0.5">
        {/* Sliding amber thumb that trots between languages */}
        <span
          className="pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-amber-900 shadow-sm transition-transform duration-300 ease-out"
          style={{transform: `translateX(${activeIndex * 100}%)`}}
        />
        {LOCALES.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              onClick={() => router.push(switchLocale(code))}
              aria-label={code === 'en' ? 'Switch to English' : 'Auf Deutsch umschalten'}
              aria-pressed={active}
              className={`relative z-10 w-11 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wide transition-colors ${
                active ? 'text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {code}
            </button>
          );
        })}
      </div>
    </div>
  );
}
