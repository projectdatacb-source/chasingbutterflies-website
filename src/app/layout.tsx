import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Lexend, Work_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work-sans",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-lexend",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    images: [
      {
        url: "/og.png",
        width: 228,
        height: 228,
        alt: site.name,
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  description: site.tagline,
  logo: `${siteUrl}/logo.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [site.vimeo, site.instagram],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${lexend.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
