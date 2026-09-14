/**
 * How I work.
 *
 * The one section on this page that uses numbered markers, because this one
 * genuinely is a sequence — the numbers carry the order, they are not decoration.
 * Everywhere else on the site, numbering was checked against the content and left out.
 *
 * Marked up as an <ol>, so a screen reader announces "list of 5 items" and the
 * position of each, rather than five unrelated headings.
 */
import { processSteps } from '@/data/process';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="band bg-card">
      <div className="shell">
        <SectionHeading
          id="process-title"
          title="From idea to launch — without the technical headache."
          lead="You do not need to know how software is built. That is the part I handle. Here is what working together actually looks like."
        />

        <ol className="mt-10 grid gap-px overflow-hidden rounded-card border border-rule bg-rule lg:mt-12 lg:grid-cols-5">
          {processSteps.map((step) => (
            <li key={step.step} className="bg-paper p-5 sm:p-6">
              <p aria-hidden className="font-display text-display-m font-medium text-indigo/35">
                {step.step}
              </p>
              <h3 className="mt-3 font-display text-display-s font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <Reveal className="mt-8">
          <p className="text-sm text-ink-muted">
            Nothing gets built before you have the scope and the figure in writing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
