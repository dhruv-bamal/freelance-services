/**
 * Section heading.
 *
 * Every section is a landmark labelled by its own heading, wired through
 * `aria-labelledby` — so a screen-reader user listing the page's regions hears
 * "Services", "How I work", "Pricing" rather than five unnamed regions.
 *
 * There is deliberately no eyebrow slot. An eyebrow above every heading is one of
 * the clearest signals of a templated page; this site uses exactly one, in the hero.
 */
import { Reveal } from './Reveal';
import { cn } from '@/lib/cn';

export function SectionHeading({
  id,
  title,
  lead,
  align = 'left',
  className,
}: {
  id: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-[46rem]',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <h2 id={id} className="text-display-l">
        {title}
      </h2>
      {lead ? (
        <p className={cn('mt-4 text-lead text-ink-muted', align === 'left' && 'max-w-[52ch]')}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
