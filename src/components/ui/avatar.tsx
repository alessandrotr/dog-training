import Image from 'next/image';
import {cn} from '@/lib/utils';

// Person/dog avatar: shows the photo, or a brand-tinted initial fallback so the
// header never looks broken when an image is missing.
const SIZES = {
  sm: {box: 'h-11 w-11', text: 'text-sm', px: 44},
  lg: {box: 'h-14 w-14', text: 'text-lg', px: 56},
} as const;

type AvatarProps = {
  src?: string;
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
};

export default function Avatar({src, name, size = 'sm', className}: AvatarProps) {
  const s = SIZES[size];
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={s.px}
        height={s.px}
        className={cn(s.box, 'shrink-0 rounded-full border border-stone-200 object-cover', className)}
        referrerPolicy="no-referrer"
      />
    );
  }
  return (
    <span
      className={cn(
        s.box,
        'grid shrink-0 place-items-center rounded-full bg-amber-100 font-sans font-bold text-amber-800',
        s.text,
        className,
      )}
    >
      {name?.charAt(0) || '🐾'}
    </span>
  );
}
