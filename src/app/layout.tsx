/**
 * Root layout: fonts, metadata, structured data, and the page chrome.
 *
 * Both typefaces are self-hosted through next/font/google — no request ever leaves
 * for a font file at runtime, and the CSS is inlined, so there is no flash of
 * unstyled text on a slow Indian mobile connection. That is a conversion concern
 * as much as a performance one.
 */
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Schibsted_Grotesk } from 'next/font/google';

import { site, siteUrl } from '@/config/site';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StructuredData } from '@/components/layout/StructuredData';

import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-schibsted',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  alternates: { canonical: '/' },
  authors: [{ name: site.name, url: site.portfolioUrl }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: site.seo.locale,
    url: siteUrl,
    siteName: site.name,
    title: site.seo.ogTitle,
    description: site.seo.ogDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.ogTitle,
    description: site.seo.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#faf9f7',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${schibsted.variable}`}>
      <head>
        {/*
          Without this, a visitor with JavaScript disabled gets a page of blank
          sections: `Reveal` is a client component, so `data-shown` never flips
          from "false" and the .reveal rule leaves those elements at opacity 0.
          The <noscript> override costs nothing and removes the worst failure
          mode the site has — content that is present in the HTML but invisible.
        */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {/*
          The skip link is the first thing in the tab order. It is invisible until
          focused, at which point it must be genuinely visible — not a 1px sliver.
        */}
        <a
          href="#main"
          className="sr-only-focusable focus:not-sr-only-focusable focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:inline-flex focus:h-auto focus:w-auto focus:items-center focus:overflow-visible focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper focus:[clip-path:none]"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <StructuredData />
      </body>
    </html>
  );
}
