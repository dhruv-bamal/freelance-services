/**
 * The project finder — five questions, in the order a consultation actually goes.
 *
 * Each option carries a weight table pointing at the five categories. Keeping the
 * weights beside the copy (rather than buried in the engine) means adding an option
 * is one edit here, and it stays obvious which answers pull which way.
 *
 * Weight scale is deliberate, not arbitrary:
 *   step 1 (what)      5–6  — what someone says they want is the strongest signal
 *   step 2 (goal)      2–4  — the goal often corrects a mistaken step 1
 *   step 3 (business)  1–3  — context, not instruction
 *   step 4 (budget)    1–3  — what is realistically reachable
 *   step 5 (timeline)    0  — changes the closing line, never the recommendation.
 *                             Someone in a hurry does not need a different product.
 */
import type { PackageId } from '@/types';

export type StepId = 'build' | 'goal' | 'business' | 'budget' | 'timeline';

export interface FinderOption {
  value: string;
  label: string;
  weights?: Partial<Record<PackageId, number>>;
}

export interface FinderStep {
  id: StepId;
  question: string;
  help: string;
  options: FinderOption[];
}

export const finderSteps: FinderStep[] = [
  {
    id: 'build',
    question: 'What are you looking to build?',
    help: 'A rough idea is enough. The next questions will sharpen it.',
    options: [
      { value: 'website', label: 'A website for my business', weights: { 'web-design': 5, 'full-stack': 2 } },
      { value: 'booking', label: 'An online booking system', weights: { 'full-stack': 6, backend: 1 } },
      { value: 'system', label: 'A custom business system', weights: { 'full-stack': 5, backend: 3 } },
      { value: 'ai', label: 'An AI-powered solution', weights: { 'ai-website': 6 } },
      { value: 'dashboard', label: 'A dashboard or reports', weights: { analytics: 6, 'full-stack': 1 } },
      { value: 'unsure', label: "I'm not sure yet" },
    ],
  },
  {
    id: 'goal',
    question: 'What is the main goal?',
    help: 'The thing that would make this worth paying for.',
    options: [
      { value: 'customers', label: 'Get more customers', weights: { 'web-design': 3, analytics: 1 } },
      { value: 'sell', label: 'Sell my products', weights: { 'full-stack': 3, 'web-design': 2 } },
      { value: 'bookings', label: 'Accept bookings online', weights: { 'full-stack': 4 } },
      { value: 'manage', label: 'Manage my business', weights: { 'full-stack': 3, backend: 2 } },
      { value: 'manual', label: 'Reduce manual work', weights: { backend: 3, 'full-stack': 2 } },
      { value: 'data', label: 'Understand my business data', weights: { analytics: 4 } },
      { value: 'automate', label: 'Automate repetitive tasks', weights: { 'ai-website': 3, backend: 2 } },
      { value: 'other', label: 'Something else' },
    ],
  },
  {
    id: 'business',
    question: 'What best describes your business?',
    help: 'This mostly changes what I would build, not whether I can.',
    options: [
      { value: 'hotel', label: 'Hotel or hospitality', weights: { 'full-stack': 3 } },
      { value: 'startup', label: 'Startup', weights: { 'full-stack': 2, 'ai-website': 1, 'web-design': 1 } },
      { value: 'institute', label: 'School or institute', weights: { 'full-stack': 3 } },
      { value: 'retail', label: 'Retail or product business', weights: { 'web-design': 2, 'full-stack': 1, analytics: 1 } },
      { value: 'service', label: 'Service business', weights: { 'web-design': 2, 'full-stack': 1 } },
      { value: 'professional', label: 'Professional or consultant', weights: { 'web-design': 3 } },
      { value: 'other', label: 'Something else' },
    ],
  },
  {
    id: 'budget',
    question: 'What budget do you have in mind?',
    help: 'A range is fine. Nothing here is a quote, and it will not be held against you.',
    options: [
      { value: 'under-20k', label: 'Under ₹20,000', weights: { 'web-design': 3, analytics: 2 } },
      { value: '20-50k', label: '₹20,000 – ₹50,000', weights: { 'full-stack': 2, backend: 2, 'ai-website': 1, 'web-design': 1 } },
      { value: '50k-1l', label: '₹50,000 – ₹1,00,000', weights: { 'full-stack': 3, 'ai-website': 2, backend: 1 } },
      { value: '1l-plus', label: '₹1,00,000+', weights: { 'full-stack': 3, 'ai-website': 3 } },
      { value: 'unsure', label: "I'm not sure yet" },
    ],
  },
  {
    id: 'timeline',
    question: 'How soon would you like to launch?',
    help: 'Useful for planning. It does not change what I would recommend.',
    options: [
      { value: 'asap', label: 'As soon as possible' },
      { value: '1-month', label: 'Within 1 month' },
      { value: '1-3-months', label: '1 – 3 months' },
      { value: 'exploring', label: 'Just exploring' },
    ],
  },
];

/** What the finder collects. Every key is optional until that step is answered. */
export type FinderAnswers = Partial<Record<StepId, string>>;

/** Upper bound in rupees for each budget band; `null` where the visitor did not say. */
export const budgetCeiling: Record<string, number | null> = {
  'under-20k': 20000,
  '20-50k': 50000,
  '50k-1l': 100000,
  '1l-plus': null,
  unsure: null,
};

/** Closing line on the result, keyed by timeline. Tone, not sales pressure. */
export const timelineNote: Record<string, string> = {
  asap: 'You want to move quickly — send me a message and I will tell you today what is realistic.',
  '1-month': 'A month is workable for most of what I build. Worth starting the conversation now.',
  '1-3-months': 'That is a comfortable runway. It leaves room to get the planning right.',
  exploring: 'No rush. Ask me anything you like — there is no obligation at any point.',
};
