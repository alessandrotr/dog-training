import {cn} from '@/lib/utils';

// "Starting at €X" price block, shared by the service card and service detail.
// Renders nothing without a price. `size` scales the amount.
const SIZES = {
  sm: 'text-xl',
  lg: 'text-3xl',
} as const;

export default function PriceTag({
  price,
  size = 'sm',
  className,
}: {
  price?: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  if (!price) return null;
  return (
    <div className={cn('leading-none', className)}>
      <span className="block font-mono text-[10px] uppercase tracking-wider text-stone-400">Starting at</span>
      <span className={cn('mt-1 block font-sans font-extrabold text-amber-950', SIZES[size])}>{price}</span>
    </div>
  );
}
