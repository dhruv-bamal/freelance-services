/**
 * The offer. Five categories, three tiers each.
 *
 * !! LIST PRICES ONLY !!
 * Never put a negotiated or post-bargain floor price in this file. This repository
 * is public, and anything passed to a client component also lands in the RSC payload
 * that ships to the browser. Published prices are the starting point for a
 * conversation — the floor stays in the conversation.
 *
 * Writing rule: the visible copy contains no stack names. A hotel owner reads
 * `includes`; a developer reads `technical`. Keeping those two vocabularies in
 * separate fields is what lets one page serve both without patronising either.
 */
import type { SolutionPackage } from '@/types';

export const packages: SolutionPackage[] = [
  /* ---------------------------------------------------------------- 1 / AI */
  {
    id: 'ai-website',
    slug: 'ai',
    name: 'AI-Powered Website',
    subtitle: 'For businesses that want AI to become part of their customer experience.',
    oneLiner:
      'A website that answers your customers itself, around the clock.',
    bestFor: [
      'Businesses wanting an AI assistant',
      'Customer support automation',
      'Knowledge-based assistants',
      'AI-powered business tools',
      'Startups building AI products',
    ],
    startingPrice: 20000,
    timeline: '3 to 6 weeks',
    benefits: [
      'Answers customer questions day and night',
      'Trained on your business, not generic replies',
      'Cuts down repetitive calls and messages',
    ],
    tiers: [
      {
        id: 'ai-starter',
        name: 'AI Starter',
        startingPrice: 20000,
        summary: 'Add an intelligent assistant to your website.',
        includes: [
          'AI chat assistant on your site',
          'Conversation flow built around your business',
          'Answers written in your tone',
          'Website integration',
          'Setup and launch',
        ],
      },
      {
        id: 'ai-business',
        name: 'AI Business',
        startingPrice: 40000,
        popular: true,
        summary: 'Give your customers a smarter way to find information and get help.',
        includes: [
          'Everything in AI Starter',
          'Answers drawn from your own documents and pricing',
          'Remembers the conversation',
          'Customer sign-in where you need it',
          'Basic usage reporting',
        ],
      },
      {
        id: 'ai-product',
        name: 'AI Product',
        startingPrice: 80000,
        summary: 'Build a complete AI-powered product around your business idea.',
        includes: [
          'Custom website or application',
          'AI features designed for your use case',
          'Customer accounts',
          'Business dashboard',
          'Your own database',
          'Automated AI workflows',
          'Integrations with tools you already use',
          'Setup and launch',
        ],
      },
    ],
    howItWorks: [
      {
        title: 'We decide what it should know',
        body: 'Your pricing, services, policies, opening hours — whatever your customers keep asking about. That becomes what the assistant is allowed to answer from.',
      },
      {
        title: 'We decide what it should never do',
        body: 'Just as important. It will not guess at a price, promise a date, or invent an answer it has not been given. Anything outside its scope becomes a handover to you.',
      },
      {
        title: 'It goes on your site and you watch it',
        body: 'You see the real conversations for the first few weeks, and we tighten the answers based on what people actually ask rather than what we assumed they would.',
      },
    ],
    technical: [
      'Retrieval-augmented generation over your own content, so answers are grounded in supplied documents rather than model recall',
      'Streamed responses via the Vercel AI SDK, with a model-agnostic provider layer',
      'Vector search for document retrieval; chunking and embedding tuned to your content shape',
      'Prompt and tool definitions kept in version control and reviewable',
      'Conversation persistence, per-session rate limiting and usage logging',
      'Explicit fallback and escalation paths — the assistant hands off instead of guessing',
    ],
    note: 'AI provider costs are billed to your own account, so you keep control of them.',
    ctaLabel: 'Discuss my AI project',
  },

  /* --------------------------------------------------------- 2 / FULL STACK */
  {
    id: 'full-stack',
    slug: 'full-stack',
    name: 'Full-Stack Website',
    subtitle: 'An interactive website that can actually run part of your business.',
    oneLiner:
      'Bookings, customer records and an admin area you log into.',
    bestFor: [
      'Hotels and guest houses',
      'Institutes and coaching centres',
      'Booking-led businesses',
      'Startups with a real workflow',
      'Anyone replacing a manual register',
    ],
    startingPrice: 25000,
    timeline: '3 to 6 weeks',
    benefits: [
      'Take bookings or enquiries online, without phone tag',
      'See every customer and order in one place',
      'Replace registers, spreadsheets and WhatsApp threads',
    ],
    tiers: [
      {
        id: 'fs-launch',
        name: 'Launch',
        startingPrice: 25000,
        summary: 'For businesses that need a website plus real functionality.',
        includes: [
          'Professional website',
          'Enquiry capture that reaches you',
          'Forms built around what you need to know',
          'Basic admin area',
          'Your own database',
          'Setup and launch',
        ],
      },
      {
        id: 'fs-business',
        name: 'Business',
        startingPrice: 50000,
        popular: true,
        summary: 'Turn your website into a working business system.',
        includes: [
          'Everything in Launch',
          'Customer accounts',
          'Admin dashboard',
          'Booking and management workflows',
          'Email or WhatsApp notifications',
          'Online payments where you need them',
          'Features built around how you actually work',
        ],
      },
      {
        id: 'fs-custom',
        name: 'Custom',
        startingPrice: 90000,
        summary: 'For businesses with a more involved workflow.',
        includes: [
          'Custom business system',
          'Different logins for staff, managers and customers',
          'Advanced dashboards',
          'Automated workflows',
          'Online payments',
          'Integrations with tools you already use',
          'Reports you can act on',
          'Custom functionality throughout',
        ],
      },
    ],
    howItWorks: [
      {
        title: 'We map how the work happens now',
        body: 'Who takes the booking, where it gets written down, who needs to know, what goes wrong. The system gets built around that — not around a template.',
      },
      {
        title: 'You see it before it is built',
        body: 'Screens and flows first, so you can say "that is not how we do it" while changing it is still cheap.',
      },
      {
        title: 'It goes live with your real data',
        body: 'Existing customers, rooms, batches or products are loaded in, your staff get their logins, and I stay available while everyone gets used to it.',
      },
    ],
    technical: [
      'Next.js App Router with server components; mutations through server actions',
      'PostgreSQL with a typed query layer and versioned migrations',
      'Session-based authentication with role-based access control per user type',
      'Transactional integrity on booking and capacity operations — a seat or room is held exactly once, never double-allocated',
      'Background jobs for notifications, reminders and scheduled work',
      'Input validation at the boundary, structured logging, and health endpoints',
    ],
    note: 'The starting price assumes one clear workflow. More user types or integrations move it up.',
    ctaLabel: 'Discuss my business system',
  },

  /* ------------------------------------------------------------ 3 / BACKEND */
  {
    id: 'backend',
    slug: 'backend',
    name: 'Backend System',
    subtitle: 'The technology behind your website, app or business process.',
    oneLiner:
      'The part behind your site that actually does the work.',
    bestFor: [
      'Businesses with a website but no system behind it',
      'Companies replacing a manual process',
      'Apps that need a proper database',
      'Existing sites that need to do more',
      'Businesses connecting separate tools',
    ],
    startingPrice: 15000,
    timeline: '2 to 5 weeks',
    benefits: [
      'Your information lives somewhere safe and searchable',
      'Logins, permissions and admin controls that hold up',
      'Repetitive steps happen automatically',
    ],
    tiers: [
      {
        id: 'be-essential',
        name: 'Essential',
        startingPrice: 15000,
        summary: 'Add the essential functionality your website needs.',
        includes: [
          'Data storage and management',
          'Forms that save and notify',
          'A simple admin view',
          'Security basics',
          'Setup and launch',
        ],
      },
      {
        id: 'be-business',
        name: 'Business',
        startingPrice: 30000,
        popular: true,
        summary: 'Build the system that powers your business operations.',
        includes: [
          'Customer and record management',
          'Login system with roles',
          'Admin controls',
          'Business workflows',
          'Automated steps and notifications',
          'Setup and launch',
        ],
      },
      {
        id: 'be-advanced',
        name: 'Advanced',
        startingPrice: 60000,
        summary: 'For involved workflows and multiple connected systems.',
        includes: [
          'Everything in Business',
          'Integrations with outside services',
          'Scheduled and background automation',
          'Reporting and exports',
          'Performance work',
          'Written documentation',
        ],
      },
    ],
    howItWorks: [
      {
        title: 'We find where the work leaks',
        body: 'Usually it is one spreadsheet being copied by hand, or one person who is the only one who knows something. That is what gets fixed first.',
      },
      {
        title: 'The system is built behind what you have',
        body: 'Your existing site or app keeps its design. What changes is that it can now store, find, check and send things on its own.',
      },
      {
        title: 'You get the keys',
        body: 'Accounts, access and a written explanation of how it works — so you are never locked out of your own system, or dependent on me to understand it.',
      },
    ],
    technical: [
      'REST APIs with OpenAPI documentation; Node.js and TypeScript in strict mode',
      'PostgreSQL schema design, indexing and versioned migrations',
      'JWT authentication with hashed refresh tokens; role and permission guards (RBAC)',
      'Request validation, structured error handling and audit logging on every state change',
      'Redis-backed queues for background jobs, with idempotent handlers so a retry imports nothing twice',
      'Caching where it measurably helps, Docker Compose for parity, CI on every push',
    ],
    note: 'Already have a site? Send me the link and I will tell you what it would take.',
    ctaLabel: 'Discuss my backend project',
  },

  /* -------------------------------------------------------------- 4 / DESIGN */
  {
    id: 'web-design',
    slug: 'web-design',
    name: 'Website Design',
    subtitle: 'A professional online presence that makes your business look credible.',
    oneLiner:
      'The site people find when they look you up. Fast, and built to get enquiries.',
    bestFor: [
      'Small businesses',
      'Professionals and consultants',
      'Institutes and clinics',
      'Product businesses',
      'Personal brands',
    ],
    startingPrice: 10000,
    timeline: '1 to 3 weeks',
    benefits: [
      'Looks right on a phone, which is where your customers are',
      'Loads fast, even on a weak connection',
      'Found on Google for your own name and services',
    ],
    tiers: [
      {
        id: 'wd-landing',
        name: 'Landing Page',
        startingPrice: 10000,
        summary: 'One page that explains what you do and gets people to contact you.',
        includes: [
          'One premium page',
          'Works properly on every phone',
          'One clear call to action',
          'Enquiry form that reaches you',
          'Setup and launch',
        ],
      },
      {
        id: 'wd-business',
        name: 'Business Website',
        startingPrice: 20000,
        popular: true,
        summary: 'A complete site for a business with more than one thing to say.',
        includes: [
          '5 to 7 pages',
          'Design made for your business, not a template',
          'Contact and enquiry forms',
          'Works properly on every phone',
          'Search engine basics',
          'Visitor analytics',
          'Setup and launch',
        ],
      },
      {
        id: 'wd-premium',
        name: 'Premium Website',
        startingPrice: 40000,
        summary: 'For when how it looks is part of what you are selling.',
        includes: [
          'Custom visual design',
          '8 to 12+ pages',
          'Considered motion and interaction',
          'Sections built specifically for you',
          'Edit your own content where you need to',
          'Search engine foundation',
          'Speed and performance work',
          'Setup and launch',
        ],
      },
    ],
    howItWorks: [
      {
        title: 'We work out what the page has to do',
        body: 'Get a call? Take a booking? Make you look established enough to be trusted with a large order? The design follows the job, not the other way round.',
      },
      {
        title: 'Structure before decoration',
        body: 'What goes where, and in what order, gets agreed first. That is the part that decides whether the site works.',
      },
      {
        title: 'Built, checked on real phones, launched',
        body: 'Tested on actual devices and slow connections before it goes live, then connected to your domain.',
      },
    ],
    technical: [
      'Next.js with static rendering where possible; server components by default',
      'Core Web Vitals treated as a requirement, not a report — images sized and lazily loaded, fonts self-hosted and preloaded',
      'Semantic HTML, correct heading order, keyboard navigation and visible focus throughout',
      'Metadata, Open Graph, structured data, sitemap and robots generated from one config',
      'No page builder and no plugin sprawl; the site is code you own',
    ],
    note: 'Page count is what moves this price. Not sure how many you need? Just ask.',
    ctaLabel: 'Discuss my website',
  },

  /* ----------------------------------------------------------- 5 / ANALYTICS */
  {
    id: 'analytics',
    slug: 'analytics',
    name: 'Data & Analytics',
    subtitle: 'Turn your business data into information you can actually use.',
    oneLiner:
      'You already have the numbers. This is being able to read them.',
    bestFor: [
      'Businesses running on spreadsheets',
      'Sales and operations teams',
      'Managers who need a weekly view',
      'Startups tracking orders and customers',
      'Anyone who wants reports without building them by hand',
    ],
    startingPrice: 7000,
    timeline: '1 to 3 weeks',
    benefits: [
      'Messy spreadsheets cleaned and made consistent',
      'One screen showing how the business is doing',
      'Filter by month, branch, product or staff member',
    ],
    tiers: [
      {
        id: 'da-starter',
        name: 'Data Starter',
        startingPrice: 7000,
        summary: 'Clean and understand the data you already have.',
        includes: [
          'Data cleaning and organisation',
          'Analysis of what is in there',
          'Clear charts',
          'The findings, written in plain language',
        ],
      },
      {
        id: 'da-dashboard',
        name: 'Business Dashboard',
        startingPrice: 18000,
        popular: true,
        summary: 'See the numbers that matter in one place.',
        includes: [
          'Interactive dashboard',
          'The handful of numbers you actually run on',
          'Filters by date, branch, product or person',
          'Charts you can read at a glance',
          'Your data organised behind it',
        ],
      },
      {
        id: 'da-advanced',
        name: 'Advanced Analytics',
        startingPrice: 40000,
        summary: 'Use your data to spot trends and make better decisions.',
        includes: [
          'Several data sources brought together',
          'Deeper analysis',
          'Forecasting, where your data supports it',
          'Advanced dashboards',
          'Written documentation',
        ],
      },
    ],
    howItWorks: [
      {
        title: 'I look at what you actually have',
        body: 'Send the spreadsheet. Before quoting anything I will tell you whether it can answer the question you want answered — sometimes it cannot, and that is worth knowing early.',
      },
      {
        title: 'Cleaning comes first',
        body: 'Duplicate customers, three spellings of one product, dates in four formats. None of the analysis is worth anything until that is sorted.',
      },
      {
        title: 'You get something you will open again',
        body: 'A dashboard only earns its price if you look at it on a Monday. It gets built around the decisions you actually make.',
      },
    ],
    technical: [
      'Python with pandas for cleaning, reconciliation and analysis; notebooks handed over with the work',
      'Reproducible pipelines — the same input always produces the same output, and re-running is safe',
      'SQL against your own database where the data already lives there',
      'Dashboards built as a real application, not a spreadsheet export',
      'Forecasting only where the series supports it — seasonality and sample size are checked before anything is promised',
    ],
    note: 'Forecasting only where your data supports it. If it does not, I will say so.',
    ctaLabel: 'Discuss my data project',
  },
];

