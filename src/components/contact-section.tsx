import { SocialLinks } from "@/components/social-links";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-white/10 px-5 py-24 md:py-32">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <h2 className="font-display text-4xl text-accent sm:text-5xl md:text-6xl">Contact</h2>
        <p className="mt-8 text-base text-white sm:text-lg">Mumbai, Maharashtra (India)</p>
        <SocialLinks className="mt-10" />
        <p className="sr-only">
          Vimeo: {site.vimeo}. Instagram: {site.instagram}.
        </p>
      </div>
    </section>
  );
}
