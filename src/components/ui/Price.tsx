/**
 * A starting price.
 *
 * Always "From ₹x", never a bare figure — the difference between a published
 * starting point and an implied quote is the whole pricing philosophy of the site,
 * and it should not be possible to render the second one by accident.
 *
 * `en-IN` grouping comes from formatINR — ₹1,00,000 and ₹100,000 are the same
 * number, but only one of them reads as a price to someone in India.
 */
import { formatINR } from '@/lib/format';
import { cn } from '@/lib/cn';

export function Price({
  amount,
  size = 'md',
  className,
}: {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const figure =
    size === 'lg' ? 'text-price' : size === 'md' ? 'text-display-s' : 'text-base';

  return (
    <p className={cn('flex items-baseline gap-1.5', className)}>
      <span className="text-xs text-ink-muted">From</span>
      <span className={cn('font-display font-medium text-ink', figure)}>
        {formatINR(amount)}
      </span>
    </p>
  );
}
