/**
 * The finder's section wrapper.
 *
 * A server component whose only job is to hand the client component exactly the
 * data it needs — `finderCatalog` (three fields per package) and `packageSummaries`
 * (six) — instead of letting it import the 500-line catalogue directly. The heading
 * and copy stay server-rendered so they are in the HTML for a crawler and for
 * anyone whose JavaScript has not arrived yet.
 */
import { finderCatalog, packageSummaries } from '@/data/packages';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectFinder } from './ProjectFinder';

export function FinderSection() {
  return (
    <section id="finder" aria-labelledby="finder-title" className="band bg-paper">
      <div className="shell">
        <SectionHeading
          id="finder-title"
          title="Not sure what you need?"
          lead="Five questions, about a minute. Nothing is required of you at the end."
        />

        <Reveal className="mt-10 max-w-[52rem] lg:mt-12">
          <ProjectFinder catalog={finderCatalog} summaries={packageSummaries} />
        </Reveal>
      </div>
    </section>
  );
}
