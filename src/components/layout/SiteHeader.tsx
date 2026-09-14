/**
 * Sticky header.
 *
 * The wordmark and the navigation sit together on the left, with the call to
 * action alone on the right. The previous layout spread all three with
 * space-between, which at 1280px+ left 257px of dead air on either side of the
 * links — the nav read as floating rather than placed, and the header looked
 * sparse at exactly the width most clients will see it.
 *
 * The "compacts on scroll" behaviour is a CSS scroll-driven animation
 * (`animation-timeline: scroll()`), not a scroll listener: no JavaScript, nothing
 * running per frame, and in a browser without support the header simply stays at
 * full height. Nothing to break, only something that does not happen.
 */
import Link from 'next/link';

import { site } from '@/config/site';
import { generalEnquiry } from '@/lib/whatsapp';
import { LinkButton } from '@/components/ui/Button';
import { NavLinks } from './NavLinks';
import { MobileNav } from './MobileNav';

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-transparent bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-full items-center gap-8">
        <Link
          href="/"
          className="site-header__mark group flex shrink-0 items-center gap-2.5 font-display text-[1.0625rem] font-semibold tracking-[-0.02em]"
        >
          <span
            aria-hidden
            className="size-2.5 rounded-[2px] bg-indigo transition-transform duration-200 group-hover:rotate-45"
          />
          {site.name}
        </Link>

        <NavLinks />

        {/* Pushes the action to the right edge without stranding the nav mid-header. */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LinkButton href="#contact" variant="accent" className="hidden sm:inline-flex">
            Start a project
          </LinkButton>
          <a
            href={generalEnquiry()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent sm:hidden"
          >
            Message me
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
