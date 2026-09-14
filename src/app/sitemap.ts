/**
 * Sitemap, generated from the packages array — a new category is a new URL here
 * automatically, with no chance of the list going stale.
 */
import type { MetadataRoute } from 'next';

import { packages } from '@/data/packages';
import { siteUrl } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...packages.map((pkg) => ({
      url: `${siteUrl}/services/${pkg.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
