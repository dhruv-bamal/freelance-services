/**
 * About.
 *
 * The degree is stated plainly and positioned as context rather than apology —
 * "I'm a final-year student looking for freelance work" invites a discount; "I am
 * a developer who builds business software, and I am finishing a CS degree while
 * doing it" does not. Both are true; only one of them is how a client should read it.
 *
 * No project count, no years of experience, no client logos. There is nothing to
 * count yet, and the work section does the proving.
 */
import { site } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';

const focus = [
  { label: 'Websites & interfaces', body: 'Fast sites that work on the phones your customers own.' },
  { label: 'Business systems', body: 'Bookings, customer records, admin dashboards.' },
  { label: 'Backend & data', body: 'Databases, logins, and automating repeated manual steps.' },
  { label: 'AI applications', body: 'Assistants grounded in your own content.' },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="band bg-card">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading id="about-title" title={`I'm ${site.name}.`} />

          <div className="mt-5 max-w-[56ch] space-y-4 text-ink-muted">
            <p>
              I build websites, booking systems, business applications, dashboards and AI
              tools. Most of my work starts the same way: something currently done by hand,
              on paper, or over a dozen phone calls — and someone who has decided that is
              enough.
            </p>
            <p>
              I am also completing a {site.education.degree} at{' '}
              {site.education.institution} ({site.education.period}), alongside the client
              work rather than instead of it. The first client projects are in progress now;
              until they are finished and those clients are happy to be named, the demos
              above are what I can honestly show you.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href={site.portfolioUrl} variant="outline" external>
              View my portfolio
            </LinkButton>
            <LinkButton href={site.githubUrl} variant="outline" external>
              See my code on GitHub
            </LinkButton>
          </div>
        </div>

        <Reveal>
          <h3 className="text-xs text-ink-muted">What I work on</h3>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            {focus.map((item) => (
              <div key={item.label} className="py-4">
                <dt className="font-display text-display-s font-medium">{item.label}</dt>
                <dd className="mt-1 max-w-[52ch] text-sm text-ink-muted">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
