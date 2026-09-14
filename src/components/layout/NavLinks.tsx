'use client';

/**
 * Desktop navigation, with the current section marked.
 *
 * A nav on a long single page that never says where you are is decoration. An
 * IntersectionObserver watches each section and highlights the matching link, so
 * the nav answers "where am I" as well as "where can I go".
 *
 * `rootMargin` puts the detection band across the upper-middle of the viewport
 * rather than at the very top: without it, a section is "current" the instant its
 * first pixel appears, and the highlight flickers between two links while a
 * heading crosses the fold.
 */
import { useEffect, useState } from 'react';

import { navLinks, site } from '@/config/site';
import { IconArrowUpRight } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

export function NavLinks() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        // Whichever watched section occupies most of the band wins.
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        setCurrent(best);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {navLinks.map((link) => {
          const active = current === link.href.slice(1);
          return (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'relative inline-flex h-10 items-center rounded-btn px-3 text-sm transition-colors',
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-3 bottom-1 h-px origin-left bg-indigo transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            </li>
          );
        })}

        {/*
          The portfolio sits at the end, after a hairline, because it is the one
          item that leaves the site. Grouping it with the section anchors would
          promise an in-page jump and deliver a new tab — the small arrow and the
          rule are what mark the difference before the click, not after it.
        */}
        <li aria-hidden className="mx-2 h-4 w-px bg-rule" />
        <li>
          <a
            href={site.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-btn px-3 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            Portfolio
            <IconArrowUpRight className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
