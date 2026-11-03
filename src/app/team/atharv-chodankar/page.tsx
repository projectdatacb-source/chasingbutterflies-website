import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/instagram-icon";
import { VimeoIcon } from "@/components/vimeo-icon";
import { atharvChodankarProfile as profile } from "@/content/team/atharv-chodankar";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.name}, ${profile.role} at ${site.name}. ${profile.bio}`,
  alternates: {
    canonical: profile.path,
  },
  openGraph: {
    type: "profile",
    url: profile.path,
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
    siteName: site.name,
    images: [
      {
        url: profile.image,
        width: 900,
        height: 900,
        alt: profile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
    images: [profile.image],
  },
};

export default function AtharvChodankarProfilePage() {
  return (
    <article className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 pt-8">
        <Link
          href="/"
          className="rise inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Chasing Butterflies
        </Link>
      </div>

      <header className="mx-auto mt-10 grid max-w-6xl gap-8 px-5 sm:gap-10 lg:mt-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-12 xl:gap-14">
        <div className="rise relative mx-auto aspect-square w-full max-w-[min(100%,17.5rem)] overflow-hidden bg-neutral-950 sm:max-w-72 lg:mx-0 lg:max-w-[480px]">
          <Image
            src={profile.image}
            alt={profile.name}
            width={900}
            height={900}
            priority
            className="h-full w-full object-cover object-center"
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 288px, min(100vw - 2.5rem, 280px)"
          />
        </div>
        <div className="rise lg:py-2">
          <p className="text-xs tracking-[0.2em] text-accent uppercase">{site.name}</p>
          <h1 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-xl text-accent sm:text-2xl">{profile.role}</p>
          <p className="mt-6 max-w-md text-base leading-7 text-white/80">{profile.bio}</p>
        </div>
      </header>

      <div className="mx-auto mt-20 max-w-6xl space-y-20 px-5 md:mt-28 md:space-y-28">
        <section className="rise max-w-3xl" aria-labelledby="about-role">
          <h2 id="about-role" className="font-display text-3xl text-accent sm:text-4xl">
            About
          </h2>
          <div className="mt-8 space-y-6 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="rise max-w-3xl" aria-labelledby="experience">
          <h2 id="experience" className="font-display text-3xl text-accent sm:text-4xl">
            Experience &amp; responsibilities
          </h2>
          <p className="mt-6 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            {profile.role} · {site.name} · {profile.location.replace(/^Based in /, "")}
          </p>
          <ul className="mt-8 space-y-4 border-l border-accent/40 pl-6">
            {profile.responsibilities.map((item) => (
              <li key={item} className="text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rise max-w-3xl" aria-labelledby="portfolio">
          <h2 id="portfolio" className="font-display text-3xl text-accent sm:text-4xl">
            Studio work
          </h2>
          <p className="mt-6 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            {profile.portfolioNote}
          </p>
          <Link
            href="/#work"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent px-5 py-3 text-sm tracking-wide text-accent uppercase transition hover:bg-accent hover:text-black"
          >
            View our work
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section className="rise border-t border-white/10 pt-16" aria-labelledby="connect">
          <h2 id="connect" className="font-display text-3xl text-accent sm:text-4xl">
            Contact
          </h2>
          <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <li>
              <a
                href={profile.personalSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base text-white transition hover:text-accent"
              >
                atharvchodankar.com
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chasing Butterflies on Vimeo"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-accent"
              >
                <VimeoIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chasing Butterflies on Instagram"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-accent"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
          <p className="mt-8 text-sm text-white/50">
            <Link href="/#contact" className="transition hover:text-accent">
              Studio contact on the main site
            </Link>
          </p>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            image: `${siteUrl}${profile.image}`,
            url: `${siteUrl}${profile.path}`,
            sameAs: [profile.personalSite, site.vimeo, site.instagram],
            worksFor: {
              "@type": "Organization",
              name: site.name,
              url: siteUrl,
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </article>
  );
}
