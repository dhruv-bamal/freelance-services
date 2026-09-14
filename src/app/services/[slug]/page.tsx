/**
 * A dedicated page per solution category.
 *
 * The body is the same `PackageDetail` component the home page's dialog renders,
 * from the same data — so the modal and the page cannot say different things about
 * the same price. What this adds is a real URL: crawlable, linkable, shareable in
 * a WhatsApp message, and usable by anyone who would rather not open a modal.
 *
 * Statically generated at build time from the packages array, so adding a sixth
 * category creates a sixth page with no routing change.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { packages, packageBySlug } from '@/data/packages';
import { site, siteUrl } from '@/config/site';
import { packageIcons, IconArrowLeft } from '@/components/ui/icons';
import { PackageDetail } from '@/components/sections/PackageDetail';
import { Contact } from '@/components/sections/Contact';

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) return {};

  const description = `${pkg.subtitle} Starting from ₹${pkg.startingPrice.toLocaleString('en-IN')}, typically ${pkg.timeline}. ${site.name}, ${site.location}.`;

  return {
    title: pkg.name,
    description,
    alternates: { canonical: `/services/${pkg.slug}` },
    openGraph: {
      title: `${pkg.name} — ${site.name}`,
      description,
      url: `${siteUrl}/services/${pkg.slug}`,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) notFound();

  const Icon = packageIcons[pkg.id];
  const others = packages.filter((p) => p.id !== pkg.id);

  return (
    <>
      <article className="band bg-paper">
        <div className="shell max-w-[52rem]">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <IconArrowLeft className="size-4" />
            All services
          </Link>

          <header className="mt-7">
            <Icon className="size-8 text-indigo" aria-hidden />
            <h1 className="mt-4 text-display-l">{pkg.name}</h1>
            <p className="mt-3 max-w-[54ch] text-lead text-ink-muted">{pkg.oneLiner}</p>
            <p className="mt-4 max-w-[58ch] border-t border-rule pt-4 text-sm text-ink-muted">
              {pkg.subtitle}
            </p>
          </header>

          <div className="mt-10">
            <PackageDetail pkg={pkg} headingLevel="h2" />
          </div>

          <nav aria-label="Other services" className="mt-14 border-t border-rule pt-8">
            <h2 className="text-xs text-ink-muted">Other things I build</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((other) => {
                const OtherIcon = packageIcons[other.id];
                return (
                  <li key={other.id}>
                    <Link
                      href={`/services/${other.slug}`}
                      className="flex h-full items-start gap-3 rounded-card border border-rule bg-card p-4 transition-colors hover:border-rule-strong/45"
                    >
                      <OtherIcon className="mt-0.5 size-5 shrink-0 text-indigo" aria-hidden />
                      <span>
                        <span className="block font-medium">{other.name}</span>
                        <span className="mt-0.5 block text-sm text-ink-muted">
                          From ₹{other.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </article>

      <Contact />
    </>
  );
}
