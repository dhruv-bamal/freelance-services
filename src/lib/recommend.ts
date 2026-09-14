/**
 * The recommendation engine.
 *
 * A pure function: same answers in, same result out, no React and no side effects.
 * That matters because this is the one piece of logic on the site a client will
 * judge — if it tells a hotel owner to buy a landing page, nothing else on the page
 * saves it. Being pure means the scenarios in `tests/recommend.test.ts` can assert
 * it directly instead of someone clicking through the UI and hoping.
 *
 * Two layers, in order:
 *   1. SCENARIOS — named situations where the right answer is known, and a generic
 *      score would be a worse answer than a specific one. These win outright.
 *   2. SCORING   — weights from `data/finder.ts` summed across the answers.
 *
 * The result always carries an `alternative`, and the UI always offers "see all
 * packages". A visitor who disagrees with the recommendation must never be stuck
 * with it — this is a signpost, not a funnel.
 */
import { budgetCeiling, type FinderAnswers, type FinderStep } from '@/data/finder';
import type { PackageId } from '@/types';

/**
 * The minimum this engine needs to know about a package.
 *
 * Injected rather than imported, because `recommend` runs in the browser: importing
 * the full catalogue would pull every tier, inclusion list and technical note into
 * the client bundle to produce three lines of text. The server passes this down as
 * a prop instead, and the test supplies its own — which is also why the test does
 * not break when a price changes.
 */
export interface CatalogEntry {
  name: string;
  startingPrice: number;
  oneLiner: string;
}
export type Catalog = Record<PackageId, CatalogEntry>;

export interface Recommendation {
  packageId: PackageId;
  /** The sentence that opens the result. Never absolute — "likely", not "is". */
  headline: string;
  /** Why, in the visitor's own terms. Two sentences at most. */
  reason: string;
  /** Runner-up, so the result is a shortlist rather than a verdict. */
  alternative: PackageId | null;
  /**
   * Set when the stated budget sits below where the recommended category starts.
   * Saying so is better business than staying quiet and losing the enquiry at the
   * price — and it is the honest thing to do.
   */
  budgetNote: string | null;
  /** False when the top two scores are close, which the UI says out loud. */
  confident: boolean;
}

const ORDER: PackageId[] = ['ai-website', 'full-stack', 'backend', 'web-design', 'analytics'];

type Scenario = {
  id: string;
  when: (a: FinderAnswers) => boolean;
  packageId: PackageId;
  alternative: PackageId | null;
  headline: string;
  reason: string;
};

/**
 * Named scenarios. Order matters — the first match wins, so the most specific
 * situations are listed first.
 */
const SCENARIOS: Scenario[] = [
  {
    id: 'hotel-bookings',
    when: (a) =>
      a.business === 'hotel' &&
      (a.build === 'booking' || a.goal === 'bookings' || a.goal === 'manage' || a.build === 'system'),
    packageId: 'full-stack',
    alternative: 'web-design',
    headline: 'A Full-Stack Website is likely the right fit.',
    reason:
      'Your business needs more than a normal website. A Full-Stack Website combines your hotel website with online room booking, availability, customer details and an admin area your staff log into.',
  },
  {
    id: 'institute-management',
    when: (a) =>
      a.business === 'institute' &&
      (a.goal === 'manage' || a.build === 'system' || a.goal === 'manual' || a.build === 'booking'),
    packageId: 'full-stack',
    alternative: 'web-design',
    headline: 'A Full-Stack Website is likely the right fit.',
    reason:
      'Because your institute needs management features as well as a public website — students, batches, fees, staff access — a custom business application fits better than an informational site.',
  },
  {
    id: 'startup-product-launch',
    when: (a) =>
      a.business === 'startup' &&
      a.build === 'website' &&
      (a.budget === 'under-20k' || a.budget === '20-50k'),
    packageId: 'web-design',
    alternative: 'full-stack',
    headline: 'Website Design is the sensible place to start.',
    reason:
      'Get the product in front of people first with a site that looks established and collects enquiries. Accounts, payments and dashboards can be added later without rebuilding it.',
  },
  {
    id: 'spreadsheet-visibility',
    when: (a) => a.goal === 'data' && a.build !== 'ai',
    packageId: 'analytics',
    alternative: 'full-stack',
    headline: 'Data & Analytics is what you are describing.',
    reason:
      'You already have the numbers — the problem is reading them. A dashboard built on your own data answers the questions you currently work out by hand.',
  },
  {
    id: 'existing-frontend',
    when: (a) => a.build === 'system' && a.goal === 'manual' && a.budget === 'under-20k',
    packageId: 'backend',
    alternative: 'full-stack',
    headline: 'A Backend System is probably where to begin.',
    reason:
      'If the front of your site already works, the cheapest useful step is building the system behind it — storage, logins and the steps that currently happen by hand.',
  },
];

