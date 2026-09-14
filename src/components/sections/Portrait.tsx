/**
 * The hero portrait.
 *
 * WHY A CIRCLE
 * The source photograph carries a generator watermark in its bottom-right corner.
 * A circle inscribed in a square crop puts that corner outside the visible area —
 * the mark sits about 578px from centre on a 1024px image whose inscribed radius
 * is 512 — so the crop removes it geometrically rather than covering it up.
 *
 * FINDING THE PHOTOGRAPH
 * A server component, so it can look on disk. Drop any of
 *   public/images/profile.{jpg,jpeg,png,webp,avif}
 * and it is picked up on the next build with no code change. Setting
 * `site.portrait` overrides the search if the file must live elsewhere.
 *
 * Until a file exists it renders a designed placeholder in the identical box, so
 * adding one causes no layout shift.
 *
 * Use a real photograph — never a stock person, never a generated face.
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

import { site } from '@/config/site';

/** Checked in order; the first that exists wins. */
const FILENAMES = ['profile.jpg', 'profile.jpeg', 'profile.png', 'profile.webp', 'profile.avif'];

function resolvePortrait(): string | null {
  if (site.portrait) return site.portrait;

  for (const name of FILENAMES) {
    if (existsSync(path.join(process.cwd(), 'public', 'images', name))) {
      return `/images/${name}`;
    }
  }
  return null;
}

export function Portrait() {
  const src = resolvePortrait();

  return (
    <div className="relative w-full">
      {/*
        A ring offset behind the portrait. One quiet structural device instead of a
        drop shadow — it makes the photo feel placed rather than pasted.
      */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-full border border-rule"
      />
      <div className="relative aspect-square overflow-hidden rounded-full border border-rule bg-card">
        {src ? (
          <Image
            src={src}
            alt={site.portraitAlt}
            fill
            priority
            sizes="(min-width: 1024px) 21rem, 80vw"
            className="object-cover"
          />
        ) : (
          <PortraitPlaceholder />
        )}
      </div>
    </div>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-paper">
      {/* A fine grid, drawn in CSS — no image request for a placeholder. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-rule) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative px-8 text-center">
        <p
          aria-hidden
          className="font-display text-[clamp(3rem,8vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink/12"
        >
          {site.initials}
        </p>
        {/*
          The instruction is for whoever is building the site, so it shows only in
          development. A live site should never explain its own missing asset.
        */}
        <p className="mt-3 text-xs text-ink-muted">
          {process.env.NODE_ENV === 'development'
            ? 'Save a photo to public/images/profile.jpg'
            : 'Photograph coming soon'}
        </p>
      </div>
    </div>
  );
}
