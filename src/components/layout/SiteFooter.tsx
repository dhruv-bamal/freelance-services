/**
 * Footer, on the ink surface.
 *
 * Wrapped in `.on-ink`, which swaps the focus ring and link colour — the indigo
 * accent measures 2.02:1 against ink and is unreadable there, so everything inside
 * uses --color-indigo-light (7.86:1) instead. That swap is done once, by the
 * parent class, rather than remembered at each link.
 *
 * Every value here comes from config/site.ts. Nothing is retyped.
 */
import { site, navLinks } from '@/config/site';
import { generalEnquiry } from '@/lib/whatsapp';
import { ExternalLink } from '@/components/ui/Button';
import { IconGitHub, IconLinkedIn, IconGlobe } from '@/components/ui/icons';

const socials = [
  { href: site.githubUrl, label: 'GitHub', handle: site.githubHandle, Icon: IconGitHub },
  { href: site.linkedinUrl, label: 'LinkedIn', handle: site.linkedinHandle, Icon: IconLinkedIn },
  { href: site.portfolioUrl, label: 'Portfolio', handle: site.portfolioHandle, Icon: IconGlobe },
];

export function SiteFooter() {
  return (
    <footer className="on-ink">
      <div className="shell band-tight">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <p className="flex items-center gap-2.5 font-display text-display-s font-semibold">
              <span aria-hidden className="size-2.5 rounded-[2px] bg-indigo-light" />
              {site.name}
            </p>
            <p className="mt-3 max-w-[30ch] text-sm text-paper-muted">{site.tagline}</p>
            <p className="mt-5 text-sm text-paper-muted">{site.location}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-medium text-paper-muted">Explore</h2>
            <ul className="mt-2 space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-[2rem] items-center text-sm text-paper hover:text-indigo-light">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="inline-flex min-h-[2rem] items-center text-sm text-paper hover:text-indigo-light">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-medium text-paper-muted">Get in touch</h2>
            <ul className="mt-2 space-y-0.5">
              <li>
                <a href={site.emailHref} className="inline-flex min-h-[2rem] items-center text-sm text-paper hover:text-indigo-light">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex min-h-[2rem] items-center text-sm text-paper hover:text-indigo-light">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <ExternalLink
                  href={generalEnquiry()}
                  className="inline-flex min-h-[2rem] items-center text-sm text-paper hover:text-indigo-light"
                >
                  Chat on WhatsApp
                </ExternalLink>
              </li>
            </ul>

            <ul className="mt-5 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <ExternalLink
                    href={href}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-btn border border-rule-ink text-paper-muted transition-colors hover:border-indigo-light hover:text-indigo-light"
                  >
                    <Icon className="size-[1.05rem]" />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule-ink pt-6 text-xs text-paper-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Built with care.</p>
        </div>
      </div>
    </footer>
  );
}