function score(answers: FinderAnswers, steps: FinderStep[]) {
  const totals: Record<PackageId, number> = {
    'ai-website': 0,
    'full-stack': 0,
    backend: 0,
    'web-design': 0,
    analytics: 0,
  };

  for (const step of steps) {
    const chosen = answers[step.id];
    if (!chosen) continue;
    const option = step.options.find((o) => o.value === chosen);
    if (!option?.weights) continue;
    for (const [id, weight] of Object.entries(option.weights)) {
      totals[id as PackageId] += weight ?? 0;
    }
  }
  return totals;
}

/**
 * Flags the case where someone wants something that starts above what they said
 * they can spend. The copy invites a conversation rather than closing the door,
 * because "your budget is too low" loses an enquiry that "here is what fits"
 * usually keeps.
 */
function budgetNoteFor(
  packageId: PackageId,
  budget: string | undefined,
  catalog: Catalog,
): string | null {
  if (!budget) return null;
  const ceiling = budgetCeiling[budget];
  if (ceiling == null) return null;

  const pkg = catalog[packageId];
  if (pkg.startingPrice <= ceiling) return null;

  return `${pkg.name} starts at ₹${pkg.startingPrice.toLocaleString('en-IN')}, which is above the range you picked. That is worth a conversation rather than a no — there is usually a smaller first version that fits, and it can be built on later.`;
}

export function recommend(
  answers: FinderAnswers,
  steps: FinderStep[],
  catalog: Catalog,
): Recommendation {
  const scenario = SCENARIOS.find((s) => s.when(answers));

  if (scenario) {
    return {
      packageId: scenario.packageId,
      headline: scenario.headline,
      reason: scenario.reason,
      alternative: scenario.alternative,
      budgetNote: budgetNoteFor(scenario.packageId, answers.budget, catalog),
      confident: true,
    };
  }

  const totals = score(answers, steps);
  const ranked = ORDER.map((id) => ({ id, value: totals[id] })).sort((a, b) => b.value - a.value);
  const [top, second] = ranked;

  /**
   * Every weight was zero — the visitor picked "not sure" and "something else"
   * throughout. Guessing here would be worse than admitting it, so the UI gets a
   * result that says "let's talk" and points at the broadest category.
   */
  if (top.value === 0) {
    return {
      packageId: 'full-stack',
      headline: 'Let us work this out together.',
      reason:
        'From what you have told me there is no obvious single answer, which is completely normal at this stage. Send me a message describing your business in your own words and I will tell you what I would build.',
      alternative: 'web-design',
      budgetNote: null,
      confident: false,
    };
  }

  const pkg = catalog[top.id];
  const close = second.value > 0 && top.value - second.value <= 2;

  return {
    packageId: top.id,
    headline: close
      ? `${pkg.name} looks like the closest fit.`
      : `Based on your answers, ${pkg.name} is likely the best fit.`,
    reason: close
      ? `${pkg.oneLiner} A couple of these could work for you, so treat this as a starting point rather than a verdict.`
      : pkg.oneLiner,
    alternative: second.value > 0 ? second.id : null,
    budgetNote: budgetNoteFor(top.id, answers.budget, catalog),
    confident: !close,
  };
}
