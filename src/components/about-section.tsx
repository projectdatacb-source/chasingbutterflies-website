import { site } from "@/content/site";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl text-accent sm:text-5xl md:text-6xl">About Us</h2>
        <p className="mt-8 text-base text-white sm:text-lg">{site.location}</p>
        <div className="mt-8 space-y-8 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
          {site.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
