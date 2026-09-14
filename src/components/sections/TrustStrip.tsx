/**
 * The quiet strip under the hero.
 *
 * Deliberately not a logo marquee — there are no client logos to show, and a strip
 * of grey placeholder rectangles is worse than nothing. What it shows instead is
 * the actual span of what can be built, which is the useful information at this
 * point on the page: a visitor who arrived looking for "a website" learns in one
 * line that bookings, systems and dashboards are also on offer.
 */
import { packages } from '@/data/packages';
import { packageIcons } from '@/components/ui/icons';

export function TrustStrip() {
  return (
    <section aria-label="What I build" className="border-y border-rule bg-card">
      <div className="shell py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 sm:gap-x-12">
          {packages.map((pkg) => {
            const Icon = packageIcons[pkg.id];
            return (
              <li key={pkg.id} className="flex items-center gap-2.5 text-sm text-ink-muted">
                <Icon className="size-[1.15rem] text-indigo" />
                {pkg.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
