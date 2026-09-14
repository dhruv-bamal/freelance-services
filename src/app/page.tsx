/**
 * Home.
 *
 * Ten sections, in the order a visitor's questions arrive:
 *
 *   Hero            who this is
 *   Trust strip     the span of what can be built
 *   Finder          "which of those is mine?"
 *   Services        what it is and what it costs
 *   Add-ons         what else it might need
 *   Process         what working together looks like
 *   Work            three demos you can open and use
 *   About           who is building it
 *   FAQ             the objections
 *   Contact         the ask
 *
 * Two sections were removed rather than shortened:
 *
 *  • "Why work with me" said the same four things as the assurances beside the
 *    hero portrait. Saying them twice did not make them twice as true.
 *  • "Testimonials" was a whole section explaining that there are none yet. The
 *    honesty is right, a section-sized apology for it is not; the one useful
 *    sentence moved into About.
 *
 * The page is roughly half the words it was. Nobody reads a services site
 * end to end — they scan for the price and the proof.
 */
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { FinderSection } from '@/components/sections/FinderSection';
import { Services } from '@/components/sections/Services';
import { AddOns } from '@/components/sections/AddOns';
import { Process } from '@/components/sections/Process';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FinderSection />
      <Services />
      <AddOns />
      <Process />
      <Work />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
