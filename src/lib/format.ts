/**
 * Money and number formatting.
 *
 * `en-IN` grouping is not cosmetic — ₹1,00,000 and ₹100,000 are the same number,
 * but only one of them reads as a price to someone in India. Getting this wrong is
 * a small tell that the site was not built for its audience.
 *
 * The formatter is created once at module scope rather than per call; it is used
 * dozens of times per render and `Intl.NumberFormat` construction is the expensive part.
 */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** ₹20,000 */
export const formatINR = (amount: number) => inr.format(amount);

/** "From ₹20,000" — the site never prints a bare price for a project. */
export const formatFrom = (amount: number) => `From ${formatINR(amount)}`;

/**
 * Add-on ranges: "₹2,000 – ₹5,000", "₹2,500/month", "₹5,000 – ₹15,000+".
 * An open-ended upper bound is marked rather than hidden, because an add-on whose
 * scope has no ceiling should not look like one that does.
 */
export function formatRange(opts: {
  from: number;
  to?: number;
  per?: string;
  openEnded?: boolean;
}): string {
  const head = opts.to
    ? `${formatINR(opts.from)} – ${formatINR(opts.to)}${opts.openEnded ? '+' : ''}`
    : `${formatINR(opts.from)}${opts.openEnded ? '+' : ''}`;
  return opts.per ? `${head}/${opts.per}` : head;
}
