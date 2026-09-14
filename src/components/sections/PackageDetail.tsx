/**
 * The full detail for one package — levels 2 and 3 of the disclosure.
 *
 * Rendered in exactly two places from this one component: inside the "View details"
 * dialog on the home page, and as the body of /services/[slug]. One source means
 * the modal and the page can never say different things about the same price.
 *
 * The tiers are set as a rate card rather than three pricing cards: a vertical
 * list with hairline rules, prices aligned on a common right edge in tabular
 * figures. Three side-by-side cards force the inclusion lists into narrow columns
 * and turn into an unreadable table on a phone — which is the specific failure the
 * brief called out.
 *
 * A server component. There is nothing interactive here beyond native <details>.
 */
import { Price } from '@/components/ui/Price';
import { Disclosure } from '@/components/ui/Disclosure';
import { IconCheck, IconWhatsApp } from '@/components/ui/icons';
import { packageEnquiry } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import type { SolutionPackage } from '@/types';

export function PackageDetail({
  pkg,
  headingLevel = 'h3',
}: {
  pkg: SolutionPackage;
  /** h3 inside the dialog (under its h2), h2 on the dedicated page. */
  headingLevel?: 'h2' | 'h3';
}) {
  const H = headingLevel;
  const Sub = headingLevel === 'h2' ? 'h3' : 'h4';

  return (
    <div className="space-y-10">
      {/* ------------------------------------------------------- the facts
          No description line here: the dialog carries the subtitle in its
          eyebrow and the service page carries the one-liner under its h1.
          Repeating it made the modal say the same sentence twice. --------- */}
      <div>
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-ink-muted">Starting from</dt>
            <dd className="mt-1 font-display text-display-s font-medium">
              ₹{pkg.startingPrice.toLocaleString('en-IN')}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Typical timeline</dt>
            <dd className="mt-1 font-display text-display-s font-medium">{pkg.timeline}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Best for</dt>
            <dd className="mt-1 text-sm">{pkg.bestFor.slice(0, 3).join(' · ')}</dd>
          </div>
        </dl>
      </div>

      {/* ------------------------------------------------------ the tiers */}
      <section>
        <H className="text-display-s">What you can choose</H>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {pkg.tiers.map((tier) => (
            <li
              key={tier.id}
              className={cn('py-5', tier.popular && '-mx-3 rounded-card bg-indigo-tint px-3')}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <Sub className="flex items-center gap-2.5 font-display text-display-s font-medium">
                  {tier.name}
                  {tier.popular ? (
                    <span className="rounded-pill bg-indigo px-2.5 py-1 text-[0.6875rem] font-medium leading-none text-white">
                      Most chosen
                    </span>
                  ) : null}
                </Sub>
                <Price amount={tier.startingPrice} size="sm" className="shrink-0" />
              </div>

              <p className="mt-1.5 max-w-[58ch] text-sm text-ink-muted">{tier.summary}</p>

              <ul className="mt-3.5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <IconCheck className="mt-[0.3rem] size-3.5 shrink-0 text-indigo" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-ink-muted">{pkg.note}</p>
      </section>

      {/* -------------------------------------------------- how it works */}
      <section>
        <H className="text-display-s">How a project like this runs</H>
        <ol className="mt-4 space-y-5">
          {pkg.howItWorks.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span
                aria-hidden
                className="mt-0.5 w-6 shrink-0 text-sm font-medium text-indigo"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <Sub className="font-display font-medium">{item.title}</Sub>
                <p className="mt-1 max-w-[62ch] text-sm text-ink-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------- level 3: the technical
          Hidden behind a disclosure so it never taxes the business owner, and
          present so the developer evaluating this page can find it. -------- */}
      <section className="border-t border-rule">
        <Disclosure summary="How it's built (technical details)" tone="quiet">
          <ul className="space-y-2 pt-1">
            {pkg.technical.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-rule-strong" />
                {item}
              </li>
            ))}
          </ul>
        </Disclosure>
      </section>

      {/* -------------------------------------------------------------- cta */}
      <div className="flex flex-wrap gap-3 border-t border-rule pt-6">
        <a
          href={packageEnquiry(pkg.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent"
        >
          <IconWhatsApp className="size-4" />
          {pkg.ctaLabel}
          <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
        </a>
        <a href="#contact" className="btn btn-outline">
          Send a message instead
        </a>
      </div>

      <p className="text-sm text-ink-muted">
        Need something different?{' '}
        <a href="#contact" className="link">
          Let us build a custom plan.
        </a>
      </p>
    </div>
  );
}
