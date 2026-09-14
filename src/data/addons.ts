/**
 * Typical add-on pricing.
 *
 * These are ranges, not quotes. The heading above them says so, and the note under
 * them says so again, because the single fastest way to lose trust is to publish a
 * number and then charge a different one.
 *
 * Grouped by when a client tends to need them, not alphabetically — someone reading
 * this is usually at one of four moments: launching, maintaining, adding a feature,
 * or trying to grow.
 */
import type { AddOn } from '@/types';

export const addOns: AddOn[] = [
  /* --- Getting it live ---------------------------------------------------- */
  {
    name: 'Deployment',
    from: 2000,
    to: 5000,
    group: 'launch',
    description: 'Get your website or application live and working on the internet.',
  },
  {
    name: 'Domain setup',
    from: 500,
    to: 1500,
    suffix: '+ domain cost',
    group: 'launch',
    description:
      'Connect and configure your own web address. I register it in your name, on your account — so it stays yours.',
  },

  /* --- Keeping it running ------------------------------------------------- */
  {
    name: 'Managed hosting',
    from: 1500,
    to: 5000,
    per: 'month',
    suffix: '+ server costs',
    group: 'care',
    description:
      'I handle deployments, monitoring and the server side. Response during working hours, not around the clock.',
  },
  {
    name: 'Website care',
    from: 2500,
    per: 'month',
    group: 'care',
    description: 'Updates, backups, minor fixes and general maintenance.',
  },
  {
    name: 'Business care',
    from: 5000,
    per: 'month',
    group: 'care',
    description: 'Regular maintenance, updates, performance checks and small improvements.',
  },
  {
    name: 'Professional care',
    from: 10000,
    to: 15000,
    per: 'month',
    group: 'care',
    description: 'Priority response, monitoring, maintenance and ongoing improvements.',
  },

  /* --- Adding a capability ------------------------------------------------ */
  {
    name: 'Extra revision',
    from: 1000,
    to: 3000,
    group: 'features',
    description: 'More changes than your package includes, added one at a time.',
  },
  {
    name: 'Extra page',
    from: 2000,
    to: 5000,
    group: 'features',
    description: 'An additional page in the existing style.',
  },
  {
    name: 'Advanced page',
    from: 5000,
    to: 10000,
    group: 'features',
    description: 'A page with custom layout, interaction or functionality of its own.',
  },
  {
    name: 'Online payments',
    from: 5000,
    to: 12000,
    group: 'features',
    description: 'Take payments on your site, with receipts and a record of every transaction.',
  },
  {
    name: 'WhatsApp integration',
    from: 5000,
    to: 15000,
    openEnded: true,
    group: 'features',
    description: 'Send confirmations, reminders and updates to customers on WhatsApp.',
  },
  {
    name: 'Email automation',
    from: 3000,
    to: 8000,
    group: 'features',
    description: 'Automatic emails when something happens — a booking, an order, a form.',
  },
  {
    name: 'Login system',
    from: 5000,
    to: 12000,
    group: 'features',
    description: 'Accounts and sign-in for customers or staff, with the right permissions each.',
  },
  {
    name: 'Admin dashboard',
    from: 10000,
    to: 25000,
    group: 'features',
    description: 'A private area where you see and manage everything the site collects.',
  },
  {
    name: 'Other integrations',
    from: 4000,
    to: 15000,
    openEnded: true,
    group: 'features',
    description: 'Connect your site to a tool you already use — accounting, CRM, calendars, sheets.',
  },

  /* --- Growing it --------------------------------------------------------- */
  {
    name: 'Analytics setup',
    from: 2000,
    to: 5000,
    group: 'growth',
    description: 'See how many people visit, where they come from, and what they do.',
  },
  {
    name: 'SEO setup',
    from: 5000,
    to: 12000,
    group: 'growth',
    description: 'The groundwork for being found on Google for what you actually do.',
  },
  {
    name: 'Performance work',
    from: 5000,
    to: 15000,
    group: 'growth',
    description: 'Make an existing site meaningfully faster to load and use.',
  },
  {
    name: 'Data migration',
    from: 5000,
    to: 20000,
    openEnded: true,
    group: 'growth',
    description: 'Move your existing customers, products or records into the new system.',
  },
  {
    name: 'AI integration',
    from: 10000,
    to: 25000,
    openEnded: true,
    group: 'growth',
    description: 'Add an AI assistant or automated AI step to a site you already have.',
  },
  {
    name: 'Documentation',
    from: 3000,
    to: 10000,
    group: 'growth',
    description: 'A written guide to how your system works, so anyone can pick it up later.',
  },
];

export const addOnGroups = [
  { id: 'launch', label: 'Getting it live' },
  { id: 'care', label: 'Keeping it running' },
  { id: 'features', label: 'Adding a capability' },
  { id: 'growth', label: 'Growing it' },
] as const;