/** Lookup used by the dialog, the service routes and the recommendation result. */
export const packagesById = Object.fromEntries(
  packages.map((p) => [p.id, p]),
) as Record<SolutionPackage['id'], SolutionPackage>;

export const packageBySlug = (slug: string) => packages.find((p) => p.slug === slug);

/** Feeds JSON-LD `priceRange` so the published range can never drift from the data. */
export const priceRange = {
  min: Math.min(...packages.map((p) => p.startingPrice)),
  max: Math.max(...packages.flatMap((p) => p.tiers.map((t) => t.startingPrice))),
};

/**
 * The three fields the recommendation engine needs, and nothing else.
 *
 * Passed as a prop into the client-side finder so the full catalogue — tiers,
 * inclusions, technical notes — stays on the server. See lib/recommend.ts.
 */
export const finderCatalog = Object.fromEntries(
  packages.map((p) => [p.id, { name: p.name, startingPrice: p.startingPrice, oneLiner: p.oneLiner }]),
) as Record<SolutionPackage['id'], { name: string; startingPrice: number; oneLiner: string }>;

/** Card-sized projection for the finder's result and the services overview links. */
export const packageSummaries = packages.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  subtitle: p.subtitle,
  startingPrice: p.startingPrice,
  timeline: p.timeline,
}));
export type PackageSummary = (typeof packageSummaries)[number];
