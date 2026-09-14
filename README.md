# Dhruv Bamal — freelance studio site

A premium services site for an independent developer selling websites, booking
systems, business applications, dashboards and AI solutions to businesses in India.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · npm.
No UI kit, no icon package, no animation library — the only runtime dependencies
are React and Next.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm test           # recommendation-engine tests (node --test)
npm run lint
npm run images     # re-compress screenshots in public/images/work to WebP
```

---

## The things you will want to change

Everything below is a data edit. None of it requires touching a component.

### 1. Your contact details and identity → `src/config/site.ts`

Single source of truth. The header, hero, contact section, footer and the JSON-LD
structured data all read from this one file, so a phone number cannot drift out of
sync across the page.

### 2. Your photograph → just save the file

```
public/images/profile.jpg
```

`jpg`, `jpeg`, `png`, `webp` or `avif` all work. `Portrait` is a server component
that looks for it on disk, so there is **no code to change** — save the file and
rebuild. Until one exists the hero renders a designed placeholder in the identical
box, so adding it causes no layout shift.

The frame is a circle for a reason: it puts the bottom-right corner of a square
source outside the visible area, which is where generator watermarks sit.

Use a real photograph — never stock, never a generated face.

### 3. The work section → `src/data/work.ts`

Two projects, each linking to its own live deployment:

| | |
|---|---|
| **Retail Pulse** | https://retail-pulse-tau.vercel.app |
| **TERMINAL / EARTH** | https://3d-earth-dashboard.vercel.app |

`liveUrl` is the main link, `gallery` entries deep-link to the exact screen in each
thumbnail. All of them open in a new tab. If a deployment URL changes, change it
here — nothing else references it.

Screenshots live in `public/images/work/` as WebP. Re-capture at 1600x900, drop the
PNGs in, and run `npm run images`.

### 4. Prices, tiers and packages → `src/data/packages.ts`

Five categories, three tiers each. Adding a sixth category automatically creates its
service page at `/services/<slug>`, adds it to the sitemap, the trust strip, the
contact form's dropdown and the JSON-LD offer catalogue.

**List prices only.** This repository is public, and anything passed to a client
component also reaches the browser in the RSC payload. Negotiated floors stay in the
conversation.

Each package separates two vocabularies deliberately:
- `includes` / `benefits` — what a business owner reads. No stack names.
- `technical` — what a developer reads, behind a `<details>` disclosure.

### 5. Add-ons → `src/data/addons.ts` · FAQs → `src/data/faqs.ts`

FAQ answers are also emitted as `FAQPage` structured data from the same file, so
the two cannot diverge.

### 6. Adding testimonials back

There is no testimonials section. Rather than ship a section explaining that there
are none yet, the one honest sentence about it lives in About. When a client writes
one and agrees to it appearing, add a section — never invent one.

---

## How enquiries reach you

There is no API route, no mail service and no API key. Every call to action composes
a WhatsApp message and opens `wa.me/<your number>` with the text already written.

- The **project finder** includes the visitor's five answers in the message, so your
  first reply can be useful instead of "tell me more".
- The **contact form** composes name, business, contact details, project type, budget
  and message, then calls `window.open` inside the click gesture so a popup blocker
  does not fire. If it is blocked anyway, a visible "Open WhatsApp" link appears, plus
  a `mailto:` alternative carrying the same text.

Links use `encodeURIComponent`, not `URLSearchParams` — the latter encodes spaces as
`+`, which some WhatsApp and mail clients display literally.

---

---

## Structure

```
src/
  app/          routes, tokens (globals.css), sitemap, robots, OG image, 404
  components/
    ui/         Button Dialog Disclosure Field Price Reveal SectionHeading icons
    layout/     SiteHeader MobileNav SiteFooter StructuredData
    sections/   one component per section of the home page
  config/       who Dhruv is
  data/         what he sells
  lib/          recommend · format · whatsapp · cn
tests/          recommendation-engine contract
scripts/        optimise-images.mjs
```

`config/` and `data/` are split by rate of change: `config/` changes when *you*
change, `data/` when the *business* changes. Neither imports from `components/`.

---

## Notes for whoever works on this next

- **Contrast ratios are measured and recorded in `globals.css`.** Two results
  constrain the palette: the indigo accent is 2.02:1 on the dark footer and must
  never be used for text there (`--color-indigo-light` exists for that surface), and
  `--color-rule` is intentionally low-contrast because it is decorative — interactive
  borders use `--color-rule-strong`.
- **Modals and accordions are native `<dialog>` and `<details>`.** Focus trapping,
  Esc, backdrop, `inert` and focus-return come from the platform. Please do not
  replace them with a library.
- **No tabular figures.** Schibsted Grotesk gives the comma a full digit-width
  advance under `font-variant-numeric: tabular-nums`, rendering "₹2,000" as "₹2 , 000".
- **The recommendation engine is a pure function** (`src/lib/recommend.ts`) with the
  package catalogue injected rather than imported, so the full 500-line catalogue
  stays out of the client bundle. `npm test` exercises the named scenarios plus every
  one of the 3,920 answer combinations.
- **The header compacts on scroll with a CSS scroll-driven animation**, not a scroll
  listener. Browsers without support simply keep a full-height header. The nav links
  sit beside the wordmark rather than floating mid-header, and a small
  IntersectionObserver marks the current section.
- **The hero backdrop is five `<circle>` elements** broken into arcs by
  `stroke-dasharray` and rotated with CSS `transform`, which the compositor runs off
  the main thread — no layout, no paint, no JavaScript. Its mask is
  breakpoint-aware: on a phone the arcs are confined to the lower half so they never
  cross the headline.
- **The page is deliberately short.** It was 2,461 words and is now ~1,400. Two
  sections were deleted rather than trimmed: "Why work with me" duplicated the
  assurances beside the hero portrait, and "Testimonials" was a section-sized
  apology for not having any. Add-on descriptions were dropped so that section reads
  as a rate card. Please keep it this size — nobody reads a services page end to end.
- **Never use `transition-all`.** It animates outline-width, outline-color and
  outline-offset too, which makes the focus ring *fade in* — a keyboard user needs
  to know where they are the instant they arrive. Every transition here names its
  properties.
- **Service cards are one target, not two.** The whole card opens its dialog via
  `.btn-stretch`, whose `::after` covers the card. That class also has to cancel
  `.btn:active { transform }` — any transform makes the button the containing block
  for its own `::after`, which collapses the hit area mid-click, so a press starting
  at the top of the card would never complete. The focus ring moves to the card
  (`.card-focusable`, deliberately unlayered so it always wins the cascade).
- **Section backgrounds must alternate** paper/card down the page. Deleting a
  section silently breaks the rhythm and two neighbours merge into one long band.
- **Screenshots ship as WebP, not PNG.** The raw captures totalled 3.8 MB; the same
  images at shipping widths are 0.30 MB. `npm run images` redoes this after a
  re-capture. WebP rather than JPEG because interface screenshots are full of thin
  type, which is exactly what JPEG smears.

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the live origin (see `.env.example`). It feeds
`metadataBase`, the canonical URL, the sitemap and the structured data.
