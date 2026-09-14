/**
 * Selected work.
 *
 * HONESTY RULE FOR THIS FILE — do not relax it.
 * These are Dhruv's own builds, not client projects. Every card is labelled
 * "Demo build" in the UI, and no card claims a client, a revenue figure, a
 * conversion rate or any other outcome that was not measured. `demonstrates`
 * describes what the build shows he can do — which is the honest claim, and
 * the one a client actually cares about.
 *
 * When a real client project is finished and the client has agreed to it being
 * shown, add it here with a different label and the outcome they confirmed.
 *
 * Each project runs live at `liveUrl` — Dhruv's own deployments, opened in a new
 * tab. That is the difference between a portfolio and a screenshot: "demo build"
 * is something a client can click into and use, not an image they take on trust.
 *
 * Gallery entries deep-link to the exact screen shown in the thumbnail.
 */
import type { WorkProject } from '@/types';

export const work: WorkProject[] = [
  {
    slug: 'retail-pulse',
    name: 'Retail Pulse',
    category: 'Business dashboard',
    label: 'Demo build',
    problem:
      'The numbers live in a till system, a spreadsheet and the owner\u2019s head. Answering "what is selling?" takes an evening.',
    solution:
      'One screen: what sold, what is slowing, what is nearly out of stock.',
    demonstrates:
      'The difference between having data and being able to read it.',
    /*
     * Leads with the landing page, not the dashboard, and the main link opens the
     * landing page too. Dropping a visitor straight into a dashboard means they
     * meet a wall of someone else's numbers with no idea what they are looking at;
     * the landing page explains the product first and has its own "open the demo"
     * button, so they arrive at the dashboard having chosen to.
     */
    image: {
      src: '/images/work/retail-pulse.webp',
      alt: 'The Retail Pulse landing page: "Know what\u2019s selling while it\u2019s still selling", beside a live takings panel.',
      width: 1600,
      height: 900,
    },
    liveUrl: 'https://retail-pulse-tau.vercel.app/',
    gallery: [
      {
        src: '/images/work/retail-pulse-dashboard.webp',
        alt: 'The dashboard: revenue against the previous period, order count, average basket and a reorder warning.',
        caption: 'The dashboard itself',
        href: 'https://retail-pulse-tau.vercel.app/dashboard',
      },
      {
        src: '/images/work/retail-pulse-inv.webp',
        alt: 'The inventory screen, listing stock levels against reorder points.',
        caption: 'What is running out',
        href: 'https://retail-pulse-tau.vercel.app/dashboard/inventory',
      },
    ],
    technical: [
      'Chart primitives written from scratch as SVG — no charting library, so every axis, tick and tooltip is under control and the bundle stays small',
      'Seeded pseudo-random generation so server and client render identical numbers and hydration never mismatches',
      'Palette run through a colour-blindness separation check; hues that collided were cut rather than kept',
      'Marketing surface and product surface share one token system with a dark override',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    slug: 'terminal-earth',
    name: 'TERMINAL / EARTH',
    category: 'Interactive 3D',
    label: 'Demo build',
    problem:
      'Some businesses sell the experience itself, and a normal page will not carry it.',
    solution:
      'A globe built from real coastline data that unrolls into a flat atlas when you pull it.',
    demonstrates:
      'The upper end of the Premium Website tier — interaction built, not taken off a shelf.',
    image: {
      src: '/images/work/terminal-earth.webp',
      alt: 'A stylised 3D globe rendered from coastline data, with illuminated flight routes arcing between cities.',
      width: 1600,
      height: 900,
    },
    liveUrl: 'https://3d-earth-dashboard.vercel.app/',
    gallery: [
      {
        src: '/images/work/terminal-earth-atlas.webp',
        alt: 'The same globe unrolled into a flat equirectangular route atlas.',
        caption: 'The globe unrolled flat',
        href: 'https://3d-earth-dashboard.vercel.app/',
      },
    ],
    technical: [
      'The unfold is one GLSL function injected into every material, so continents, city lights, arcs and labels morph as a single object rather than four things animating in parallel',
      'Sphere is unrolled around a cylinder of growing radius to preserve arc length — a naive lerp drags far-side points through the planet core and reads as a bug',
      '~57k continent points in a single draw call; 212 routes merged into one buffer with packet progress computed on the GPU, so nothing uploads per frame',
      'Camera move couples rotation, dolly, focal length and a focus rack that lands a beat late — the offset is what makes it read as operated rather than computed',
    ],
    stack: ['React', 'Three.js', 'React Three Fiber', 'GLSL', 'GSAP'],
  },
];
