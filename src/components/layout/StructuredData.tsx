/**
 * JSON-LD structured data.
 *
 * Two rules held here:
 *  1. Nothing is retyped. `priceRange` is derived from the packages array and the
 *     offer catalogue is generated from it, so a price change in data/packages.ts
 *     cannot leave the structured data claiming something different from the page.
 *     Search engines treat a mismatch as a quality signal, and it is also just wrong.
 *  2. No rating, review count, or award appears here. Marking up a rating that does
 *     not exist is the single fastest way to earn a manual action, and there are no
 *     reviews yet.
 */
import { site, siteUrl } from '@/config/site';
import { packages, priceRange } from '@/data/packages';
import { faqs } from '@/data/faqs';

export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: site.name,
        jobTitle: site.role,
        email: site.email,
        telephone: site.phoneDisplay,
        url: siteUrl,
        sameAs: [site.githubUrl, site.linkedinUrl, site.portfolioUrl],
        address: { '@type': 'PostalAddress', addressLocality: 'Ghaziabad', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: site.education.institution },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: site.name,
        description: site.seo.description,
        url: siteUrl,
        email: site.email,
        telephone: site.phoneDisplay,
        founder: { '@id': `${siteUrl}/#person` },
        areaServed: { '@type': 'Country', name: 'India' },
        priceRange: `₹${priceRange.min.toLocaleString('en-IN')}–₹${priceRange.max.toLocaleString('en-IN')}+`,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital solutions',
          itemListElement: packages.map((pkg) => ({
            '@type': 'Offer',
            name: pkg.name,
            description: pkg.subtitle,
            url: `${siteUrl}/services/${pkg.slug}`,
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: pkg.startingPrice,
              priceCurrency: 'INR',
              valueAddedTaxIncluded: false,
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repository, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
