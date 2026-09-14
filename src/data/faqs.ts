/**
 * Frequently asked questions.
 *
 * Seven, not eleven. These are the ones that actually block a decision; the rest
 * were answered elsewhere on the page, and a visitor who still has a question is
 * better served by asking it than by reading four more they did not have.
 *
 * Where the honest answer is "it depends", the answer says so and then says what
 * it depends on — more useful than a confident number that turns out to be wrong.
 *
 * Also rendered as FAQPage structured data, so keep answers self-contained.
 */
import type { Faq } from '@/types';

export const faqs: Faq[] = [
  {
    question: 'How do I know which package I need?',
    answer:
      'You do not have to. Use the project finder above — five questions and it points you at the right one. Or just message me and describe your business; working that out is my job.',
  },
  {
    question: 'Can I start with a basic website and add features later?',
    answer:
      'Yes, and it is usually the sensible way. Get the website live and earning, then add bookings, accounts or payments when you know you need them — without starting again.',
  },
  {
    question: 'Can you maintain my website after launch?',
    answer:
      'Yes — care plans from ₹2,500/month cover updates, backups and fixes. No obligation to take one.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'One page, about a week. A business website, one to three weeks. A booking system, three to six. The biggest variable is how fast content and decisions come back to me.',
  },
  {
    question: 'Do you require an advance payment?',
    answer:
      'Yes. Work starts on a part payment, with the rest at agreed points. The split is written down before anything begins.',
  },
  {
    question: 'Do I own my website and code?',
    answer:
      'Completely. Once paid for, the code, design, domain and accounts are yours — and you can take them to another developer at any time.',
  },
  {
    question: 'Can you work with my existing website?',
    answer:
      'Usually yes. Send me the link and I will tell you honestly whether it is worth building on or replacing.',
  },
];
