/**
 * Add-ons.
 *
 * Twenty-one items, each with a sentence of explanation, was the largest block of
 * prose on the page — and the least likely to be read, because nobody reads a price
 * list, they scan it. So the descriptions are gone and this is now what it always
 * wanted to be: a rate card. Name on the left, figure on the right, hairline
 * between, grouped by the moment a client needs them.
 *
 * The names carry the meaning on their own — "Online payments", "Data migration".
 * Anything that genuinely needs explaining belongs in a conversation, which is what
 * the line at the foot is for.
 */
import { addOns, addOnGroups } from '@/data/addons';
import { formatRange } from '@/lib/format';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function AddOns() {
  return (
    <section id="add-ons" aria-labelledby="addons-title" className="band bg-paper">
      <div className="shell">
        <SectionHeading
          id="addons-title"
          title="Need something extra?"
          lead="Typical ranges, added only if your project needs them."
        />

        <div className="mt-9 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {addOnGroups.map((group) => (
            <Reveal key={group.id}>
              <h3 className="text-xs text-ink-muted">{group.label}</h3>
              <dl className="mt-2 divide-y divide-rule border-t border-rule">
                {addOns
                  .filter((item) => item.group === group.id)
                  .map((item) => (
                    <div
                      key={item.name}
                      className="flex items-baseline justify-between gap-4 py-2.5"
                    >
                      <dt className="text-sm">{item.name}</dt>
                      <dd className="shrink-0 text-sm text-ink-muted">
                        {formatRange(item)}
                        {item.suffix ? <span className="text-xs"> {item.suffix}</span> : null}
                      </dd>
                    </div>
                  ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="max-w-[62ch] text-sm text-ink-muted">
            Domains are registered in your name, on your account. Care plans cover
            working-hours response — not around-the-clock cover, which is not something one
            person can honestly promise.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
