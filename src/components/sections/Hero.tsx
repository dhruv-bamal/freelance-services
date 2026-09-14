/**
 * Hero.
 *
 * The one orchestrated motion moment on the page: a short staggered settle on load,
 * done in CSS with animation-delay rather than a motion library, so it costs no
 * JavaScript and cannot delay the largest contentful paint.
 *
 * The headline is deliberately NOT wrapped in `Reveal`. Animating in the first
 * thing a visitor sees means LCP waits for an IntersectionObserver callback — the
 * exact trade the brief warned against, and measurable on a slow connection.
 *
 * The eyebrow is prose rather than the usual tracked-out, bullet-separated string.
 * That treatment appears on every templated site; this one says where he is and
 * who he works with, which is information.
 */
import { site } from '@/config/site';
import { LinkButton } from '@/components/ui/Button';
import { Portrait } from './Portrait';
import { HeroBackdrop } from './HeroBackdrop';

/** Held to four, and each one is something a client can verify on the first call. */
const assurances = [
  'You talk to the person building it',
  'Prices published before you commit',
  'Built around how you actually work',
  'Support after it goes live',
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero relative overflow-hidden">
      <HeroBackdrop />

      <div className="shell relative grid items-center gap-11 pt-11 pb-14 sm:pt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:pt-16 lg:pb-18">
        <div>
          <p className="hero-in text-sm text-ink-muted" style={{ '--i': 0 } as React.CSSProperties}>
            Independent developer in {site.location}, working with businesses across India.
          </p>

          <h1
            id="hero-title"
            className="hero-in mt-5 max-w-[15ch] text-display-xl"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            {site.tagline}
          </h1>

          <p
            className="hero-in mt-6 max-w-[54ch] text-lead text-ink-muted"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            Websites, booking systems, business applications and AI — built around how your
            business actually works, with the starting price on the page before we begin.
          </p>

          <div
            className="hero-in mt-9 flex flex-wrap gap-3"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            <LinkButton href="#finder" variant="accent" className="px-6">
              Find my solution
            </LinkButton>
            <LinkButton href="#work" variant="outline" className="px-6">
              View my work
            </LinkButton>
          </div>
        </div>

        <div
          className="hero-in mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:mr-0 lg:ml-auto lg:max-w-[20.5rem]"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          <Portrait />

          <ul className="mt-7 space-y-2.5 sm:mt-8">
            {assurances.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-ink-muted">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-rule-strong" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
