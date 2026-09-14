/**
 * Contact.
 *
 * The conversion section, and the last thing before the footer. Placed here rather
 * than at the top on purpose: by this point a visitor has seen what is on offer,
 * what it costs, how a project runs, and who is building it — so the WhatsApp
 * button reads as the obvious next step rather than as a demand made of a stranger.
 *
 * The form is short. The project finder above is where the detailed qualification
 * happens; asking the same twelve questions twice is how a form gets abandoned.
 */
import { site } from '@/config/site';
import { packages } from '@/data/packages';
import { finderSteps } from '@/data/finder';
import { generalEnquiry } from '@/lib/whatsapp';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ExternalLink } from '@/components/ui/Button';
import {
  IconWhatsApp,
  IconMail,
  IconPhone,
  IconGitHub,
  IconLinkedIn,
  IconGlobe,
} from '@/components/ui/icons';
import { ContactForm } from './ContactForm';

/* Both option lists are derived, not retyped — the form's dropdowns cannot drift
   out of step with the packages on the page or the finder's budget bands. */
const projectOptions = ['Not sure yet', ...packages.map((p) => p.name), 'Something else'];
const budgetOptions = [
  'Not sure yet',
  ...finderSteps
    .find((s) => s.id === 'budget')!
    .options.filter((o) => o.value !== 'unsure')
    .map((o) => o.label),
];

const channels = [
  { Icon: IconWhatsApp, label: 'WhatsApp', value: site.whatsappDisplay, href: generalEnquiry(), external: true },
  { Icon: IconMail, label: 'Email', value: site.email, href: site.emailHref, external: false },
  { Icon: IconPhone, label: 'Phone', value: site.phoneDisplay, href: site.phoneHref, external: false },
];

const elsewhere = [
  { Icon: IconGlobe, label: 'Portfolio', value: site.portfolioHandle, href: site.portfolioUrl },
  { Icon: IconGitHub, label: 'GitHub', value: site.githubHandle, href: site.githubUrl },
  { Icon: IconLinkedIn, label: 'LinkedIn', value: site.linkedinHandle, href: site.linkedinUrl },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="band bg-card">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            title="Have a project in mind?"
            lead="Tell me what you are trying to build. If I am not the right person for it, I will say so."
          />

          <Reveal className="mt-8">
            <a
              href={generalEnquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent w-full px-6 sm:w-auto"
            >
              <IconWhatsApp className="size-4" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <dl className="mt-8 divide-y divide-rule border-y border-rule">
              {channels.map(({ Icon, label, value, href, external }) => (
                <div key={label} className="flex items-center gap-4 py-3.5">
                  <Icon className="size-[1.15rem] shrink-0 text-indigo" />
                  <dt className="w-24 shrink-0 text-sm text-ink-muted">{label}</dt>
                  <dd className="min-w-0 flex-1 text-sm">
                    {external ? (
                      <ExternalLink href={href} className="inline-flex min-h-[2rem] items-center break-words hover:text-indigo">
                        {value}
                      </ExternalLink>
                    ) : (
                      <a href={href} className="inline-flex min-h-[2rem] items-center break-words hover:text-indigo">
                        {value}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <dl className="mt-6 space-y-2.5">
              {elsewhere.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <Icon className="size-[1.15rem] shrink-0 text-ink-muted" />
                  <dt className="w-24 shrink-0 text-sm text-ink-muted">{label}</dt>
                  <dd className="min-w-0 flex-1 text-sm">
                    <ExternalLink href={href} className="inline-flex min-h-[2rem] items-center break-words hover:text-indigo">
                      {value}
                    </ExternalLink>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 text-sm text-ink-muted">{site.responseTime}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-card border border-rule bg-paper p-5 sm:p-7">
            <h3 className="text-display-s font-display font-medium">Or send me the details</h3>
            <p className="mt-1.5 mb-6 text-sm text-ink-muted">
              Opens WhatsApp with your message written. Nothing sends until you press send.
            </p>
            <ContactForm projectOptions={projectOptions} budgetOptions={budgetOptions} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
