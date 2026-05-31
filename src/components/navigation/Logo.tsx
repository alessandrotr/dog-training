'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useHref } from '../../lib/navigation';

// Shared text wordmark used by both the Navbar and Footer so the brand lockup
// stays identical everywhere. `tone` flips the palette for dark backgrounds.
export default function Logo({
  brandName,
  brandSubtitle,
  tone = 'dark',
  icon,
  onClick,
  className = '',
}: {
  brandName: string;
  brandSubtitle: string;
  tone?: 'light' | 'dark';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const href = useHref();
  const title = tone === 'light' ? 'text-white' : 'text-amber-950';
  const subtitle = tone === 'light' ? 'text-stone-400' : 'text-stone-500';

  return (
    <Link
      href={href.page('home')}
      onClick={onClick}
      className={`group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer ${className}`}
    >
      {icon}
      <span className="flex flex-col gap-0.5">
        <span className={`block font-sans text-sm lg:text-lg font-bold tracking-tight ${title}`}>{brandName}</span>
        <span className={`block font-mono text-[9px] uppercase tracking-widest -mt-1 ${subtitle}`}>{brandSubtitle}</span>
      </span>
    </Link>
  );
}
