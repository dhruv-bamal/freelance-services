/**
 * A styled <details>/<summary>.
 *
 * Used for the FAQ and for every "Technical details" block. Native disclosure is
 * keyboard-accessible, announced correctly, findable by in-page search (Chrome
 * expands a closed <details> to reach a match), and works with JavaScript off.
 * A div-with-useState version is none of those things.
 *
 * This is a server component — there is no state to hold.
 */
import { IconChevronDown } from './icons';
import { cn } from '@/lib/cn';

export function Disclosure({
  summary,
  children,
  className,
  tone = 'default',
}: {
  summary: string;
  children: React.ReactNode;
  className?: string;
  /** `quiet` is for the technical sections, which should not compete for attention. */
  tone?: 'default' | 'quiet';
}) {
  return (
    <details className={cn('group', className)}>
      <summary
        className={cn(
          'flex items-center justify-between gap-4 py-4 text-left transition-colors',
          tone === 'default'
            ? 'text-display-s font-display font-medium hover:text-indigo'
            : 'text-sm font-medium text-ink-muted hover:text-ink',
        )}
      >
        {summary}
        <IconChevronDown
          className={cn(
            'size-4 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180',
          )}
        />
      </summary>
      <div
        className={cn(
          'pb-5',
          tone === 'default' ? 'max-w-[65ch] text-ink-muted' : 'text-sm text-ink-muted',
        )}
      >
        {children}
      </div>
    </details>
  );
}
