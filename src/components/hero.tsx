import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[calc(100svh-4.75rem)] items-center overflow-hidden px-5 py-20">
      <HeroBackgroundVideo />
      <div className="rise relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Image
          src="/logo.jpg"
          alt=""
          width={92}
          height={92}
          priority
          className="h-[92px] w-[92px] rounded-full"
        />
        <h1 className="mt-8 font-display text-[2.7rem] leading-none tracking-tight text-accent sm:text-6xl md:text-7xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white sm:text-lg sm:leading-8">{site.tagline}</p>
        <div className="mt-10 flex items-center gap-4">
          <SocialLinks />
          <a
            href="#work"
            aria-label="Our work"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition duration-200 hover:bg-accent"
          >
            <ChevronDown className="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
