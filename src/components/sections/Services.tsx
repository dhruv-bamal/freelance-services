/**
 * The five solution categories — level 1 of the disclosure.
 *
 * The grid is deliberately asymmetric: the two flagship categories take half the
 * row each, the other three share the row below. Five identical boxes is the
 * card-kit default, and it also tells a visitor nothing about what matters most.
 * Here the layout itself carries that information.
 *
 * Each card shows only what someone needs to decide whether to read further —
 * what it is, roughly what it costs, how long it takes, and three outcomes.
 *
 * ONE ACTION PER CARD
 * These used to carry both "View details" and "Open full page", which opened the
 * same content two different ways — a choice with no right answer, asked five
 * times. Now the whole card opens the dialog, via a stretched trigger whose
 * ::after covers the card. The hover lift finally means something (the card
 * genuinely is the target), the hit area is ~40x larger, and the permalink for
 * anyone who wants one lives at the foot of the dialog.
 */
import { packages } from '@/data/packages';
import { packageIcons, IconCheck, IconArrowRight } from '@/components/ui/icons';
import { Price } from '@/components/ui/Price';
import { Dialog } from '@/components/ui/Dialog';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PackageDetail } from './PackageDetail';
import { cn } from '@/lib/cn';

/** The two flagship categories take a half-row each; the rest share the next row. */
const FEATURED = new Set(['ai-website', 'full-stack']);

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="band bg-card">
      <div className="shell">
        <SectionHeading
          id="services-title"
          title="Five ways I can help your business"
          lead="Starting prices, not quotes. What moves them is scope."
        />

        <ul className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-6">
          {packages.map((pkg) => {
            const Icon = packageIcons[pkg.id];
            const featured = FEATURED.has(pkg.id);

            return (
              <li
                key={pkg.id}
                className={cn(featured ? 'lg:col-span-3' : 'lg:col-span-2')}
              >
                <Reveal className="h-full">
                  <article
                    className={cn(
                      'group relative flex h-full flex-col rounded-card border border-rule bg-card p-5',
                      // Explicit properties, never `transition-all`: that also animates
                      // outline-width/color/offset, which made the focus ring fade in.
                      '[transition:transform_200ms_var(--ease-damp),border-color_200ms_var(--ease-damp),box-shadow_200ms_var(--ease-damp)]',
                      'hover:-translate-y-0.5 hover:border-rule-strong/45 hover:shadow-lift',
                      // Ring moves to the card — see .card-focusable in globals.css.
                      'card-focusable',
                      featured && 'sm:p-7',
                    )}
                  >
                    <Icon
                      className={cn('text-indigo', featured ? 'size-7' : 'size-6')}
                      aria-hidden
                    />

                    <h3
                      className={cn(
                        'mt-4',
                        featured ? 'text-display-m' : 'text-display-s font-medium',
                      )}
                    >
                      {pkg.name}
                    </h3>
                    <p className="mt-2 max-w-[44ch] text-sm text-ink-muted">{pkg.oneLiner}</p>

                    <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-rule pt-4">
                      <Price amount={pkg.startingPrice} size={featured ? 'md' : 'sm'} />
                      <p className="text-xs text-ink-muted">Typically {pkg.timeline}</p>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {pkg.benefits.slice(0, 3).map((benefit) => (
                        <li key={benefit} className="flex gap-2.5 text-sm text-ink-muted">
                          <IconCheck className="mt-[0.3rem] size-3.5 shrink-0 text-indigo" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* mt-auto keeps the action on the baseline across cards of
                        differing content length. */}
                    <div className="mt-auto pt-6">
                      <Dialog
                        trigger={
                          <>
                            View details
                            {/* Five buttons all reading "View details" is useless
                                in a screen reader's element list. */}
                            <span className="sr-only"> for {pkg.name}</span>
                            <IconArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </>
                        }
                        title={pkg.name}
                        eyebrow={pkg.subtitle}
                        permalink={`/services/${pkg.slug}`}
                        triggerClassName="btn btn-outline btn-stretch bg-paper focus-visible:outline-none group-hover:border-ink"
                      >
                        <PackageDetail pkg={pkg} />
                      </Dialog>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-8">
          <p className="max-w-[62ch] border-l-2 border-indigo/30 pl-5 text-sm text-ink-muted">
            You get the final figure in writing before any work begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
