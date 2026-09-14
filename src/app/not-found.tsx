/**
 * 404.
 *
 * An empty state is an invitation to act, not an apology. This one says what
 * happened in one line and then offers the two things someone who landed here
 * probably wanted: the services, or a way to ask.
 */
import Link from 'next/link';

import { generalEnquiry } from '@/lib/whatsapp';
import { LinkButton } from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="band">
      <div className="shell max-w-[46rem] py-10 text-center">
        <p className="font-display text-display-l text-indigo/35">404</p>
        <h1 className="mt-3 text-display-l">This page does not exist.</h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-lead text-ink-muted">
          The link may be out of date, or the address may have a typo in it. Everything I
          build and what it costs is on the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/#services" variant="accent">
            See what I build
          </LinkButton>
          <LinkButton href={generalEnquiry()} variant="outline" external>
            Ask me on WhatsApp
          </LinkButton>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Or go back to the{' '}
          <Link href="/" className="link">
            home page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
