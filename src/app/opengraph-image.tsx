/**
 * Social share card, rendered at build time by next/og.
 *
 * Generated rather than stored, so the name and positioning line come from
 * config/site.ts and cannot drift from the page. Fonts fall back to the runtime's
 * default sans — a webfont here would add a network fetch to a build step for a
 * 1200×630 image nobody inspects closely.
 */
import { ImageResponse } from 'next/og';

import { site } from '@/config/site';
import { priceRange } from '@/data/packages';

export const alt = site.seo.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#14161B',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: '#A3A4F0' }} />
          <div style={{ fontSize: 30, color: '#A8ACB4' }}>{site.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#FAF9F7',
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: '#A8ACB4', maxWidth: 880 }}>
            Websites, booking systems, business applications and AI solutions.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 26 }}>
          {/* Satori requires an explicit display on any div with more than one
              child, and `text {expr}` counts as two — so this is one string. */}
          <div style={{ color: '#A3A4F0' }}>
            {`Starting from ₹${priceRange.min.toLocaleString('en-IN')}`}
          </div>
          <div style={{ color: '#2B2E36' }}>|</div>
          <div style={{ color: '#A8ACB4' }}>{site.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
