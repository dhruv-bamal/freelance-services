/**
 * FAQ.
 *
 * Native <details>/<summary>, which gives keyboard operation, correct screen-reader
 * announcement, and — importantly for a page this long — in-page search that can
 * actually find text inside a closed answer, because Chrome expands a <details> to
 * reach a match. A div-with-useState accordion does none of that.
 *
 * The same questions and answers are emitted as FAQPage structured data from
 * StructuredData.tsx, reading the same file, so the two cannot diverge.
 */
import { faqs } from '@/data/faqs';
import { site } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Disclosure } from '@/components/ui/Disclosure';
import { generalEnquiry } from '@/lib/whatsapp';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="band bg-paper">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading id="faq-title" title="Questions people ask before starting" />
          <Reveal className="mt-5">
            <p className="max-w-[38ch] text-ink-muted">
              If yours is not here, just ask. I would rather answer a question than have
              someone decide not to get in touch.
            </p>
            <a
              href={generalEnquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-3 inline-flex min-h-[2rem] items-center text-sm"
            >
              Ask me on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="mt-6 text-sm text-ink-muted">{site.responseTime}</p>
          </Reveal>
        </div>

        <div className="divide-y divide-rule border-y border-rule">
          {faqs.map((faq) => (
            <Disclosure key={faq.question} summary={faq.question}>
              <p>{faq.answer}</p>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
