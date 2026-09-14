/**
 * Shared shapes for the content layer.
 *
 * Everything the site says about what Dhruv sells is typed here and authored in
 * `src/data/*`. Components consume these types and never redeclare them, so adding
 * a tier or an add-on is a data edit, not a component edit.
 */

/** The five solution categories, in the order they are presented on the page. */
export type PackageId =
  | 'ai-website'
  | 'full-stack'
  | 'backend'
  | 'web-design'
  | 'analytics';

/** One price level inside a category. Three per category. */
export interface Tier {
  id: string;
  name: string;
  /** Rupees. Always rendered as "From ₹x" — never as a fixed quote. */
  startingPrice: number;
  /** One sentence, in the client's language, describing the outcome. */
  summary: string;
  /** What is included. Plain nouns, no stack names. */
  includes: string[];
  /** Set on exactly one tier per category, and only where it is honestly the common choice. */
  popular?: boolean;
}

export interface SolutionPackage {
  id: PackageId;
  /** URL segment for /services/[slug]. */
  slug: string;
  name: string;
  /** Shown under the name. One line, business-first. */
  subtitle: string;
  /** The single sentence that explains the category to someone non-technical. */
  oneLiner: string;
  /** Who this is for. Rendered as a list; keep each entry to a few words. */
  bestFor: string[];
  startingPrice: number;
  /** Human phrase, e.g. "2 to 4 weeks". Never a guarantee. */
  timeline: string;
  /** Three to five outcomes, shown on the overview card. */
  benefits: string[];
  tiers: Tier[];
  /** Level 2 of the disclosure: how a project in this category actually runs. */
  howItWorks: { title: string; body: string }[];
  /**
   * Level 3: for the visitor who does know what a REST API is. Hidden behind a
   * <details> so it never taxes the business owner who does not.
   */
  technical: string[];
  /** Category-specific caveat shown under the tiers. */
  note: string;
  /** Prefilled into the WhatsApp message when this package's CTA is used. */
  ctaLabel: string;
}

export interface AddOn {
  name: string;
  /** Rupees. `to` omitted for a single-figure add-on. */
  from: number;
  to?: number;
  /** e.g. "month" for recurring, "page" for per-unit. Omitted for one-off. */
  per?: string;
  /** Appended after the price, e.g. "+ domain cost". */
  suffix?: string;
  /** Renders the upper bound as "x+" — scope genuinely has no ceiling here. */
  openEnded?: boolean;
  description: string;
  group: 'launch' | 'care' | 'features' | 'growth';
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface WorkProject {
  slug: string;
  name: string;
  /** e.g. "Booking platform". Shown as the card's category. */
  category: string;
  /**
   * Honest provenance. These are Dhruv's own builds, not client work, and the card
   * says so in the UI — never remove this label.
   */
  label: 'Demo build';
  problem: string;
  solution: string;
  /** What the build demonstrates. Never a client outcome, never a metric. */
  demonstrates: string;
  image: { src: string; alt: string; width: number; height: number };
  /** The deployed demo. External, so it opens in a new tab. */
  liveUrl: string;
  /** Extra screens, each linking to that exact route inside the live demo. */
  gallery: { src: string; alt: string; caption: string; href: string }[];
  /** Surfaced under "Technical details" for the reader who wants it. */
  technical: string[];
  stack: string[];
}
