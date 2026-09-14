/**
 * How a project runs.
 *
 * This section exists for one reader: the business owner who is worried that hiring
 * a developer means being asked questions they cannot answer. Every step is written
 * to say "you do not need to know how this works".
 */
import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand',
    body: 'How your business runs today, and what you want to be different. No technical questions.',
  },
  {
    step: '02',
    title: 'Plan',
    body: 'A written scope and a price, in plain language, before any work begins.',
  },
  {
    step: '03',
    title: 'Design',
    body: 'We agree the structure and the look while changes are still free.',
  },
  {
    step: '04',
    title: 'Build',
    body: 'I build and test it, showing you progress as it goes.',
  },
  {
    step: '05',
    title: 'Launch & support',
    body: 'It goes live, your staff get shown how to use it, and I stay reachable.',
  },
];
