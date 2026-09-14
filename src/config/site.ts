/**
 * SINGLE SOURCE OF TRUTH for identity, contact details and SEO copy.
 *
 * Every contact string on the site appears here exactly once. The header, hero,
 * contact section, footer and JSON-LD all read from this file, so the phone number
 * can never drift out of sync across the page — which matters, because consistent
 * and visible contact information is the strongest trust signal this site has.
 *
 * To change a contact detail, change it here and nowhere else.
 */

/** wa.me requires the number with no '+', spaces or dashes. */
const PHONE_E164 = '+919810505413';
const WHATSAPP_DIGITS = '919810505413';

export const site = {
  name: 'Dhruv Bamal',
  /** Used in the header wordmark and the footer. */
  shortName: 'Dhruv Bamal',
  initials: 'DB',

  /** Positioning line. Not a job title — what a client gets. */
  role: 'Independent developer',
  positioning:
    'I design and build reliable digital products for businesses and startups — from high-converting websites and booking systems to custom business applications, analytics dashboards and AI-powered solutions.',
  tagline: 'Digital products built around your business.',

  location: 'Ghaziabad, Uttar Pradesh',

  /* ---- Contact ---------------------------------------------------------- */
  email: 'bamaldhruv1105@gmail.com',
  emailHref: 'mailto:bamaldhruv1105@gmail.com',
  phoneDisplay: '+91 98105 05413',
  phoneHref: `tel:${PHONE_E164}`,
  whatsappDigits: WHATSAPP_DIGITS,
  whatsappDisplay: '+91 98105 05413',

  githubUrl: 'https://github.com/dhruv-bamal',
  githubHandle: 'github.com/dhruv-bamal',
  linkedinUrl: 'https://linkedin.com/in/dhruv-bamal',
  linkedinHandle: 'linkedin.com/in/dhruv-bamal',
  portfolioUrl: 'https://dhruv-bamal.vercel.app',
  portfolioHandle: 'dhruv-bamal.vercel.app',

  /**
   * Shown next to the submit button — the exact moment a visitor wonders whether
   * they will be ignored. Keep it honest. It is a promise, not a slogan.
   */
  responseTime: 'I usually reply within a few hours.',

  /* ---- Portrait ---------------------------------------------------------
   * LEAVE THIS NULL. Portrait.tsx looks for
   *   public/images/profile.{jpg,jpeg,png,webp,avif}
   * on its own, so saving the file is the entire task — no code edit.
   *
   * Only set this if the photo has to live somewhere other than that path.
   *
   * The frame is a circle, deliberately: it puts the bottom-right corner of a
   * square source outside the visible area, so a generator watermark there is
   * cropped out geometrically rather than covered up. Hovering resolves the
   * photograph into ASCII — see AsciiPortrait.tsx.
   *
   * Use a real photograph — never a stock person, never a generated face.
   * ---------------------------------------------------------------------- */
  portrait: null as string | null,
  portraitAlt: 'Dhruv Bamal',

  /* ---- Education --------------------------------------------------------
   * Stated plainly on the About section. Framed as part of the journey, which is
   * what it is — not as a disclaimer, and never padded with claims.
   * ---------------------------------------------------------------------- */
  education: {
    degree: 'B.Tech, Computer Science and Engineering',
    institution: 'SRM Institute of Science and Technology, Ghaziabad',
    period: '2023 – 2027',
  },

  /* ---- SEO -------------------------------------------------------------- */
  seo: {
    title: 'Dhruv Bamal — Websites, Business Systems & AI Solutions',
    description:
      'Independent developer building websites, booking systems, business applications, dashboards and AI solutions for businesses and startups. Clear starting prices, direct communication.',
    ogTitle: 'Dhruv Bamal — Digital products built around your business',
    ogDescription:
      'Websites, booking systems, business applications and AI solutions. Transparent starting prices, plain-language scope, direct contact on WhatsApp.',
    locale: 'en_IN',
  },
} as const;

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the deployment environment; the
 * localhost fallback is only useful while developing.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

/** Primary navigation. Order mirrors the page's trust hierarchy. */
export const navLinks = [
  { href: '#services', label: 'Pricing' },
  { href: '#process', label: 'Process' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
] as const;
