/**
 * Icons, hand-authored.
 *
 * No icon package. Twenty icons is not worth a dependency, and drawing them here
 * means each one is sized and weighted for this page rather than for a generic set —
 * the package marks in particular are meant to read as five distinct objects at
 * 22px, which most off-the-shelf line sets do not manage.
 *
 * All are stroke-based on a 24 grid at 1.5, inherit `currentColor`, and are
 * decorative by default (`aria-hidden`) because every one sits beside real text.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
});

/* --- Package marks ------------------------------------------------------- */

/** AI — a conversation mark with a spark, not a robot head. */
export const IconAi = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 12.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 3v-4.4A7.5 7.5 0 0 1 9 5.2" />
    <path d="M16.5 2.5 17.6 5l2.5 1.1-2.5 1.1-1.1 2.5-1.1-2.5L12.9 6l2.5-1.1z" />
    <path d="M8.5 13h5" />
  </svg>
);

/** Full-stack — a surface with a working layer beneath it. */
export const IconFullStack = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="8" rx="1.8" />
    <path d="M6.5 7h4" />
    <path d="M3 15.5h18" />
    <path d="M3 20h18" />
    <path d="M17.5 15.5v4.5" />
  </svg>
);

/** Backend — stacked stores with a connection running through them. */
export const IconBackend = (p: IconProps) => (
  <svg {...base(p)}>
    <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
    <path d="M5 5.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
    <path d="M5 11.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
  </svg>
);

/** Website design — a browser frame with composed content. */
export const IconDesign = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 8.5h18" />
    <path d="M6 6.2h.01M8.4 6.2h.01" />
    <path d="M7 12h5" />
    <path d="M7 15.5h9" />
  </svg>
);

/** Analytics — a trend read off a plotted series. */
export const IconAnalytics = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4v16h16" />
    <path d="M7.5 15.5 11 11l3 2.5 4.5-6" />
    <circle cx="11" cy="11" r="1.1" />
    <circle cx="14" cy="13.5" r="1.1" />
  </svg>
);

/* --- Interface ----------------------------------------------------------- */

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)} strokeWidth={2}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </svg>
);

export const IconChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6 18 18M18 6 6 18" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3 7 8.1 5.4a1.6 1.6 0 0 0 1.8 0L21 7" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.3 3h2.9l1.5 3.7-1.9 1.2a11.4 11.4 0 0 0 5.3 5.3l1.2-1.9L19 12.8v2.9a2.3 2.3 0 0 1-2.5 2.3A15.8 15.8 0 0 1 4 5.5 2.3 2.3 0 0 1 6.3 3Z" />
  </svg>
);

/** WhatsApp — filled, because the outline version is unrecognisable at 18px. */
export const IconWhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.92 9.92 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1 12.75-10.2 8.22 8.22 0 0 1-5.75 14.06Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

export const IconGitHub = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

export const IconLinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.9h3.4V21H3.3V8.9Zm5.66 0h3.26v1.66h.05c.45-.86 1.57-1.76 3.23-1.76 3.45 0 4.09 2.27 4.09 5.22V21h-3.4v-5.3c0-1.26-.02-2.89-1.76-2.89-1.77 0-2.04 1.38-2.04 2.8V21h-3.4V8.9Z" />
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
  </svg>
);

/** Maps a package id to its mark, so the data file never imports a component. */
export const packageIcons = {
  'ai-website': IconAi,
  'full-stack': IconFullStack,
  backend: IconBackend,
  'web-design': IconDesign,
  analytics: IconAnalytics,
} as const;
